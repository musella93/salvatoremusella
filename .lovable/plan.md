

## Problem

The Share modal appears off-center (pushed to the bottom) on mobile, likely due to the base `dialog.tsx` classes or parent `transform` interference. The `overflow-hidden` on DialogContent also prevents scrolling if content exceeds viewport height.

## Plan

**Single file change: `src/components/ShareButton.tsx`** (lines 59-67, the DialogContent className)

Replace the current DialogContent className with one that:

1. **Forces centering** with `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` (already in base dialog, but we ensure no override breaks it)
2. **Changes `overflow-hidden` → `overflow-y-auto`** so content scrolls if it exceeds viewport
3. **Adds `max-h-[calc(100dvh-2rem)]`** to prevent the modal from being taller than the viewport (using `dvh` for iOS safe behavior)
4. **Adds `pb-[max(1.25rem,env(safe-area-inset-bottom))]`** for safe-area padding on notched devices
5. **Updates width to `w-[min(92vw,420px)]`** and removes the old `max-w-[min(92vw,380px)]`
6. **Keeps all existing glass/ring/before classes intact**

No other files or components are touched.

