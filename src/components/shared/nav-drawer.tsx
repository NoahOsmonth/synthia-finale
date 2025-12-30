"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSwipe } from "@/hooks/use-swipe";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter((el) => !el.hasAttribute("disabled"));
}

export function NavDrawer({ open, onOpenChange }: Props) {
  const [mounted, setMounted] = React.useState(open);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastActiveRef = React.useRef<HTMLElement | null>(null);
  const [hasUnread, setHasUnread] = React.useState(false);
  const swipe = useSwipe({ threshold: 80, onSwipeLeft: () => onOpenChange(false) });

  React.useEffect(() => {
    const checkUnread = () => {
      const unreadCount = sessionStorage.getItem("unreadNotificationCount");
      setHasUnread(unreadCount ? Number.parseInt(unreadCount, 10) > 0 : true);
    };

    checkUnread();
    window.addEventListener("storage", checkUnread);
    return () => window.removeEventListener("storage", checkUnread);
  }, []);

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

    const timeout = window.setTimeout(() => setMounted(false), 240);
    lastActiveRef.current?.focus?.();
    return () => window.clearTimeout(timeout);
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!open}>
      <button
        type="button"
        className={cn(
          "absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close navigation"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...swipe}
        className={cn(
          "absolute left-0 top-0 h-dvh w-[86%] max-w-xs border-r bg-background shadow-xl outline-none",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "pt-safe-top pb-safe-bottom"
        )}
      >
        <div className="flex h-14 items-center gap-3 border-b px-4">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-muted">
            <Image src="/brand/synthia-logo.png" alt="Synthia" fill className="object-contain p-1" priority />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Synthia</div>
            <div className="text-xs text-muted-foreground">IMMS</div>
          </div>
        </div>

        <div className="p-3">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/notifications"
              onClick={() => onOpenChange(false)}
              className="touch-target flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <span className="relative">
                <Bell className="h-4 w-4" />
                {hasUnread ? (
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-background bg-destructive" />
                ) : null}
              </span>
              <span>Notifications</span>
            </Link>
            <Link
              href="/profile"
              onClick={() => onOpenChange(false)}
              className="touch-target flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => onOpenChange(false)}
              className="touch-target flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
