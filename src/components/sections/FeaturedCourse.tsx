import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { featuredCourse as course } from "@/data/featured-course";

export function FeaturedCourse() {
  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="scroll-mt-[70px] bg-blue py-[60px] lg:py-[100px]"
    >
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[60px]">
        <div data-settle="bloco" className="relative min-w-0 lg:flex-1">
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-blue-soft sm:h-[360px] lg:h-[408px]">
            <Image
              src={course.image.src}
              alt={course.image.alt}
              fill
              sizes="(min-width: 80rem) 530px, (min-width: 64rem) calc(50vw - 110px), calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <p className="absolute -top-3 -left-3 rounded-md bg-yellow px-3 py-1.5 text-overline text-ink">
            Featured course
          </p>
        </div>

        <div data-settle="cascata" className="min-w-0 lg:flex-1">
          <Eyebrow tone="white">{course.eyebrow}</Eyebrow>
          <h2 id="featured-title" className="mt-4 text-h3 text-white">
            {course.title}
          </h2>
          <p className="mt-5 text-subtitle-2 text-white">{course.description}</p>
          <p className="mt-6 text-subtitle-2 text-white">
            with {course.instructor.name} · {course.instructor.role}
          </p>

          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Course details">
            {course.meta.map((item) => (
              <li key={item}>
                <Chip className="text-on-dark-soft lg:text-white">{item}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={course.courseHref} variant="accent" className="w-full sm:w-auto">
              View course
            </Button>
            <Link
              href={course.browseHref}
              className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm leading-6 font-bold text-on-dark-soft transition-colors duration-200 hover:text-white focus-visible:outline-white"
            >
              Browse all courses
              <ArrowIcon tone="light" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
