import { cn } from "@/lib/utils";

const LINKS = {
  web: "https://raulmoracode.com",
} as const;

interface PartOfRaulmoracodeProps {
  /** The word rendered before the "/". */
  project: string;
  /**
   * Tailwind text-colour class applied to the "/", to the "raulmoracode" word
   * and to the underline drawn under it.
   */
  highlightClassName: string;
  className?: string;
}

export function PartOfRaulmoracode({
  project,
  highlightClassName,
  className = "",
}: PartOfRaulmoracodeProps) {
  return (
    <div>
      <a
        href={LINKS.web}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[14px] text-fg-strong transition-colors duration-300 ease-out starting:text-fg-muted/60",
          className,
        )}
        aria-label={`${project} — part of raulmoracode ecosystem`}
      >
        <span>{project}</span>
        <span className={highlightClassName}>/</span>
        <span>part of</span>
        <span
          className={cn(
            "relative bg-[linear-gradient(currentColor,currentColor)] bg-bottom-right bg-size-[100%_1px] bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out starting:bg-size-[0%_1px]",
            highlightClassName,
          )}
        >
          {" "}
          raulmoracode
          <span className="text-fg-strong transition-colors duration-300 ease-out starting:text-fg-muted/60">
            .com
          </span>
        </span>
      </a>
    </div>
  );
}
