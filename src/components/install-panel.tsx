import { Copy, CopyCheck } from "@raulmoracode/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

type InstallPanelProps = {
  /** Latest build for the platform, opened in a new tab. */
  downloadHref: string;
  /** Requirement shown next to the Download label. */
  downloadDetail: string;
  /** Command copied by the Homebrew row. */
  installCommand: string;
  className?: string;
};

/** Row grid shared by both lines: label, value, action. */
const ROW =
  "grid min-h-[3.25rem] grid-cols-[5rem_minmax(0,1fr)_2.25rem] items-center gap-3 py-1.5 pr-2 pl-4 sm:grid-cols-[7rem_minmax(0,1fr)_2.25rem] sm:gap-4 sm:pl-[1.1rem]";

/**
 * Installation stack modelled on the panel at https://anoma.ly/hex/: each row
 * pairs a label, a value and one action, so downloading and installing share a
 * single surface instead of two separate controls.
 */
export function InstallPanel({
  downloadHref,
  downloadDetail,
  installCommand,
  className,
}: InstallPanelProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback(async () => {
    clearTimeout(timerRef.current);

    try {
      await navigator.clipboard.writeText(installCommand);
      setStatus("copied");
      timerRef.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }, [installCommand]);

  return (
    <div
      className={cn(
        "w-[calc(100%-3rem)] max-w-[34rem] overflow-hidden rounded-[0.8rem] border border-border bg-fg-strong/[0.02]",
        className,
      )}
    >
      <div className={ROW}>
        <span className="truncate text-[0.85rem] font-medium text-fg-strong">
          Download
        </span>
        <span className="min-w-0 text-[0.8rem] text-fg-muted">
          {downloadDetail}
        </span>
        <Button asChild variant="default" size="icon" className="shrink-0">
          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Download"
          >
            <span className="sr-only">
              Download BrewSnap for {downloadDetail}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4.5v11M7 11l5 5 5-5M5 19.5h14" />
            </svg>
          </a>
        </Button>
      </div>

      <div className={cn(ROW, "border-t border-fg-strong/[0.07]")}>
        <span className="truncate text-[0.85rem] font-medium text-fg-strong">
          Homebrew
        </span>
        <code
          title={installCommand}
          className="min-w-0 truncate font-mono text-[0.8rem] text-fg-strong/85"
        >
          {installCommand}
        </code>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={copy}
          aria-label="Copy Homebrew command"
          title={
            status === "copied"
              ? "Copied"
              : status === "error"
                ? "Could not copy"
                : "Copy"
          }
          className="shrink-0"
        >
          {status === "copied" ? (
            <CopyCheck aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </Button>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Homebrew command copied"}
        {status === "error" && "Could not copy the Homebrew command"}
      </span>
    </div>
  );
}
