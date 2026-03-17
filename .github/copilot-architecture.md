# Copilot Architecture Guide -- TLS Bicho Peck Launch Page

This document defines the architecture for the project so GitHub Copilot
generates clean, predictable React code instead of overly complex
structures.

The goal is a very small, maintainable landing page.

------------------------------------------------------------------------

# Architectural Principles

1.  Single page application
2.  Minimal component tree
3.  Functional React components only
4.  No global state libraries
5.  Responsive layout via Grommet
6.  Simple redirect action

Avoid unnecessary abstraction.

------------------------------------------------------------------------

# Component Structure

App └── LaunchPage ├── Header ├── LaunchButton └── LaunchText

Components can live inside App.jsx unless complexity grows.

------------------------------------------------------------------------

# File Layout

src/ main.jsx App.jsx firebase.js assets/

No additional folders required.

------------------------------------------------------------------------

# main.jsx Responsibilities

-   Import React
-   Import ReactDOM
-   Import Grommet
-   Mount the app

Example:

import React from "react"; import ReactDOM from "react-dom/client";
import { Grommet } from "grommet"; import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
\<React.StrictMode\> `<Grommet>`{=html} `<App />`{=html}
`</Grommet>`{=html} \</React.StrictMode\> );

------------------------------------------------------------------------

# Launch Button

Button contains an image and redirects on click.

Example:

const TARGET_URL = "https://example.com";

const handleLaunch = () =\> { window.location.href = TARGET_URL; };

------------------------------------------------------------------------

# Layout

Use Grommet Box for layout.

Example:

`<Box
  fill
  align="center"
  justify="center"
  gap="medium"
  pad="large"
>`{=html}

Render inside:

Heading Button Text

------------------------------------------------------------------------

# Responsive Behaviour

Image scaling example:

\<Image fit="contain" style={{ maxWidth: "400px", width: "70vw" }} /\>

------------------------------------------------------------------------

# Background Options

Solid colour:

`<Box fill background="light-2">`{=html}

Background image:

\<Box fill background={{ image: "url('/bg.jpg')", size: "cover",
position: "center" }} \>

------------------------------------------------------------------------

# Code Simplicity Rules

Do: - Use simple JSX - Keep components small - Use Grommet components

Do NOT: - Add routing - Add global state managers - Add CSS frameworks

------------------------------------------------------------------------

# Performance Goals

-   Very small bundle size
-   Fast load time
-   Minimal dependencies

Expected total React code: about 100--200 lines.
