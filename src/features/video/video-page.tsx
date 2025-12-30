"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useUserMedia } from "@/hooks/use-user-media";

export default function VideoPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isJoining, setIsJoining] = useState(false);

  const { stream, status, isMicMuted, isCameraOff, toggleMic, toggleCamera } = useUserMedia({
    audio: true,
    video: true
  });

  const isLoading = status === "loading";
  const showPermissionDenied = status === "denied";

  useEffect(() => {
    if (!videoRef.current) return;
    if (!stream) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  const join = async () => {
    setIsJoining(true);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/meeting-room");
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-background/70 px-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-muted">
            <Image src="/brand/synthia-logo.png" alt="Synthia" fill className="object-contain p-1" priority />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Synthia</div>
            <div className="text-xs text-muted-foreground">Join meeting</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          System Operational
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 space-y-1 text-center lg:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">Weekly Design Sync</h1>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl border bg-black shadow-sm">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30">
                  <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-muted-foreground/30 border-t-primary" />
                  <p className="text-sm text-muted-foreground">Initializing devices...</p>
                </div>
              ) : null}

              {showPermissionDenied ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30 px-6 text-center">
                  <div className="mb-4 rounded-full border bg-background p-4">
                    <VideoOff className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold">Camera access denied</h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Allow camera and microphone access in your browser settings to preview before joining.
                  </p>
                </div>
              ) : null}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover [transform:scaleX(-1)]"
              />

              {isCameraOff && !showPermissionDenied && !isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20">
                  <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                    PP
                  </div>
                  <p className="rounded-full border bg-background/70 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
                    Camera is off
                  </p>
                </div>
              ) : null}
            </div>

            {!isLoading && !showPermissionDenied ? (
              <div className="mt-6 flex items-center justify-center gap-6">
                <button
                  onClick={toggleMic}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border bg-background shadow-sm transition-colors ${
                    isMicMuted ? "border-red-200 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-900/10" : "hover:bg-muted"
                  }`}
                  aria-label="Toggle mic"
                >
                  {isMicMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>

                <button
                  onClick={toggleCamera}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border bg-background shadow-sm transition-colors ${
                    isCameraOff ? "border-red-200 bg-red-50 text-red-600 dark:border-red-900/40 dark:bg-red-900/10" : "hover:bg-muted"
                  }`}
                  aria-label="Toggle camera"
                >
                  {isCameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                </button>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Ready to join?</h2>
              <p className="text-sm text-muted-foreground">
                This is the pre-join screen. Once inside, transcripts and notes can be captured client-side.
              </p>

              <div className="mt-8 flex items-center justify-end gap-3 border-t pt-6">
                <button
                  onClick={() => router.back()}
                  className="rounded-xl border bg-background px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={join}
                  disabled={isJoining}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isJoining ? "Joining..." : "Join now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
