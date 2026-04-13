<div align="center"><img src="https://github.com/user-attachments/assets/91ce06ce-9307-423e-973c-0e6a26a1abef" width="100%" alt="logo" /></div>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Grommet](https://img.shields.io/badge/Grommet-UI-7D4CDB?style=for-the-badge&logo=grommet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## Site Features

- Full-screen background image (responsive AVIF/WebP) or flat colour fallback
- Responsive images and site layout
- Vimeo video embed (16:9, optional)
- All content controlled via `.env` — no code changes needed to update the page
- pre-launch sandbox and full release sites

## Stack

- **[Vite](https://vitejs.dev/)** – build tool
- **[React](https://react.dev/)** (JSX) – UI
- **[Grommet](https://v2.grommet.io/)** – component library / layout
- **[GSAP](https://gsap.com/)** – button hover animation
- **[sharp](https://sharp.pixelplumbing.com/)** – image pre-processing script
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** – deployment

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

   To preview the holding page (logo only):

   ```
   npm run dev:holding
   ```

## Image assets

Responsive images (logo, background, character, wishlist button) live in `public/images/` and are generated from source PNGs:

1. Drop source PNGs into `site_images/masters/`
2. Run the pre-processor:
   ```
   node generate-bg-images.js
   ```
   This outputs AVIF + WebP variants at 800 / 1280 / 1600 / 1920px widths into `public/images/`.

The component `ResponsiveImage.jsx` uses these to serve the most efficient media for different screen resolutions. 

## Deploy

```bash
# Develop locally (full launch site)
npm run dev

# Develop locally (holding page — logo only)
npm run dev:holding

# Deploy the full launch site to staging preview channel (expires 7 days)
npm run deploy:staging

# Deploy the holding page to staging preview channel (expires 7 days)
npm run build:holding && firebase hosting:channel:deploy staging --expires 7d --project tls-bicho-peck-launch

# Deploy holding page to production (logo only, no video or CTA)
npm run deploy:holding

# Deploy full launch site to production
npm run deploy
```

Builds to `dist/` and pushes to Firebase Hosting. Requires `firebase-tools` installed globally and authenticated via `firebase login`.

The holding and production builds are driven by separate env files (`.env.holding` and `.env`) — no code changes needed to switch between them.

## Holding Site

To allow domain binding, we are able to deploy a clean holding page to the site, ready for the full deploy later on

<div align="center"><img src="https://github.com/user-attachments/assets/c2b0c321-0e8b-4154-9696-c8bcf608bc43" width="70%" alt="holding site" /></div>

## Launch Site

The launch site can be deployed to a `staging` link via the command `npm run deploy:staging` before full deployment.

<div align="center"><img src="https://github.com/user-attachments/assets/08e02c28-c83c-4286-9992-28aab536b2d0" width="70%" alt="launch site" /></div>

## Environment variables

Copy `.env.example` to `.env`. All image values are bare filenames (no extension) matching files in `public/images/`.

For the holding page, copy `.env.holding` — `VITE_WISHLIST_IMAGE`, `VITE_VIMEO_ID` are left blank so those elements are hidden.



| Variable | Description | Default |
|---|---|---|
| `VITE_TARGET_URL` | Redirect URL for the main CTA | `https://example.com` |
| `VITE_BG_COLOR` | Background colour fallback | `#ffb524` |
| `VITE_TEXT_COLOR` | Text colour | `#ff003c` |
| `VITE_USE_BG` | Single static background image name from `public/images/` | *(flat colour)* |
| `VITE_BG_LAYERS` | Comma-separated `name:depth` pairs for parallax layers e.g. `PX01_LAYER:0.1,PX02_LAYER:0.4,PX03_LAYER:0.9` — overrides `VITE_USE_BG` | *(none)* |
| `VITE_BG_ZOOM` | Scale applied to moving parallax layers to prevent edge bleed | `1.05` |
| `VITE_LOGO_IMAGE` | Logo image name | *(bundled fallback)* |
| `VITE_LOGO_WIDTH` | Max logo width | `400px` |
| `VITE_WISHLIST_IMAGE` | Wishlist/CTA button image name | *(hidden)* |
| `VITE_WISHLIST_WIDTH` | Max wishlist image width | `400px` |
| `VITE_VIMEO_ID` | Vimeo video ID (numbers only) | *(video hidden)* |
| `VITE_TEXT_BLOCK` | Text shown below button | *(hidden)* |
| `VITE_REDIRECT_ALL` | Click anywhere to redirect | `false` |

<div align="center"><img src="https://github.com/user-attachments/assets/db00511a-1975-4d27-8c42-421a6f20b770" width="30%" alt="logo" /></div>

