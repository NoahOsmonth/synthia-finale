"use client";

import React, { useState } from "react";
import { ArrowLeft, Pause, Square, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecordingPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="min-h-screen bg-background md:h-screen md:overflow-hidden">
      <div className="p-6 md:p-8 md:h-full">
        <div className="mx-auto max-w-7xl md:h-full">
          <button
            onClick={() => router.push("/meetings")}
            className="mb-6 flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Meetings
          </button>

          <div className="grid h-full grid-cols-1 gap-6">
            <div className="flex flex-col h-full">
              <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-2xl border bg-background p-8 shadow-md md:min-h-full md:rounded-3xl">
                <div className="relative flex items-center justify-center">
                  <div className="pointer-events-none absolute h-32 w-32 animate-pulse rounded-full bg-primary/10" />
                  <div className="relative z-10 rounded-full bg-gradient-to-br from-primary to-fuchsia-600 p-6 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center text-white">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold">Weekly Design Sync</h2>
                <p className="text-muted-foreground">{isRecording ? "Recording in progress..." : "Paused"}</p>

                <div className="mt-8 flex items-center space-x-4">
                  <button
                    onClick={() => setIsRecording((v) => !v)}
                    className="rounded-full bg-muted p-4 text-foreground transition-colors hover:bg-muted/70"
                    aria-label={isRecording ? "Pause" : "Resume"}
                  >
                    <Pause className="h-6 w-6" />
                  </button>

                  <button className="rounded-full bg-red-500 p-4 text-white shadow-lg transition-colors hover:bg-red-600" aria-label="Stop">
                    <Square className="h-8 w-8 fill-white" />
                  </button>

                  <button className="rounded-full bg-muted p-4 text-foreground transition-colors hover:bg-muted/70" aria-label="Audio settings">
                    <Volume2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
