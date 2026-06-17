# PROJECT BRIEF — INclusive Casting Landing Page

Auto-generated from Figma: `INclusive | Web Design`, frame **casting** (node `2168:111`).
File: https://www.figma.com/design/S5gmHfd896rwkeo8DkN0PU/INclusive-%7C-Web-Design?node-id=2168-111

## Overview
Single-page Bulgarian-language casting/recruitment landing page for **„Борба до ключ" 2** (NOVA TV) —
inviting candidates to join the INclusive real-estate team alongside Евелин Апостолов.

- **Framework:** Astro 5 (static output) — best SEO/AEO, fastest loads
- **Language:** Bulgarian (`<html lang="bg">`), Cyrillic
- **Frame width (desktop):** 1470px → `--size-container-ideal: 1470`
- **Content width:** 1248px (centered)

## Design Tokens

### Colors
| Token | Value | Use |
|-------|-------|-----|
| `--color-gray-100` | `#21232B` | Primary dark background |
| `--color-gray-80` | `#393C46` | Secondary dark / inputs |
| `--color-gray-40` | `#D8DBDE` | Light section background |
| `--color-gray-20` | `#EDEFF1` | Light text on dark / headings |
| `--color-gray-10` | `#F5F4EC` | Warm off-white body text on dark |
| `--color-gold-100` | `#C4952D` | Deep gold accent |
| `--color-gold-80` | `#DBBD6B` | Bright gold (CTA, borders, highlights) |
| `--color-gold-gradient` | `#C4952D → #DBBD6B → #C4952D` | Dividers, rules, outlined numerals |

### Typography
| Role | Font | Source | Fallback |
|------|------|--------|----------|
| Display / headings | **Le Havre** (`le-havre`) | Adobe Typekit kit `fas0rfi` | Montserrat |
| Body / UI | **Futura PT** (`futura-pt`) | Adobe Typekit kit `fas0rfi` | Manrope |

> ✅ **Real fonts are live** via the client's Adobe Typekit kit
> (`<link rel="stylesheet" href="https://use.typekit.net/fas0rfi.css">`, added in `Layout.astro`).
> Both verified to render Cyrillic. Montserrat/Manrope remain in the font stack as graceful
> fallbacks if Typekit is ever slow or blocked.
>
> ⚠️ **The kit ships one weight per family** — `le-havre` @ 400 and `futura-pt` @ 300 only.
> So all headings render at Regular and all body text at Light, regardless of the `font-weight`
> values in the CSS. If heavier UI text (e.g. bolder buttons) is wanted, the kit owner must add
> those weights in Adobe Fonts. Real Le Havre is condensed, so the hero display line uses the
> original 84px from Figma.

## Page Sections (top → bottom)
1. **Navbar** — logo, 5 nav links, outline CTA "Запиши се сега" (sticky; hamburger ≤991px)
2. **Hero** — "Стани звезден брокер в „Борба до ключ" 2 по NOVA" + gold CTA
3. **Info band** — film-strip with 3 facts (deadline 5 август · София · опит не е задължителен)
4. **What is it** — "Това е повече от кастинг" + photo collage + clapperboard
5. **Benefits** — "Какво печелиш?" 3×2 icon-card grid
6. **Video** — "Запознай се с Евелин" + projector-scene with play hotspot (opens lightbox)
7. **Who we want** — "Не търсим перфектно CV…" photo + 2×4 criteria grid + gold CTA cell
8. **Process** — "От кандидатура до място в отбора" 3 numbered steps
9. **Final CTA** — registration form (name, phone, email, CV upload, consent)
10. **Footer** — logo, nav, address/phone, gold copyright bar

## Application form / leads (Vercel + Vercel Blob + SkyGuru)
Mirrors the `casting-ralica` pipeline (CV-only). Deployed on **Vercel** (`@astrojs/vercel`):
- **Form** (`#kandidatstvai`) posts `multipart/form-data` to **`POST /api/apply`** (`src/pages/api/apply.ts`),
  a Vercel serverless function. Hidden fields capture **offline attribution** (`fbclid` → `fbc`, `_fbp`/`_fbc`
  cookies, UTMs, landing page, referrer).
- The function uploads the **CV** to **Vercel Blob** (`put(..., { access: 'public' })`, key `cv/<uuid>/<name>`) →
  gets a public URL, then forwards the lead (name, phone, email, CV link, UTMs, `fbclid`) to **SkyGuru**
  (`https://inclusive.skyguru.ai/api/v1/public/leads`, `form: "Casting Evelin"`). Success → redirect to **`/thank-you`**.
- **No on-page Meta Pixel** — attribution is offline/CAPI-style via the CRM (matches casting-ralica).
- CV size cap **4 MB** (Vercel serverless request-body limit ~4.5 MB).

### Deploy checklist (Vercel)
1. Import the `casting-evelin` GitHub repo into **Vercel** (auto-detects Astro).
2. **Connect a Vercel Blob store** to the project (Storage tab) — it auto-adds the `BLOB_READ_WRITE_TOKEN` env var
   the upload needs. No other env vars required.
3. Deploy. Then **Settings → Domains → add `casting.inclusive.bg`** and at your external DNS add
   `CNAME casting → cname.vercel-dns.com` (keeps the rest of `inclusive.bg` where it is; Vercel issues SSL).
4. The SkyGuru endpoint is `https://inclusive.skyguru.ai/api/v1/public/leads` (test link) — swap to the production leads URL before launch if it differs.
5. **Do a real end-to-end test submission** (uploads a real CV + creates a CRM lead) — routing, attribution
   capture and validation are verified, but no live lead was created.

## Known follow-ups
- **Video:** the play button opens a lightbox placeholder — drop in the real Евелин intro video URL.
- **Privacy link** in the footer points to `#` — set the real "Защита на личните данни" URL.
- **`og:image`** / favicon not yet provided — add a social share image + favicon.
- The deadline copy says **август 2026** (per the Figma); confirm the correct year.

## Commands
```
npm run dev      # local dev server (http://localhost:4321)
npm run build    # static build → dist/
npm run preview  # preview the production build
```
