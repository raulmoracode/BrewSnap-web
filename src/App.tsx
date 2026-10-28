import { DownloadButton } from "./components/download-button";
import Glyphs from "./components/Glyphs";
import { InstallCommand } from "./components/install-command";
import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";

export default function App() {
  return (
    <>
      <Glyphs
        badge={
          <PartOfRaulmoracode
            project="brewsnap"
            highlightColor="#9BE000"
            className="text-white starting:text-white/40"
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
      </Glyphs>
      <footer className="fixed inset-x-0 bottom-0 z-10 px-6 pb-5 text-center text-[0.8125rem] leading-none text-white/50">
        Heavily inspired by{" "}
        <a
          href="https://codepen.io/Andrea-Catanzaro/pen/bNgyqbp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          Andrea Catanzaro
        </a>
      </footer>
    </>
  );
}
