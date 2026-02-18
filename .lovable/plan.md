
The plan is to regenerate the Social (Open Graph) image to adjust the spacing between the avatar and the name, while also fixing a persistent typo in the location line and ensuring the background gradient remains perfectly consistent with the business card's dark theme.

### Steps for Social Image Update (OG Image)

1.  **Reference Avatar and Colors**:
    - Use the existing `src/assets/avatar.jpg` as the central image.
    - Extract the precise gradient colors from `src/index.css` to ensure the background matches the live site exactly (a dark navy gradient ranging from `#05070F` to `#0D101C`).

2.  **Image Generation Specifications**:
    - **Dimensions**: 1200x630 pixels.
    - **Background**: Smooth diagonal gradient (165 degrees) using the dark navy tones of the site.
    - **Avatar**: Circular profile photo, centered horizontally, with **no border** (as requested in the previous turn).
    - **Text Content**:
        - **Name**: "Salvatore Musella" (White, bold, high contrast).
        - **Role**: "Digital Product Manager" (White at ~85% opacity).
        - **Location**: "Lugano, Switzerland" (White at ~60% opacity). **Note**: I will ensure "Switzerland" is spelled correctly this time, fixing the previous "Switzerand" typo.
    - **Layout & Spacing**:
        - Set the vertical gap between the bottom of the circular avatar and the top of the name text to exactly **16px**.
        - Maintain generous safe margins on the sides for optimal display on LinkedIn, WhatsApp, and X (Twitter).

3.  **Deployment**:
    - Replace `public/og-image.png` with the newly generated asset.

### Technical Details
- **Tool**: Image generation model (Gemini 2.5 Flash Image) to process the avatar and render the typography precisely.
- **Consistency**: By using the same gradient HSL values converted to Hex, the transition from social preview to the actual website will feel seamless.
