import { Github, Star } from "@raulmoracode/icons";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

function formatStarCount(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}

/**
 * Derives the GitHub REST API URL for a repo from its github.com URL,
 * so the star count follows `repoUrl` without extra configuration.
 * Returns null for non-GitHub or unparseable URLs (fetch is skipped).
 */
function getStarsApiUrl(repoUrl: string): string | null {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname
      .replace(/^\//, "")
      .replace(/\/$/, "")
      .split("/");
    if (!owner || !repo) return null;
    return `https://api.github.com/repos/${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}

interface StarGithubButtonProps {
  /** e.g. "https://github.com/owner/repo" — the star count is fetched for this repo. */
  repoUrl: string;
  /**
   * Override the stars API endpoint. Defaults to the API URL derived
   * from `repoUrl`. Pass `null` (or "") to disable fetching.
   */
  starsApiUrl?: string | null;
  initialStars?: number | null;
  className?: string;
}

export function StarGithubButton({
  repoUrl,
  starsApiUrl,
  initialStars = null,
  className,
}: StarGithubButtonProps) {
  const [stars, setStars] = useState<number | null>(initialStars);
  const apiUrl =
    starsApiUrl === undefined ? getStarsApiUrl(repoUrl) : starsApiUrl;

  useEffect(() => {
    if (!apiUrl) return;
    const endpoint: string = apiUrl;
    const controller = new AbortController();

    async function fetchStars() {
      try {
        const res = await fetch(endpoint, {
          headers: { Accept: "application/vnd.github.v3+json" },
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch {
        // A failed or rate-limited request leaves the button usable and the
        // count hidden.
      }
    }

    fetchStars();

    return () => controller.abort();
  }, [apiUrl]);

  const label =
    stars === null
      ? "Star on GitHub"
      : `${formatStarCount(stars)} stars on GitHub`;

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-3xl border border-border bg-background px-5 py-2.5 text-sm font-normal tracking-[-0.5px] text-fg-strong transition-colors hover:bg-muted sm:py-3 sm:text-base",
        className,
      )}
    >
      <Github className="size-4" aria-hidden="true" />
      <span>Star on GitHub</span>
      {stars !== null ? (
        <span className="flex items-center gap-1 pl-0.5 text-fg-muted">
          <Star
            className="size-3.5 fill-yellow-400 text-yellow-400"
            aria-hidden="true"
          />
          <span className="tabular-nums">{formatStarCount(stars)}</span>
        </span>
      ) : null}
    </a>
  );
}
