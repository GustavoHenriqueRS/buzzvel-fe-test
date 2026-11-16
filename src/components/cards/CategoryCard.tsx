import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { Category } from "@/data/categories";

/** Whole-card link for a course category. */
export function CategoryCard({ number, title, description, href }: Category) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-200 hover:border-blue/40 hover:shadow-card focus-visible:border-blue/40 focus-visible:shadow-card motion-safe:hover:-translate-y-1 lg:min-h-[260px] lg:p-7"
    >
      <div>
        <div className="h-[46.5px]">
          <span className="mt-0.5 inline-flex rounded-md bg-blue-soft px-2 py-1 text-overline text-blue">
            {number}
          </span>
        </div>
        <h3 className="text-h5 text-ink">{title}</h3>
        <p className="mt-3 text-body text-ink-muted">{description}</p>
      </div>
      <span className="flex h-11 items-center gap-2 pt-6 text-body font-bold text-ink">
        Explore
        <span className="sr-only"> {title} courses</span>
        <ArrowIcon />
      </span>
    </Link>
  );
}
