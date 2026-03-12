

## Plan: Card Vertical Balance Refinement

### Change
Reduce the top padding inside the card by one additional step to raise the content block slightly.

**Current (line 54):**
```tsx
className="relative w-full max-w-[440px] liquid-glass-card px-8 pt-5 pb-5 md:px-10 md:pt-7 md:pb-6 space-y-5"
```

**After:**
```tsx
className="relative w-full max-w-[440px] liquid-glass-card px-8 pt-4 pb-5 md:px-10 md:pt-6 md:pb-6 space-y-5"
```

### Preserved
- Footer text: `© 2026 · Designed & developed by Salvatore Musella`
- Social icons to footer spacing: `gap-3` on line 183
- All colors, typography, button sizes, and styling remain unchanged
- Responsive behavior maintained

### File changed
- `src/pages/Index.tsx` only

