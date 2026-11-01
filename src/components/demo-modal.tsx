import { type RefObject, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type DemoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string;
  captionsSrc: string;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
};

/**
 * Video modal for the demo button. The shadcn Dialog owns the focus trap, the
 * Escape key, the scroll lock and the close button; this component only
 * renders the frame and the player.
 */
export function DemoModal({
  open,
  onOpenChange,
  videoSrc,
  captionsSrc,
  returnFocusRef,
}: DemoModalProps) {
  const [failed, setFailed] = useState(false);

  // Opening again retries the source, so adding the file does not need a reload
  // in development and a transient network error does not stick.
  useEffect(() => {
    if (open) setFailed(false);
  }, [open]);

  const showFallback = failed || videoSrc === "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          if (!returnFocusRef?.current) return;
          event.preventDefault();
          returnFocusRef.current.focus();
        }}
        className="w-[min(92vw,56rem)] max-w-none gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 text-foreground shadow-2xl outline-none sm:rounded-2xl"
      >
        <DialogTitle className="sr-only">BrewSnap demo</DialogTitle>

        <DialogDescription className="sr-only">
          Video walkthrough of BrewSnap backing up your Homebrew setup to a
          private GitHub repository.
        </DialogDescription>

        {showFallback ? (
          <div className="flex aspect-video w-full items-center justify-center px-6 text-center">
            <p className="text-sm text-fg-muted">
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
      </DialogContent>
    </Dialog>
  );
}
