"use client";

import * as React from "react";
import { Loader2, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  onRefresh: () => Promise<void> | void;
};

export function PullToRefresh({ containerRef, enabled, onRefresh }: Props) {
  const [pull, setPull] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const startYRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!enabled) return;

    const onTouchStart = (e: TouchEvent) => {
      if (refreshing) return;
      if (container.scrollTop > 0) return;
      startYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (refreshing) return;
      if (startYRef.current == null) return;
      if (container.scrollTop > 0) return;

      const currentY = e.touches[0]?.clientY ?? startYRef.current;
      const delta = currentY - startYRef.current;
      if (delta <= 0) {
        setPull(0);
        return;
      }

      const capped = Math.min(120, delta);
      setPull(capped);
      if (capped > 8) e.preventDefault();
    };

    const onTouchEnd = async () => {
      if (refreshing) return;
      const shouldRefresh = pull >= 80;
      startYRef.current = null;

      if (!shouldRefresh) {
        setPull(0);
        return;
      }

      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPull(0);
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerRef, enabled, onRefresh, pull, refreshing]);

  if (!enabled) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center")}>
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur",
          pull > 0 || refreshing ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: `translateY(${pull}px)`, transition: refreshing ? "transform 120ms ease-out" : undefined }}
      >
        {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        <span>{refreshing ? "Refreshing…" : pull >= 80 ? "Release to refresh" : "Pull to refresh"}</span>
      </div>
    </div>
  );
}

