Files added/modified as placeholders:

- favicon.svg — valid SVG placed (use as vector favicon).
- favicon.ico — small placeholder data present; replace with a proper multi-size ICO (16x16 + 32x32) built from PNG sources.
- favicon-16x16.png — placeholder base64 data (small PNG). Replace with a real 16x16 transparent PNG.
- favicon-32x32.png — placeholder base64 data (small PNG). Replace with a real 32x32 PNG.
- apple-touch-icon.png — placeholder base64 data (small PNG). Replace with a 180x180 PNG for iOS.
- android-chrome-192x192.png — placeholder base64 data (small PNG). Replace with 192x192 PNG.
- android-chrome-512x512.png — placeholder base64 data (small PNG). Replace with 512x512 PNG.

Why placeholders were used:
- The verification requested actual files to avoid 404s. This commit creates non-empty files so browsers/devtools stop reporting missing assets.
- The editor environment here cannot reliably synthesize production-quality binary images; these files should be replaced with proper binary icons (generated from the project's logo) before production.

How to replace with real images (recommended):
1. Design or export PNGs at exact sizes (16x16, 32x32, 192x192, 512x512, 180x180).
2. Create a multi-size ICO (include 16x16 and 32x32). Tools: ImageMagick, Figma, https://favicon.io/ or https://realfavicongenerator.net/.
3. Overwrite the placeholder files in `public/` with the binary images (not base64/text).
4. Optionally optimize images (<10KB each) for web.

Verification after replacing:
- Serve the app locally (e.g., `npm run dev`) and check Network tab for 200 on each icon URL.
- Confirm PWA install in Chrome DevTools works and shows correct icons.
