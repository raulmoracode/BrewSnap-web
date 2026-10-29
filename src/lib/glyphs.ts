import "./glyphs-engine.js";

export type GlyphsEffect =
  | "slot"
  | "dial"
  | "fall"
  | "reveal"
  | "drip"
  | "marquee"
  | "swing";

export type GlyphsFont = {
  family?: string;
  stack: string;
  google?: string;
};

export type GlyphsOptions = Record<string, unknown>;

export type GlyphsController = {
  dispose: () => void;
  debug: {
    /** Sets the pointer position in canvas coordinates. */
    move: (x: number, y: number) => void;
    /** Clears the pointer, the same as a `pointerleave`. */
    leave: () => void;
  };
};

export type GlyphsEngineApi = {
  createGlyphs: (
    element: HTMLElement,
    options?: GlyphsOptions,
  ) => GlyphsController;
  defaultsFor: (effect: GlyphsEffect) => GlyphsOptions;
  EFFECTS: ReadonlyArray<{ id: GlyphsEffect; label: string; hint: string }>;
  FONTS: Record<string, GlyphsFont>;
};

// The engine ships as a UMD script: importing it runs the IIFE, which
// registers itself on the global object.
const registered = (window as unknown as { GlyphsEngine?: GlyphsEngineApi })
  .GlyphsEngine;

if (!registered) {
  throw new Error("Glyphs engine did not register on window");
}

const engine: GlyphsEngineApi = registered;

export default engine;
