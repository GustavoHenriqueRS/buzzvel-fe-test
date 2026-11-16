export type Testimonial = {
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
};

export type Stat = {
  /** Numeric part, animated by the count-up. */
  value: number;
  /** Text shown right after the number, e.g. "K+" or "%". */
  suffix: string;
  label: string;
};

export const testimonial: Testimonial = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: {
    name: "Alex Morgan",
    role: "Product Manager",
    avatar: "/images/testimonial/alex-morgan.jpg",
  },
};

export const stats: Stat[] = [
  { value: 24, suffix: "K+", label: "active learners" },
  { value: 120, suffix: "+", label: "expert-led courses" },
  { value: 92, suffix: "%", label: "complete their first course" },
];
