# Luma — Buzzvel Front-End Engineer Challenge (November 2026)

A responsive landing page for "Luma", built from the **Buzzvel FE Test 2026** Figma file with
**Next.js (App Router), TypeScript and Tailwind CSS**.

**Live:** https://buzzvel-fe-test-theta.vercel.app

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## What's inside

```
src/
  app/                 layout (fonts, metadata), page (section composition), globals.css (design tokens)
  components/
    sections/          one component per Figma section (Header, Hero, Categories, FeaturedCourse,
                       HowItWorks, Testimonial, People, Contact, FinalCTA, Footer)
    ui/                shared primitives (Button, Container, Eyebrow, Chip, AvatarStack, StarRating…)
    <feature>/         section-specific pieces (CategoryCard, StepItem, StatItem, ContactForm…)
  data/                typed mock content for every section
public/images/         assets exported from the Figma file
```

- **Design tokens**: colors and text styles come from the Figma variables (`text-primary`, `primary-blue`,
  `Desktop/H1`, `Mobile/H1`, …) and live in `globals.css` as a Tailwind v4 `@theme` plus small `@utility`
  classes (`text-h1`, `text-overline`, …). Mobile values are the default; desktop values apply from `lg` (1024px).
- **Content** is typed mock data in `src/data/*`, passed to components through typed props.
- **Interactions**
  - Sticky header with an accessible mobile menu (`aria-expanded`/`aria-controls`, closes on Escape and on resize).
  - Contact form with client-side validation (inline errors, `aria-invalid` + `aria-describedby`, focus on the
    first invalid field), loading state and a mocked submit that announces success with `role="status"`.
  - Hover/focus states on cards, buttons and arrow links; stats count up when scrolled into view.
- **Accessibility**: semantic landmarks and heading order (single `h1`), skip link, labelled sections, lists for
  repeated content, `figure`/`blockquote` for the testimonial, `dl` for stats, visible focus rings, descriptive
  `alt` text (decorative images use `alt=""`/`aria-hidden`).
- **Performance**: static page (prerendered), `next/image` for responsive raster images (only the hero image is
  `priority`), `next/font` for self-hosted fonts with `display: swap`, SVGs for icons.
- **Motion** (GSAP + ScrollTrigger + SplitText, `src/components/motion/`):
  - **Preloader** (`loader/CounterLoader`): a 00→100 counter and a hairline bar driven by *real* readiness
    (fonts, window `load`, the hero image marked `data-critical`), never a fake timer; capped at 8s, shown once
    per session, then the panel wipes up with `clip-path`. It hands over to the page halfway through the wipe.
  - **Hero entrance** (`MotionRuntime`): one orchestrated timeline after the loader — photo fades in and settles
    from 1.06 to 1, the headline rises line by line out of masks (SplitText, reverted afterwards so it reflows
    on resize), then copy, buttons and the floating badges follow.
  - **Scroll entrances**: sections opt in with `data-settle="bloco"` (block rises and fades) or
    `data-settle="cascata"` (children cascade; `data-settle-grid` staggers per row only). Sections stay server
    components — the runtime reads the attributes.
  - **Guards**: only `transform`, `opacity` and `clip-path` are animated. An inline head script arms the hidden
    states before first paint only when JS runs and the user has no reduced-motion preference; with reduced
    motion there is no loader and everything renders in its final state. If the runtime fails to start within
    6s the page disarms itself and shows normally; without JS nothing is ever hidden.
  - The stats count-up renders final values on the server and is skipped with reduced motion.

## Key decisions

- **Breakpoints**: the Figma file has a 1280px desktop frame and a 402px mobile frame. Tablet (≈640–1023px) was
  not designed, so sections use the stacked mobile layout with wider spacing, and grids go to 2 columns where
  it reads better (e.g. categories).
- **Mobile menu**: not drawn in Figma; it reuses the desktop links and CTAs in a panel under the header.
- **"STEP 01" ×3** in the desktop "How it works" section looks like a design typo (the mobile frame shows
  01/02/03), so the steps render as 01/02/03.
- **Language**: a few mobile labels in the contact form are in Portuguese in Figma; the desktop English copy is used
  everywhere for consistency.
- **Container width**: two Figma rows are 1136px wide while the rest of the page uses 1120px; 1120px was kept
  everywhere so columns align.
- **Navigation links** point to in-page anchors because there are no other pages; buttons/links without a real
  destination use sensible anchors (`#courses`, `#contact`).

## Known gaps

- The contact form has no backend (mocked submit, as allowed by the brief).
- The photo mosaic in "Meet international students & teachers" is recreated with flex columns and offsets
  measured from the design; on mobile the gaps are proportionally scaled, which can differ by a few pixels from
  the 402px frame.
- No automated tests were added (optional in the brief); the page was checked manually at 375/402, 768 and
  1280px and with keyboard navigation.

## AI tools

I used **Claude Code** as a pair programmer:

- reading the Figma file (design tokens, measurements, copy) through the Figma MCP integration and exporting
  the original image assets from my copy of the file;
- scaffolding sections in parallel from that data, then reviewing and adjusting the code myself;
- checking the result in a browser at desktop and mobile sizes against the Figma screenshots;
- adding the motion layer (preloader, hero timeline, scroll entrances) and checking it frame by frame in a
  headless browser at 1280px, 402px and with reduced motion.

How I checked the output: TypeScript (`tsc --noEmit`), ESLint and `next build` pass; I compared every section
side by side with the Figma frames at 1280px and 402px, tested the mobile menu and the form validation by hand,
and reviewed the markup for heading order, labels and focus states. I can walk through any part of the code.

## Time spent

About one working day, including setup, implementation, responsive checks and this README.
