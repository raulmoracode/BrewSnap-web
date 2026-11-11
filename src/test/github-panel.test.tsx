import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { GithubPanel } from "@/components/github-panel";

const REPO = "https://github.com/example/brewsnap";

afterEach(cleanup);

describe("GithubPanel", () => {
  it("shows the slug and links to the repository", () => {
    render(<GithubPanel repoUrl={REPO} />);

    expect(screen.getByText("example/brewsnap")).toBeDefined();

    const link = screen.getByRole("link", {
      name: "Open example/brewsnap on GitHub",
    });
    expect(link.getAttribute("href")).toBe(REPO);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("falls back to the raw URL when there is no owner/repo pair", () => {
    render(<GithubPanel repoUrl="https://example.com/" />);

    expect(screen.getByText("https://example.com/")).toBeDefined();
  });
});
