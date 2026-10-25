"use client";

import { Apple, Linux, Windows } from "@raulmoracode/icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { getUserPlatform, type Platform } from "@/lib/detector";
import { cn } from "@/lib/utils";

type DownloadButtonPlatform = Platform | "auto";

interface DownloadButtonProps
  extends Omit<React.ComponentProps<"a">, "children" | "href"> {
  platform?: DownloadButtonPlatform;
  href: string;
  className?: string;
  size?: "sm" | "md";
}

const platformConfig = {
  macos: {
    icon: Apple,
    className: "bg-[#fafafa] text-[#0b0d09] [a]:hover:bg-[#fafafa]",
  },
  windows: {
    icon: Windows,
    className: "bg-[#0078D4] text-[#fafafa] [a]:hover:bg-[#0078D4]",
  },
  linux: {
    icon: Linux,
    className: "bg-[#7B2CBF] text-[#fafafa] [a]:hover:bg-[#7B2CBF]",
  },
} satisfies Record<
  Platform,
  {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    className: string;
  }
>;

export function DownloadButton({
  platform = "auto",
  href,
  className,
  size = "md",
  ...props
}: DownloadButtonProps) {
  const [detectedPlatform, setDetectedPlatform] =
    React.useState<Platform | null>(null);

  React.useEffect(() => {
    if (platform === "auto") {
      setDetectedPlatform(getUserPlatform());
    }
  }, [platform]);

  const selectedPlatform = platform === "auto" ? detectedPlatform : platform;

  if (!selectedPlatform) {
    return (
      <div
        className={cn("invisible shrink-0", size === "sm" ? "h-7" : "h-9")}
        aria-hidden="true"
      />
    );
  }

  const config = platformConfig[selectedPlatform];
  const Icon = config.icon;

  return (
    <Button
      asChild
      size={size === "sm" ? "sm" : "lg"}
      className={cn(
        "h-auto px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
        "rounded-3xl",
        "tracking-[-0.5px]",
        "font-semibold",
        "hover:opacity-90",
        "transition-opacity",
        "flex items-center gap-2",
        "whitespace-nowrap",
        "shrink-0",
        config.className,
        className,
      )}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        <Icon />
        <span data-download-label>Download</span>
      </a>
    </Button>
  );
}
