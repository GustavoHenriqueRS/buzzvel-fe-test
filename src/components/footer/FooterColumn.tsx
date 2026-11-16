import Link from "next/link";
import type { FooterColumn as FooterColumnData } from "@/data/navigation";

type FooterColumnProps = FooterColumnData;

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-overline text-on-dark-soft">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-body text-on-dark-muted transition-colors hover:text-white focus-visible:outline-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
