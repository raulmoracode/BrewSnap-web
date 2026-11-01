import { DemoButton } from "./components/demo-button";
import { DownloadButton } from "./components/download-button";
import { HeroText } from "./components/hero-text";
import { InstallCommand } from "./components/install-command";
import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";
import { ThemeToggle } from "./components/theme-toggle";

export default function App() {
  return (
    <>
      <HeroText
        badge={
          <PartOfRaulmoracode
            project="brewsnap"
            highlightColor="var(--accent-text)"
            className="text-fg-strong starting:text-fg-strong/40"
          />
        }
      >
        <DownloadButton
          href="https://github.com/raulmoracode/BrewSnap-web/releases/latest"
          className="mt-10"
          platform="macos"
        />
        <InstallCommand
          command="brew install raulmoracode/tap/brewsnap"
          className="mt-5"
        />
      </HeroText>
      <DemoButton />
      <ThemeToggle />
      <footer className="fixed inset-x-0 bottom-0 z-10 px-6 pb-5 text-center text-[0.8125rem] leading-none text-fg-muted">
        Heavily inspired by{" "}
        <a
          href="https://codepen.io/Andrea-Catanzaro/pen/bNgyqbp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-fg-strong/30 underline-offset-4 transition-colors hover:text-fg-strong hover:decoration-fg-strong"
        >
          Andrea Catanzaro
        </a>
      </footer>
    </>
  );
}
