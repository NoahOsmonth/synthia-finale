"use client";

import * as React from "react";

type LongPressHandlers = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onPointerDown" | "onPointerUp" | "onPointerCancel" | "onPointerLeave" | "onPointerMove"
>;

type Options = {
  ms?: number;
  moveTolerance?: number;
  onLongPress: () => void;
};

export function useLongPress({ ms = 520, moveTolerance = 12, onLongPress }: Options): LongPressHandlers {
  const timerRef = React.useRef<number | null>(null);
  const startRef = React.useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const clear = React.useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    startRef.current.active = false;
  }, []);

  const onPointerDown: LongPressHandlers["onPointerDown"] = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startRef.current = { x: e.clientX, y: e.clientY, active: true };
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      if (!startRef.current.active) return;
      onLongPress();
      startRef.current.active = false;
    }, ms);
  };

  const onPointerMove: LongPressHandlers["onPointerMove"] = (e) => {
    if (!startRef.current.active) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    if (Math.hypot(dx, dy) > moveTolerance) clear();
  };

  const onPointerUp: LongPressHandlers["onPointerUp"] = () => clear();
  const onPointerCancel: LongPressHandlers["onPointerCancel"] = () => clear();
  const onPointerLeave: LongPressHandlers["onPointerLeave"] = () => clear();

  return { onPointerDown, onPointerUp, onPointerCancel, onPointerLeave, onPointerMove };
}

