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
      className="absolute -top-[18px] -right-[18px] z-50
                 w-9 h-9 flex items-center justify-center rounded-full
                 backdrop-blur-md border transition-all duration-200
                 shadow-[0_2px_10px_rgba(0,0,0,0.12)]
                 dark:bg-white/[0.08] dark:border-white/[0.12] dark:text-white/80 dark:hover:bg-white/[0.12]
                 bg-white/60 border-black/[0.08] text-foreground/60 hover:bg-white/75
                 active:scale-[0.94]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
