# Plan: Mouse & Gyro Parallax Background

## Context
- Site: d:\repos\tls-bicho-test-site
- Current BG: single `WEB_BG` served via `BackgroundBox.jsx`
- GSAP already installed (v3.14.2)
- Existing image pipeline: AVIF + WebP at 4 breakpoints (800, 1280, 1600, 1920)

## User Requirements
- Split WEB_BG into 3-4 layered images with alpha (production task)
- Only background layers parallax — UI (logo, button) stays fixed
- Desktop: mouse tracking
- Mobile: gyroscope/device tilt
- No external parallax library — use GSAP (already installed)

## Phase 0: Asset Creation (production task, prerequisite)
- we should branch this off in source control and merge back into main when ready, to avoid blocking other work
- Production creates 3-4 alpha-channel layer images from the baked WEB_BG
  - e.g. PX01_LAYER (slowest), PX02_LAYER, PX03_LAYER (fastest)

- Each layer run through scripts/generate-bg-images.js to create AVIF+WebP at 4 breakpoints
- Naming convention: PX01_LAYER, PX02_LAYER, PX03_LAYER (or similar) 
- PX numbering system indicates depth: lower number = slower movement (farther back), higher number = faster movement (closer to viewer)

## Phase 1: Configuration
- Add VITE_BG_LAYERS env var: comma-separated "name:depth" pairs
  e.g. VITE_BG_LAYERS=PX01_LAYER:0.1,PX02_LAYER:0.4,PX03_LAYER:0.9
- Update .env.example
- Parse in App.jsx, pass as `layers` prop to BackgroundBox

## Phase 2: BackgroundBox.jsx refactor
- Accept new `layers` prop: array of { name, depth, alt? }
- Maintain backward compat: if `name` passed (old API), wrap as [{ name, depth: 0 }]
- Each layer: absolutely positioned <picture> element, own React ref
- GSAP quickTo() per layer ref for smooth lerp (x and y setters)
- maxOffset constant (e.g. 20px at depth 1.0) — each layer offset = depth * maxOffset * normalizedCoord

## Phase 3: Mouse tracking
- onMouseMove on outer Box in BackgroundBox
- Normalize: center = 0, edges = ±1
- gsap.quickTo(layerRef, "x", { duration: 0.6, ease: "power1.out" })
- gsap.quickTo(layerRef, "y", { duration: 0.6, ease: "power1.out" })
- resetOnLeave: tween back to 0,0 on mouse leave

## Phase 4: Gyroscope (mobile)
- DeviceOrientationEvent listener
- gamma (left-right tilt, -90 to 90) → x offset
- beta (front-back tilt, clamped range) → y offset
- iOS 13+: DeviceOrientationEvent.requestPermission() — trigger on first touch event
- Clamp input values, same GSAP quickTo calls as mouse path
- Only activate if no pointer device (matchMedia hover:none)

## Files to modify
- src/BackgroundBox.jsx — main implementation
- src/App.jsx — parse VITE_BG_LAYERS, pass layers prop
- .env + .env.example — new VITE_BG_LAYERS variable

## Verification
1. Dev: `npm run dev` — mouse moves layers at different speeds on desktop
2. Check layer stacking order (z-index) and cover behaviour
3. Mobile: test gyro on real device or Chrome DevTools sensor emulator
4. Performance: confirm 60fps, no jank (GSAP uses RAF internally)
5. Fallback: if VITE_BG_LAYERS unset, site behaves identically to current
