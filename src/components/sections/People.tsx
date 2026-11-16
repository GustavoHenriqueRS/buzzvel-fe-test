import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoMosaic } from "@/components/people/PhotoMosaic";
import { peopleIntro, peopleMosaic } from "@/data/people";

export function People() {
  const { eyebrow, title, description, cta } = peopleIntro;

  return (
    <section id="people" aria-labelledby="people-title" className="scroll-mt-17 bg-cream py-15 lg:py-25">
      <Container className="flex flex-col items-start gap-8 md:items-center lg:flex-row lg:justify-between lg:gap-12">
        <div data-settle="cascata" className="max-w-[600px] lg:max-w-[528px] lg:flex-1">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="people-title" className="mt-4 text-h3 text-ink">
            {title}
          </h2>
          <p className="mt-6 text-subtitle-1 text-ink-soft lg:mt-8">{description}</p>
          <Button href={cta.href} variant="secondary" className="mt-6 lg:mt-8">
            {cta.label}
          </Button>
        </div>

        <PhotoMosaic data-settle="bloco" columns={peopleMosaic} className="lg:mr-2.5 lg:w-[520px] lg:shrink-0" />
      </Container>
    </section>
  );
}
