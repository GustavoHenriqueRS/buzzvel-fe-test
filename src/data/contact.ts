export type ContactInfo = {
  label: string;
  value: string;
  icon: { src: string; width: number; height: number };
  /** Optional link target, e.g. a mailto: address. */
  href?: string;
  tone: "link" | "muted";
};

export const contactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  formTitle: "Contact us",
  formDescription: "Fill out the fields and we will get in touch.",
  submitLabel: "Send message",
  successMessage: "Thanks! Your message was sent. We’ll reply within 24 hours on business days.",
};

export const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    value: "contact@luma.com",
    href: "mailto:contact@luma.com",
    icon: { src: "/images/contact/icon-chat.svg", width: 24, height: 24 },
    tone: "link",
  },
  {
    label: "Response Time",
    value: "Up to 24 hours on business days",
    icon: { src: "/images/contact/icon-clock.svg", width: 20, height: 20 },
    tone: "muted",
  },
];

export type ContactFieldName = "name" | "email" | "question";

export type ContactField = {
  name: ContactFieldName;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
};

export const contactFields: ContactField[] = [
  { name: "name", label: "Full name", placeholder: "Your name", type: "text", autoComplete: "name" },
  {
    name: "email",
    label: "Email",
    placeholder: "youremail@example.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "question",
    label: "Your question",
    placeholder: "Tell us how we can help...",
    type: "textarea",
  },
];
