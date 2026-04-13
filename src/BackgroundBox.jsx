import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from "react";
import { Box } from "grommet";
import { gsap } from "gsap";

const BREAKPOINTS = [800, 1280, 1600, 1920];
const MAX_OFFSET = 20; // px of movement at depth 1.0
const BETA_CENTER = 45; // typical phone hold angle (degrees)
const BETA_RANGE = 30;
const GAMMA_RANGE = 45;

function nearestBreakpoint(width) {
  return BREAKPOINTS.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev,
    BREAKPOINTS[0]
  );
}

export const BackgroundBox = ({ name, layers: layersProp, zoom = 1, alt = "", children, fill, direction, align, justify, gap, pad, ...rest }) => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  // Normalise to a layers array — supports legacy single `name` prop
  const layers = useMemo(() => {
    if (layersProp && layersProp.length > 0) return layersProp;
    if (name) return [{ name, depth: 0, alt }];
    return [];
  }, [layersProp, name, alt]);

  // Detect touch/no-hover device once at mount
  const isTouch = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches,
    []
  );

  // Mutable arrays populated by callback refs during render
  const layerEls = useRef([]);
  // GSAP quickTo setters: [{ x, y } | null]
  const tweens = useRef([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rebuild quickTo setters after every commit where layers changed
  useLayoutEffect(() => {
    tweens.current = layers.map((layer, i) => {
      const el = layerEls.current[i];
      if (!el || layer.depth === 0) return null;
      gsap.set(el, { scale: zoom, transformOrigin: "center center" });
      return {
        x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power1.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power1.out" }),
      };
    });
  }, [layers, zoom]);

  const applyParallax = useCallback((nx, ny) => {
    layers.forEach((layer, i) => {
      const t = tweens.current[i];
      if (!t) return;
      t.x(nx * layer.depth * MAX_OFFSET);
      t.y(ny * layer.depth * MAX_OFFSET);
    });
  }, [layers]);

  const resetParallax = useCallback(() => {
    layers.forEach((layer, i) => {
      const t = tweens.current[i];
      if (!t) return;
      t.x(0);
      t.y(0);
    });
  }, [layers]);

  // Mouse tracking (desktop)
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    applyParallax(nx, ny);
  }, [applyParallax]);

  // Gyroscope (mobile)
  useEffect(() => {
    if (!isTouch) return;

    const handleOrientation = (e) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? BETA_CENTER;
      const nx = Math.max(-1, Math.min(1, gamma / GAMMA_RANGE));
      const ny = Math.max(-1, Math.min(1, (beta - BETA_CENTER) / BETA_RANGE));
      applyParallax(nx, ny);
    };

    const addListener = () => {
      window.addEventListener("deviceorientation", handleOrientation);
    };

    // iOS 13+ requires explicit permission from a user gesture
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      window.addEventListener("touchstart", function requestOnTouch() {
        DeviceOrientationEvent.requestPermission()
          .then(state => { if (state === "granted") addListener(); })
          .catch(() => {});
        window.removeEventListener("touchstart", requestOnTouch);
      }, { once: true });
    } else {
      addListener();
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isTouch, applyParallax]);

  const nearest = nearestBreakpoint(width);

  return (
    <Box
      fill={fill}
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={!isTouch ? handleMouseMove : undefined}
      onMouseLeave={!isTouch ? resetParallax : undefined}
      {...rest}
    >
      {layers.map((layer, i) => {
        const avifSrc = `/images/${layer.name}-${nearest}.avif`;
        const webpSrc = `/images/${layer.name}-${nearest}.webp`;
        const fallbackSrc = `/images/${layer.name}-1280.webp`;
        return (
          <div
            key={layer.name}
            ref={el => { layerEls.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              willChange: layer.depth !== 0 ? "transform" : undefined,
            }}
          >
            <picture style={{ display: "block", width: "100%", height: "100%" }}>
              <source srcSet={avifSrc} type="image/avif" />
              <source srcSet={webpSrc} type="image/webp" />
              <img
                src={fallbackSrc}
                alt={layer.alt || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </picture>
          </div>
        );
      })}
      <Box
        fill={fill}
        direction={direction}
        align={align}
        justify={justify}
        gap={gap}
        pad={pad}
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </Box>
    </Box>
  );
};
