"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSwipe } from "@/hooks/use-swipe";
import { cn } from "@/lib/utils";

type PanelSide = "left" | "right";

export type PanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: PanelSide;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => !el.hasAttribute("disabled")
  );
}

export function Panel({
  open,
  onOpenChange,
  side = "right",
  title,
  description,
  children,
  className,
  contentClassName
}: PanelProps) {
  const [mounted, setMounted] = React.useState(open);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);

  const swipe = useSwipe({ threshold: 100, onSwipeDown: () => onOpenChange(false) });

  React.useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setMounted(true);
  }, [open]);

  React.useEffect(() => {
    if (!mounted) return;
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, open]);

  React.useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }

      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = getFocusable(panel);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mounted, open, onOpenChange]);

  React.useEffect(() => {
    if (!mounted) return;
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = getFocusable(panel);
    if (focusable.length > 0) focusable[0].focus();
    else panel.focus();
  }, [mounted, open]);

  React.useEffect(() => {
    if (open) return;
    if (!mounted) return;

    const timeout = window.setTimeout(() => setMounted(false), 260);
    lastActiveRef.current?.focus?.();
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  if (!mounted) return null;

  const desktopPlacement =
    side === "right"
      ? "md:right-0 md:left-auto md:border-l"
      : "md:left-0 md:right-auto md:border-r";

  const desktopClosedTransform = side === "right" ? "md:translate-x-full" : "md:-translate-x-full";

  const transformClassName = open
    ? "translate-y-0 md:translate-y-0 md:translate-x-0"
    : cn("translate-y-full md:translate-y-0", desktopClosedTransform);

  return createPortal(
    <div className="fixed inset-0 z-50" aria-hidden={!open}>
      <button
        type="button"
        className={cn(
          "absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...swipe}
        className={cn(
          "absolute inset-x-0 bottom-0 h-dvh max-h-dvh overflow-hidden border bg-background shadow-xl outline-none",
          "transition-transform duration-200 ease-out",
          "rounded-t-2xl md:inset-y-0 md:bottom-auto md:top-0 md:w-[420px] md:rounded-none",
          "pb-safe-bottom pt-safe-top",
          desktopPlacement,
          transformClassName,
          className
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 md:px-6 md:py-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex justify-center md:hidden" aria-hidden>
              <div className="h-1.5 w-12 rounded-full bg-muted" />
            </div>
            {title ? <h2 className="truncate text-lg font-semibold">{title}</h2> : null}
            {description ? (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="touch-target"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className={cn("max-h-dvh overflow-y-auto scroll-touch px-4 py-4 md:px-6 md:py-6", contentClassName)}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

