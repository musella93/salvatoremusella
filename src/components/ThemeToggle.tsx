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
                 w-11 h-11 flex items-center justify-center rounded-full
                 border transition-all duration-200
                 shadow-[0_2px_8px_rgba(0,0,0,0.10)]
                 dark:bg-[hsl(0,0%,18%)] dark:border-white/[0.12] dark:text-white/90 dark:hover:bg-[hsl(0,0%,22%)]
                 bg-[hsl(0,0%,96%)] border-black/[0.08] text-slate-600 hover:bg-[hsl(0,0%,93%)]
                 active:scale-[0.96]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
