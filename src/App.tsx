import { DemoButton } from "./components/demo-button";
import { HeroText } from "./components/hero-text";
import { InstallPanel } from "./components/install-panel";
import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";
import { StarGithubButton } from "./components/star-github-button";

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
        <div className="mt-16 flex w-full flex-col items-center gap-5">
          <StarGithubButton repoUrl="https://github.com/raulmoracode/BrewSnap" />
          <InstallPanel
            downloadHref="https://github.com/raulmoracode/BrewSnap/releases/latest/download/BrewSnap.dmg"
            downloadDetail="macOS 15 or later"
            installCommand="brew install raulmoracode/tap/brewsnap"
          />
        </div>
      </HeroText>
      <DemoButton />
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
