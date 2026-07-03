import React, { useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Text, Grommet } from "grommet";
import { gsap } from "gsap";
import { BackgroundBox } from "./BackgroundBox";
import { ResponsiveImage } from "./ResponsiveImage";
import launchImage from "./assets/logo.png";
import PressKit from "./PressKit";

// Configurable via environment variables
const TARGET_URL = import.meta.env.VITE_TARGET_URL || "https://example.com";
const BG_COLOR = import.meta.env.VITE_BG_COLOR || "#ffb524";
const TEXT_COLOR = import.meta.env.VITE_TEXT_COLOR || "#ff003c";
const BG_IMAGE = import.meta.env.VITE_USE_BG || "";
const LOGO_IMAGE = (import.meta.env.VITE_LOGO_IMAGE || "").replace(/\.[^.]+$/, "");
const WISHLIST_IMAGE = (import.meta.env.VITE_WISHLIST_IMAGE || "").replace(/\.[^.]+$/, "");
const LOGO_WIDTH = import.meta.env.VITE_LOGO_WIDTH || "400px";
const WISHLIST_WIDTH = import.meta.env.VITE_WISHLIST_WIDTH || "400px";
const VIMEO_ID = import.meta.env.VITE_VIMEO_ID || "";
const TEXT_BLOCK = import.meta.env.VITE_TEXT_BLOCK || "";
const REDIRECT_ALL = import.meta.env.VITE_REDIRECT_ALL === "true";

// Strip file extension if present — component builds its own paths
const BG_NAME = BG_IMAGE.replace(/\.[^.]+$/, "");

// Zoom applied to moving parallax layers to prevent edge bleed
const BG_ZOOM = parseFloat(import.meta.env.VITE_BG_ZOOM) || 1.05;

// Parse VITE_BG_LAYERS: comma-separated "name:depth" pairs
// e.g. "PX01_LAYER:0.1,PX02_LAYER:0.4,PX03_LAYER:0.9"
const BG_LAYERS_RAW = import.meta.env.VITE_BG_LAYERS || "";
const BG_LAYERS = BG_LAYERS_RAW
  ? BG_LAYERS_RAW.split(",").map(entry => {
      const [n, d] = entry.trim().split(":");
      return { name: n.trim(), depth: parseFloat(d) || 0 };
    })
  : null;

const background = (BG_NAME || BG_LAYERS) ? undefined : BG_COLOR;

// Use BackgroundBox for image bg (layers or single), plain Box for colour bg
const OuterBox = (BG_NAME || BG_LAYERS) ? BackgroundBox : Box;

const theme = {
  global: {
    font: {
      family: "'Anta', sans-serif",
    },
    body: {
      extend: "overflow: hidden;",
    },
  },
};

const handleLaunch = () => {
  window.location.href = TARGET_URL;
};

function bounceTween(el) {
  gsap.killTweensOf(el);
  gsap.timeline()
    .to(el, { scale: 1.13, duration: 0.12, ease: "power2.out" })
    .to(el, { scale: 1,    duration: 0.8,  ease: "elastic.out(1, 0.35)" });
}

function useDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(() => window.matchMedia("(min-width: 1024px) and (min-height: 680px)").matches);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 680px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

function App() {
  const bounceRef = useRef(null);
  const videoRef = useRef(null);
  const isDesktop = useDesktop();

  // Logo: 25% smaller on desktop
  const logoBase = isDesktop ? "clamp(200px, 25vw, 300px)" : "clamp(260px, 80vw, 400px)";
  const logoW = `min(${logoBase}, 36svh)`;

  // Video: 50% larger on desktop
  const videoW = isDesktop ? "clamp(260px, 55vw, 720px)" : "clamp(260px, 80vw, 420px)";

  // CTA unchanged
  const ctaBase = "clamp(260px, 80vw, 420px)";
  const ctaW = `min(${ctaBase}, 38svh)`;

  return (
    <Routes>
      <Route path="/" element={
        <Grommet theme={theme} full>
          <OuterBox
            fill
            name={BG_LAYERS ? undefined : (BG_NAME || undefined)}
            layers={BG_LAYERS || undefined}
            zoom={BG_ZOOM}
            onClick={REDIRECT_ALL ? handleLaunch : undefined}
            direction="column"
            align="center"
            justify="center"
            gap="20px"
            pad="16px"
            background={background}
            style={{ overflow: "hidden", boxSizing: "border-box", cursor: REDIRECT_ALL ? "pointer" : undefined }}
          >
            {/* Logo */}
            {LOGO_IMAGE ? (
              <ResponsiveImage
                name={LOGO_IMAGE}
                alt="TLS Bicho Peck logo"
                style={{ width: logoW, flexShrink: 0, lineHeight: 0 }}
              />
            ) : (
              <img
                src={launchImage}
                alt="TLS Bicho Peck logo"
                style={{ width: logoW, height: "auto", display: "block", flexShrink: 0 }}
              />
            )}

            {/* Video */}
            {VIMEO_ID && (
              <div
                style={{
                  width: videoW,
                  aspectRatio: "16 / 9",
                  flexShrink: 0,
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  lineHeight: 0,
                }}
                onPointerDown={() => videoRef.current?.focus()}
              >
                <iframe
                  ref={videoRef}
                  src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0&dnt=1&autoplay=1&muted=0`}
                  style={{ display: "block", width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Launch video"
                />
              </div>
            )}

            {/* CTA */}
            {WISHLIST_IMAGE && (
              <Button
                plain
                focusIndicator={false}
                onClick={handleLaunch}
                a11yTitle="Wishlist now"
                style={{ flexShrink: 0 }}
              >
                <div ref={bounceRef} onMouseEnter={() => bounceTween(bounceRef.current)} style={{ display: "block", lineHeight: 0 }}>
                  <ResponsiveImage
                    name={WISHLIST_IMAGE}
                    alt="Wishlist now"
                    style={{ width: ctaW, cursor: "pointer" }}
                  />
                </div>
              </Button>
            )}

            {TEXT_BLOCK && (
              <Text size="large" textAlign="center" color={TEXT_COLOR}>
                {TEXT_BLOCK}
              </Text>
            )}
          </OuterBox>
          <Link
            to="/press-kit"
            style={{
              position: "fixed",
              top: "16px",
              right: "16px",
              zIndex: 100,
              color: "#fa0f48",
              textDecoration: "none",
              fontSize: "18px",
              fontFamily: "'Anta', sans-serif",
              padding: "6px 12px",
              background: "#ffb523",
              borderRadius: "4px",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            Download Press Kit
          </Link>
        </Grommet>
      } />
      <Route path="/press-kit" element={<PressKit />} />
    </Routes>
  );
}

export default App;