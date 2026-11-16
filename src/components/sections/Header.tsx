"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu with Escape and whenever the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 lg:h-[70px] lg:px-20">
        <Link href="#top" aria-label="Luma home" className="shrink-0">
          <Image src="/images/logo-luma.svg" alt="" width={54} height={17} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-body text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="#contact"
            className="px-4 py-2.5 text-body text-ink-soft transition-colors hover:text-ink"
          >
            Log in
          </Link>
          <Button href="#courses" size="md">
            Start learning
          </Button>
        </div>

        <button
          type="button"
          className="-mr-1.5 rounded-md p-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#171B2C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <Image src="/images/icon-menu.svg" alt="" width={24} height={24} />
          )}
        </button>
      </div>

      {/* Mobile menu: not drawn in the Figma file, so it reuses the desktop links and CTA. */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-cream px-5 pb-6 pt-2 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {mainNav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-subtitle-1 text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex flex-col gap-3">
          <Button href="#contact" variant="secondary" onClick={() => setOpen(false)}>
            Log in
          </Button>
          <Button href="#courses" onClick={() => setOpen(false)}>
            Start learning
          </Button>
        </div>
      </div>
    </header>
  );
}
