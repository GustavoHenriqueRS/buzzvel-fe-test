/** Sizes are in Figma px, measured on the 520px-wide desktop mosaic. */
export type MosaicTile = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type MosaicColumn = {
  width: number;
  /** Distance from the top of the mosaic to the first tile. */
  offset: number;
  align: "start" | "end";
  tiles: MosaicTile[];
};

export const MOSAIC_WIDTH = 520;

export const peopleIntro = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  cta: { label: "Explore teachers and students", href: "#people" },
};

export const peopleMosaic: MosaicColumn[] = [
  {
    width: 138,
    offset: 80,
    align: "end",
    tiles: [
      { src: "/images/people/people-01.jpg", alt: "Young student raising her hand at her desk", width: 104, height: 154 },
      { src: "/images/people/people-02.jpg", alt: "Group of students studying together around a laptop", width: 138, height: 207 },
    ],
  },
  {
    width: 104,
    offset: 0,
    align: "start",
    tiles: [
      { src: "/images/people/people-03.jpg", alt: "Student in a blue hoodie reading a book", width: 104, height: 172 },
      { src: "/images/people/people-04.jpg", alt: "Two students practising music next to a window", width: 104, height: 172 },
      { src: "/images/people/people-05.jpg", alt: "Student taking notes from a book", width: 104, height: 129 },
    ],
  },
  {
    width: 104,
    offset: 8,
    align: "start",
    tiles: [
      { src: "/images/people/people-06.jpg", alt: "Graduate in cap and gown holding a diploma", width: 104, height: 138 },
      { src: "/images/people/people-07.jpg", alt: "Student working on a laptop at home", width: 104, height: 138 },
      { src: "/images/people/people-08.jpg", alt: "Teacher giving a lesson over a video call", width: 104, height: 155 },
    ],
  },
  {
    width: 130,
    offset: 60,
    align: "start",
    tiles: [
      { src: "/images/people/people-09.jpg", alt: "Smiling student holding her folders", width: 130, height: 205 },
      { src: "/images/people/people-10.jpg", alt: "Student in a hijab holding a coffee cup", width: 104, height: 134 },
    ],
  },
];
