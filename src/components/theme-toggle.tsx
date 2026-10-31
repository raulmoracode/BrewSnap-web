import { Palette } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";
  const label =
    nextTheme === "light" ? "Switch to light mode" : "Switch to dark mode";

  function toggleTheme() {
    document.documentElement.classList.toggle("light", nextTheme === "light");
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the
      // class change still applies for this session.
    }
    setTheme(nextTheme);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className="fixed top-1 right-1 z-40 size-10 rounded-full text-fg-strong"
    >
      <Palette className="size-4" aria-hidden="true" />
    </Button>
  );
}
