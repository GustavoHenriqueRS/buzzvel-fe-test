export type NavLink = {
  label: string;
  href: string;
};

/** Section anchors used by the header navigation and the footer. */
export const mainNav: NavLink[] = [
  { label: "Courses", href: "#courses" },
  { label: "For Teams", href: "#featured" },
  { label: "Community", href: "#people" },
  { label: "About", href: "#how-it-works" },
];

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: "#courses" },
      { label: "Categories", href: "#courses" },
      { label: "Instructors", href: "#people" },
      { label: "For Teams", href: "#featured" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#how-it-works" },
      { label: "Careers", href: "#contact" },
      { label: "Journal", href: "#testimonial" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#contact" },
      { label: "Contact", href: "#contact" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];
