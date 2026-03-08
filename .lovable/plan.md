

## Plan: Add "View Selected Work" CTA

### Changes

**1. `src/index.css`** — Add `cta-quaternary` class

- Add `cta-quaternary` to all grouped selectors where `cta-primary`, `cta-secondary`, `cta-tertiary` appear together (base styles line 401-411, transition line 114-117, dark ring line 418-423, light ring line 489-494)
- Add dark mode `cta-quaternary` styles continuing the opacity curve: `bg 2% / border 4%`, text `78%` opacity, icon `55%` opacity
- Add light mode `cta-quaternary` styles: `bg 2% / border 6%`, text `80%` opacity, icon `55%` opacity — intentionally slightly higher than a pure curve to ensure readability per the user's request

**2. `src/pages/Index.tsx`** — Add new CTA and shift hierarchy

- Import `Briefcase` from lucide-react
- Add new "View Selected Work" CTA as first button with `cta-primary` class, linking to `https://go.salvatoremusella.com/portfolio`
- Shift existing buttons: Resume → `cta-secondary`, Chat → `cta-tertiary`, Credentials → `cta-quaternary`
- Reduce nav `space-y-2.5` → `space-y-2` to keep proportions tight with 4 buttons

No other files change. Zero visual/layout redesign.

