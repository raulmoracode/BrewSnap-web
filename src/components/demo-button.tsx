import { useEffect, useRef, useState } from "react";

import { site } from "@/config/site";
import { GLYPH_COLORS } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { DemoModal } from "./demo-modal";

/** Travel speed in pixels per second. Slow enough to be an easy target. */
const SPEED = 120;

/** Gap kept between the button and the viewport edges. */
const EDGE_GAP = 16;

/** CSS variable the rest of the page reads to follow the button's colour. */
const HIGHLIGHT_VAR = "--demo-highlight";

const setHighlight = (color: string) => {
  document.documentElement.style.setProperty(HIGHLIGHT_VAR, color);
};

type DemoButtonProps = {
  className?: string;
};

/**
 * "demo" button that drifts around the viewport like a DVD screensaver and
 * advances to the next glyph colour on every edge bounce. It pauses while
 * hovered or keyboard-focused so it can be clicked without chasing it.
 */
export function DemoButton({ className }: DemoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const openedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const colorIndexRef = useRef(0);

  useEffect(() => {
    openedRef.current = open;
  }, [open]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // The badge and the install prompt read this variable, so all three start
    // on the same colour and stay together after every bounce.
    setHighlight(GLYPH_COLORS[colorIndexRef.current]);

    let width = button.offsetWidth;
    let height = button.offsetHeight;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let lastFrame = 0;
    let frame = 0;

    const place = (nextX: number, nextY: number) => {
      button.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };

    // The hero's ripple listens for `mouseenter` on each rendered line, so
    // crossing a line with the button replays it exactly as a pointer would.
    let lines: HTMLElement[] = [];
    const overlapping = new Set<HTMLElement>();
    const textRange = document.createRange();

    const refreshLines = () => {
      lines = Array.from(
        document.querySelectorAll<HTMLElement>("[data-line] > div"),
      );
      overlapping.clear();
    };

    const sweepTitle = () => {
      // SplitText re-splits on resize and font load, which replaces the line
      // elements; pick the new ones up and start the overlap tracking again.
      if (lines.length === 0 || lines.some((line) => !line.isConnected)) {
        refreshLines();
      }

      const centerX = x + width / 2;
      const centerY = y + height / 2;

      for (const line of lines) {
        // A range measures the text itself, not the full-width line box.
        textRange.selectNodeContents(line);
        const rect = textRange.getBoundingClientRect();
        const overlaps =
          rect.right > x &&
          rect.left < x + width &&
          rect.bottom > y &&
          rect.top < y + height;

        if (!overlaps) {
          overlapping.delete(line);
          continue;
        }

        if (overlapping.has(line)) continue;

        overlapping.add(line);
        line.dispatchEvent(
          new MouseEvent("mouseenter", {
            clientX: centerX,
            clientY: centerY,
          }),
        );
      }
    };

    const bounds = () => ({
      maxX: Math.max(EDGE_GAP, window.innerWidth - width - EDGE_GAP),
      maxY: Math.max(EDGE_GAP, window.innerHeight - height - EDGE_GAP),
    });

    const clampToBounds = () => {
      const { maxX, maxY } = bounds();
      x = Math.min(Math.max(x, EDGE_GAP), maxX);
      y = Math.min(Math.max(y, EDGE_GAP), maxY);
      place(x, y);
    };

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      // Keep the button visible and clickable, but still, in the bottom corner.
      const { maxX, maxY } = bounds();
      x = maxX;
      y = maxY;
      place(x, y);
      setPlaced(true);
      return;
    }

    // Start somewhere random so every visit looks different.
    const initial = bounds();
    x = EDGE_GAP + Math.random() * Math.max(0, initial.maxX - EDGE_GAP);
    y = EDGE_GAP + Math.random() * Math.max(0, initial.maxY - EDGE_GAP);

    // Same total speed on every diagonal.
    const diagonal = SPEED / Math.SQRT2;
    vx = (Math.random() < 0.5 ? -1 : 1) * diagonal;
    vy = (Math.random() < 0.5 ? -1 : 1) * diagonal;

    place(x, y);
    setPlaced(true);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      if (lastFrame === 0) {
        lastFrame = now;
        return;
      }

      // Clamp the delta so returning to a background tab does not teleport
      // the button across the screen.
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (hoveredRef.current || focusedRef.current || openedRef.current) {
        return;
      }

      x += vx * delta;
      y += vy * delta;

      const { maxX, maxY } = bounds();
      let bounced = false;

      if (x <= EDGE_GAP) {
        x = EDGE_GAP;
        vx = Math.abs(vx);
        bounced = true;
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
        bounced = true;
      }

      if (y <= EDGE_GAP) {
        y = EDGE_GAP;
        vy = Math.abs(vy);
        bounced = true;
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
        bounced = true;
      }

      if (bounced) {
        const nextIndex = (colorIndexRef.current + 1) % GLYPH_COLORS.length;
        colorIndexRef.current = nextIndex;
        setColorIndex(nextIndex);
        setHighlight(GLYPH_COLORS[nextIndex]);
      }

      sweepTitle();
      place(x, y);
    };

    const handleResize = () => {
      width = button.offsetWidth;
      height = button.offsetHeight;
      clampToBounds();
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.removeProperty(HIGHLIGHT_VAR);
    };
  }, []);

  const color = GLYPH_COLORS[colorIndex];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-label="Watch demo: BrewSnap app walkthrough"
        onClick={() => setOpen(true)}
        onPointerEnter={() => {
          hoveredRef.current = true;
        }}
        onPointerLeave={() => {
          hoveredRef.current = false;
        }}
        onFocus={(event) => {
          // Only keyboard focus stops the drift; a mouse click would otherwise
          // leave the button frozen after the modal closes and returns focus.
          focusedRef.current = event.currentTarget.matches(":focus-visible");
        }}
        onBlur={() => {
          focusedRef.current = false;
        }}
        style={{
          color,
          borderColor: color,
        }}
        className={cn(
          "fixed top-0 left-0 z-40 cursor-pointer rounded-full border bg-black/40 px-4 py-2 font-mono text-sm font-semibold tracking-[0.2em] backdrop-blur-sm will-change-transform focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
          "transition-opacity duration-200",
          placed ? "opacity-100" : "opacity-0",
          className,
        )}
      >
        watch demo
      </button>

      <DemoModal
        open={open}
        onOpenChange={setOpen}
        videoSrc={site.demoVideo}
        captionsSrc={site.demoVideoCaptions}
      />
    </>
  );
}
