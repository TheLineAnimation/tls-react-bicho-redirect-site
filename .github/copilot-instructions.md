# Copilot Instructions -- TLS Bicho Peck Launch Page

## Project Goal

Create a simple Vite + React website that acts as a launch landing page.

The page contains: - Header/title - Image button that redirects to a
URL - Text field displaying supporting text or instructions

The site should be minimal, responsive, and quick to deploy to Firebase
Hosting.

------------------------------------------------------------------------

## Technology Stack

  Technology     Requirement
  -------------- ----------------------------------------
  Build Tool     Vite
  Framework      React
  Language       JavaScript (JSX only)
  UI Library     Grommet
  Hosting        Firebase Hosting
  Firebase SDK   Modular v9+
  Styling        Grommet components + responsive layout

Do NOT use: - TypeScript - Redux - Next.js - Tailwind - Class components

Use React functional components only.

------------------------------------------------------------------------

## Project Structure

project-root │ ├─ index.html ├─ package.json ├─ vite.config.js │ ├─ src/
│ ├─ main.jsx │ ├─ App.jsx │ ├─ firebase.js │ └─ assets/ │
launch-image.png │ └─ firebase.json

------------------------------------------------------------------------

## Firebase Setup

Create src/firebase.js

``` javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBayR3p_lVvbYe9FobRc2xFG9ORUnPTank",
  authDomain: "tls-bicho-peck-launch.firebaseapp.com",
  projectId: "tls-bicho-peck-launch",
  storageBucket: "tls-bicho-peck-launch.firebasestorage.app",
  messagingSenderId: "118396603091",
  appId: "1:118396603091:web:a2aa4055debc053bf06226"
};

export const app = initializeApp(firebaseConfig);
```

Firebase is currently only required for hosting but should be
initialized for future expansion.

------------------------------------------------------------------------

## UI Layout

The page should be vertically and horizontally centered.

Structure:

Header\
Image Button\
Text Field

Use Grommet layout components.

Example structure:

``` jsx
<Grommet>
  <Box fill align="center" justify="center">
     <Heading />
     <Button>
        <Image />
     </Button>
     <Text />
  </Box>
</Grommet>
```

------------------------------------------------------------------------

## Header

Use:

``` jsx
<Heading level={1}>
TLS Bicho Peck
</Heading>
```

------------------------------------------------------------------------

## Image Button

Use a Grommet Button containing an Image.

When clicked:

``` javascript
window.location.href = TARGET_URL
```

Example:

``` javascript
const TARGET_URL = "https://example.com";
```

------------------------------------------------------------------------

## Text Field

Use:

``` jsx
<Text size="large">
Click the button above to launch the experience
</Text>
```

------------------------------------------------------------------------

## Responsive Behaviour

Support: - Desktop - Tablet - Mobile

Guidelines:

Image button:

max-width: 400px\
width: 70vw

Avoid fixed layouts.

------------------------------------------------------------------------

## Background Options

### Flat Colour

Example:

``` jsx
background="light-2"
```

### Background Image

``` jsx
background={{
  image: "url('/bg.jpg')",
  size: "cover",
  position: "center"
}}
```

------------------------------------------------------------------------

## Vite Setup

Create project:

npm create vite@latest

Template: react

Install dependencies:

npm install grommet grommet-icons firebase

------------------------------------------------------------------------

## Firebase Hosting Configuration

Create firebase.json

``` json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

------------------------------------------------------------------------

## Deployment Script

Add to package.json:

``` json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && firebase deploy"
  }
}
```

Deploy using:

npm run deploy

------------------------------------------------------------------------

## Visual Design Goals

-   Minimal launch page
-   Large call-to-action button
-   Centered layout
-   Responsive scaling
-   Fast loading

Avoid complex navigation or multiple pages.
