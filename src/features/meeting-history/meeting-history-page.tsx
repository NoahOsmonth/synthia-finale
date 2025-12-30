"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Calendar, ChevronRight, Clock, Download, FileText, Filter, PlayCircle, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Panel } from "@/components/shell/panel";
import { Screen } from "@/components/shell/screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { useLongPress } from "@/hooks/use-long-press";
import { useSwipe } from "@/hooks/use-swipe";

const historyData = [
  {
    id: 1,
    title: "Q4 Marketing Strategy Kickoff",
    date: "Oct 24, 2025",
    time: "10:00 AM - 11:30 AM",
    duration: "1h 30m",
    attendees: [
      { name: "Sarah", img: "https://i.pravatar.cc/150?u=1" },
      { name: "Mike", img: "https://i.pravatar.cc/150?u=2" },
      { name: "Anna", img: "https://i.pravatar.cc/150?u=3" }
    ],
    type: "Strategy",
    summarySnippet: "Defined core KPIs for Q4. Agreed to focus on social media expansion...",
    hasRecording: true,
    hasTranscript: true
  },
  {
    id: 2,
    title: "Client Check-in: Alpha Corp",
    date: "Oct 22, 2025",
    time: "02:00 PM - 02:45 PM",
    duration: "45m",
    attendees: [
      { name: "John", img: "https://i.pravatar.cc/150?u=4" },
      { name: "Client", img: "https://i.pravatar.cc/150?u=5" }
    ],
    type: "Client",
    summarySnippet: "Client requested changes to the homepage layout. Deadline extended by 2 days.",
    hasRecording: true,
    hasTranscript: true
  },
  {
    id: 3,
    title: "Weekly Design Sync",
    date: "Oct 20, 2025",
    time: "09:00 AM - 09:30 AM",
    duration: "30m",
    attendees: [
      { name: "Peter", img: "https://i.pravatar.cc/150?u=peter" },
      { name: "Sarah", img: "https://i.pravatar.cc/150?u=1" }
    ],
    type: "Team Sync",
    summarySnippet: "Reviewed new icon set. Approved distinct color palette for dark mode.",
    hasRecording: false,
    hasTranscript: true
  }
] as const;

export default function MeetingHistoryPage() {
  const router = useRouter();
  const { isMobile } = useMobile();
  const [searchTerm, setSearchTerm] = React.useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [actionMeeting, setActionMeeting] = React.useState<(typeof historyData)[number] | null>(null);

  const filteredHistory = historyData.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) || meeting.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const shouldVirtualize = filteredHistory.length > 20;
  const rowVirtualizer = useVirtualizer({
    count: filteredHistory.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 236,
    overscan: 6
  });

  return (
    <Screen>
      <Screen.Header>
        <Screen.Title>Meeting History</Screen.Title>
        <Screen.Description>Archive of past sessions, recordings, and generated insights.</Screen.Description>
      </Screen.Header>
      <Screen.Content>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Time", value: "112h 45m", icon: <Clock className="h-6 w-6" />, tone: "text-primary", bg: "bg-primary/10" },
          { label: "Meetings Held", value: "224", icon: <Calendar className="h-6 w-6" />, tone: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
          { label: "Transcripts", value: "224", icon: <FileText className="h-6 w-6" />, tone: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" }
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border bg-background p-4 shadow-sm">
            <div className={`rounded-lg p-3 ${s.bg} ${s.tone}`}>{s.icon}</div>
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, team, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:w-auto sm:overflow-visible sm:pb-0">
          <Button variant="outline" width="mobile-full" className="shrink-0 sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" width="mobile-full" className="shrink-0 sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {shouldVirtualize ? (
        <div ref={listRef} className="relative max-h-[70vh] overflow-y-auto scroll-touch">
          <div className="relative" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const meeting = filteredHistory[virtualRow.index];
              return (
                <div
                  key={meeting.id}
                  className="absolute left-0 top-0 w-full px-0"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <MeetingCard
                    meeting={meeting}
                    isMobile={isMobile}
                    onOpen={() => router.push(`/meeting-summary/${meeting.id}`)}
                    onAction={() => setActionMeeting(meeting)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              isMobile={isMobile}
              onOpen={() => router.push(`/meeting-summary/${meeting.id}`)}
              onAction={() => setActionMeeting(meeting)}
            />
          ))}
        </div>
      )}

      <Panel
        open={Boolean(actionMeeting)}
        onOpenChange={(open) => (open ? null : setActionMeeting(null))}
        side="right"
        title="Meeting actions"
        description={actionMeeting?.title ?? ""}
      >
        <div className="space-y-2">
          <Button
            width="mobile-full"
            onClick={() => {
              if (!actionMeeting) return;
              router.push(`/meeting-summary/${actionMeeting.id}`);
              setActionMeeting(null);
            }}
          >
            Open details
          </Button>
          <Button variant="outline" width="mobile-full" onClick={() => setActionMeeting(null)}>
            Download
          </Button>
          <Button variant="outline" width="mobile-full" onClick={() => setActionMeeting(null)}>
            Archive
          </Button>
        </div>

        <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end">
          <Button variant="outline" width="mobile-full" onClick={() => setActionMeeting(null)}>
            Close
          </Button>
        </div>
      </Panel>
      </Screen.Content>
    </Screen>
  );
}

function MeetingCard({
  meeting,
  onOpen,
  onAction,
  isMobile
}: {
  meeting: (typeof historyData)[number];
  onOpen: () => void;
  onAction: () => void;
  isMobile: boolean;
}) {
  const longPress = useLongPress({
    onLongPress: () => {
      if (isMobile) onAction();
    }
  });
  const swipe = useSwipe({
    onSwipeLeft: () => {
      if (isMobile) onAction();
    }
  });

  return (
    <Card className="group p-0" {...longPress} {...swipe}>
      <div className="space-y-4 p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="rounded-lg border bg-muted/30 p-3 text-center sm:min-w-[70px]">
              <span className="text-xs font-bold uppercase text-muted-foreground">{meeting.date.split(" ")[0]}</span>
              <span className="block text-xl font-bold">{meeting.date.split(" ")[1].replace(",", "")}</span>
            </div>

            <div className="min-w-0">
              <h3 className="cursor-pointer text-lg font-bold transition-colors group-hover:text-primary" onClick={onOpen}>
                {meeting.title}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {meeting.time}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{meeting.duration}</span>
                <span className="hidden sm:inline">•</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">{meeting.type}</span>
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Summary:</span> {meeting.summarySnippet}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              {meeting.attendees.map((att) => (
                <Image
                  key={att.img}
                  src={att.img}
                  alt={att.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full border-2 border-background object-cover md:h-8 md:w-8"
                  title={att.name}
                />
              ))}
            </div>
            <Button variant="outline" className="hidden md:inline-flex" onClick={onOpen}>
              Details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:flex md:items-center md:justify-end md:gap-2">
          {meeting.hasRecording ? (
            <Button variant="outline" width="mobile-full" className="md:w-auto" title="Play Recording">
              <PlayCircle className="mr-2 h-5 w-5" />
              Play
            </Button>
          ) : null}
          {meeting.hasTranscript ? (
            <Button variant="outline" width="mobile-full" className="md:w-auto" title="View Transcript">
              <FileText className="mr-2 h-5 w-5" />
              Transcript
            </Button>
          ) : null}
          <Button variant="outline" width="mobile-full" className="md:w-auto" title="Download">
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
          <Button width="mobile-full" className="col-span-2 md:hidden" onClick={onOpen}>
            Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
