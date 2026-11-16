import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold text-sm leading-6 whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-[#2446d6] focus-visible:outline-blue",
  secondary:
    "bg-white text-ink border border-line hover:border-ink/40 focus-visible:outline-blue",
  accent: "bg-yellow text-ink hover:bg-[#ffe54d] focus-visible:outline-white",
  "ghost-light": "text-white hover:text-yellow focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = StyleProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type NativeButtonProps = StyleProps & { href?: never } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

function isLink(props: ButtonProps): props is LinkButtonProps {
  return typeof props.href === "string";
}

/** Renders a Next.js Link when `href` is given, otherwise a native button. */
export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const props = rest as Omit<ButtonProps, keyof StyleProps>;

  if (isLink(props as ButtonProps)) {
    return (
      <Link className={classes} {...(props as Omit<LinkButtonProps, keyof StyleProps>)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as Omit<NativeButtonProps, keyof StyleProps>)}
    >
      {children}
    </button>
  );
}
