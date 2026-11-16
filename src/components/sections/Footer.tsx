import Image from "next/image";
import Link from "next/link";
import { FooterColumn } from "@/components/footer/FooterColumn";
import { Container } from "@/components/ui/Container";
import { footerContent } from "@/data/footer";
import { footerColumns } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-navy pt-15 pb-5 lg:pt-20 lg:pb-10">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">
          <div className="lg:max-w-[240px]">
            <Link href="#top" aria-label="Luma home" className="inline-block focus-visible:outline-white">
              <Image src="/images/footer/logo-luma-white.svg" alt="" width={54} height={17} />
            </Link>
            <p className="mt-3 text-body text-on-dark-muted">{footerContent.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[repeat(3,192px)] lg:gap-x-12">
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center lg:mt-16 lg:text-left">
          <p className="text-sm leading-5 text-on-dark-soft">{footerContent.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
