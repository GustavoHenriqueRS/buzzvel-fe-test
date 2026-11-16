"use client";

// Counter loader: a big 00 -> 100 counter and a hairline bar that fill with the
// REAL load, two columns of copy rising from masks, then the whole panel
// collapses to the top. The number only moves when a real task settles
// (fonts, window load, [data-critical] media), with a cap.
//
// Score (motion allowed):
//   +0.3s   copy lines yPercent 100 -> 0, 0.9s power3.out, stagger 0.08;
//           counter yPercent 100 -> 0 with them
//   load    shown value chases settled / total (`chase`, 0.5s power2.out);
//           counter text and bar scaleX read the same value: one motion
//   exit    after intro AND ready AND the display reached 100:
//           counter + bar opacity 0, 0.5s power2.in;
//           panel clip-path polygon(full) -> polygon(collapsed to the top),
//           `exitDuration` (1.05s) power4.inOut, overlapping 0.25s
//   handoff markReady() (html.is-ready + app:ready) halfway through the wipe
//   end     unmounts, onReady()
// Reduced motion: no masks, no wipe; the number updates in place and the panel
// fades 0.35s when ready. Repeat visit: 0.35s fade. Cap 8s. No JS: CSS failsafe.
// transform / opacity / clip-path only; the counter has a fixed width (no CLS).

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { hasSeen, lockPage, markReady, markSeen, resolveTasks, trackReadiness, type ReadyTasks } from "./readiness";
import styles from "./CounterLoader.module.css";

gsap.registerPlugin(useGSAP);

const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const GONE = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

export type CounterLoaderProps = {
  tasks?: ReadyTasks;
  cap?: number;
  onReady?: () => void;
  onProgress?: (done: number, total: number) => void;
  oncePerSession?: string;
  lockScroll?: boolean;
  signal?: boolean;
  position?: "fixed" | "absolute";
  /** Two columns of short copy lines. */
  columns?: [string[], string[]];
  /** Seconds the displayed number takes to catch the real value. Default 0.5. */
  chase?: number;
  /** Wipe duration in seconds. Default 1.05. */
  exitDuration?: number;
  reducedMotion?: boolean;
  className?: string;
};

const COLUMNS: [string[], string[]] = [
  ["Practical courses", "for curious people"],
  ["Learn by doing,", "one lesson at a time"],
];

export default function CounterLoader({
  tasks,
  cap = 8000,
  onReady,
  onProgress,
  oncePerSession,
  lockScroll = true,
  signal = true,
  position = "fixed",
  columns = COLUMNS,
  chase = 0.5,
  exitDuration = 1.05,
  reducedMotion,
  className = "",
}: CounterLoaderProps) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const cb = useRef({ onReady, onProgress });
  cb.current = { onReady, onProgress };

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      const counter = counterRef.current;
      const bar = barRef.current;
      const meter = meterRef.current;
      if (!root || !counter || !bar || !meter || !contextSafe) return;
      root.setAttribute("data-js", "");

      const reduced = reducedMotion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ac = new AbortController();
      let alive = true;
      const finish = () => {
        if (!alive) return;
        alive = false;
        markSeen(oncePerSession);
        if (lockScroll) lockPage(false);
        if (signal) markReady();
        setDone(true);
        cb.current.onReady?.();
      };
      const fadeOut = contextSafe(() => {
        gsap.to(root, { autoAlpha: 0, duration: 0.35, ease: "power2.out", onComplete: finish });
      });
      const cleanup = () => {
        ac.abort();
        if (alive && lockScroll) lockPage(false);
        alive = false;
      };

      if (hasSeen(oncePerSession)) {
        fadeOut();
        return cleanup;
      }

      const shown = { v: 0 };
      const apply = () => {
        counter.textContent = String(Math.round(shown.v * 100)).padStart(2, "0");
        bar.style.transform = `scaleX(${shown.v.toFixed(4)})`;
      };
      const chaseTo = contextSafe((to: number, onComplete?: () => void) => {
        if (reduced) {
          shown.v = to;
          apply();
          onComplete?.();
          return;
        }
        gsap.to(shown, { v: to, duration: chase, ease: "power2.out", overwrite: true, onUpdate: apply, onComplete });
      });

      if (lockScroll) lockPage(true);
      const ready = trackReadiness(resolveTasks(tasks, ac.signal), {
        cap,
        signal: ac.signal,
        onProgress: (d, t) => {
          cb.current.onProgress?.(d, t);
          chaseTo(t ? d / t : 1);
        },
      });
      // Wait for the display to reach the real 100 (on a cap timeout it stays put).
      const full = ready.then((all) => new Promise<void>((r) => (all ? chaseTo(1, r) : r())));

      if (reduced) {
        full.then(() => alive && fadeOut());
        return cleanup;
      }

      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.line}`, root);
      const intro = gsap.timeline({ delay: 0.3 });
      intro
        // y: 0 drops the CSS first-paint offset so only yPercent moves.
        .fromTo(lines, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" })
        .fromTo(counter, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power3.out" }, "<");
      const introDone = new Promise<void>((r) => intro.eventCallback("onComplete", () => r()));

      const exit = contextSafe(() => {
        gsap
          .timeline({ onComplete: finish })
          .to([counter, meter], { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2")
          .fromTo(root, { clipPath: FULL }, { clipPath: GONE, duration: exitDuration, ease: "power4.inOut" }, "-=0.25")
          // Hand over mid-wipe so the hero is already rising as the panel clears.
          .call(() => signal && markReady(), [], `-=${exitDuration * 0.5}`);
      });
      Promise.all([introDone, full]).then(() => alive && exit());

      return cleanup;
    },
    { scope: rootRef, dependencies: [], revertOnUpdate: true },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-position={position}
      className={`${styles.root} ${className}`}
    >
      <div className={styles.cols}>
        {columns.map((col, c) => (
          <p key={c} className={styles.col}>
            {col.map((text) => (
              <span key={text} className={styles.mask}>
                <span className={styles.line}>{text}</span>
              </span>
            ))}
          </p>
        ))}
      </div>
      <div className={styles.foot}>
        <span className={styles.mask}>
          <span ref={counterRef} className={styles.counter}>
            00
          </span>
        </span>
        <div ref={meterRef} className={styles.track}>
          <div ref={barRef} className={styles.bar} style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
