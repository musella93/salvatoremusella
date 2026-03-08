

## Plan: Round Favicon

I cannot programmatically crop a JPG image to a circle with transparency — that requires image processing tools I don't have access to.

**Alternative approach**: Create an SVG favicon (`public/favicon.svg`) that uses a `<clipPath>` circle to display the existing `profile-hd.jpg` as a perfect circle with transparent corners. SVG favicons are supported by all modern browsers.

### Steps

1. **Create `public/favicon.svg`** — an SVG file (512×512 viewBox) that embeds the profile image inside a circular `<clipPath>`, producing a visually round favicon with transparent corners.

2. **Update `index.html`** — change `<link rel="icon">` to point to `/favicon.svg` with `type="image/svg+xml"`, and keep `<link rel="apple-touch-icon">` pointing to `/profile-hd.jpg` (Apple icons are auto-masked to rounded squares by iOS).

### Limitation
The SVG will reference the image via a relative path. This works perfectly as a browser favicon. If you need an actual `.png` file with circular crop (e.g. for other platforms), that would need to be created in an external image editor like Figma or Canva.

