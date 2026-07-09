"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR/hydration, true after — avoids a hydration mismatch on the icon
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="neuo-raised-sm neuo-interactive flex h-10 w-10 items-center justify-center text-muted hover:text-accent"
    >
      {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <MoonIcon className="opacity-0" />}
    </button>
  );
}
