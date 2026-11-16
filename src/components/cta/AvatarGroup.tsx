import Image from "next/image";
import type { Avatar } from "@/data/cta";

type AvatarGroupProps = {
  avatars: Avatar[];
  size?: number;
  className?: string;
};

/** Overlapping row of round avatars with a yellow ring (Final CTA). */
export function AvatarGroup({ avatars, size = 40, className = "" }: AvatarGroupProps) {
  return (
    <ul className={`flex justify-center ${className}`}>
      {avatars.map((avatar, index) => (
        <li key={avatar.src} className={index > 0 ? "-ml-2" : undefined}>
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={size}
            height={size}
            sizes={`${size}px`}
            className="block rounded-full border-2 border-yellow bg-blue-soft object-cover"
            style={{ width: size, height: size }}
          />
        </li>
      ))}
    </ul>
  );
}
