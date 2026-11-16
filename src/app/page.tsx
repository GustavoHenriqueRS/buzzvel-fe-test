import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonial } from "@/components/sections/Testimonial";
import { People } from "@/components/sections/People";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import CounterLoader from "@/components/motion/loader/CounterLoader";
import { MotionRuntime } from "@/components/motion/MotionRuntime";

export default function Home() {
  return (
    <>
      <CounterLoader oncePerSession="luma-loader" />
      <MotionRuntime />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink focus:shadow-card"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <People />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
