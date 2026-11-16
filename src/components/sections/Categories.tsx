import { CategoryCard } from "@/components/cards/CategoryCard";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { categories } from "@/data/categories";

export function Categories() {
  return (
    <section
      id="courses"
      aria-labelledby="categories-title"
      className="scroll-mt-[70px] bg-white py-[60px] lg:py-[100px]"
    >
      <Container>
        <div data-settle="bloco" className="max-w-[560px]">
          <Eyebrow>Find your next skill</Eyebrow>
          <h2 id="categories-title" className="mt-4 text-h3 text-ink">
            Learn something worth knowing.
          </h2>
          <p className="mt-4 text-subtitle-1 text-ink-soft">
            Short, practical courses designed around skills you can put to work immediately.
          </p>
        </div>

        <ul data-settle="cascata" data-settle-grid className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <li key={category.number}>
              <CategoryCard {...category} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
