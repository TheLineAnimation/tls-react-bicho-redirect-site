import React, { useState, useEffect } from "react";

const BREAKPOINTS = [800, 1280, 1600, 1920];

// Always serve an image >= the current viewport width to avoid upscaling
function ceilingBreakpoint(width) {
  return BREAKPOINTS.find(bp => bp >= width) ?? BREAKPOINTS[BREAKPOINTS.length - 1];
}

export const ResponsiveImage = ({ name, alt = "", style, ...props }) => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nearest = ceilingBreakpoint(width);

  return (
    <picture style={{ display: "block", ...style }}>
      <source srcSet={`/images/${name}-${nearest}.avif`} type="image/avif" />
      <source srcSet={`/images/${name}-${nearest}.webp`} type="image/webp" />
      <img
        src={`/images/${name}-1280.webp`}
        alt={alt}
        style={{ width: "100%", height: "auto", display: "block" }}
        {...props}
      />
    </picture>
  );
};
