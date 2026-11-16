import type { Step } from "@/data/steps";
import { StepIcon } from "./StepIcon";

type StepItemProps = Step & {
  index: number;
  isLast: boolean;
};

export function StepItem({ title, description, icon, index, isLast }: StepItemProps) {
  const label = `Step ${String(index + 1).padStart(2, "0")}`;

  return (
    <li className="relative flex flex-col items-start">
      <span className="relative z-10">
        <StepIcon variant={icon} />
      </span>
      <p className="pt-6 text-overline text-ink-muted">{label}</p>
      <h3 className="pt-2 text-h5 text-ink">{title}</h3>
      <p className="pt-3 text-subtitle-2 text-ink-soft">{description}</p>

      {/* Mobile: short vertical connector leading into the next step's icon. */}
      {!isLast && (
        <span aria-hidden="true" className="ml-7 mt-6.5 block h-12.5 w-px bg-line md:hidden" />
      )}
    </li>
  );
}
