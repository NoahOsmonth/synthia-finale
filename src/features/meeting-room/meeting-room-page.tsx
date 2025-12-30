"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, LogOut, MessageSquare, Mic, MicOff, Users, Video, VideoOff, X } from "lucide-react";

type Panel = "notes" | "chat" | "people" | null;

export default function MeetingRoomPage() {
  const router = useRouter();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [time, setTime] = useState("00:00");
  const [activePanel, setActivePanel] = useState<Panel>("notes");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePanel = (panel: Exclude<Panel, null>) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black text-white">
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#1F1F1F] px-4">
        <div className="flex w-1/4 items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20">
            <div className="h-5 w-5 animate-pulse rounded-full border-2 border-white/20" />
          </div>
          <span className="font-medium text-white/70">{time}</span>
        </div>

        <div className="relative flex flex-1 items-center justify-center gap-1">
          <button
            onClick={() => togglePanel("chat")}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              activePanel === "chat" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
            title="Chat"
          >
            <MessageSquare className="h-5 w-5" />
            Chat
          </button>
          <button
            onClick={() => togglePanel("people")}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              activePanel === "people" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
            title="People"
          >
            <Users className="h-5 w-5" />
            People
          </button>
          <button
            onClick={() => togglePanel("notes")}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              activePanel === "notes" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
            title="Notes"
          >
            <FileText className="h-5 w-5" />
            Notes
          </button>

          <div className="mx-2 h-8 w-px bg-white/10" />

          <button
            onClick={() => setIsCameraOff((v) => !v)}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              isCameraOff ? "text-red-300" : "text-white/60 hover:text-white"
            }`}
            title="Camera"
          >
            {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            Camera
          </button>
          <button
            onClick={() => setIsMicMuted((v) => !v)}
            className={`flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors ${
              isMicMuted ? "text-red-300" : "text-white/60 hover:text-white"
            }`}
            title="Microphone"
          >
            {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            Mic
          </button>
        </div>

        <div className="flex w-1/4 justify-end">
          <button
            onClick={() => router.push("/meeting-history")}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Leave
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex flex-1 flex-col items-center justify-center bg-black">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
            KH
          </div>
          <h2 className="text-xl font-semibold">Waiting for others to join...</h2>
          <p className="mt-2 text-sm text-white/60">This is a UI shell — hook real WebRTC later.</p>
        </div>

        {activePanel ? (
          <aside className="flex w-80 flex-col border-l border-white/10 bg-[#1F1F1F]">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="text-lg font-bold capitalize">{activePanel}</h3>
              <button onClick={() => setActivePanel(null)} className="text-white/60 hover:text-white" aria-label="Close panel">
                <X className="h-5 w-5" />
              </button>
            </div>

            {activePanel === "notes" ? (
              <div className="flex-1 space-y-6 overflow-y-auto p-4">
                <div>
                  <h4 className="mb-2 text-sm font-bold">Meeting Notes</h4>
                  <textarea
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white outline-none focus:ring-1 focus:ring-primary"
                    rows={8}
                    placeholder="Type your notes here..."
                  />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold">Follow-up tasks</h4>
                  <button className="text-sm text-white/70 hover:text-white">+ Add task</button>
                </div>
              </div>
            ) : null}

            {activePanel === "chat" ? (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
                  <div className="text-white/60">Meeting started</div>
                  <div className="rounded-lg bg-black/40 p-3">
                    <div className="text-xs text-white/50">Klariz • 10:15</div>
                    <div className="mt-1">Welcome everyone. Please verify if you can access the shared drive folder.</div>
                  </div>
                </div>
                <div className="border-t border-white/10 p-4">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </>
            ) : null}

            {activePanel === "people" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-3 rounded border border-white/10 bg-black/40 px-3 py-2">
                  <input
                    type="text"
                    placeholder="Search participants"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                  />
                </div>

                <div className="mb-4">
                  <div className="mb-2 text-xs font-semibold text-white/60">In this meeting (1)</div>
                  <div className="flex items-center justify-between rounded px-2 py-2 hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                        KH
                      </div>
                      <span className="text-sm font-medium">Klariz Habla</span>
                    </div>
                    <Mic className="h-4 w-4 text-white/60" />
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>
    </div>
  );
}

