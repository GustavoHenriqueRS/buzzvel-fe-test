import type { ComponentPropsWithoutRef } from "react";

type FloatingBadgeProps = ComponentPropsWithoutRef<"div">;

/** White pill card that floats over imagery (stats, ratings). Position it via className. */
export function FloatingBadge({ children, className = "", ...rest }: FloatingBadgeProps) {
  return (
    <div
      className={`absolute flex items-center rounded-xl bg-white px-4 py-3 text-body whitespace-nowrap text-ink drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
