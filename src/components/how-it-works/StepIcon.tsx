import type { StepIconVariant } from "@/data/steps";

/** Decorative two-shape badges drawn in the Figma file with plain fills (no exported asset). */
export function StepIcon({ variant }: { variant: StepIconVariant }) {
  if (variant === "circle") {
    return (
      <span aria-hidden="true" className="relative block size-14 rounded-full bg-blue-soft">
        <span className="absolute left-2 top-2 size-6 rounded-md bg-blue" />
      </span>
    );
  }

  if (variant === "tilted") {
    return (
      <span aria-hidden="true" className="relative block size-14">
        <span className="absolute inset-0 rotate-12 rounded-lg bg-orange-soft" />
        <span className="absolute left-6 top-6 size-7 rounded-full bg-orange" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative block size-14 rounded-xl bg-yellow-soft">
      <span className="absolute left-2 top-7 size-5 rounded-full bg-[#e9d659]" />
    </span>
  );
}
