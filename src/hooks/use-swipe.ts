"use client";

import * as React from "react";

type SwipeHandlers = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onPointerDown" | "onPointerUp" | "onPointerCancel"
>;

type Options = {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};

export function useSwipe({ threshold = 80, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }: Options): SwipeHandlers {
  const startRef = React.useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const onPointerDown: SwipeHandlers["onPointerDown"] = (e) => {
    startRef.current = { x: e.clientX, y: e.clientY, active: true };
  };

  const onPointerUp: SwipeHandlers["onPointerUp"] = (e) => {
    if (!startRef.current.active) return;
    startRef.current.active = false;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx <= -threshold) onSwipeLeft?.();
      if (dx >= threshold) onSwipeRight?.();
      return;
    }

    if (dy <= -threshold) onSwipeUp?.();
    if (dy >= threshold) onSwipeDown?.();
  };

  const onPointerCancel: SwipeHandlers["onPointerCancel"] = () => {
    startRef.current.active = false;
  };

  return { onPointerDown, onPointerUp, onPointerCancel };
}

