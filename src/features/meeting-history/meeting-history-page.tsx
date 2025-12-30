"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight, Clock, Download, FileText, Filter, PlayCircle, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = historyData.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Meeting History</h2>
        <p className="mt-1 text-muted-foreground">Archive of your past sessions, recordings, and generated insights.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border bg-background p-4 shadow-sm">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Total Time</p>
            <p className="text-xl font-bold">112h 45m</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border bg-background p-4 shadow-sm">
          <div className="rounded-lg bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Meetings Held</p>
            <p className="text-xl font-bold">224</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border bg-background p-4 shadow-sm">
          <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Transcripts</p>
            <p className="text-xl font-bold">224</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, team, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredHistory.map((meeting) => (
          <div key={meeting.id} className="group rounded-xl border bg-background p-5 transition-all hover:shadow-md">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4">
                <div className="min-w-[70px] rounded-lg border bg-muted/30 p-3 text-center">
                  <span className="text-xs font-bold uppercase text-muted-foreground">{meeting.date.split(" ")[0]}</span>
                  <span className="block text-xl font-bold">{meeting.date.split(" ")[1].replace(",", "")}</span>
                </div>

                <div>
                  <h3
                    className="cursor-pointer text-lg font-bold transition-colors group-hover:text-primary"
                    onClick={() => router.push(`/meeting-summary/${meeting.id}`)}
                  >
                    {meeting.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {meeting.time}
                    </span>
                    <span>•</span>
                    <span>{meeting.duration}</span>
                    <span>•</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">{meeting.type}</span>
                  </div>

                  <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Summary:</span> {meeting.summarySnippet}
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4 border-t pt-4 lg:flex-row lg:gap-8 lg:border-t-0 lg:pt-0">
                <div className="flex -space-x-2">
                  {meeting.attendees.map((att, i) => (
                    <Image
                      key={i}
                      src={att.img}
                      alt={att.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full border-2 border-background"
                      title={att.name}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {meeting.hasRecording ? (
                    <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary" title="Play Recording">
                      <PlayCircle className="h-5 w-5" />
                    </button>
                  ) : null}
                  {meeting.hasTranscript ? (
                    <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-blue-500/10 hover:text-blue-600" title="View Transcript">
                      <FileText className="h-5 w-5" />
                    </button>
                  ) : null}
                  <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" title="Download">
                    <Download className="h-5 w-5" />
                  </button>
                  <div className="mx-1 h-6 w-px bg-border" />
                  <button
                    onClick={() => router.push(`/meeting-summary/${meeting.id}`)}
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    Details <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
