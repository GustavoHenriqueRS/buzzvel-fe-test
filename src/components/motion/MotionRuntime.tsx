"use client";

// Motion runtime: page entrances driven by data attributes, so sections stay
// server components. Ported from the house motion kit (hero-entrada-orquestrada
// score adapted to a two-column hero, and scroll-entrada-assenta M2/M6).
//
// Guards, in order:
//   1. prefers-reduced-motion: nothing is hidden (the inline head script never
//      arms the page) and this runtime does nothing -> content in final state.
//   2. Everything waits for the loader's "ready" signal (html.is-ready /
//      app:ready), with a 10s safety net, so nothing plays under the loader.
//   3. Fonts ready before splitting the hero title into lines (no reflow).
//
// Hero score (t = 0 on ready):
//   0.00 media    opacity 0 -> 1 and the photo settles scale 1.06 -> 1
//                 (the single allowed settle), 1.6s expo.out
//   0.10 shapes   opacity 0 -> 1, 1.2s power2.out
//   0.15 kicker   y 14px -> 0 + opacity, 0.8s power2.out
//   0.25 title    lines yPercent 115 -> 0 out of masks, 1.2s expo.out, stagger .12
//   0.75 items    y 14px -> 0 + opacity, 1.1s power2.out, stagger .1
//   1.10 badges   y 12px -> 0 + opacity, 0.9s expo.out, stagger .15
// Settle (ScrollTrigger once, start "top 90%"):
//   data-settle="bloco"    the element: y 20% of its height (max 80px) -> 0
//                          + opacity, 1.6s expo.out
//   data-settle="cascata"  direct children: same travel + opacity,
//                          1.0s power1.inOut, stagger .15 (.08 below 768px);
//                          with data-settle-grid the stagger saturates at the
//                          last column and travel is 20px.
// transform / opacity only; transforms are cleared when each tween ends.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Longer than the loader cap (8s) plus its exit, so the hero never plays under it.
const READY_TIMEOUT = 10000;

function whenReady(): Promise<void> {
  const html = document.documentElement;
  if (html.classList.contains("is-ready")) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, READY_TIMEOUT);
    window.addEventListener(
      "app:ready",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

function playHero(root: ParentNode) {
  const q = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const media = q<HTMLElement>('[data-hero="media"]');
  const photo = q<HTMLElement>('[data-hero="media"] img');
  const shapes = q<HTMLElement>('[data-hero="shape"]');
  const kicker = q<HTMLElement>('[data-hero="kicker"]');
  const title = root.querySelector<HTMLElement>('[data-hero="title"]');
  const items = q<HTMLElement>('[data-hero="item"]');
  const badges = q<HTMLElement>('[data-hero="badge"]');

  const tl = gsap.timeline({ defaults: { clearProps: "transform" } });
  tl.fromTo(media, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "expo.out" }, 0)
    .fromTo(photo, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0)
    .fromTo(shapes, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.1)
    .fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.15);

  if (title) {
    const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "hero-line" });
    tl.set(title, { opacity: 1 }, 0.25).fromTo(
      split.lines,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        // Restore the original markup so the heading reflows naturally on resize.
        onComplete: () => split.revert(),
      },
      0.25,
    );
  }

  tl.fromTo(
    items,
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", stagger: 0.1 },
    0.75,
  ).fromTo(
    badges,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.15 },
    1.1,
  );
  return tl;
}

function armSettle(root: HTMLElement) {
  const mode = root.dataset.settle === "cascata" ? "cascata" : "bloco";
  const targets = mode === "bloco" ? [root] : (Array.from(root.children) as HTMLElement[]);
  if (!targets.length) return;
  const step = window.matchMedia("(max-width: 767px)").matches ? 0.08 : 0.15;
  const grid = mode === "cascata" && root.hasAttribute("data-settle-grid");
  // Grids stagger within a row only (cap at the last column); stacked lists cascade.
  const columns = () => {
    const template = getComputedStyle(root).gridTemplateColumns;
    return template && template !== "none" ? template.split(" ").filter(Boolean).length : 1;
  };
  const stagger = grid
    ? (i: number) => {
        const cols = columns();
        return step * (cols > 1 ? Math.min(i, cols - 1) : i);
      }
    : step;
  // 20% of the element's height, capped so tall blocks (form, mosaic) travel 80px at most.
  const travel = (_: number, el: HTMLElement) => Math.min(el.offsetHeight * 0.2, 80);

  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y: grid ? 20 : travel },
    {
      opacity: 1,
      y: 0,
      duration: mode === "bloco" ? 1.6 : 1.0,
      ease: mode === "bloco" ? "expo.out" : "power1.inOut",
      stagger: mode === "bloco" ? 0 : stagger,
      clearProps: "transform",
      paused: true,
    },
  );

  ScrollTrigger.create({ trigger: root, start: "top 90%", once: true, onEnter: () => tween.play() });
}

export function MotionRuntime() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    html.classList.add("motion-live");
    if (!html.classList.contains("motion-armed")) return; // reduced motion or no inline script

    let cancelled = false;
    Promise.all([whenReady(), document.fonts?.ready ?? Promise.resolve()]).then(() => {
      if (cancelled) return;
      const page = document.body;
      playHero(page);
      page.querySelectorAll<HTMLElement>("[data-settle]").forEach(armSettle);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
  });

  return <div ref={scope} hidden />;
}
