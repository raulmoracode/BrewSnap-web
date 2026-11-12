import { Copy, CopyCheck, Star } from "@raulmoracode/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

type InstallPanelProps = {
  /** Command copied by the Homebrew row. */
  installCommand: string;
  /** e.g. "https://github.com/owner/repo" — shown as owner/repo and opened by the action. */
  repoUrl: string;
  className?: string;
};

/** Row grid shared by both lines: label, value, action. */
const ROW =
  "grid min-h-[3.25rem] grid-cols-[5rem_minmax(0,1fr)_2.25rem] items-center gap-3 py-1.5 pr-2 pl-4 sm:grid-cols-[7rem_minmax(0,1fr)_2.25rem] sm:gap-4 sm:pl-[1.1rem]";

/** Reduces a repository URL to `owner/repo`; falls back to the raw URL. */
function getRepoSlug(repoUrl: string) {
  try {
    const [owner, repo] = new URL(repoUrl).pathname
      .replace(/^\/+|\/+$/g, "")
      .split("/");
    if (owner && repo) return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    // Fall through to the raw URL; a relative string has no slug.
  }
  return repoUrl;
}

/**
 * Installation stack modelled on the panel at https://anoma.ly/hex/: each row
 * pairs a label, a value and one action, so installing and reaching the
 * repository share a single surface instead of separate controls.
 */
export function InstallPanel({
  installCommand,
  repoUrl,
  className,
}: InstallPanelProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const slug = getRepoSlug(repoUrl);

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
        "w-[calc(100%-3rem)] max-w-[34rem] overflow-hidden rounded-[0.8rem] border border-border bg-fg-strong/[0.06]",
        className,
      )}
    >
      <div className={ROW}>
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
          variant="default"
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
          className="shrink-0 bg-[var(--demo-highlight)] text-background hover:bg-[var(--demo-highlight)]"
        >
          {status === "copied" ? (
            <CopyCheck aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </Button>
      </div>

      <div className={cn(ROW, "border-t border-fg-strong/[0.07]")}>
        <span className="truncate text-[0.85rem] font-medium text-fg-strong">
          GitHub
        </span>
        <code
          title={repoUrl}
          className="min-w-0 truncate font-mono text-[0.8rem] text-fg-strong/85"
        >
          {slug}
        </code>
        <Button asChild variant="ghost" size="icon" className="shrink-0">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open the repository on GitHub"
          >
            <span className="sr-only">Open {slug} on GitHub</span>
            <Star className="fill-yellow-400 text-yellow-400" />
          </a>
        </Button>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Homebrew command copied"}
        {status === "error" && "Could not copy the Homebrew command"}
      </span>
    </div>
  );
}
