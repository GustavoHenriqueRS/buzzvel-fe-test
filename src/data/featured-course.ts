export type FeaturedCourseData = {
  eyebrow: string;
  title: string;
  description: string;
  instructor: { name: string; role: string };
  meta: string[];
  image: { src: string; alt: string; width: number; height: number };
  courseHref: string;
  browseHref: string;
};

export const featuredCourse: FeaturedCourseData = {
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: { name: "Maya Chen", role: "Senior Product Designer" },
  meta: ["8 lessons", "2h 40min", "Intermediate"],
  image: {
    src: "/images/featured/featured-course.jpg",
    alt: "Student working on interface designs at a desk covered in sketches and material samples",
    width: 538,
    height: 408,
  },
  courseHref: "#featured",
  browseHref: "#courses",
};
