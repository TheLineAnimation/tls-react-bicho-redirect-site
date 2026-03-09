

# Peck – Launch Page

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Grommet](https://img.shields.io/badge/Grommet-UI-7D4CDB?style=for-the-badge&logo=grommet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

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
