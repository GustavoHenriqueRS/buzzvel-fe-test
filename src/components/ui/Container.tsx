import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Centered content column: 1120px max on desktop (80px side gutter), 20px gutter on mobile. */
export function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={`mx-auto w-full max-w-[1280px] px-5 lg:px-20 ${className}`}
      {...props}
    />
  );
}
