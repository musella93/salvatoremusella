

## Plan: Harden Share Modal CTA Logic

**File:** `src/components/ShareButton.tsx` (only file modified)

### 1. Copy link — robust fallback chain

Replace `handleCopyLink` with:

1. Try `navigator.clipboard.writeText(SHARE_URL)` if available
2. Fallback: create hidden `<textarea>`, select, run `document.execCommand("copy")` — treat `=== false` as failure, remove element in `finally`
3. If both fail → error toast: "Could not copy link" / "Please copy the URL manually."

### 2. Copy success — inline feedback as primary confirmation

- Add `copied` state (`useState(false)`) + `useRef` for timeout cleanup via `useEffect`
- On success: set `copied = true`, reset after 800ms
- Button label swaps: `"Copy link"` → `"Copied ✓"`
- Remove the existing success toast (keep only error toast)

### 3. Share — distinguish cancel vs real error (safe check)

Update `handleNativeShare` catch block with optional chaining:
- `e?.name === "AbortError"` → silent, do nothing (handles non-standard error objects safely)
- Any other error → toast: title "Couldn't open share options", description "Please use Copy link instead."

### 4. No changes to

- Share button visibility logic (hidden when `navigator.share` unsupported)
- Classes, dimensions, QR, modal layout, dark/light styling, floating button
- SEO, metadata, structured data

