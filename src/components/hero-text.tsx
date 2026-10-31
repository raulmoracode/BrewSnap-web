import { type ReactNode, useEffect, useRef, useState } from "react";

import { REEL_CANVAS_ATTRIBUTE, ReelText } from "./reel-text";

// `|` starts a new line, `*...*` renders a word in the bright colour.
const HERO_TEXT =
  "Your *Homebrew* setup|backed up to a|private GitHub|repo in one click";

// The canvas has no text for assistive technology or search engines, so the
// same sentence stays in the document as the heading.
const HERO_LABEL =
  "Your Homebrew setup, backed up to a private GitHub repo in one click";

/** Extra room above and below the text, as a multiple of its height, so the
 * tallest symbols and their frames are not clipped. */
const CANVAS_HEADROOM = 1.3;

type HeroTextProps = {
  /** Optional content rendered above the title. */
  badge?: ReactNode;
  /** Optional content rendered below the title. */
  children?: ReactNode;
};

export function HeroText({ badge, children }: HeroTextProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>();

  // The engine centres the rows in its container, so growing the canvas
  // symmetrically around the text keeps the words in place and only adds room
  // for the tallest glyphs and their frames.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const measure = () =>
      setCanvasHeight(shell.getBoundingClientRect().height * CANVAS_HEADROOM);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(shell);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black pb-16 text-white">
      {badge ? <div className="relative z-30 mb-12">{badge}</div> : null}
      <h1 className="sr-only">{HERO_LABEL}</h1>
      {/* Four rows at 1.2 line height; the box keeps the text's proportion at
          every width, and the canvas adds room above and below it. */}
      <div
        ref={shellRef}
        {...{ [REEL_CANVAS_ATTRIBUTE]: "" }}
        className="relative aspect-[1000/320] w-full sm:w-4/5 sm:max-w-[64rem]"
      >
        <ReelText
          text={HERO_TEXT}
          effect="unreveal"
          size={6.8}
          lineHeight={1.2}
          className="absolute inset-x-0 z-20 h-full"
          style={
            canvasHeight
              ? {
                  height: canvasHeight,
                  top: `calc(50% - ${canvasHeight / 2}px)`,
                }
              : undefined
          }
        />
      </div>
      <div className="relative z-30 flex w-full flex-col items-center">
        {children}
      </div>
    </section>
  );
}
