import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InstallPanel } from "@/components/install-panel";

const DOWNLOAD = "https://example.com/BrewSnap.dmg";
const COMMAND = "brew install raulmoracode/tap/brewsnap";

function mockClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function renderPanel() {
  return render(
    <InstallPanel
      downloadHref={DOWNLOAD}
      downloadDetail="macOS 15 or later"
      installCommand={COMMAND}
    />,
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("InstallPanel", () => {
  it("links to the download and shows the Homebrew command", () => {
    mockClipboard(vi.fn());
    renderPanel();

    const link = screen.getByRole("link", {
      name: "Download BrewSnap for macOS 15 or later",
    });
    expect(link.getAttribute("href")).toBe(DOWNLOAD);
    expect(screen.getByText(COMMAND)).toBeDefined();
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
