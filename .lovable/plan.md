

## Plan: Update site images with new high-res photo

### Steps

1. **Copy the uploaded image to `public/`** as `public/profile-hd.jpg` for meta tags and favicon use, and also to `src/assets/` to replace the existing avatar.

2. **Update `index.html`**:
   - Change `og:image` and `twitter:image` meta tags to `https://salvatoremusella.com/profile-hd.jpg`
   - Add/update `<link rel="icon">` and `<link rel="apple-touch-icon">` to point to `/profile-hd.jpg`

3. **Replace `src/assets/avatar.jpg`** with the new high-res image so the in-page avatar also updates automatically (since `profile.ts` already imports it).

