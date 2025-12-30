"use client";

import * as React from "react";
import { Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)")?.matches ?? false;
}

export function InstallPrompt({ className }: { className?: string }) {
  const { isMobile } = useMobile();
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(localStorage.getItem("imms.installPrompt.dismissed") === "1");

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!isMobile) return null;
  if (dismissed) return null;
  if (isStandalone()) return null;
  if (!deferred) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 mx-auto max-w-screen-sm px-3",
        className
      )}
      style={{ bottom: "calc(4rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur">
        <div className="min-w-0">
          <div className="text-sm font-semibold">Install Synthia</div>
          <div className="truncate text-xs text-muted-foreground">Add to home screen for an app-like experience.</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={async () => {
              try {
                await deferred.prompt();
                const choice = await deferred.userChoice;
                if (choice.outcome === "accepted") setDeferred(null);
              } finally {
                setDeferred(null);
              }
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Install
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dismiss install prompt"
            onClick={() => {
              localStorage.setItem("imms.installPrompt.dismissed", "1");
              setDismissed(true);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

