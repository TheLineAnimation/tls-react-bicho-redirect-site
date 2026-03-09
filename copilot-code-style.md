# Copilot Code Style Guide – TLS Bicho Peck Launch Page

This document defines the coding style rules that GitHub Copilot should follow when generating code in this repository.

The goal is to keep the code:
- Minimal
- Readable
- Consistent
- Easy to maintain

---

## JavaScript Style

Use modern ES modules.

Preferred:
    import React from "react";

Avoid:
    const React = require("react");

---

## React Rules

Use functional components only.

Correct:
    function App() {
        return (...);
    }

Avoid:
    class App extends React.Component { ... }

---

## JSX Formatting

Follow consistent JSX formatting.

Example:
    <Box
        fill
        align="center"
        justify="center"
        gap="medium"
        pad="large"
    >
        <Heading level={1}>
            TLS Bicho Peck
        </Heading>

        <Button onClick={handleLaunch}>
            <Image src="/src/assets/launch-image.png" />
        </Button>

        <Text size="large">
            Click the image to launch the experience
        </Text>
    </Box>

Rules:
- Each prop on its own line when components become large
- Nested components indented cleanly
- Avoid deeply nested JSX

---

## Component Design

Prefer small components.

Maximum component size: ~50 lines

If larger, split into:
- LaunchButton
- LaunchHeader
- LaunchText

Avoid over-engineering.

---

## Constants

Declare constants at the top of the file.

Example:
    const TARGET_URL = "https://example.com";

Avoid hardcoding URLs inside JSX.

---

## Event Handlers

Use arrow functions.

Example:
    const handleLaunch = () => {
        window.location.href = TARGET_URL;
    };

Avoid inline anonymous functions inside JSX when logic becomes complex.

---

## Imports

Order imports as follows:
1. React
2. External libraries
3. Local modules
4. Assets

Example:
    import React from "react";
    import { Box, Heading, Button, Image, Text } from "grommet";
    import { app } from "./firebase";
    import launchImage from "./assets/launch-image.png";

---

## Grommet Usage

Preferred layout components:
- Box
- Heading
- Button
- Image
- Text

Avoid mixing external UI frameworks.

Use Grommet for:
- Layout
- Typography
- Buttons
- Spacing

---

## Responsive Layout

Layout must adapt automatically.

Use flex layout via Grommet:
    <Box
        fill
        align="center"
        justify="center"
        gap="medium"
    >

Images should scale using:
    <Image
        fit="contain"
        style={{ maxWidth: "400px", width: "70vw" }}
    >

Avoid fixed positioning or absolute layout.

---

## Background Handling

Solid color:
    <Box fill background="light-2">

Background image:
    <Box
        fill
        background={{
            image: "url('/bg.jpg')",
            size: "cover",
            position: "center"
        }}
    >

---

## Code Simplicity

Keep project small.

- React files: 2–3
- Total code size: ~150 lines

If code grows too large, simplify design.

---

## Comments

Use short comments explaining intent.

Example:
    // Redirect user to launch page

Avoid obvious comments that just repeat the code.

---

## Performance

Priorities:
- Fast load
- Small bundle size
- Minimal dependencies

Avoid adding libraries unless necessary.