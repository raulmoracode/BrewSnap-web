import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(SplitText, useGSAP);

const DEFAULT_COLORS = ["#6FA000", "#FFB400", "#D94FDC", "#6A5CFF", "#FF3D00"];

const GLYPHS =
  '⨊⨋⨌⨍⨎⨏⨐⨑⨒∀∃∄∅∧∨¬∀∃∄∅∧∨∈∉∊∋∌∍∑∏∐∫∬∭∮∯∰∂∆∇√∛∜∞∝∟∠∡∢abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789Ç<>%&@!#$^*()-_+={}[]|\\:;"?/~`'.split(
    "",
  );

// `href` makes the part a link (no glitch animation); `color` overrides
// the text color.
export type Part = {
  text: string;
  href?: string;
  color?: string;
  /** When true, this part is excluded from the glitch and stays as-is. */
  static?: boolean;
};

// Each array item is a line; each line is made of parts.
const DEFAULT_LINES: Part[][] = [
  [{ text: "BrewSnap", static: true }],
  [{ text: "Sync your Homebrew", color: "#8A8D94" }],
  [{ text: "on a private", color: "#8A8D94" }],
  [{ text: "GitHub " }, { text: " repo", color: "#8A8D94" }],
  [{ text: "as a simple JSON", color: "#8A8D94" }],
];

type CharEntry = { el: HTMLElement; distance: number; skip: boolean };

type GlitchTitleProps = {
  /** Keep a stable reference (constant or useMemo) so the text is not re-split on every render. */
  lines?: Part[][];
  colors?: string[];
  /** Optional content rendered below the title. */
  children?: ReactNode;
};

// Restore the original glyph and clear the inline outline and color so the
// character inherits from its parent <span> or <a> again.
const resetChar = (char: HTMLElement) => {
  char.textContent = char.dataset.orig ?? char.textContent;
  char.style.outline = "";
  char.style.borderRadius = "";
  gsap.set(char, { clearProps: "color" });
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

      const animateLine = contextSafe!((entries: CharEntry[]) => {
        entries.forEach(({ el, distance, skip }) => {
          // Characters inside a link or a static part are not animated.
          if (skip) return;

          // Yoyo returns to the inherited color; resetChar clears the inline styles.
          gsap.to(el, {
            color: gsap.utils.random(colors),
            ease: "power3.out",
            duration: 0.3,
            delay: distance * 0.03,
            repeat: 1,
            yoyo: true,
            overwrite: "auto",

            onStart: () => {
              if (Math.random() < 0.5) {
                el.textContent = gsap.utils.random(GLYPHS);
              }
              // Box only for normal-size characters; small punctuation
              // (":", ",", ".") and spaces get none. Outlines follow border-radius.
              const original = el.dataset.orig ?? "";
              if (Math.random() < 1 / 3 && /[a-z0-9]/i.test(original)) {
                el.style.outline = `1px solid ${gsap.utils.random(colors)}`;
                el.style.borderRadius = "0.12em";
              }
            },

            onComplete: () => resetChar(el),
            onInterrupt: () => resetChar(el),
          });
        });
      });

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

              chars.forEach((char) => {
                char.dataset.orig = char.textContent ?? "";
              });

              (self.lines as HTMLElement[]).forEach((line) => {
                const lineChars = chars.filter((char) => line.contains(char));
                const middleIndex = (lineChars.length - 1) / 2;

                // Computed once: distance to center and whether the character is skipped.
                const entries: CharEntry[] = lineChars.map((el, index) => ({
                  el,
                  distance: Math.abs(index - middleIndex),
                  skip:
                    el.closest("a") !== null ||
                    el.closest("[data-static]") !== null,
                }));

                // Previous lines are discarded on each re-split, so their listeners go with them.
                line.addEventListener("mouseenter", () => animateLine(entries));
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
      className="flex h-dvh w-full cursor-crosshair flex-col items-center justify-center bg-black text-white"
    >
      {/* SplitText creates <div>s for lines and characters, so they need position: relative. */}
      <h1 className="m-0 w-4/5 p-0 text-center font-['Inter'] text-[7.5vw] font-medium leading-[0.95] tracking-[-0.1rem] [&_div]:relative">
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
                  data-static={part.static ? "" : undefined}
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
