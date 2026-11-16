import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StepItem } from "@/components/how-it-works/StepItem";
import { steps } from "@/data/steps";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="scroll-mt-17 bg-cream py-15 lg:py-25"
    >
      <Container>
        <div data-settle="bloco" className="text-center">
          <Eyebrow>How Luma works</Eyebrow>
          <h2 id="how-it-works-title" className="mx-auto mt-4 max-w-[362px] text-h3 text-ink md:max-w-none">
            Less browsing. More learning.
          </h2>
        </div>

        {/* --gap drives both the grid gap and the length of the horizontal connector. */}
        <div className="relative mt-10 [--gap:1.5rem] md:mt-16 md:py-7 lg:mt-20 lg:[--gap:5rem]">
          <span
            aria-hidden="true"
            className="absolute left-7 right-[calc((100%-2*var(--gap))/3-1.75rem)] top-[3.5rem] hidden h-px bg-line md:block"
          />
          <ol data-settle="cascata" data-settle-grid className="flex flex-col md:grid md:grid-cols-3 md:gap-(--gap)">
            {steps.map((step, index) => (
              <StepItem
                key={step.title}
                {...step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
