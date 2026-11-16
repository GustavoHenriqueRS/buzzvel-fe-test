import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StatItem } from "@/components/testimonial/StatItem";
import { stats, testimonial } from "@/data/testimonial";

export function Testimonial() {
  const { quote, author } = testimonial;

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-title"
      className="scroll-mt-17 bg-white py-15 lg:py-25"
    >
      <h2 id="testimonial-title" className="sr-only">
        What our learners say
      </h2>
      <Container className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between">
        <figure data-settle="bloco" className="max-w-[600px] lg:flex-1">
          <Image
            src="/images/testimonial/quote-mark.svg"
            alt=""
            width={23.7109}
            height={21.9531}
          />
          <blockquote className="pt-4">
            <p className="text-quote text-ink">{quote}</p>
          </blockquote>
          <figcaption className="flex items-center gap-4 pt-8">
            <Image
              src={author.avatar}
              alt=""
              width={48}
              height={48}
              sizes="48px"
              className="size-12 shrink-0 rounded-full bg-blue-soft object-cover"
            />
            <span className="flex flex-col">
              <span className="text-base font-bold leading-[1.625rem] text-ink lg:leading-7">
                {author.name}
              </span>
              <span className="text-body text-ink-soft">{author.role}</span>
            </span>
          </figcaption>
        </figure>

        <dl data-settle="cascata" data-settle-grid className="flex gap-0 lg:w-[384px] lg:shrink-0 lg:flex-col lg:gap-5 lg:border-l lg:border-line lg:pl-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </dl>
      </Container>
    </section>
  );
}
