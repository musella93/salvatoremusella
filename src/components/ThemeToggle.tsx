import { useEffect, useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem("theme");
    if (v === "dark" || v === "light") return v;
  } catch {}
  return null;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggle = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="absolute top-[24px] -right-[16px] z-50
                 w-9 h-9 flex items-center justify-center rounded-full
                 backdrop-blur-xl border transition-all duration-200
                 overflow-hidden
                 shadow-[0_2px_12px_rgba(0,0,0,0.10),0_0_0_0.5px_rgba(255,255,255,0.06)]
                 dark:bg-white/[0.08] dark:border-white/[0.14] dark:text-white/90
                 dark:hover:bg-white/[0.12] dark:hover:border-white/[0.18]
                 dark:active:bg-white/[0.14]
                 bg-white/65 border-black/[0.10] text-foreground/80
                 hover:bg-white/75 hover:border-black/[0.13]
                 active:bg-white/80 active:scale-[0.94]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                 theme-toggle-glass"
    >
      {theme === "dark" ? <Sun className="w-4 h-4 relative z-[2]" /> : <Moon className="w-4 h-4 relative z-[2]" />}
    </button>
  );
}
