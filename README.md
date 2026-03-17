# Deaths of Peck

![logo](https://github.com/the-line-studio/tls-bicho-test-site/raw/main/public/images/WEB_logo-800.webp)

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Grommet](https://img.shields.io/badge/Grommet-UI-7D4CDB?style=for-the-badge&logo=grommet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

A minimal launch landing page for Deaths of Peck. Built with Vite + React + Grommet, deployed to Firebase Hosting.

## What it does

- Full-screen background image (responsive AVIF/WebP) or flat colour fallback
- Responsive logo image
- Vimeo video embed (16:9, optional)
- Decorative character image
- Animated wishlist button (GSAP elastic bounce on hover)
- All content controlled via `.env` — no code changes needed to update the page

## Stack

- **Vite** – build tool
- **React** (JSX) – UI
- **Grommet** – component library / layout
- **GSAP** – button hover animation
- **sharp** – image pre-processing script
- **Firebase Hosting** – deployment

## Setup

1. Copy `.env.example` to `.env` and fill in the values (see [Environment variables](#environment-variables) below)

2. Install dependencies:

   ```
   npm install
   ```

3. Run locally:

   ```
   npm run dev
   ```

## Image assets

Responsive images (logo, background, character, wishlist button) live in `public/images/` and are generated from source PNGs:

1. Drop source PNGs into `site_images/masters/`
2. Run the pre-processor:
   ```
   node generate-bg-images.js
   ```
   This outputs AVIF + WebP variants at 800 / 1280 / 1600 / 1920px widths into `public/images/`.

## Deploy

```bash
# Deploy to staging preview channel (expires 7 days)
npm run deploy:staging

# Deploy to live production
npm run deploy
```

Builds to `dist/` and pushes to Firebase Hosting. Requires `firebase-tools` installed globally and authenticated via `firebase login`.

## Environment variables

Copy `.env.example` to `.env`. All image values are bare filenames (no extension) matching files in `public/images/`.

| Variable | Description | Default |
|---|---|---|
| `VITE_TARGET_URL` | Redirect URL for the main CTA | `https://example.com` |
| `VITE_BG_COLOR` | Background colour fallback | `#ffb524` |
| `VITE_TEXT_COLOR` | Text colour | `#ff003c` |
| `VITE_USE_BG` | Background image name from `public/images/` | *(flat colour)* |
| `VITE_LOGO_IMAGE` | Logo image name | *(bundled fallback)* |
| `VITE_LOGO_WIDTH` | Max logo width | `400px` |
| `VITE_BUTTON_IMAGE` | Decorative character image name | *(bundled fallback)* |
| `VITE_BUTTON_WIDTH` | Max character image width | `300px` |
| `VITE_WISHLIST_IMAGE` | Wishlist button image name | *(hidden)* |
| `VITE_WISHLIST_WIDTH` | Max wishlist image width | `400px` |
| `VITE_VIMEO_ID` | Vimeo video ID (numbers only) | *(video hidden)* |
| `VITE_TEXT_BLOCK` | Text shown below button | *(hidden)* |

