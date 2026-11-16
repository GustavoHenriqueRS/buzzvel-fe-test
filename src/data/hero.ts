export type Learner = {
  name: string;
  src: string;
};

/** Faces shown in the hero's "Trusted by" social proof row. */
export const heroLearners: Learner[] = [
  { name: "Ana", src: "/images/hero/avatar-1.jpg" },
  { name: "Marco", src: "/images/hero/avatar-2.jpg" },
  { name: "Kenji", src: "/images/hero/avatar-3.jpg" },
];

export const heroStats = {
  courses: "120+",
  coursesLabel: "expert-led courses",
  rating: 4.9,
  ratingLabel: "avg rating",
  learners: "24,000+",
};
