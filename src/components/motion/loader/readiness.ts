// Readiness: the only source of truth a loader may show. Progress is the share
// of real tasks that settled (fonts, window load, critical media), never a timer.
// Same file in every loader of the kit, so each effect can be copied alone.
//
//   pageTasks(root)       document.fonts.ready, window load, and every
//                         [data-critical] <img> (decode) / <video> (loadeddata)
//   trackReadiness(...)   resolves when every task settled (a rejection counts
//                         as settled: a broken image must not block the page) or
//                         when the cap hits; reports done/total on each settle
//   markReady / whenReady the "page is ready" signal: html.is-ready + app:ready,
//                         so the hero (or a hash scroll) can start on cue
//   hasSeen / markSeen    once per session (sessionStorage, guarded)

export type ReadyTask = Promise<unknown>;
/** A list of tasks, or a factory that receives an abort signal (to clear its timers). */
export type ReadyTasks = ReadyTask[] | ((signal: AbortSignal) => ReadyTask[]);

export function pageTasks(root: ParentNode = document): ReadyTask[] {
  if (typeof document === "undefined") return [];
  const tasks: ReadyTask[] = [];
  if (document.fonts) tasks.push(document.fonts.ready);
  if (document.readyState !== "complete") {
    tasks.push(new Promise((r) => window.addEventListener("load", () => r(undefined), { once: true })));
  }
  root.querySelectorAll("[data-critical]").forEach((el) => {
    if (el instanceof HTMLImageElement) {
      tasks.push(el.decode());
    } else if (el instanceof HTMLVideoElement && el.readyState < 2) {
      tasks.push(
        new Promise((r) => {
          el.addEventListener("loadeddata", r, { once: true });
          el.addEventListener("error", r, { once: true });
        }),
      );
    }
  });
  return tasks;
}

export function resolveTasks(tasks: ReadyTasks | undefined, signal: AbortSignal): ReadyTask[] {
  if (!tasks) return pageTasks(document);
  return typeof tasks === "function" ? tasks(signal) : tasks;
}

export type TrackOptions = {
  onProgress?: (done: number, total: number) => void;
  /** Never hold the page longer than this (ms). Default 8000. */
  cap?: number;
  signal?: AbortSignal;
};

/** Resolves `true` if every task settled, `false` if the cap hit first. */
export function trackReadiness(tasks: ReadyTask[], { onProgress, cap = 8000, signal }: TrackOptions = {}) {
  return new Promise<boolean>((resolve) => {
    const total = tasks.length;
    let done = 0;
    let over = false;
    const end = (all: boolean) => {
      if (over) return;
      over = true;
      window.clearTimeout(timer);
      resolve(all);
    };
    const timer = window.setTimeout(() => end(false), cap);
    signal?.addEventListener("abort", () => window.clearTimeout(timer), { once: true });
    onProgress?.(0, total);
    if (!total) return end(true);
    for (const t of tasks) {
      Promise.resolve(t)
        .catch(() => undefined)
        .then(() => {
          if (over || signal?.aborted) return;
          done += 1;
          onProgress?.(done, total);
          if (done === total) end(true);
        });
    }
  });
}

export function markReady() {
  if (document.documentElement.classList.contains("is-ready")) return;
  document.documentElement.classList.add("is-ready");
  window.dispatchEvent(new Event("app:ready"));
}

export function whenReady() {
  return document.documentElement.classList.contains("is-ready")
    ? Promise.resolve()
    : new Promise<void>((r) => window.addEventListener("app:ready", () => r(), { once: true }));
}

export function hasSeen(key?: string) {
  if (!key) return false;
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function markSeen(key?: string) {
  if (!key) return;
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode: show it again next time, never break */
  }
}

/** Locks page scroll while the loader covers it (html.is-loading + overflow hidden). */
let prevOverflow: string | null = null;
export function lockPage(on: boolean) {
  const html = document.documentElement;
  if (on && prevOverflow === null) {
    prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
  } else if (!on && prevOverflow !== null) {
    html.style.overflow = prevOverflow;
    prevOverflow = null;
  }
  html.classList.toggle("is-loading", on);
}
