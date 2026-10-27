import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(SplitText, useGSAP);

// Expanded palette: the video also shows teal, cyan, blue and pink tones,
// not just the original five.
const DEFAULT_COLORS = [
  "#FF3D00",
  "#FFB400",
  "#F5D000",
  "#9BE000",
  "#2EDDB6",
  "#2EC6E9",
  "#3C6BEE",
  "#6A5CFF",
  "#B040FF",
  "#D94FDC",
  "#F7388A",
];

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) =>
    String.fromCodePoint(from + i),
  );

// Glyph pool with a mathematical flavor: math italics, script and
// double-struck letters, Greek, arrows and operators, plus some ASCII.
// Array.from (not split("")) because several characters are outside the BMP.
const GLYPHS: string[] = [
  // Mathematical italic a–z (U+1D455 does not exist; the "h" is U+210E)
  ...range(0x1d44e, 0x1d467).filter((c) => c !== "\u{1D455}"),
  "ℎ",
  // Script
  ...Array.from("ℬℰℱℋℐℒℳℛℯℓ𝒜𝒞𝒟𝒢𝒥𝒦𝒩𝒪𝒫𝒬𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"),
  // Double-struck
  ...Array.from("ℂℍℕℙℚℝℤ𝔸𝔹𝔻𝔼𝔽𝔾𝕀𝕁𝕂𝕃𝕄𝕆𝕊𝕋𝕌𝕍𝕎𝕏𝕐"),
  // Greek
  ...range(0x03b1, 0x03c9).filter((c) => c !== "\u03C2"),
  ...Array.from("ΓΔΘΛΞΠΣΦΨΩℏ"),
  // Arrows
  ...Array.from("←↑→↓↔↕↖↗↘↙↦⇄⇅⇆⇒⇔"),
  // Operators and relations
  ...Array.from("∀∃∄∅∧∨¬∈∉∋∑∏∫∬∮∂∆∇√∛∞∝∠≈≠≡≤≥≪≫≻≺⊂⊃⊆⊇⊕⊗⊥⊨⊢∴∵±÷×∪∩⨊⨋⨌⨍⨎⨏⨐⨑⨒"),
  // A little ASCII so not everything is symbolic
  ...Array.from(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  ),
  ...Array.from("<>%&@!#$^*()-_+={}[]|:;?/~"),
];

// Glyphs a character cycles through before settling back into the letter.
const SCRAMBLE_STEPS = 4;

// `href` makes the part a link (no glitch animation); `color` overrides
// the text color.
export type Part = {
  text: string;
  href?: string;
  color?: string;
  /** When true, this part is excluded from the glitch and stays as-is. */
};

const MUTED = "#68676A";

// Each array item is a line; each line is made of parts.
// The highlighted word is white and also glitches.
const DEFAULT_LINES: Part[][] = [
  [
    { text: "Your ", color: MUTED },
    { text: "Homebrew", color: "#FFFFFF" },
    { text: " setup", color: MUTED },
  ],
  [{ text: "backed up to a", color: MUTED }],
  [{ text: "private GitHub", color: MUTED }],
  [{ text: "repo in one click", color: MUTED }],
];

type CharEntry = { el: HTMLElement; skip: boolean };

type GlitchTitleProps = {
  /** Keep a stable reference (constant or useMemo) so the text is not re-split on every render. */
  lines?: Part[][];
  colors?: string[];
  /** Optional content rendered below the title. */
  children?: ReactNode;
};

// Restore the original character and clear the inline color and outline so the
// character inherits from its parent <span> or <a> again.
const resetChar = (char: HTMLElement) => {
  char.textContent = char.dataset.orig ?? char.textContent;
  char.style.outline = "";
  char.style.borderRadius = "";
  gsap.set(char, { clearProps: "color,outlineColor" });
};

