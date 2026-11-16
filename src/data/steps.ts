export type StepIconVariant = "circle" | "tilted" | "rounded";

export type Step = {
  title: string;
  description: string;
  icon: StepIconVariant;
};

/** "How Luma works" steps; the label (STEP 01, 02…) comes from the list position. */
export const steps: Step[] = [
  {
    title: "Choose your focus",
    description:
      "Find courses based on the skill you want to build, not endless content categories.",
    icon: "circle",
  },
  {
    title: "Learn from experience",
    description: "Follow concise lessons created by professionals who use these skills.",
    icon: "tilted",
  },
  {
    title: "Put it into practice",
    description:
      "Every course includes practical exercises designed to turn knowledge into action.",
    icon: "rounded",
  },
];
