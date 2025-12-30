"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlignLeft,
  Building,
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  Paperclip,
  Repeat,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MeetingsPage() {
  const router = useRouter();

  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [isOnlineMeeting, setIsOnlineMeeting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const workspaces = [
    { id: "ws1", name: "Capstone 101", memberCount: 5 },
    { id: "ws2", name: "Internal Tools", memberCount: 12 },
    { id: "ws3", name: "Client Projects", memberCount: 8 },
    { id: "ws4", name: "Marketing Team", memberCount: 4 }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWorkspaceDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddWorkspace = (workspaceName: string) => {
    const newEntry = `[Workspace: ${workspaceName}]`;
    setAttendeeInput((prev) => (prev ? `${prev}, ${newEntry}` : newEntry));
    setShowWorkspaceDropdown(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Meetings</h2>
          <p className="text-muted-foreground">Plan meetings, check schedules, and stay connected.</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <button
          onClick={() => setShowNewEventModal(true)}
          className="rounded-2xl border bg-background p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">Schedule Meeting</h3>
            <p className="text-sm text-muted-foreground">Pick a date and notify your team.</p>
          </div>
        </button>

        <button
          onClick={() => router.push("/recording")}
          className="rounded-2xl border border-red-200 bg-background p-6 shadow-sm transition-all hover:border-red-300 hover:shadow-md dark:border-red-900"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600 animate-pulse dark:bg-red-900/30 dark:text-red-400">
              <div className="h-4 w-4 rounded-full bg-red-600" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">Record Meeting</h3>
            <p className="text-sm text-muted-foreground">Start live transcription &amp; recording.</p>
          </div>
        </button>

        <button
          onClick={() => router.push("/meeting-history")}
          className="rounded-2xl border bg-background p-6 text-left shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">Meeting History</h3>
            <p className="text-sm text-muted-foreground">Access past recordings and notes.</p>
          </div>
        </button>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Upcoming Meetings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm font-medium text-muted-foreground">
                <th className="px-4 py-3">Meeting</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="transition-colors hover:bg-muted/40">
                <td className="px-4 py-4">
                  <span className="block font-semibold">Design Review</span>
                  <span className="text-xs text-muted-foreground">ShopEase Dashboard</span>
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Kobam Design
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">Feb 20, 2025</td>
                <td className="px-4 py-4 text-muted-foreground">09:00 AM</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => router.push("/meeting-room")}
                    className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                  >
                    Join
                  </button>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-muted/40">
                <td className="px-4 py-4">
                  <span className="block font-semibold">Weekly Sync</span>
                  <span className="text-xs text-muted-foreground">General Updates</span>
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    Internal
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">Feb 21, 2025</td>
                <td className="px-4 py-4 text-muted-foreground">02:00 PM</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => router.push("/meeting-room")}
                    className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                  >
                    Join
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showNewEventModal ? (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowNewEventModal(false)} />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl transform overflow-hidden rounded-xl border bg-background text-left shadow-2xl transition-all">
              <div className="border-b px-6 py-4">
                <h3 className="text-xl font-bold">Set a Scheduled Meeting</h3>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <label htmlFor="event-title" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Add title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="event-title"
                    placeholder="Add event title here"
                    className="w-full rounded-lg border bg-muted/30 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div ref={dropdownRef}>
                  <label htmlFor="attendees" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Add required attendees
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="attendees"
                      value={attendeeInput}
                      onChange={(e) => setAttendeeInput(e.target.value)}
                      placeholder="Enter attendees or select workspace..."
                      className="w-full rounded-lg border bg-muted/30 py-2 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                    <button
                      type="button"
                      onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
                      className="absolute right-2 top-1.5 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                      title="Add from Workspace"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${showWorkspaceDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showWorkspaceDropdown ? (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg border bg-background shadow-lg">
                        <div className="border-b bg-muted/30 px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                          Select workspace to invite
                        </div>
                        <ul className="py-1">
                          {workspaces.map((ws) => (
                            <li key={ws.id}>
                              <button
                                type="button"
                                onClick={() => handleAddWorkspace(ws.name)}
                                className="group flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                  <span className="text-sm font-medium group-hover:text-foreground">{ws.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{ws.memberCount} members</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="event-date" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Date
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    className="w-full rounded-lg border bg-muted/30 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="start-time"
                      defaultValue="12:00"
                      className="w-full rounded-lg border bg-muted/30 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="end-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="end-time"
                      defaultValue="13:00"
                      className="w-full rounded-lg border bg-muted/30 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="location" className="mb-1 block text-sm font-semibold text-muted-foreground">
                      Add Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        placeholder="Enter location"
                        className="w-full rounded-lg border bg-muted/30 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <div className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                      <Repeat className="h-4 w-4" />
                      <span>Does not repeat</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-muted-foreground">Online Meeting</span>
                      <button
                        type="button"
                        onClick={() => setIsOnlineMeeting(!isOnlineMeeting)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          isOnlineMeeting ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                            isOnlineMeeting ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-muted-foreground">Upload Attachment</label>
                  <label className="group flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 px-4 py-3 transition-colors hover:bg-muted/40">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm font-medium">Click to upload or drag and drop</span>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div>
                  <label htmlFor="agenda-item" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Agenda
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="agenda-item"
                      placeholder="Add agenda item"
                      className="w-full rounded-lg border bg-muted/30 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <AlignLeft className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t bg-muted/20 px-6 py-4">
                <button
                  onClick={() => setShowNewEventModal(false)}
                  className="rounded-lg border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
                <button className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

