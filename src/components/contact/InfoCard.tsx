import Image from "next/image";
import type { ContactInfo } from "@/data/contact";

type InfoCardProps = ContactInfo;

export function InfoCard({ label, value, href, icon, tone }: InfoCardProps) {
  const valueClass = tone === "link" ? "text-blue" : "text-ink-muted";

  return (
    <div className="flex items-center gap-4 rounded-xl bg-cream p-4 lg:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-soft">
        <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
      </span>
      <dl className="flex min-w-0 flex-col gap-0.5 text-body lg:gap-1">
        <dt className="text-ink">{label}</dt>
        <dd className={`break-words ${valueClass}`}>
          {href ? (
            <a href={href} className="underline-offset-2 hover:underline">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </dl>
    </div>
  );
}
