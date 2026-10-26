import { Copy, CopyCheck } from "@raulmoracode/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

type InstallCommandProps = {
  /** Command shown in the bar and copied to the clipboard. */
  command: string;
  className?: string;
};

/**
 * The `data-line` attribute is the contract with `Glyphs`: any line marked
 * with it inside the hero gets split and animated on hover.
 */
export function InstallCommand({ command, className }: InstallCommandProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback(async () => {
    clearTimeout(timerRef.current);

    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
      timerRef.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }, [command]);

  return (
    <div
      className={cn(
        "flex w-full max-w-[26rem] items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-1.5 pr-1.5 pl-4",
        className,
      )}
    >
      <code
        data-line
        className="min-w-0 flex-1 font-mono text-[0.6875rem] whitespace-nowrap text-white/85 sm:text-[0.8125rem] [&_div]:relative"
      >
        <span data-static className="select-none text-white/25">
          $
        </span>{" "}
        {command}
      </code>

      <button
        type="button"
        onClick={copy}
        title={status === "copied" ? "Copied" : "Copy command"}
        aria-label={`Copy install command: ${command}`}
        className="grid size-7 shrink-0 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:outline-none"
      >
        {status === "copied" ? <CopyCheck size={14} /> : <Copy size={14} />}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Install command copied"}
        {status === "error" && "Could not copy the install command"}
      </span>
    </div>
  );
}
