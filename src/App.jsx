import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Text, Grommet } from "grommet";
import { gsap } from "gsap";
import { BackgroundBox } from "./BackgroundBox";
import { ResponsiveImage } from "./ResponsiveImage";
import launchImage from "./assets/logo.png";
import buttonImage from "./assets/cta.gif";

// Configurable via environment variables
const TARGET_URL = import.meta.env.VITE_TARGET_URL || "https://example.com";
const BG_COLOR = import.meta.env.VITE_BG_COLOR || "#ffb524";
const TEXT_COLOR = import.meta.env.VITE_TEXT_COLOR || "#ff003c";
const BG_IMAGE = import.meta.env.VITE_USE_BG || "";
const LOGO_IMAGE = (import.meta.env.VITE_LOGO_IMAGE || "").replace(/\.[^.]+$/, "");
const BUTTON_IMAGE = (import.meta.env.VITE_BUTTON_IMAGE || "").replace(/\.[^.]+$/, "");
const WISHLIST_IMAGE = (import.meta.env.VITE_WISHLIST_IMAGE || "").replace(/\.[^.]+$/, "");
const LOGO_WIDTH = import.meta.env.VITE_LOGO_WIDTH || "400px";
const BUTTON_WIDTH = import.meta.env.VITE_BUTTON_WIDTH || "300px";
const WISHLIST_WIDTH = import.meta.env.VITE_WISHLIST_WIDTH || "400px";
const VIMEO_ID = import.meta.env.VITE_VIMEO_ID || "";
const TEXT_BLOCK = import.meta.env.VITE_TEXT_BLOCK || "";

// Strip file extension if present — component builds its own paths
const BG_NAME = BG_IMAGE.replace(/\.[^.]+$/, "");

const background = BG_IMAGE ? undefined : BG_COLOR;

// Use BackgroundBox for image bg, plain Box for colour bg
const OuterBox = BG_NAME ? BackgroundBox : Box;

const SHORT_SCREEN_THRESHOLD = 600;

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
  const [isShortScreen, setIsShortScreen] = useState(
    () => window.innerHeight < SHORT_SCREEN_THRESHOLD
  );
  const bounceRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handler = () =>
      setIsShortScreen(window.innerHeight < SHORT_SCREEN_THRESHOLD);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Grommet theme={theme} full>
      <OuterBox
        fill
        name={BG_NAME || undefined}
        direction={isShortScreen ? "row" : "column"}
        align="center"
        justify="center"
        gap="medium"
        pad="16px"
        background={background}
        style={{ overflow: "hidden", boxSizing: "border-box" }}
      >
        {LOGO_IMAGE ? (
          <ResponsiveImage
            name={LOGO_IMAGE}
            alt="TLS Bicho Peck logo"
            style={{ width: `clamp(180px, min(30vw, 22vh), ${LOGO_WIDTH})`, maxWidth: "100%" }}
          />
        ) : (
          <img
            src={launchImage}
            alt="TLS Bicho Peck logo"
            style={{ width: `clamp(180px, min(30vw, 22vh), ${LOGO_WIDTH})`, maxWidth: "100%", display: "block" }}
          />
        )}

        {VIMEO_ID && (
          <div
            style={{
              width: `min(clamp(280px, 60vw, 800px), calc(16 / 9 * 45vh))`,
              maxWidth: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              lineHeight: 0,
            }}
            onPointerDown={() => videoRef.current?.focus()}
          >
            <iframe
              ref={videoRef}
              src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0&dnt=1&autoplay=0&muted=0`}
              style={{ display: "block", width: "100%", aspectRatio: "16 / 9", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Launch video"
            />
          </div>
        )}

        <Box direction="column" align="center" gap="16px">

          {/* Wishlist button — clickable with bounce */}
          {WISHLIST_IMAGE && (
            <Button
              plain
              focusIndicator={false}
              onClick={handleLaunch}
              a11yTitle="Wishlist now"
            >
              <div ref={bounceRef} onMouseEnter={() => bounceTween(bounceRef.current)} style={{ display: "inline-block" }}>
                <ResponsiveImage
                  name={WISHLIST_IMAGE}
                  alt="Wishlist now"
                  style={{ width: `clamp(360px, min(40vw, 22vh), ${WISHLIST_WIDTH})`, maxWidth: "100%", cursor: "pointer" }}
                />
              </div>
            </Button>
          )}

          {/* Peck character — decorative image, no button */}
          {BUTTON_IMAGE ? (
            <ResponsiveImage
              name={BUTTON_IMAGE}
              alt="Peck character"
              style={{ width: `clamp(80px, min(25vw, 18vh), ${BUTTON_WIDTH})`, maxWidth: "100%" }}
            />
          ) : (
            <img
              src={buttonImage}
              alt="Peck character"
              style={{ width: `clamp(80px, min(25vw, 18vh), ${BUTTON_WIDTH})`, maxWidth: "100%", display: "block" }}
            />
          )}



          {TEXT_BLOCK && (
            <Text size="large" textAlign="center" color={TEXT_COLOR}>
              {TEXT_BLOCK}
            </Text>
          )}
        </Box>
      </OuterBox>
    </Grommet>
  );
}

export default App;