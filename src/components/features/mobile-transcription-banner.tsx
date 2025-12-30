"use client";

import * as React from "react";
import { AlertTriangle, Mic, Pause, Play, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "recording" | "paused" | "error";

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function canRecord() {
  if (typeof window === "undefined") return false;
  return Boolean(navigator.mediaDevices?.getUserMedia);
}

export function MobileTranscriptionBanner({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState(Date.now());

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const storedStatus = (sessionStorage.getItem("imms.transcription.status") as Status | null) ?? "idle";
    const storedStart = sessionStorage.getItem("imms.transcription.startedAt");

    setStatus(storedStatus);
    setStartedAt(storedStart ? Number.parseInt(storedStart, 10) : null);

    const onState = (e: Event) => {
      const detail = (e as CustomEvent<{ status?: Status; startedAt?: number | null }>).detail;
      if (detail?.status) {
        sessionStorage.setItem("imms.transcription.status", detail.status);
        setStatus(detail.status);
      }
      if (detail?.startedAt !== undefined) {
        const next = detail.startedAt;
        if (next === null) sessionStorage.removeItem("imms.transcription.startedAt");
        else sessionStorage.setItem("imms.transcription.startedAt", String(next));
        setStartedAt(next);
      }
    };

    window.addEventListener("imms:transcription-state", onState as EventListener);
    return () => window.removeEventListener("imms:transcription-state", onState as EventListener);
  }, []);

  React.useEffect(() => {
    if (status === "idle") return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [status]);

  if (status === "idle") return null;

  const durationMs = startedAt ? now - startedAt : 0;
  const durationLabel = startedAt ? formatDuration(durationMs) : "—";
  const supported = canRecord();

  const fire = (type: string) => window.dispatchEvent(new CustomEvent(type));

  return (
    <div className={cn("border-b bg-primary/10 px-3 py-2 text-primary md:px-4", className)}>
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {supported ? <Mic className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            <span className="truncate">
              {supported ? (status === "paused" ? "Transcription paused" : "Transcribing…") : "Mic capture unsupported"}
            </span>
            <span className="text-xs text-primary/80">• {durationLabel}</span>
          </div>
          {!supported ? (
            <div className="mt-0.5 text-xs text-primary/80">
              This device/browser cannot capture audio. Client-direct audio streaming is required.
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {status === "paused" ? (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 bg-background/60 text-primary hover:bg-background"
              onClick={() => fire("imms:transcription:resume")}
            >
              <Play className="mr-2 h-4 w-4" />
              Resume
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 bg-background/60 text-primary hover:bg-background"
              onClick={() => fire("imms:transcription:pause")}
            >
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          )}
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => fire("imms:transcription:stop")}>
            <Square className="mr-2 h-4 w-4" />
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}

