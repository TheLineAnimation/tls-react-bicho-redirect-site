import React, { useState, useEffect } from "react";
import { Box } from "grommet";

const BREAKPOINTS = [800, 1280, 1600, 1920];

function nearestBreakpoint(width) {
  return BREAKPOINTS.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev,
    BREAKPOINTS[0]
  );
}

export const BackgroundBox = ({ name, alt = "", children, fill, direction, align, justify, gap, pad, ...rest }) => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nearest = nearestBreakpoint(width);
  const avifSrc = `/images/${name}-${nearest}.avif`;
  const webpSrc = `/images/${name}-${nearest}.webp`;
  const fallbackSrc = `/images/${name}-1280.webp`;

  return (
    <Box fill={fill} style={{ position: "relative", overflow: "hidden" }} {...rest}>
      <picture
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={fallbackSrc}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </picture>
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
