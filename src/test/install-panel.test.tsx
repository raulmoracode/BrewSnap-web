import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InstallPanel } from "@/components/install-panel";

const COMMAND = "brew install raulmoracode/tap/brewsnap";
const REPO = "https://github.com/example/brewsnap";

function mockClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function renderPanel(repoUrl = REPO) {
  return render(<InstallPanel installCommand={COMMAND} repoUrl={repoUrl} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("InstallPanel", () => {
  it("shows the Homebrew command and links to the repository", () => {
    mockClipboard(vi.fn());
    renderPanel();

    expect(screen.getByText(COMMAND)).toBeDefined();
    expect(screen.getByText("example/brewsnap")).toBeDefined();

    const link = screen.getByRole("link", {
      name: "Open example/brewsnap on GitHub",
    });
    expect(link.getAttribute("href")).toBe(REPO);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("no longer offers a download", () => {
    mockClipboard(vi.fn());
    renderPanel();

    expect(screen.queryByText("Download")).toBeNull();
    expect(screen.queryByText("macOS 15 or later")).toBeNull();
    expect(screen.queryByRole("link", { name: /^Download/ })).toBeNull();
  });

  it("falls back to the raw URL when there is no owner/repo pair", () => {
    mockClipboard(vi.fn());
    renderPanel("https://example.com/");

    expect(screen.getByText("https://example.com/")).toBeDefined();
  });

  it("copies the command and announces the result", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    renderPanel();

    fireEvent.click(
      screen.getByRole("button", { name: "Copy Homebrew command" }),
    );

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(COMMAND));
    expect(screen.getByRole("status").textContent).toBe(
      "Homebrew command copied",
    );
  });

  it("announces a failed copy", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    mockClipboard(writeText);
    renderPanel();

    fireEvent.click(
      screen.getByRole("button", { name: "Copy Homebrew command" }),
    );

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        "Could not copy the Homebrew command",
      ),
    );
  });
});
