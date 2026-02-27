

## Plan: Remove `canonical` and `og:url` from `index.html`

Looking at `index.html`, I need to remove exactly two tags:

1. **`<meta property="og:url" content="https://salvatoremusella.com/" />`** (line 18)
2. **`<link rel="canonical" ...>`** — not present in the current file, so nothing to remove here.

All other OG tags (`og:image`, `og:title`, `og:description`, `og:type`, `og:image:width`, etc.) and Twitter tags remain untouched.

### Steps

1. Remove the single line `<meta property="og:url" content="https://salvatoremusella.com/" />` from `index.html`.
2. Confirm there is no `<link rel="canonical">` tag (there isn't one currently).

