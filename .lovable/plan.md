

## Plan: CTA Stack Refinements

### 1. Micro-accent on primary CTA

Add a faint `box-shadow` to `.cta-primary` only — a 1px outer ring glow:
- **Dark**: `box-shadow: 0 0 0 1px hsl(0 0% 100% / 0.06)`; bump bg from `0.16` → `0.18`
- **Light**: `box-shadow: 0 0 0 1px hsl(0 0% 0% / 0.04)`; bump bg from `0.08` → `0.10`

Hover/active states adjusted proportionally (+0.02 each).

### 2. Fixed icon column via grid

Replace `.cta-content` (line 415-417):

```css
.cta-content {
  display: grid;
  grid-template-columns: 1rem 1fr;
  gap: 0.625rem;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}
```

All icons are `w-4 h-4` (= 1rem), so 1rem column is a perfect fit. Labels all start at the same X position. `width: fit-content` + `margin: 0 auto` keeps the block centered.

### File changed

**`src/index.css`** only — no other files.

