# IMAGE MANIFEST

All assets downloaded from Figma into `public/assets/images/`. Status: ✅ = downloaded & in use.

| File | Dimensions | Size | Used in | Description | Status |
|------|-----------|------|---------|-------------|--------|
| `hero-bg.jpg` | 2940×1484 | 1.5 MB | Hero | Studio shot — Евелин seated + studio light + "ТЪРСИ СЕ / ЗВЕЗДЕН БРОКЕР" poster; used as cover background under a dark overlay (user-supplied) | ✅ |
| `final-cta-bg.jpg` | 2880×2034 | 1.5 MB | Final CTA | Studio scene with the "ТЪРСИ СЕ / ЗВЕЗДЕН БРОКЕР" poster on the right; cover background under a left-heavy dark overlay behind the form (user-supplied) | ✅ |
| `logo-inclusive.svg` | vector | 4 KB | Navbar, Footer | INclusive wordmark (gold "IN" roof + white "CLUSIVE") | ✅ |
| `logo-tagline.svg` | vector | 5 KB | Navbar, Footer | "недвижими имоти" tagline lockup | ✅ |
| `hero-arrow.svg` | 8×8 | 0.3 KB | Hero eyebrow badge | Small gold arrow glyph | ✅ |
| `nova-logo.png` | 1024×269 | 27 KB | Hero | NOVA TV logo (white) | ✅ |
| `film-strip.svg` | vector | 23 KB | Info, Process, Footer | Decorative film-strip band (reused) | ✅ |
| `what-is-it-collage.png` | 505×554 | 440 KB | What-is-it | Flattened collage (calendar, megaphone, polaroids, logo, handwritten "Запиши се за кастинг") | ✅ |
| `clapperboard.png` | 736×736 | 115 KB | What-is-it | Decorative film clapperboard (rotated) | ✅ |
| `video-scene.png` | 1470×1047 | 1.66 MB | Video | Composited projector-room scene with Евелин on screen | ✅ |
| `who-evelin.png` | 1084×1070 | 1.76 MB | Who-we-want | Евелин seated holding "TOP" paddle | ✅ |

## Notes
- **Collages flattened:** the "What is it" collage and the "Video" projector scene are multi-layer
  compositions in Figma (7+ rotated images each). They were rendered to single flat PNGs via the Figma
  screenshot API for pixel-accuracy and robustness, rather than re-stacking each layer in CSS.
- **Icons drawn inline:** benefit icons, info/footer/contact icons, and step arrows are hand-authored
  inline SVGs (gold, `currentColor`) — no raster downloads needed.
- **Glows & dividers** are pure CSS (radial gradients / gold gradient bars).

## Optimization follow-up
`hero-bg.jpg` (1.5 MB), `final-cta-bg.jpg` (1.5 MB), `video-scene.png` (1.66 MB) and
`who-evelin.png` (1.76 MB) are large. `hero-bg.jpg` is the LCP image, so it matters most —
recommend converting these to **WebP/AVIF** (or Astro `<Image>` with the Sharp pipeline) to cut
~70% of their weight before launch.
