const LINKS = {
  web: "https://raulmoracode.com",
} as const;

interface PartOfRaulmoracodeProps {
  /** The word rendered before the "/". */
  project: string;
  /**
   * Any CSS color. It is applied to the "/", to the "raulmoracode" word and to
   * the underline drawn under it, so the color you pass is always added to the
   * underline as well.
   */
  highlightColor: string;
  className?: string;
}

export function PartOfRaulmoracode({
  project,
  highlightColor,
  className = "",
}: PartOfRaulmoracodeProps) {
  return (
    <div>
      <a
        href={LINKS.web}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-1.5 font-mono text-[14px] text-main transition-colors duration-300 ease-out starting:text-dim/60 ${className ? `${className}` : ""}`}
        aria-label={`${project} — part of raulmoracode ecosystem`}
      >
        <span>{project}</span>
        <span style={{ color: highlightColor }}>/</span>
        <span>part of</span>
        <span
          className="relative bg-[linear-gradient(currentColor,currentColor)] bg-bottom-right bg-size-[100%_1px] bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out starting:bg-size-[0%_1px]"
          style={{ color: highlightColor }}
        >
          {" "}
          raulmoracode
          <span className="text-main transition-colors duration-300 ease-out starting:text-dim/60">
            .com
          </span>
        </span>
      </a>
    </div>
  );
}
