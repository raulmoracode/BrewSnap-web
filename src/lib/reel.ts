import "./reel-engine.js";

export type ReelEffect =
  | "slot"
  | "dial"
  | "fall"
  | "reveal"
  | "unreveal"
  | "drip"
  | "marquee"
  | "swing";

export type ReelFont = {
  family?: string;
  stack: string;
  google?: string;
};

export type ReelOptions = Record<string, unknown>;

export type ReelController = {
  dispose: () => void;
  debug: {
    /** Sets the pointer position in canvas coordinates. */
    move: (x: number, y: number) => void;
    /** Clears the pointer, the same as a `pointerleave`. */
    leave: () => void;
  };
};

export type ReelEngineApi = {
  createReel: (element: HTMLElement, options?: ReelOptions) => ReelController;
  defaultsFor: (effect: ReelEffect) => ReelOptions;
  EFFECTS: ReadonlyArray<{ id: ReelEffect; label: string; hint: string }>;
  FONTS: Record<string, ReelFont>;
  SYMBOLS: string;
};

// The engine ships as a UMD script: importing it runs the IIFE, which
// registers itself on the global object.
const registered = (window as unknown as { ReelEngine?: ReelEngineApi })
  .ReelEngine;

if (!registered) {
  throw new Error("Reel engine did not register on window");
}

const engine: ReelEngineApi = registered;

export default engine;