export default function GlitchTitle({
  lines = DEFAULT_LINES,
  colors = DEFAULT_COLORS,
  children,
}: GlitchTitleProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The ripple starts at the character the pointer enters through and
      // spreads in both directions.
      const animateLine = contextSafe!(
        (entries: CharEntry[], originIndex: number) => {
          // Entering a line again restarts the effect from the entry point:
          // tweens are cancelled (including those still waiting for their
          // delay) and the characters are restored.
          entries.forEach(({ el, skip }) => {
            if (skip) return;
            gsap.killTweensOf(el);
            resetChar(el);
          });

          // Long lines keep the same maximum delay (~0.5 s) as short ones,
          // so the ripple finishes in a similar time.
          const maxDistance = Math.max(
            originIndex,
            entries.length - 1 - originIndex,
            1,
          );
          const stagger = Math.min(0.03, 0.5 / maxDistance);

          entries.forEach(({ el, skip }, index) => {
            // Characters inside a link or a static part are not animated.
            if (skip) return;

            const original = el.dataset.orig ?? "";
            const scramble = Math.random() < 0.55;
            const bordered =
              /[a-z0-9]/i.test(original) && Math.random() < 1 / 3;
            let lastStep = 0;

            if (bordered) {
              el.style.outline = "1px solid transparent";
              el.style.borderRadius = "0.12em";
            }

            // One tween per character: the color rises and falls with a
            // symmetric ease, and the glyph scramble rides the rising half so
            // the real letter is back before the color fades out.
            const tween = gsap.to(el, {
              color: gsap.utils.random(colors),
              ...(bordered ? { outlineColor: gsap.utils.random(colors) } : {}),
              ease: "sine.inOut",
              duration: 0.3,
              delay: Math.abs(index - originIndex) * stagger,
              repeat: 1,
              yoyo: true,

              onStart: () => {
                if (!scramble) return;
                el.textContent = gsap.utils.random(GLYPHS);
                lastStep = 0;
              },

              onUpdate: () => {
                if (!scramble) return;
                // Forward half of the yoyo: 0 → 1. Squaring the progress
                // slows the swaps down instead of firing them at a fixed rate.
                const forward = tween.totalProgress() * 2;
                if (forward >= 1) return;
                const eased = 1 - (1 - forward) ** 2;
                const step = Math.min(
                  SCRAMBLE_STEPS - 1,
                  Math.floor(eased * SCRAMBLE_STEPS),
                );
                if (step === lastStep) return;
                lastStep = step;
                el.textContent = gsap.utils.random(GLYPHS);
              },

              onRepeat: () => {
                // Brightest point of the tween: hand the character back to the
                // text so the fade-out reads as the letter settling.
                el.textContent = original;
              },

              onComplete: () => resetChar(el),
              onInterrupt: () => resetChar(el),
            });
          });
        },
      );

      const splits: SplitText[] = [];

      gsap.utils
        .toArray<HTMLElement>("[data-line]", containerRef.current)
        .forEach((lineEl) => {
          const split = new SplitText(lineEl, {
            type: "lines, chars",
            // Re-split when the font loads or the element resizes.
            autoSplit: true,
            onSplit: (self) => {
              const chars = self.chars as HTMLElement[];

              // Measure first, write after: freezing each character's width
              // keeps the line from reflowing every time a glyph replaces it.
              const widths = chars.map(
                (char) => char.getBoundingClientRect().width,
              );

              chars.forEach((char, index) => {
                char.dataset.orig = char.textContent ?? "";
                char.style.width = `${widths[index]}px`;
                char.style.textAlign = "center";
              });

              (self.lines as HTMLElement[]).forEach((line) => {
                const lineChars = chars.filter((char) => line.contains(char));

                // Computed once: whether the character is skipped.
                const entries: CharEntry[] = lineChars.map((el) => ({
                  el,
                  skip:
                    el.closest("a") !== null ||
                    el.closest("[data-static]") !== null,
                }));

                // Previous lines are discarded on each re-split, so their listeners go with them.
                line.addEventListener("mouseenter", (event) => {
                  const x = (event as MouseEvent).clientX;

                  // Character closest to the pointer at the moment of entry.
                  let originIndex = 0;
                  let best = Infinity;
                  lineChars.forEach((char, index) => {
                    const rect = char.getBoundingClientRect();
                    const distance = Math.abs(x - (rect.left + rect.width / 2));
                    if (distance < best) {
                      best = distance;
                      originIndex = index;
                    }
                  });

                  animateLine(entries, originIndex);
                });
              });
            },
          });

          splits.push(split);
        });

      return () => {
        splits.forEach((s) => {
          s.revert();
        });
      };
    },
    { scope: containerRef, dependencies: [lines, colors] },
  );

  return (
    <section
      ref={containerRef}
      className="flex h-dvh w-full flex-col items-center justify-center bg-black pb-16 text-white"
    >
      {/* SplitText creates <div>s for lines and characters, so they need position: relative. */}
      {/* Monospace font at ~5vw with ~1.24 line height and no tracking, as in the video.
          Swap the family for the one you have loaded (e.g. Geist Mono). */}
      <h1 className="m-0 w-4/5 p-0 text-center text-[clamp(1.5rem,4.9vw,4.5rem)] font-normal leading-[1.1] tracking-normal [&_div]:relative">
        {lines.map((parts, lineIndex) => (
          <span key={lineIndex} data-line className="block whitespace-nowrap">
            {parts.map((part, partIndex) =>
              part.href ? (
                <a
                  key={partIndex}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                  style={part.color ? { color: part.color } : undefined}
                >
                  {part.text}
                </a>
              ) : (
                // Use <span> instead of <Fragment> so color can be applied.
                <span
                  key={partIndex}
                  style={part.color ? { color: part.color } : undefined}
                >
                  {part.text}
                </span>
              ),
            )}
          </span>
        ))}
      </h1>
      {children}
    </section>
  );
}
