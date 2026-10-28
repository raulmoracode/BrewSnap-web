import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";

type DemoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string;
  captionsSrc: string;
};

/**
 * Video modal for the demo button. Radix Dialog owns the focus trap, the
 * Escape key and the scroll lock; this component only renders the frame and
 * the player.
 */
export function DemoModal({
  open,
  onOpenChange,
  videoSrc,
  captionsSrc,
}: DemoModalProps) {
  const [failed, setFailed] = useState(false);

  // Opening again retries the source, so adding the file does not need a reload
  // in development and a transient network error does not stick.
  useEffect(() => {
    if (open) setFailed(false);
  }, [open]);

  const showFallback = failed || videoSrc === "";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,56rem)] -translate-x-1/2 -translate-y-1/2 outline-none">
          <Dialog.Title className="sr-only">BrewSnap demo</Dialog.Title>

          <Dialog.Description className="sr-only">
            Video walkthrough of BrewSnap backing up your Homebrew setup to a
            private GitHub repository.
          </Dialog.Description>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute top-3 right-3 z-10 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
              >
                Close
              </button>
            </Dialog.Close>

            {showFallback ? (
              <div className="flex aspect-video w-full items-center justify-center px-6 text-center">
                <p className="text-sm text-white/60">
                  The demo video is not available yet.
                </p>
              </div>
            ) : (
              <video
                key={videoSrc}
                src={videoSrc}
                controls
                playsInline
                preload="metadata"
                onError={() => setFailed(true)}
                className="aspect-video w-full bg-black"
              >
                <track
                  kind="captions"
                  src={captionsSrc || undefined}
                  srcLang="en"
                  label="English"
                />
              </video>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
