import type { ReactNode } from "react";

import { GlyphText } from "./glyph-text";

// `|` starts a new line, `*...*` renders a word in the bright colour.
const HERO_TEXT =
  "Your *Homebrew* setup|backed up to a|private GitHub|repo in one click";

// The canvas has no text for assistive technology or search engines, so the
// same sentence stays in the document as the heading.
const HERO_LABEL =
  "Your Homebrew setup, backed up to a private GitHub repo in one click";

type GlitchTitleProps = {
  /** Optional content rendered above the title. */
  badge?: ReactNode;
  /** Optional content rendered below the title. */
  children?: ReactNode;
};

export default function GlitchTitle({ badge, children }: GlitchTitleProps) {
  return (
    <section className="flex h-dvh w-full flex-col items-center justify-center bg-black pb-16 text-white">
      {badge ? <div className="mb-6">{badge}</div> : null}
      <h1 className="sr-only">{HERO_LABEL}</h1>
      {/* Four rows at 1.1 line height; the box keeps the text's proportion at
          every width. The engine sizes the font from the box width. */}
      <GlyphText
        text={HERO_TEXT}
        className="aspect-[1000/320] w-full sm:w-4/5 sm:max-w-[64rem]"
      />
      {children}
    </section>
  );
}
