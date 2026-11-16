import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FloatingBadge } from "@/components/ui/FloatingBadge";
import { StarRating } from "@/components/ui/StarRating";
import { heroLearners, heroStats } from "@/data/hero";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-cream py-[60px] lg:py-[100px]">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[60px]">
        <div className="min-w-0 flex-1">
          <div data-hero="kicker">
            <Eyebrow>Learn at your own pace</Eyebrow>
          </div>
          <h1 id="hero-title" data-hero="title" className="mt-4 max-w-[560px] text-h1 text-ink">
            Build skills that actually move you forward.
          </h1>
          <p data-hero="item" className="mt-6 max-w-[480px] text-subtitle-1 text-ink-soft">
            Practical courses taught by people who do the work every day. Learn design,
            technology, business and more — one focused lesson at a time.
          </p>

          <div data-hero="item" className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#courses" className="w-full sm:w-auto">
              Explore courses
            </Button>
            <Button href="#how-it-works" variant="secondary" className="w-full sm:w-auto">
              See how it works
            </Button>
          </div>

          <div data-hero="item" className="mt-8 flex items-center justify-center gap-3 sm:justify-start">
            <AvatarStack people={heroLearners} />
            <p className="text-body text-ink-soft">
              <strong className="font-bold text-ink">Trusted by {heroStats.learners}</strong>{" "}
              learners
            </p>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/** Photo with decorative shapes and floating stat badges; rendered above the copy on mobile. */
function HeroVisual() {
  return (
    <div className="relative order-first mx-auto h-[380px] w-full max-w-[500px] lg:order-none lg:mx-0 lg:h-[520px] lg:w-[500px] lg:shrink-0">
      <div
        aria-hidden="true"
        data-hero="shape"
        className="absolute top-6 right-[-10px] h-[342px] w-3/4 rounded-2xl bg-orange-soft lg:right-[-39px] lg:h-[468px] lg:w-[89px]"
      />
      <div
        aria-hidden="true"
        data-hero="shape"
        className="absolute top-[304px] left-[-10px] size-16 rounded-full bg-blue-soft lg:top-[403px] lg:left-[-44.8px] lg:size-[106px]"
      />

      <div data-hero="media" className="relative mx-2 h-full overflow-hidden rounded-2xl bg-blue-soft lg:mx-0 lg:rounded-3xl">
        <Image
          src="/images/hero/hero-learner.jpg"
          alt="Smiling learner with glasses working on a laptop"
          fill
          priority
          data-critical
          sizes="(min-width: 64rem) 500px, (min-width: 540px) 484px, calc(100vw - 56px)"
          className="object-cover"
        />
      </div>

      <FloatingBadge data-hero="badge" className="top-1.5 left-0 gap-3 lg:top-4 lg:left-[-22px]">
        <span className="flex h-8 items-center rounded-lg bg-blue-soft px-1 font-bold text-blue">
          {heroStats.courses}
        </span>
        {heroStats.coursesLabel}
      </FloatingBadge>

      <FloatingBadge data-hero="badge" className="top-[296.5px] right-[-11px] gap-2 lg:top-[436.5px] lg:right-[-57px]">
        <StarRating />
        <span>
          {heroStats.rating} {heroStats.ratingLabel}
        </span>
      </FloatingBadge>
    </div>
  );
}
