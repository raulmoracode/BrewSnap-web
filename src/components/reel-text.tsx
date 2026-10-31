import { type CSSProperties, useEffect, useRef } from "react";
import { REEL_COLORS } from "@/lib/palette";
import ReelEngine, { type ReelEffect } from "@/lib/reel";
import { cn } from "@/lib/utils";

/**
 * Marks the element the pointer has to be over for the characters to wake up. The
 * canvas can be taller than this, but the text box is the trigger area.
 */
export const REEL_CANVAS_ATTRIBUTE = "data-reel-canvas";

const REEL_CANVAS_SELECTOR = `[${REEL_CANVAS_ATTRIBUTE}]`;

// The page font is registered in the engine's table so the canvas measures and
// paints with the same family as the rest of the page.
Object.assign(ReelEngine.FONTS, {
  "PT Mono": {
    family: "PT Mono",
    stack: '"PT Mono", "ReelMath", ui-monospace, monospace',
  },
});

// Script, double-struck, Greek, arrows and operators the reels can land on, on
// top of the engine's own set. More variety means the effect reads as noise
// instead of a repeating handful of signs.
const EXTRA_SYMBOLS =
  "ℬℰℱℋℐℒℳℛℯℓ𝒜𝒞𝒟𝒢𝒥𝒦𝒩𝒪𝒫𝒬𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵ℂℍℕℙℚℝℤ𝔸𝔹𝔻𝔼𝔽𝔾𝕀𝕁𝕂𝕃𝕄𝕆𝕊𝕋𝕌𝕍𝕎𝕏𝕐ΓΔΘΛΞΠΣΦΨΩℏ←↑→↓↔↕↖↗↘↙↦⇄⇅⇆⇒⇔∀∃∄∅∧∨¬∈∉∋∑∏∫∬∮∂∆∇√∛∞∝∠≈≠≡≤≥≪≫≻≺⊂⊃⊆⊇⊕⊗⊥⊨⊢∴∵±÷×∪∩⨊⨋⨌⨍⨎⨏⨐⨑⨒abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|:;?/~";

// Same palette the hero cycles through on hover and the demo button steps on
// every bounce, so the two never drift apart.
const PALETTE_OPTIONS = Object.fromEntries(
  REEL_COLORS.map((color, index) => [`c${index + 1}`, color]),
);

type ReelTextProps = {
  /** Lines separated by `|`; wrap a word in `*` to render it bright. */
  text: string;
  effect?: ReelEffect;
  /** Font size as a percentage of the container width. */
  size?: number;
  /** Floor for the computed font size, in pixels. */
  minSize?: number;
  lineHeight?: number;
  /** Letter spacing in em; negative values tighten the line. */
  tracking?: number;
  font?: string;
  ink?: string;
  bright?: string;
  ground?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Canvas text that answers the pointer. The engine centres the rows inside the
 * element, so the container needs an explicit height (an aspect ratio works).
 */
export function ReelText({
  text,
  effect = "slot",
  size = 7.4,
  minSize = 24,
  lineHeight = 1.1,
  tracking = 0,
  font = "PT Mono",
  ink = "#68676A",
  bright = "#FFFFFF",
  ground = "#000000",
  className,
  style,
}: ReelTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // The effect is pointer-driven, so reduced motion keeps the text and takes
  // the pointer away instead of disabling the canvas.
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The canvas paints once the display face is available, so the first frame
    // is never the mono fallback.
    const fontsReady =
      typeof document !== "undefined" && document.fonts
        ? document.fonts.load(`400 16px "${font}"`).catch(() => undefined)
        : undefined;

    const controller = ReelEngine.createReel(container, {
      effect,
      text,
      size,
      minSize,
      lineHeight,
      tracking,
      font,
      fontsReady,
      weight: 400,
      // The bright word is the same weight, only brighter.
      brightWeight: 400,
      lineChars: 64,
      appearance: "dark",
      colors: REEL_COLORS.length,
      symbols: `${ReelEngine.SYMBOLS}${EXTRA_SYMBOLS}`,
      ...PALETTE_OPTIONS,
      ink,
      bright,
      inkDark: ink,
      brightDark: bright,
      ground,
      groundDark: ground,
    });

    // The element marked as the text area is the text box, not the taller
    // canvas: the pointer only wakes the characters when it is over the words.
    const area =
      container.closest<HTMLElement>(REEL_CANVAS_SELECTOR) ?? container;
    let overArea = false;

    const toCanvas = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      controller.debug.move(clientX - rect.left, clientY - rect.top);
    };

    // The canvas is taller than the text and paints over the page, so it never
    // receives pointer events itself: the pointer is tracked on the window and
    // clicks reach whatever is underneath.
    const trackPointer = (event: PointerEvent) => {
      const bounds = area.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (inside !== overArea) {
        overArea = inside;
        if (!inside) controller.debug.leave();
      }

      if (inside) toCanvas(event.clientX, event.clientY);
    };

    const leave = () => controller.debug.leave();

    // Reduced motion keeps the text and never feeds the pointer.
    if (!reducedMotion) {
      window.addEventListener("pointermove", trackPointer);
      document.addEventListener("pointerleave", leave);
    }

    return () => {
      window.removeEventListener("pointermove", trackPointer);
      document.removeEventListener("pointerleave", leave);
      controller.dispose();
    };
  }, [
    text,
    effect,
    size,
    minSize,
    lineHeight,
    tracking,
    font,
    ink,
    bright,
    ground,
    reducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={style}
      className={cn("pointer-events-none relative w-full", className)}
    />
  );
}
