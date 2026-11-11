import { Github } from "@raulmoracode/icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GithubPanelProps = {
  /** e.g. "https://github.com/owner/repo" — shown as owner/repo and opened by the action. */
  repoUrl: string;
  className?: string;
};

/** Row grid shared by the install panel, so both stacks line up. */
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
 * Repository link modelled on the install panel: one labelled row pairing the
 * owner/repo and a single action that opens the repository on GitHub.
 */
export function GithubPanel({ repoUrl, className }: GithubPanelProps) {
  const slug = getRepoSlug(repoUrl);

  return (
    <div
      className={cn(
        "w-[calc(100%-3rem)] max-w-[34rem] overflow-hidden rounded-[0.8rem] border border-border bg-fg-strong/[0.06]",
        className,
      )}
    >
      <div className={ROW}>
        <span className="truncate text-[0.85rem] font-medium text-fg-strong">
          GitHub
        </span>
        <code
          title={repoUrl}
          className="min-w-0 truncate font-mono text-[0.8rem] text-fg-strong/85"
        >
          {slug}
        </code>
        <Button
          asChild
          variant="default"
          size="icon"
          className="shrink-0 bg-fg-strong text-background hover:bg-fg-strong/90"
        >
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open the repository on GitHub"
          >
            <span className="sr-only">Open {slug} on GitHub</span>
            <Github />
          </a>
        </Button>
      </div>
    </div>
  );
}
