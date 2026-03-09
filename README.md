# TLS Bicho Peck – Launch Page

A minimal redirect landing page for the TLS Bicho Peck experience. Built with Vite + React and deployed to Firebase Hosting.

## What it does

Displays a branded page with a logo, an animated click-to-launch button, and a short prompt. Clicking the button redirects the user to a configurable target URL.

## Stack

- **Vite** – build tool
- **React** (JSX) – UI
- **Grommet** – component library / layout
- **Firebase Hosting** – deployment

## Setup

1. Copy `.env.example` to `.env` and fill in the values:

   ```
   VITE_TARGET_URL=https://your-redirect-url.com
   VITE_BG_COLOR=#ffb524
   VITE_TEXT_COLOR=#ff003c
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run locally:

   ```
   npm run dev
   ```

## Deploy

```
npm run deploy
```

Builds to `dist/` and pushes to Firebase Hosting.
