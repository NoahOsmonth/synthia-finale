"use client";

import React, { useState } from "react";
import { ArrowLeft, MessageSquare, Pause, Square, Volume2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecordingPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="min-h-dvh bg-muted/30">
      <div className="bg-muted/30 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.push("/meetings")}
            className="mb-6 flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Meetings
          </button>

          <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col lg:col-span-2">
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-background p-8 shadow-md">
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

            <div className="flex flex-col lg:col-span-1">
              <div className="flex h-full flex-col rounded-2xl border bg-background p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between border-b pb-2">
                  <h3 className="flex items-center font-semibold">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Live Transcription
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Auto-scrolling</span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                  {[
                    {
                      name: "Peter Parker",
                      time: "10:00 AM",
                      img: "https://i.pravatar.cc/100?img=1",
                      text: "Alright, let's get started. Thanks everyone for joining. Today we need to finalize the Q4 roadmap."
                    },
                    {
                      name: "Sarah Chen",
                      time: "10:01 AM",
                      img: "https://i.pravatar.cc/100?img=5",
                      text: "I have the user research data ready to present. It strongly suggests we focus on mobile improvements first."
                    }
                  ].map((t) => (
                    <div key={t.time} className="flex gap-3">
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 flex-shrink-0 rounded-full bg-muted"
                      />
                      <div>
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          {t.name}
                          <span className="ml-2 font-normal opacity-70">{t.time}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
