import Image from "next/image";

type StarRatingProps = {
  count?: number;
};

/** Row of decorative stars; the numeric rating is always rendered as text next to it. */
export function StarRating({ count = 5 }: StarRatingProps) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Image key={index} src="/images/hero/star.svg" alt="" width={14} height={14} />
      ))}
    </span>
  );
}
