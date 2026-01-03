"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSwipe } from "@/hooks/use-swipe";

type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

export function Sheet({
  open,
  onOpenChange,
  children
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetTrigger must be used within <Sheet />");

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    const childProps = child.props;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e);
        ctx.onOpenChange(true);
      }
    });
  }

  return (
    <button type="button" onClick={() => ctx.onOpenChange(true)}>
      {children}
    </button>
  );
}

export function SheetClose({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetClose must be used within <Sheet />");

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    const childProps = child.props;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e);
        ctx.onOpenChange(false);
      }
    });
  }

  return (
    <button type="button" onClick={() => ctx.onOpenChange(false)}>
      {children}
    </button>
  );
}

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter((el) => !el.hasAttribute("disabled"));
}

export function SheetContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("SheetContent must be used within <Sheet />");

  const { open, onOpenChange } = ctx;
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
          "absolute inset-x-0 bottom-0 max-h-dvh overflow-hidden border bg-background shadow-xl outline-none",
          "transition-transform duration-200 ease-out",
          "h-dvh rounded-t-2xl md:fixed md:inset-1/2 md:bottom-auto md:h-auto md:max-h-[85vh] md:w-full md:max-w-lg md:rounded-xl",
          "translate-y-full md:translate-x-0 md:-translate-y-1/2 md:-translate-x-1/2",
          open && "translate-y-0",
          "pb-safe-bottom pt-safe-top",
          className
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
          <div className="h-1.5 w-12 rounded-full bg-muted" aria-hidden />
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

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 hidden md:inline-flex"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="max-h-dvh overflow-y-auto scroll-touch px-4 py-4 md:max-h-[85vh] md:px-6 md:py-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end", className)} {...props} />;
}
