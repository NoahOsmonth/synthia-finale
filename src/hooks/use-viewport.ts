"use client";

import * as React from "react";

type Orientation = "portrait" | "landscape";

function getOrientation(width: number, height: number): Orientation {
  return width >= height ? "landscape" : "portrait";
}

export function useViewport() {
  const [state, setState] = React.useState(() => ({
    width: 0,
    height: 0,
    orientation: "portrait" as Orientation
  }));

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setState({ width, height, orientation: getOrientation(width, height) });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const isMobile = state.width > 0 && state.width < 768;
  const isTablet = state.width >= 768 && state.width < 1024;
  const isDesktop = state.width >= 1024;

  return { ...state, isMobile, isTablet, isDesktop };
}

