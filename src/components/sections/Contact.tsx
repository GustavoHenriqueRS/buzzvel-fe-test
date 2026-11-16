import { ContactForm } from "@/components/contact/ContactForm";
import { InfoCard } from "@/components/contact/InfoCard";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contactContent, contactInfo } from "@/data/contact";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-[70px] bg-white py-15 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div data-settle="cascata" className="flex flex-col gap-8 lg:w-[480px] lg:shrink-0 lg:gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>{contactContent.eyebrow}</Eyebrow>
            <h2 id="contact-title" className="text-h3 text-ink">
              {contactContent.title}
            </h2>
            <p className="text-body text-ink-soft lg:text-subtitle-1">{contactContent.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {contactInfo.map((item) => (
              <InfoCard key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div data-settle="bloco" className="flex w-full flex-col gap-6 rounded-2xl border border-line bg-white px-5 py-6 drop-shadow-[0_12px_16px_rgba(23,27,44,0.04)] md:p-8 lg:w-[540px] lg:shrink-0 lg:p-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-h5 text-ink">{contactContent.formTitle}</h3>
            <p className="text-body text-ink-soft">{contactContent.formDescription}</p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
