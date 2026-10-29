import { useEffect, useRef } from "react";

import GlyphsEngine, { type GlyphsEffect } from "@/lib/glyphs";
import { GLYPH_COLORS } from "@/lib/palette";
import { cn } from "@/lib/utils";

/** Marks the element that listens for `glyphs:pointermove` events. */
export const GLYPH_CANVAS_ATTRIBUTE = "data-glyph-canvas";

// The page font is registered in the engine's table so the canvas measures and
// paints with the same family as the rest of the page.
Object.assign(GlyphsEngine.FONTS, {
  Absans: { family: "Absans", stack: '"Absans", ui-sans-serif, sans-serif' },
});

// Same palette the hero cycles through on hover and the demo button steps on
// every bounce, so the two never drift apart.
const PALETTE_OPTIONS = Object.fromEntries(
  GLYPH_COLORS.map((color, index) => [`c${index + 1}`, color]),
);

type GlyphTextProps = {
  /** Lines separated by `|`; wrap a word in `*` to render it bright. */
  text: string;
  effect?: GlyphsEffect;
  /** Font size as a percentage of the container width. */
  size?: number;
  /** Floor for the computed font size, in pixels. */
  minSize?: number;
  lineHeight?: number;
  font?: string;
  ink?: string;
  bright?: string;
  ground?: string;
  className?: string;
};

/**
 * Canvas text that answers the pointer. The engine centres the rows inside the
 * element, so the container needs an explicit height (an aspect ratio works).
 */
export function GlyphText({
  text,
  effect = "slot",
  size = 7.4,
  minSize = 24,
  lineHeight = 1.1,
  font = "Absans",
  ink = "#68676A",
  bright = "#FFFFFF",
  ground = "#000000",
  className,
}: GlyphTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // The effect is pointer-driven, so reduced motion keeps the text and takes
  // the pointer away instead of disabling the canvas.
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const controller = GlyphsEngine.createGlyphs(container, {
      effect,
      text,
      size,
      minSize,
      lineHeight,
      font,
      weight: 400,
      // Absans ships a single weight, so "bright" is a colour change only.
      brightWeight: 400,
      lineChars: 64,
      appearance: "dark",
      colors: GLYPH_COLORS.length,
      ...PALETTE_OPTIONS,
      ink,
      bright,
      inkDark: ink,
      brightDark: bright,
      ground,
      groundDark: ground,
    });

    // The bouncing demo button crosses the hero and replays the effect by
    // forwarding its centre as pointer coordinates.
    const move = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      const rect = container.getBoundingClientRect();
      controller.debug.move(x - rect.left, y - rect.top);
    };

    const leave = () => controller.debug.leave();

    container.addEventListener("glyphs:pointermove", move);
    container.addEventListener("glyphs:pointerleave", leave);

    return () => {
      container.removeEventListener("glyphs:pointermove", move);
      container.removeEventListener("glyphs:pointerleave", leave);
      controller.dispose();
    };
  }, [text, effect, size, minSize, lineHeight, font, ink, bright, ground]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      {...{ [GLYPH_CANVAS_ATTRIBUTE]: "" }}
      className={cn(
        "relative w-full",
        reducedMotion && "pointer-events-none",
        className,
      )}
    />
  );
}
