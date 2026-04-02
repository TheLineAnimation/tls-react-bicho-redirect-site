import React, { useRef } from "react";
import { Box, Button, Text, Grommet } from "grommet";
import { gsap } from "gsap";
import { BackgroundBox } from "./BackgroundBox";
import { ResponsiveImage } from "./ResponsiveImage";
import launchImage from "./assets/logo.png";

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

const background = BG_IMAGE ? undefined : BG_COLOR;

// Use BackgroundBox for image bg, plain Box for colour bg
const OuterBox = BG_NAME ? BackgroundBox : Box;

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

function App() {
  const bounceRef = useRef(null);
  const videoRef = useRef(null);

  // All elements share the same column width for a consistent portrait stack
  const w = "clamp(260px, 80vw, 420px)";
  // Logo and CTA scale down on short screens via svh cap; logo gets an extra-aggressive cap
  const logoBase = "clamp(260px, 80vw, 400px)";
  const logoW = `min(${logoBase}, 36svh)`;
  const ctaW  = `min(${w}, 38svh)`;

  return (
    <Grommet theme={theme} full>
      <OuterBox
        fill
        name={BG_NAME || undefined}
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
              width: w,
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
    </Grommet>
  );
}

export default App;