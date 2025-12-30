"use client";

import * as React from "react";
import { WifiOff, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function OfflineBanner({ className }: { className?: string }) {
  const [isOnline, setIsOnline] = React.useState(true);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsOnline(navigator.onLine);
    setDismissed(localStorage.getItem("imms.offlineBanner.dismissed") === "1");

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (isOnline || dismissed) return null;

  return (
    <div className={cn("border-b bg-amber-500/10 px-3 py-2 text-amber-700 dark:text-amber-200 md:px-4", className)}>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <WifiOff className="h-4 w-4" />
          <span className="font-semibold">Offline</span>
          <span className="hidden sm:inline text-amber-700/80 dark:text-amber-200/80">
            Cached content may be available.
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-amber-700 hover:bg-amber-500/10 dark:text-amber-200"
          aria-label="Dismiss"
          onClick={() => {
            localStorage.setItem("imms.offlineBanner.dismissed", "1");
            setDismissed(true);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

