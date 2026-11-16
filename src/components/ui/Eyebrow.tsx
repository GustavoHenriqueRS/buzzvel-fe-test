import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "blue" | "white" | "ink";
  className?: string;
};

const tones = {
  blue: "text-blue",
  white: "text-white",
  ink: "text-ink-soft",
} as const;

/** Small uppercase label shown above section titles ("Desktop/Overline" text style). */
export function Eyebrow({ children, tone = "blue", className = "" }: EyebrowProps) {
  return <p className={`text-overline ${tones[tone]} ${className}`}>{children}</p>;
}
