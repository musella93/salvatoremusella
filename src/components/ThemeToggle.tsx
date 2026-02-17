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
      className="absolute top-3 right-3 translate-x-[40%] -translate-y-[40%] z-50
                 w-10 h-10 flex items-center justify-center rounded-full
                 backdrop-blur-xl border transition-all duration-200
                 shadow-[0_1px_8px_rgba(0,0,0,0.06)]
                 dark:bg-white/[0.08] dark:border-white/[0.12] dark:text-white/70 dark:hover:bg-white/[0.12]
                 bg-white/70 border-black/[0.08] text-slate-500 hover:bg-white/85 hover:text-slate-700
                 active:scale-[0.97]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {theme === "dark" ? <Sun className="w-[17px] h-[17px]" /> : <Moon className="w-[17px] h-[17px]" />}
    </button>
  );
}
