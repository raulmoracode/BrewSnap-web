import { Copy, CopyCheck } from "@raulmoracode/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

type InstallCommandProps = {
  /** Command shown in the bar and copied to the clipboard. */
  command: string;
  className?: string;
};

export function InstallCommand({ command, className }: InstallCommandProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback(async () => {
    clearTimeout(timerRef.current);

    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
      timerRef.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }, [command]);

  return (
    <div
      className={cn(
        "flex w-full max-w-[26rem] items-center gap-2 rounded-2xl border border-border bg-card py-1.5 pr-1.5 pl-4 focus-within:ring-1 focus-within:ring-ring/30",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="select-none font-mono text-[0.6875rem] text-accent-text sm:text-[0.8125rem]"
      >
        $
      </span>
      <Input
        readOnly
        value={command}
        aria-label="Install command"
        spellCheck={false}
        className="h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 font-mono text-[0.6875rem] text-fg-strong/85 shadow-none focus-visible:ring-0 sm:text-[0.8125rem] md:text-[0.8125rem]"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={copy}
        title={status === "copied" ? "Copied" : "Copy command"}
        aria-label={`Copy install command: ${command}`}
        className="h-7 w-7 shrink-0 rounded-lg text-fg-muted [&_svg]:size-3.5"
      >
        {status === "copied" ? <CopyCheck size={14} /> : <Copy size={14} />}
      </Button>

      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Install command copied"}
        {status === "error" && "Could not copy the install command"}
      </span>
    </div>
  );
}
