## Plan: Card-matched shadow on Share modal + toast duration fix + Copy link readability

### Changes (only `src/components/ShareButton.tsx`)

**1. Apply the exact card shadow to DialogContent**

The `.liquid-glass-card` uses these shadows:

- Dark: no explicit `box-shadow` (inherits none)
- Light: `box-shadow: 0 8px 40px hsl(220 30% 50% / 0.08), 0 1px 3px hsl(220 30% 50% / 0.04)`

Replace the default `shadow-lg` from DialogContent with an explicit Tailwind arbitrary shadow matching the card values. Use `shadow-none dark:shadow-none` to override the base, then apply the light-mode shadow via a light-only arbitrary value class:

```
shadow-[0_8px_40px_hsl(220_30%_50%/0.08),0_1px_3px_hsl(220_30%_50%/0.04)]
dark:shadow-none
```

**2. Toast with 1.5s auto-dismiss**

The current `useToast` hook has `TOAST_REMOVE_DELAY` set to 1000000ms (effectively never auto-dismisses). Pass `duration: 1500` in the toast call so the "Copied" feedback disappears after 1.5 seconds. The shadcn toast system supports a `duration` prop on individual toasts.

Actually, looking at the hook — it doesn't support per-toast `duration`. Instead, I'll update the toast call and also set `TOAST_REMOVE_DELAY` in `use-toast.ts` to `1500` so toasts auto-dismiss. Alternatively, if we only want the copy toast short, we can keep the global delay but this is the only toast in the app, so setting it to 1500 globally is fine.

**3. Copy link text opacity — clearly clickable in both themes**

Current: `text-foreground/80`. Bump to `text-foreground/90` and add `dark:text-white/90` explicitly so it's clearly readable in dark mode too.

### Files modified

1. `**src/components/ShareButton.tsx**` — DialogContent shadow classes; Copy link text opacity.
2. `**src/hooks/use-toast.ts**` — Change `TOAST_REMOVE_DELAY` from `1000000` to `1500`.  
  


&nbsp;

Share Modal Restyle — Compact, Glass-Matched, CTA-Unified What changes (only src/components/ShareButton.tsx) 1. Compact modal + card radius Set DialogContent max-width to max-w-[min(92vw,420px)] and reduce padding to p-5. Apply rounded-3xl — the exact same radius class used by .liquid-glass-card. Tighten vertical gaps: inner container gap-3 instead of gap-4, remove py-2. 2. Remove header title Remove the <DialogHeader> and <DialogTitle> entirely. The built-in close (X) button from DialogContent stays. 3. Glass background matching the main card Dark: dark:bg-[hsl(0_0%_100%/0.07)] dark:border-[hsl(0_0%_100%/0.10)] (exact card values from CSS). Light: bg-[hsl(0_0%_100%/0.62)] border-[hsl(220_20%_20%/0.10)] (exact card values). Keep backdrop-blur-xl. Add the same shadow as the card (the card uses the default shadow-lg from DialogContent base class which is fine, but we can add the card-like soft shadow). 4. CTA buttons match homepage pill system "Share via…" button: apply classes cta-primary + cta-content (the exact same CSS classes used by homepage CTAs). This gives it rounded-full, min-height: 52px, backdrop-blur-xl, correct dark/light opacity hierarchy. It's already the "primary" tier — same visual weight as "Download Resume". Keep Share2 icon + text inside a <span className="cta-content">. "Copy link" button: apply cta-secondary + cta-content — neutral glass style, no blue. Same pill shape, same height, clearly clickable. 5. QR panel Keep solid white bg-white with rounded-2xl. Reduce QR size from 160 to 148 to fit the tighter modal, still easily scannable. Reduce padding from p-4 to p-3. File changes Only src/components/ShareButton.tsx (modal section, lines 60-104). The floating button (lines 41-58) stays untouched.  
  
A) `src/components/ShareButton.tsx`

### 1) DialogContent: sostituisci lo shadow con quello “card-matched” (sintassi HSL safe)

Trova il `DialogContent` del Share modal e **rimuovi** qualsiasi `shadow-lg / shadow-xl` (o simili).  
Poi imposta/aggiungi **queste classi** (in questo ordine va bene):

```
shadow-none dark:shadow-none
shadow-[0_8px_40px_hsl(220_30%_50%_/_0.08),0_1px_3px_hsl(220_30%_50%_/_0.04)]
```

✅ Risultato:

- Light theme: shadow identico alla `.liquid-glass-card`
- Dark theme: nessuna shadow (come la card)

> Nota: se vuoi mantenerla “light-only” in modo esplicito, puoi anche scrivere:  
>
> `shadow-none dark:shadow-none light:shadow-[...]`  
>
> ma in Tailwind non esiste `light:` di default, quindi la soluzione sopra è quella corretta.

---

### 2) Copy link: aumenta leggibilità testo

Dove hai il bottone “Copy link”, cambia il testo da:

- `text-foreground/80` → `text-foreground/90 dark:text-white/90`

Quindi il pezzo diventa:

```
text-foreground/90 dark:text-white/90
```

---

## B) `src/hooks/use-toast.ts`

### 3) Toast auto-dismiss a 1.5s (globale)

Trova:

```
const TOAST_REMOVE_DELAY = 1000000
```

e sostituisci con:

```
const TOAST_REMOVE_DELAY = 1500
```

✅ Risultato: il toast “Copied” sparisce dopo ~1.5s.

---

## Riepilogo “diff” minimale

- **ShareButton.tsx**
  - DialogContent: `shadow-none dark:shadow-none shadow-[0_8px_40px_hsl(220_30%_50%_/_0.08),0_1px_3px_hsl(220_30%_50%_/_0.04)]`
  - Copy link text: `text-foreground/90 dark:text-white/90`
- **use-toast.ts**
  - `TOAST_REMOVE_DELAY = 1500`