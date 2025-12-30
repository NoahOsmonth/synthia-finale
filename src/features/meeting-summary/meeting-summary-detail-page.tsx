"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckSquare, Clock, Download, File, FileText, Mic, Search, Upload, Users, Video } from "lucide-react";

const TABS = [
  { id: "summary", label: "Summary & Reports", icon: FileText },
  { id: "actions", label: "Action Items", icon: CheckSquare },
  { id: "transcript", label: "Recording & Transcript", icon: Mic },
  { id: "files", label: "Shared Files", icon: File },
  { id: "attendance", label: "Attendance", icon: Users }
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function MeetingSummaryDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("summary");

  const meetingData = useMemo(
    () => ({
      title: id === "1" ? "Capstone Project Proposal Defense" : `Meeting #${id}`,
      date: "November 18, 2025",
      time: "10:00 AM - 11:30 AM",
      duration: "1h 30m",
      organizer: "Klariz Habla",
      attendees: 12
    }),
    [id]
  );

  return (
    <div className="min-h-full bg-muted/30 p-6 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.push("/meeting-history")}
          className="mb-4 flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
        </button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{meetingData.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {meetingData.date} • {meetingData.time}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {meetingData.attendees} Attendees
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <Upload className="h-4 w-4" /> Upload Formal Report
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto border-b">
        <nav className="flex min-w-max space-x-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="min-h-[420px] rounded-xl border bg-background p-6 shadow-sm">
        {activeTab === "summary" ? (
          <div className="space-y-8">
            <section>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span className="h-6 w-1.5 rounded-full bg-primary" /> Meeting Highlights
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground">
                <p>
                  The discussion focused on feasibility, scope, and risk. The panel asked for concrete milestones and a clearer plan for data
                  storage + retrieval (RAG).
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5">
                  <li>Approved the core module architecture.</li>
                  <li>Requested a detailed database schema revision by next Friday.</li>
                  <li>Highlighted security risks in the authentication flow.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span className="h-6 w-1.5 rounded-full bg-blue-500" /> Formal Documentation
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-start gap-4 rounded-xl border p-4 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">Final_Proposal_v2.pdf</div>
                    <div className="mt-1 text-xs text-muted-foreground">Uploaded by {meetingData.organizer} • 2.4 MB</div>
                    <div className="mt-3 flex gap-3 text-xs font-medium">
                      <button className="text-primary hover:underline">View</button>
                      <button className="text-muted-foreground hover:underline">Download</button>
                    </div>
                  </div>
                </div>

                <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:bg-muted/40">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-background">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium">Upload Formal Report</div>
                  <div className="mt-1 text-xs text-muted-foreground">Drag &amp; drop or click to browse</div>
                </div>
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "actions" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pending Tasks</h3>
              <button className="text-sm font-medium text-primary hover:underline">+ Add Item</button>
            </div>
            {[
              { id: 1, text: "Revise Entity Relationship Diagram (ERD)", owner: "Klariz Habla", due: "Nov 25", status: "In Progress" },
              { id: 2, text: "Setup CI/CD Pipeline for staging", owner: "Dev Team", due: "Nov 22", status: "Pending" }
            ].map((item) => (
              <div key={item.id} className="flex items-center rounded-lg border p-4 transition-colors hover:bg-muted/40">
                <input type="checkbox" className="h-5 w-5 rounded border-input text-primary" />
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium">{item.text}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Assigned to: {item.owner} • Due: {item.due}
                  </div>
                </div>
                <span className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "transcript" ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-hidden rounded-lg border bg-black/95">
              <div className="flex h-72 items-center justify-center text-white/80">
                <div className="text-center">
                  <Video className="mx-auto mb-3 h-10 w-10 text-white/60" />
                  <div className="text-sm font-medium">Recording player placeholder</div>
                  <div className="mt-1 text-xs text-white/50">Hook this to real recordings later.</div>
                </div>
              </div>
              <div className="border-t border-white/10 p-4">
                <div className="h-1 w-full rounded-full bg-white/15">
                  <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/50">
                  <span>14:20</span>
                  <span>45:00</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-l pl-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold">Transcript</h4>
                <div className="flex gap-2">
                  <button className="rounded p-1.5 hover:bg-muted" aria-label="Search transcript">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="rounded p-1.5 hover:bg-muted" aria-label="Download transcript">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {[
                  { time: "00:05", speaker: "Klariz", text: "Okay, let's start the defense. The floor is yours." },
                  { time: "00:12", speaker: "You", text: "Thank you. Today we present Synthia, an all-in-one collaboration workspace." },
                  { time: "02:45", speaker: "Panelist", text: "Can you elaborate on security measures for the file sharing module?" }
                ].map((line, idx) => (
                  <div key={idx} className="rounded p-2 transition-colors hover:bg-muted/40">
                    <p className="mb-1 text-xs font-bold text-primary">
                      {line.speaker} <span className="ml-2 font-normal text-muted-foreground">{line.time}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "files" ? (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Files Shared in Meeting</h3>
            <div className="space-y-2">
              {[
                { name: "System_Architecture_v1.png", size: "1.2 MB", type: "Image" },
                { name: "Budget_Proposal.xlsx", size: "450 KB", type: "Sheet" }
              ].map((file, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                      <File className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>
                  <button className="rounded px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10">Download</button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "attendance" ? (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Attendance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="rounded-l-lg px-4 py-3 font-semibold text-muted-foreground">Name</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground">Join Time</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground">Leave Time</th>
                    <th className="rounded-r-lg px-4 py-3 font-semibold text-muted-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { name: "Klariz Habla", join: "10:00 AM", leave: "11:30 AM", dur: "1h 30m" },
                    { name: "Peter Parker", join: "10:02 AM", leave: "11:30 AM", dur: "1h 28m" }
                  ].map((p, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.join}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.leave}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

