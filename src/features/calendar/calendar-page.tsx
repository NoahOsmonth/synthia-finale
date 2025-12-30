"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Repeat,
  Users,
  Video,
  X
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  type: "team" | "work" | "personal" | "client";
  date: string;
  start: string;
  end: string;
  location: string;
  description: string;
  attendees: { name: string }[];
  tags: string[];
}

export default function CalendarPage() {
  const router = useRouter();
  const [view, setView] = useState<"week" | "month" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const viewOptions: Array<{ label: string; value: typeof view }> = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Day", value: "day" }
  ];

  useEffect(() => {
    const handleNewEvent = () => setShowNewEventModal(true);
    window.addEventListener("open-new-event-modal", handleNewEvent);
    return () => window.removeEventListener("open-new-event-modal", handleNewEvent);
  }, []);

  useEffect(() => {
    if (selectedEvent || showNewEventModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent, showNewEventModal]);

  const events: Event[] = [
    {
      id: "1",
      title: "Monthly Team Standup",
      type: "team",
      date: "2025-12-15",
      start: "09:00",
      end: "10:00",
      location: "Conference Room A",
      description: "Monthly sync to discuss project progress, roadblocks, and upcoming milestones.",
      attendees: [{ name: "John Doe" }, { name: "Sarah Smith" }, { name: "Mike Johnson" }, { name: "Emily Davis" }],
      tags: ["TEAM"]
    },
    {
      id: "2",
      title: "Client Presentation",
      type: "client",
      date: "2025-12-04",
      start: "14:00",
      end: "15:30",
      location: "Zoom Meeting",
      description: "Final design review with the client.",
      attendees: [{ name: "Alice" }, { name: "Bob" }],
      tags: ["CLIENT"]
    },
    {
      id: "3",
      title: "Sprint Planning",
      type: "work",
      date: "2025-12-29",
      start: "10:00",
      end: "11:00",
      location: "Huddle Room",
      description: "Planning tasks for Sprint 24.",
      attendees: [],
      tags: ["WORK"]
    },
    {
      id: "4",
      title: "Deep Work",
      type: "personal",
      date: "2025-12-10",
      start: "08:00",
      end: "12:00",
      location: "Home Office",
      description: "Focus time for coding.",
      attendees: [],
      tags: ["FOCUS"]
    }
  ];

  const getEventStyles = (type: string) => {
    switch (type) {
      case "team":
        return "bg-pink-500 text-white border-pink-600";
      case "client":
        return "bg-emerald-500 text-white border-emerald-600";
      case "work":
        return "bg-blue-500 text-white border-blue-600";
      case "personal":
        return "bg-violet-500 text-white border-violet-600";
      default:
        return "bg-gray-500 text-white border-gray-600";
    }
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "team":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";
      case "client":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "work":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "personal":
        return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const daysInMonth = 31;
  const calendarDays: Array<{ day: number; currentMonth: boolean; date: string }> = [];
  calendarDays.push({ day: 30, currentMonth: false, date: "2025-11-30" });
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2025-12-${i.toString().padStart(2, "0")}`;
    calendarDays.push({ day: i, currentMonth: true, date: dateStr });
  }
  const remainingCells = 35 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    const dateStr = `2026-01-${i.toString().padStart(2, "0")}`;
    calendarDays.push({ day: i, currentMonth: false, date: dateStr });
  }

  return (
    <div className="relative flex h-full overflow-hidden bg-background">
      <div className="hidden h-full w-64 flex-col overflow-y-auto border-r p-6 md:flex">
        <div className="mb-8 flex-shrink-0">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold">December 2025</h3>
            <div className="flex space-x-1">
              <button
                aria-label="Previous Month"
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next Month"
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            <div className="text-muted-foreground/40">30</div>
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={i}
                className={`mx-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-1 ${
                  i + 1 === 15
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/90 hover:bg-muted dark:hover:bg-muted/60"
                }`}
              >
                {i + 1}
              </div>
            ))}
            <div className="text-muted-foreground/40">1</div>
            <div className="text-muted-foreground/40">2</div>
            <div className="text-muted-foreground/40">3</div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">My Calendars</h4>
          <div className="space-y-3">
            <label className="group flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
              <span className="ml-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                Personal
              </span>
            </label>
            <label className="group flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
              <span className="ml-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">Work</span>
            </label>
            <label className="group flex cursor-pointer items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
              <span className="ml-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">Family</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b bg-background px-6 py-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">December 2025</h2>
            <div className="rounded-lg bg-muted p-1">
              {viewOptions.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setView(v.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    view === v.value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {view === "month" ? (
            <div className="grid min-h-[600px] h-full grid-cols-7 grid-rows-[auto_1fr] overflow-hidden rounded-lg border bg-background shadow-sm">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <div
                  key={day}
                  className="border-b border-r bg-muted/40 p-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground last:border-r-0"
                >
                  {day}
                </div>
              ))}

              <div className="col-span-7 grid auto-rows-fr grid-cols-7">
                {calendarDays.map((dayObj, i) => {
                  const dayEvents = events.filter((e) => e.date === dayObj.date);
                  const isToday = dayObj.date === "2025-12-15";

                  return (
                    <div
                      key={i}
                      className={`
                        group relative min-h-[120px] border-b border-r p-2 transition-colors
                        ${dayObj.currentMonth ? "bg-background" : "bg-muted/30"}
                        ${(i + 1) % 7 === 0 ? "border-r-0" : ""}
                        hover:bg-muted/40
                      `}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span
                          className={`
                            flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium
                            ${isToday ? "bg-primary text-primary-foreground" : dayObj.currentMonth ? "text-foreground/90" : "text-muted-foreground"}
                          `}
                        >
                          {dayObj.day}
                        </span>
                        <button
                          aria-label="Add new event"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNewEventModal(true);
                          }}
                          className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`cursor-pointer truncate rounded border-l-2 px-2 py-1 text-xs font-medium shadow-sm transition-opacity hover:opacity-90 ${getEventStyles(event.type)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border bg-background text-muted-foreground">
              <div className="text-center">
                <CalendarIcon className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
                <p>Detailed {view} view coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedEvent ? (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl border bg-background text-left shadow-2xl transition-all">
              <div className="flex items-start justify-between px-6 pb-2 pt-6">
                <div>
                  <h3 className="pr-8 text-xl font-bold leading-6" id="modal-title">
                    {selectedEvent.title}
                  </h3>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase ring-1 ring-inset ${getBadgeStyles(selectedEvent.type)}`}
                    >
                      {selectedEvent.tags[0]}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  className="rounded-md text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 px-6 py-2">
                <div className="mt-2 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <CalendarIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <p className="font-medium">
                      {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {selectedEvent.start} - {selectedEvent.end}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">Venue: {selectedEvent.location}</p>
                  </div>
                  {selectedEvent.type === "team" ? (
                    <div className="flex items-start gap-3 text-sm">
                      <Video className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <button
                          onClick={() => router.push("/video")}
                          className="font-bold text-primary transition-colors hover:underline"
                        >
                          Join via SYNTHIA
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t pt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-bold">Attendees:</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.length > 0 ? (
                      selectedEvent.attendees.map((attendee, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                        >
                          {attendee.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs italic text-muted-foreground">No attendees added</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="mb-2 text-sm font-bold">Description</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-row-reverse gap-3 border-t bg-muted/20 px-6 py-4">
                <button className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted sm:flex-none">
                  Edit Event
                </button>
                {selectedEvent.type === "team" ? (
                  <button
                    onClick={() => router.push("/video")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none"
                  >
                    <Video className="h-4 w-4" /> Join via SYNTHIA
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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

                <div>
                  <label htmlFor="attendees" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Add required attendees
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="attendees"
                      placeholder="Enter attendees here"
                      className="w-full rounded-lg border bg-muted/30 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
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

                  <div className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Repeat className="h-4 w-4" />
                    <span>Does not repeat</span>
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
