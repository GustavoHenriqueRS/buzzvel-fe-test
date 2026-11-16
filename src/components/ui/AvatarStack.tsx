import Image from "next/image";

type AvatarStackProps = {
  people: { name: string; src: string }[];
  /** Ring colour matching the surface behind the stack. */
  ringClassName?: string;
};

/** Overlapping circular avatars (32px, 8px overlap) used for social proof. */
export function AvatarStack({ people, ringClassName = "border-cream" }: AvatarStackProps) {
  return (
    <ul className="flex" aria-hidden="true">
      {people.map((person, index) => (
        <li
          key={person.name}
          className={`relative size-8 overflow-hidden rounded-full border-2 bg-blue-soft ${ringClassName} ${index > 0 ? "-ml-2" : ""}`}
        >
          <Image src={person.src} alt="" fill sizes="32px" className="object-cover" />
        </li>
      ))}
    </ul>
  );
}
