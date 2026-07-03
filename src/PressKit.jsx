import React from "react";
import { Link } from "react-router-dom";
import {
  Grommet,
  Box,
  Heading,
  Text,
  Grid,
  Anchor,
  Paragraph,
} from "grommet";
import { Download } from "grommet-icons";
import { ResponsiveImage } from "./ResponsiveImage";
import { pressKitData } from "./pressKitData";
import { gsap } from "gsap";

const BRAND = "#ffb524";

// Matches the brand button style used on the main holding page
const dlBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "#fa0f48",
  textDecoration: "none",
  fontSize: "18px",
  fontFamily: "'Anta', sans-serif",
  padding: "6px 12px",
  background: "#ffb523",
  borderRadius: "4px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  border: "none",
};

// Parallax layer config — depth controls how much each layer moves on scroll
// (0 = stationary/far away, higher = moves more/closer to viewer)
const PK_LAYERS = [
  { name: "WEB_BG",     depth: 0.02 },
  { name: "PX01_LAYER", depth: 0.08 },
  { name: "PX02_LAYER", depth: 0.18 },
  { name: "PX03_LAYER", depth: 0.32 },
  { name: "PX04_LAYER", depth: 0.50 },
  { name: "PX05_LAYER", depth: 0.70 },
];
const MAX_PARALLAX = 160; // px — must match the top/height buffer on layer divs

function bounceTween(el) {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.timeline()
    .to(el, { scale: 1.08, duration: 0.12, ease: "power2.out" })
    .to(el, { scale: 1,    duration: 0.8,  ease: "elastic.out(1, 0.35)" });
}
function dlHoverIn(e)  { gsap.killTweensOf(e.currentTarget); gsap.to(e.currentTarget, { scale: 0.93, duration: 0.1 }); }
function dlHoverOut(e) { gsap.to(e.currentTarget, { scale: 1, duration: 0.15 }); }

const theme = {
  global: {
    font: { family: "'Anta', sans-serif" },
    colors: { brand: BRAND },
  },
};

// ── Download All button ─────────────────────────────────────────────────────
function DownloadAllButton({ href, label }) {
  return (
    <a href={href} download style={dlBtnStyle} onMouseEnter={dlHoverIn} onMouseLeave={dlHoverOut}>
      <Download size="small" color="#fa0f48" />
      {label}
    </a>
  );
}

// ── Section heading row ────────────────────────────────────────────────────
function SectionHeader({ title, downloadHref, downloadLabel }) {
  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      wrap
      gap="small"
      margin={{ bottom: "medium" }}
    >
      <Heading level={2} color={BRAND} margin="none">
        {title}
      </Heading>
      {downloadHref && (
        <DownloadAllButton href={downloadHref} label={downloadLabel} />
      )}
    </Box>
  );
}

