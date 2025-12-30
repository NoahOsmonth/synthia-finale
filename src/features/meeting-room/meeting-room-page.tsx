"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, LogOut, MessageSquare, Mic, MicOff, Users, Video, VideoOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

type Panel = "notes" | "chat" | "people" | null;

const PanelBody = React.lazy(() => import("./panel-body"));

export default function MeetingRoomPage() {
  const router = useRouter();
  const { isMobile } = useMobile();
  const [isMicMuted, setIsMicMuted] = React.useState(false);
  const [isCameraOff, setIsCameraOff] = React.useState(false);
  const [time, setTime] = React.useState("00:00");
  const [activePanel, setActivePanel] = React.useState<Panel>(null);
  const hasSetDesktopDefaultPanel = React.useRef(false);

  React.useEffect(() => {
    if (isMobile) return;
    if (hasSetDesktopDefaultPanel.current) return;
    if (activePanel !== null) {
      hasSetDesktopDefaultPanel.current = true;
      return;
    }

    setActivePanel("notes");
    hasSetDesktopDefaultPanel.current = true;
  }, [isMobile, activePanel]);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const togglePanel = (panel: Exclude<Panel, null>) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const panelTitle = activePanel ? activePanel[0].toUpperCase() + activePanel.slice(1) : "Panel";

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#1F1F1F] px-4 py-3 pt-safe-top">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20">
            <div className="h-5 w-5 animate-pulse rounded-full border-2 border-white/20" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-white/50">Live</div>
            <div className="text-sm font-semibold text-white/80">{time}</div>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => togglePanel("chat")}>
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => togglePanel("people")}>
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => togglePanel("notes")}>
            <FileText className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex flex-1 flex-col items-center justify-center bg-black px-4 pb-24 md:pb-0">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
            KH
          </div>
          <h2 className="text-center text-lg font-semibold md:text-xl">Waiting for others to join...</h2>
          <p className="mt-2 max-w-md text-center text-sm text-white/60">This is a UI shell — hook real WebRTC later.</p>
        </div>

        {activePanel && !isMobile ? (
          <aside className="flex w-80 flex-col border-l border-white/10 bg-[#1F1F1F]">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="text-lg font-bold">{panelTitle}</h3>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setActivePanel(null)}>
                <span className="sr-only">Close panel</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <React.Suspense fallback={<div className="p-4 text-white/60">Loading…</div>}>
              <PanelBody activePanel={activePanel} />
            </React.Suspense>
          </aside>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#1F1F1F]/95 pb-safe-bottom backdrop-blur">
        <div className="mx-auto flex max-w-screen-md items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <CircleControl
              label="Camera"
              tone={isCameraOff ? "danger" : "neutral"}
              onClick={() => setIsCameraOff((v) => !v)}
              icon={isCameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            />
            <CircleControl
              label="Mic"
              tone={isMicMuted ? "danger" : "neutral"}
              onClick={() => setIsMicMuted((v) => !v)}
              icon={isMicMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CircleControl label="Chat" onClick={() => togglePanel("chat")} icon={<MessageSquare className="h-6 w-6" />} />
            <CircleControl label="People" onClick={() => togglePanel("people")} icon={<Users className="h-6 w-6" />} />
            <CircleControl label="Notes" onClick={() => togglePanel("notes")} icon={<FileText className="h-6 w-6" />} />
          </div>

          <Button className="min-h-14 bg-red-600 px-5 text-white hover:bg-red-700" onClick={() => router.push("/meeting-history")}>
            <LogOut className="mr-2 h-4 w-4" />
            Leave
          </Button>
        </div>
      </div>

      <Sheet open={Boolean(activePanel) && isMobile} onOpenChange={(open) => (open ? null : setActivePanel(null))}>
        <SheetContent className="mobile-sheet bg-[#0B0B0B] text-white">
          <SheetHeader>
            <SheetTitle>{panelTitle}</SheetTitle>
            <SheetDescription className="text-white/60">Swipe down to close.</SheetDescription>
          </SheetHeader>
          {activePanel ? (
            <React.Suspense fallback={<div className="p-2 text-white/60">Loading…</div>}>
              <PanelBody activePanel={activePanel} />
            </React.Suspense>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function CircleControl({
  label,
  icon,
  onClick,
  tone = "neutral"
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  tone?: "neutral" | "danger";
}) {
  const base = "h-14 w-14 rounded-full transition-colors touch-target";
  const color = tone === "danger" ? "bg-red-600/20 text-red-300 hover:bg-red-600/30" : "bg-white/10 text-white hover:bg-white/15";

  return (
    <button type="button" aria-label={label} className={`${base} ${color}`} onClick={onClick}>
      <span className="flex items-center justify-center">{icon}</span>
    </button>
  );
}
