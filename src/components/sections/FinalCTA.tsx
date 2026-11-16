import { AvatarGroup } from "@/components/cta/AvatarGroup";
import { CtaDecorations } from "@/components/cta/CtaDecorations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaAvatars, ctaContent, ctaDecorations } from "@/data/cta";

export function FinalCTA() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-yellow-soft py-15 lg:py-25">
      <CtaDecorations items={ctaDecorations} />
      <Container className="relative flex flex-col items-center text-center">
        <div data-settle="cascata" className="flex w-full max-w-[656px] flex-col items-center">
          <AvatarGroup avatars={ctaAvatars} />
          <h2 id="cta-title" className="mt-8 text-h2 text-ink">
            {ctaContent.title}
          </h2>
          <p className="mt-4 text-subtitle-1 text-ink-soft">{ctaContent.description}</p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Button href={ctaContent.primary.href}>{ctaContent.primary.label}</Button>
            <Button href={ctaContent.secondary.href} variant="secondary">
              {ctaContent.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
