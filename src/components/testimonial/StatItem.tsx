import type { Stat } from "@/data/testimonial";
import { CountUp } from "./CountUp";

/** One term/value pair of the stats <dl>; the value is shown above its label. */
export function StatItem({ value, suffix, label }: Stat) {
  return (
    <div className="flex min-w-0 flex-1 flex-col-reverse justify-end lg:flex-none">
      <dt className="pt-1 text-body text-ink-muted lg:h-[25px]">{label}</dt>
      <dd className="whitespace-nowrap text-h1 text-blue">
        <CountUp value={value} suffix={suffix} />
      </dd>
    </div>
  );
}
