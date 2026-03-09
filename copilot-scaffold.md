# Copilot Project Scaffold Instructions

These instructions guide GitHub Copilot to scaffold the entire project
automatically.

## Step 1 -- Create Vite Project

Run:

npm create vite@latest tls-bicho-peck-launch cd tls-bicho-peck-launch

Select: - Framework: React - Variant: JavaScript

Install dependencies:

npm install npm install grommet grommet-icons firebase

------------------------------------------------------------------------

## Step 2 -- Create Folder Structure

src/ App.jsx main.jsx firebase.js assets/ launch-image.png

------------------------------------------------------------------------

## Step 3 -- Setup Grommet Root

main.jsx should wrap the app in Grommet.

Example:

``` jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Grommet } from "grommet";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Grommet>
      <App />
    </Grommet>
  </React.StrictMode>
);
```

------------------------------------------------------------------------

## Step 4 -- Implement App Layout

App.jsx should contain:

-   Header
-   Image button redirect
-   Text field

Use:

Box\
Heading\
Button\
Image\
Text

Layout example:

``` jsx
<Box fill align="center" justify="center" gap="medium">
  <Heading level={1}>TLS Bicho Peck</Heading>

  <Button onClick={handleLaunch}>
    <Image src="/src/assets/launch-image.png" />
  </Button>

  <Text size="large">
    Click the image to launch the experience
  </Text>
</Box>
```

------------------------------------------------------------------------

## Step 5 -- Redirect Logic

``` javascript
const TARGET_URL = "https://example.com";

const handleLaunch = () => {
  window.location.href = TARGET_URL;
};
```

------------------------------------------------------------------------

## Step 6 -- Firebase Initialization

Create src/firebase.js and initialize Firebase using the provided
config.

The file should export the initialized app.

------------------------------------------------------------------------

## Step 7 -- Firebase Hosting Setup

Install Firebase CLI:

npm install -g firebase-tools

Login:

firebase login

Initialize hosting:

firebase init hosting

Select existing project: tls-bicho-peck-launch

Public directory: dist

Single page app: yes

------------------------------------------------------------------------

## Step 8 -- Build and Deploy

Run:

npm run build firebase deploy

Or:

npm run deploy

------------------------------------------------------------------------

## Optional Enhancements

Copilot may optionally add:

-   Hover animation on image button
-   Fade-in page load
-   Responsive image scaling
