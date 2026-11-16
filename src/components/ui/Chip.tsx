import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/** Outlined meta tag (lessons, duration, level). */
export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex rounded-lg border border-line px-3.5 py-1.5 text-body whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}