// ── Video download dropdown ───────────────────────────────────────────────
function VideoDownloadMenu({ downloads }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  if (!downloads || downloads.length === 0) return null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        onMouseEnter={dlHoverIn}
        onMouseLeave={dlHoverOut}
        style={dlBtnStyle}
      >
        <Download size="small" color="#fa0f48" />
        Download
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          minWidth: "300px",
          backgroundColor: "rgba(18,18,18,0.97)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          zIndex: 200,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ color: "white", fontFamily: "'Anta', sans-serif", fontWeight: "bold", fontSize: "15px" }}>
              Download video
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: "20px", lineHeight: 1, padding: "0 4px", fontFamily: "sans-serif" }}
            >×</button>
          </div>

          {/* Format rows */}
          {downloads.map((opt) => (
            <a
              key={opt.label}
              href={opt.url}
              download
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                color: "white",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Anta', sans-serif", fontWeight: "bold", fontSize: "15px" }}>
                  {opt.label}
                </div>
                {(opt.sizeMB || opt.quality) && (
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "2px" }}>
                    {[opt.sizeMB && `${opt.sizeMB}MB`, opt.quality].filter(Boolean).join(" | ")}
                  </div>
                )}
              </div>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Download size="small" color="white" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PressKit() {
  const { meta, contact, videos, screenshots, downloads } = pressKitData;

  // <Grommet full> on the holding page injects html,body { height:100%; overflow:hidden }
  // via styled-components. Those rules persist across route changes, so we must
  // override them with inline styles (higher specificity) while this page is mounted.
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "auto";
    html.style.height = "auto";
    body.style.overflow = "auto";
    body.style.height = "auto";
    return () => {
      html.style.overflow = "";
      html.style.height = "";
      body.style.overflow = "";
      body.style.height = "";
    };
  }, []);

  const layerRefs    = React.useRef([]);
  const quickTosRef  = React.useRef([]);
  const screenshotRefs = React.useRef({});
  const [lightbox, setLightbox] = React.useState(null);

  // Scroll-driven parallax
  React.useEffect(() => {
    quickTosRef.current = layerRefs.current.map(el =>
      el ? gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" }) : null
    );
    const handleScroll = () => {
      const scrollY = window.scrollY;
      PK_LAYERS.forEach((layer, i) => {
        const qt = quickTosRef.current[i];
        if (qt) qt(-Math.min(scrollY * layer.depth * 0.1, MAX_PARALLAX));
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Grommet theme={theme}>
      {/* Scroll-driven parallax layers — each shifts at a different rate on scroll */}
      {PK_LAYERS.map((layer, i) => (
        <div
          key={layer.name}
          ref={el => { layerRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "-180px",
            left: 0,
            width: "100%",
            height: "calc(100% + 360px)",
            zIndex: i,
            backgroundImage: `url('/images/${layer.name}-1920.avif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
      ))}
      {/* Dark overlay for readability — sits above all layers */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: PK_LAYERS.length,
          background: "rgba(0,0,0,0.2)",
          pointerEvents: "none",
        }}
      />

      {/* Scrollable content sits above the fixed bg */}
      <Box
        direction="column"
        style={{ position: "relative", zIndex: PK_LAYERS.length + 1, minHeight: "100vh" }}
      >
        {/* ── Sticky nav ───────────────────────────────────────────────── */}
        <Box
          as="header"
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: "large", vertical: "medium" }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,0,0.35)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#fa0f48",
              textDecoration: "none",
              fontFamily: "'Anta', sans-serif",
              fontSize: "18px",
            }}
          >
            ← Deaths of Peck
          </Link>
          <Text weight="bold" style={{ color: BRAND, fontFamily: "'Anta', sans-serif" }}>
            Press Kit
          </Text>
        </Box>

        {/* ── Page content ─────────────────────────────────────────────── */}
        <Box
          pad={{ horizontal: "large", vertical: "large" }}
          gap="xlarge"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* ── Description ── */}
          <Box
            pad="large"
            round="small"
            direction="row"
            gap="large"
            align="start"
            wrap
            style={{
              backgroundColor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Logo — left column */}
            <Box flex={false} style={{ width: "clamp(120px, 30%, 220px)" }}>
              <ResponsiveImage
                name="WEB_logo"
                alt="Deaths of Peck logo"
                style={{ width: "100%", lineHeight: 0 }}
              />
            </Box>

            {/* Text content — right column */}
            <Box flex gap="medium" style={{ minWidth: "240px" }}>
              <Paragraph color="light-3" size="large" margin="none">
                {meta.description}
              </Paragraph>

              {meta.subtitle && (
                <Paragraph color="light-4" size="medium" margin="none">
                  {meta.subtitle}
                </Paragraph>
              )}

              {/* Contacts */}
              <Box direction="row" gap="xlarge" wrap>
                <Box gap="xsmall">
                  <Text
                    size="xsmall"
                    weight="bold"
                    style={{ color: BRAND, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    Press Contact
                  </Text>
                  <Anchor href={`mailto:${contact.press}`} color={BRAND} size="medium">
                    {contact.press}
                  </Anchor>
                </Box>
                <Box gap="xsmall">
                  <Text
                    size="xsmall"
                    weight="bold"
                    style={{ color: BRAND, letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    Business
                  </Text>
                  <Anchor href={`mailto:${contact.business}`} color={BRAND} size="medium">
                    {contact.business}
                  </Anchor>
                </Box>
              </Box>

              {/* Social links */}
              <Box direction="row" gap="medium" wrap>
                {contact.social.map((link) => (
                  <Anchor
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: BRAND, fontSize: "18px" }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ── Videos ── */}
          {videos.length > 0 && (
            <Box>
              <SectionHeader
                title="Videos"
                downloadHref={downloads.videosZip}
                downloadLabel="Download All Videos"
              />
              <Box gap="large">
                {videos.map((video) => (
                  <Box
                    key={video.title}
                    pad="medium"
                    round="small"
                    gap="medium"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.35)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Box
                      direction="row"
                      align="center"
                      justify="between"
                      wrap
                      gap="small"
                    >
                      <Heading level={3} color="light-3" margin="none">
                        {video.title}
                      </Heading>
                      {video.downloads?.length > 0 && (
                        <VideoDownloadMenu downloads={video.downloads} />
                      )}
                    </Box>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "720px",
                        aspectRatio: "16 / 9",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allow="fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                        
                      />
                    </div>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* ── Screenshots ── */}
          <Box>
            <SectionHeader
              title="Screenshots"
              downloadHref={downloads.imagesZip}
              downloadLabel="Download All Images"
            />
            <Grid
              columns={{ count: "fill", size: ["260px", "1fr"] }}
              gap="medium"
            >
              {screenshots.map((shot) => (
                <Box
                  key={shot.title}
                  ref={el => { screenshotRefs.current[shot.title] = el; }}
                  round="small"
                  overflow="hidden"
                  onClick={() => setLightbox(shot)}
                  onMouseEnter={() => bounceTween(screenshotRefs.current[shot.title])}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.35)",
                    cursor: "pointer",
                  }}
                >
                  <ResponsiveImage
                    name={shot.imageName}
                    alt={shot.title}
                    style={{ width: "100%", lineHeight: 0 }}
                  />
                  <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
                    <Text color="light-4" size="small">{shot.title}</Text>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ── Footer ── */}
        <Box
          as="footer"
          pad={{ horizontal: "large", vertical: "medium" }}
          direction="row"
          justify="center"
          align="center"
          style={{
            marginTop: "auto",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Text size="small" color="dark-4">
            © Deaths of Peck - All rights reserved
          </Text>
        </Box>
      </Box>
      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(233, 92, 92, 0.38)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "rgba(18,18,18,0.97)",
              borderRadius: "16px",
              overflow: "hidden",
              maxWidth: "900px",
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
            }}
          >
            <ResponsiveImage
              name={lightbox.imageName}
              alt={lightbox.title}
              style={{ width: "100%", lineHeight: 0 }}
            />
            <Box
              direction="row"
              align="center"
              justify="between"
              pad={{ horizontal: "medium", vertical: "small" }}
            >
              <Text color="white" weight="bold">{lightbox.title}</Text>
              <Box direction="row" gap="small" align="center">
                <a href={lightbox.downloadUrl} download style={dlBtnStyle} onMouseEnter={dlHoverIn} onMouseLeave={dlHoverOut}>
                  <Download size="small" color="#fa0f48" />
                  Download
                </a>
                <button
                  onClick={() => setLightbox(null)}
                  onMouseEnter={dlHoverIn}
                  onMouseLeave={dlHoverOut}
                  style={{ ...dlBtnStyle, background: "#fa0f48", color: "#ffb523" }}
                >
                  Close
                </button>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </Grommet>
  );
}
