import Image from "next/image";
import { MOSAIC_WIDTH, type MosaicColumn } from "@/data/people";

/** Converts Figma px on the 520px mosaic into container-width units, so the mosaic scales as one piece. */
const cq = (px: number) => `${(px / MOSAIC_WIDTH) * 100}cqw`;

const TILE_GAP = 12;
const CIRCLE = { left: 16, top: -14, size: 498 };

type PhotoMosaicProps = {
  columns: MosaicColumn[];
  className?: string;
  /** Hook for the scroll entrance runtime. */
  "data-settle"?: "bloco" | "cascata";
};

export function PhotoMosaic({ columns, className = "", "data-settle": settle }: PhotoMosaicProps) {
  return (
    <div data-settle={settle} className={`@container w-full max-w-[520px] ${className}`}>
      <div className="relative flex justify-between" style={{ paddingTop: cq(-CIRCLE.top) }}>
        <span
          aria-hidden="true"
          className="absolute rounded-full bg-blue-soft"
          style={{ left: cq(CIRCLE.left), top: 0, width: cq(CIRCLE.size), height: cq(CIRCLE.size) }}
        />
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className={`relative flex flex-col ${column.align === "end" ? "items-end" : "items-start"}`}
            style={{ width: cq(column.width), paddingTop: cq(column.offset), gap: cq(TILE_GAP) }}
          >
            {column.tiles.map((tile) => (
              <li
                key={tile.src}
                className="relative overflow-hidden rounded-[4px] bg-blue-soft shadow-card"
                style={{ width: cq(tile.width), aspectRatio: `${tile.width} / ${tile.height}` }}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 64rem) 140px, 28vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
