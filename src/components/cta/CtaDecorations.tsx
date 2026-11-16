import Image from "next/image";
import type { CSSProperties } from "react";
import type { Decoration } from "@/data/cta";

type CtaDecorationsProps = {
  items: Decoration[];
};

function positionStyle({ size, top, x, rotate }: Decoration): CSSProperties {
  const horizontal =
    x.from === "left"
      ? { left: x.px }
      : x.from === "right"
        ? { right: x.px }
        : { left: `calc(50% + ${x.px}px)` };
  return {
    width: size,
    height: size,
    top,
    ...horizontal,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    transformOrigin: rotate ? "top left" : undefined,
  };
}

/** Purely decorative shapes and outline icons behind the CTA, desktop only (the mobile frame has none). */
export function CtaDecorations({ items }: CtaDecorationsProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {items.map((item, index) => {
        if (item.shape === "icon" && item.src) {
          return (
            <Image
              key={index}
              src={item.src}
              alt=""
              width={item.size}
              height={item.size}
              className="absolute"
              style={positionStyle(item)}
            />
          );
        }
        const radius = item.shape === "circle" ? "rounded-full" : item.size > 80 ? "rounded-[10px]" : "rounded-lg";
        const fill = item.variant === "filled" ? "bg-orange-soft" : "border-2 border-orange-soft";
        return <span key={index} className={`absolute ${radius} ${fill}`} style={positionStyle(item)} />;
      })}
    </div>
  );
}
