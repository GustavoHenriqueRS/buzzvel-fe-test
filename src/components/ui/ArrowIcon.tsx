import Image from "next/image";

type ArrowIconProps = {
  tone?: "dark" | "light";
};

const sources = {
  dark: "/images/categories/arrow-right.svg",
  light: "/images/featured/arrow-right.svg",
} as const;

/** 20px "→" from the design; nudges right when an ancestor `.group` is hovered or focused. */
export function ArrowIcon({ tone = "dark" }: ArrowIconProps) {
  return (
    <Image
      src={sources[tone]}
      alt=""
      width={20}
      height={20}
      aria-hidden="true"
      className="shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
    />
  );
}
