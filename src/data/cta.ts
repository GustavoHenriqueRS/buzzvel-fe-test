export type Avatar = { src: string; alt: string };

export const ctaContent = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  primary: { label: "Explore all courses", href: "#courses" },
  secondary: { label: "Join Luma", href: "#contact" },
};

export const ctaAvatars: Avatar[] = [
  { src: "/images/cta/avatar-1.jpg", alt: "" },
  { src: "/images/cta/avatar-2.jpg", alt: "" },
  { src: "/images/cta/avatar-3.jpg", alt: "" },
  { src: "/images/cta/avatar-4.jpg", alt: "" },
];

/** Horizontal anchor: distance from the left/right edge, or offset from the section's center line. */
export type DecorationAnchor =
  | { from: "left"; px: number }
  | { from: "right"; px: number }
  | { from: "center"; px: number };

export type Decoration = {
  shape: "circle" | "square" | "icon";
  variant: "outline" | "filled";
  /** Only for `shape: "icon"`: SVG exported from the Figma file. */
  src?: string;
  size: number;
  top: number;
  x: DecorationAnchor;
  /** Degrees, applied around the top-left corner like Figma does. */
  rotate?: number;
};

/** Background shapes measured on the 1280px desktop frame (the mobile frame has none). */
export const ctaDecorations: Decoration[] = [
  { shape: "circle", variant: "outline", size: 108, top: 16, x: { from: "left", px: 22 } },
  { shape: "circle", variant: "filled", size: 120, top: 373, x: { from: "left", px: 56 } },
  { shape: "square", variant: "filled", size: 56, top: 230, x: { from: "left", px: -21 }, rotate: 12 },
  { shape: "square", variant: "outline", size: 56, top: 42, x: { from: "center", px: -311 }, rotate: 12 },
  { shape: "circle", variant: "outline", size: 32, top: 43, x: { from: "center", px: 237 } },
  { shape: "square", variant: "filled", size: 115, top: -24, x: { from: "right", px: -3 }, rotate: 12 },
  { shape: "circle", variant: "outline", size: 40, top: 468, x: { from: "right", px: 176 } },
  { shape: "circle", variant: "outline", size: 32, top: 429, x: { from: "right", px: 40 } },
  // Outline icons (already rotated in the exported SVG where Figma rotates them).
  { shape: "icon", variant: "outline", src: "/images/cta/icon-b-shape.svg", size: 102, top: 360, x: { from: "left", px: 272 } },
  { shape: "icon", variant: "outline", src: "/images/cta/icon-message.svg", size: 32, top: 214, x: { from: "left", px: 141 } },
  { shape: "icon", variant: "outline", src: "/images/cta/icon-drop.svg", size: 62, top: 82, x: { from: "right", px: 202 } },
  { shape: "icon", variant: "outline", src: "/images/cta/icon-book.svg", size: 48, top: 381, x: { from: "right", px: 269 } },
  { shape: "icon", variant: "outline", src: "/images/cta/icon-cube.svg", size: 80, top: 220, x: { from: "right", px: 80 } },
];
