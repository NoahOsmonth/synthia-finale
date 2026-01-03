"use client";

import * as React from "react";
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
  Video
} from "lucide-react";

import { Panel } from "@/components/shell/panel";
import { PrimaryAction } from "@/components/shell/primary-action";
import { Screen } from "@/components/shell/screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

const CalendarMonthView = React.lazy(() => import("./month-view"));

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

const viewOptions = [
  { label: "Week", value: "week" as const },
  { label: "Month", value: "month" as const },
  { label: "Day", value: "day" as const }
];

function badgeStyles(type: string) {
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
      return "bg-muted text-muted-foreground";
  }
}

export default function CalendarPage() {
  const router = useRouter();
  const { isMobile } = useMobile();
  const [view, setView] = React.useState<"week" | "month" | "day">("month");
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [newEventOpen, setNewEventOpen] = React.useState(false);

  React.useEffect(() => {
    const handleNewEvent = () => setNewEventOpen(true);
    window.addEventListener("open-new-event-modal", handleNewEvent);
    return () => window.removeEventListener("open-new-event-modal", handleNewEvent);
  }, []);

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
    }
  ];

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
    <Screen variant="fullWidth" className="h-full bg-background">
      <Screen.Content className="relative flex h-full overflow-hidden bg-background">
        <div className="hidden h-full w-64 flex-col overflow-y-auto border-r p-6 md:flex">
          <div className="mb-8 flex-shrink-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">December 2025</h3>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" aria-label="Previous Month">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next Month">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="font-medium text-muted-foreground">
                  {d}
                </div>
              ))}
              <div className="text-muted-foreground/40">30</div>
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={`mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
                    i + 1 === 15 ? "bg-primary text-primary-foreground" : "text-foreground/90 hover:bg-muted"
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
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Personal", color: "bg-violet-500", bgLight: "bg-violet-100", textDark: "text-violet-700", bgDark: "dark:bg-violet-900/30", textDarkMode: "dark:text-violet-300" },
                { name: "Work", color: "bg-blue-500", bgLight: "bg-blue-100", textDark: "text-blue-700", bgDark: "dark:bg-blue-900/30", textDarkMode: "dark:text-blue-300" },
                { name: "Family", color: "bg-emerald-500", bgLight: "bg-emerald-100", textDark: "text-emerald-700", bgDark: "dark:bg-emerald-900/30", textDarkMode: "dark:text-emerald-300" }
              ].map((cal) => (
                <button
                  key={cal.name}
                  className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${cal.bgLight} ${cal.textDark} ${cal.bgDark} ${cal.textDarkMode} hover:opacity-80`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${cal.color}`} />
                  {cal.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 border-b bg-background px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold md:text-2xl">December 2025</h2>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-lg bg-muted p-1">
                {viewOptions.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setView(v.value)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                      view === v.value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <PrimaryAction
                icon={<Plus className="h-5 w-5" />}
                label="New Event"
                onClick={() => setNewEventOpen(true)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {view === "month" ? (
              <React.Suspense
                fallback={<div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">Loading calendar…</div>}
              >
                <CalendarMonthView
                  calendarDays={calendarDays}
                  events={events}
                  isMobile={isMobile}
                  onSelectEvent={(e) => setSelectedEvent(e as Event)}
                  onNewEvent={() => setNewEventOpen(true)}
                />
              </React.Suspense>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border bg-background text-muted-foreground">
                <div className="text-center">
                  <CalendarIcon className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
                  <p>Detailed {view} view coming soon.</p>
                </div>
              </div>
            )}

            <div className="mt-6 md:hidden">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upcoming</h3>
              <div className="space-y-3">
                {events.slice(0, 4).map((e) => (
                  <Card key={e.id}>
                    <CardContent className="pt-4 pb-4 space-y-2 md:pt-4 md:pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{e.title}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{e.date}</div>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${badgeStyles(e.type)}`}>
                          {e.tags[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {e.start} - {e.end}
                        </span>
                        <Button size="sm" onClick={() => setSelectedEvent(e)}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Screen.Content>

      <Panel
        open={Boolean(selectedEvent)}
        onOpenChange={(nextOpen) => (nextOpen ? null : setSelectedEvent(null))}
        side="right"
        title={selectedEvent?.title ?? "Event"}
        description="Event details."
      >
        {selectedEvent ? (
          <div className="space-y-4">
            <div>
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase ring-1 ring-inset ${badgeStyles(
                  selectedEvent.type
                )}`}
              >
                {selectedEvent.tags[0]}
              </span>
            </div>

            <div className="space-y-3 rounded-xl border bg-muted/10 p-4">
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
                  <button
                    type="button"
                    onClick={() => router.push("/video")}
                    className="font-bold text-primary hover:underline"
                  >
                    Join via SYNTHIA
                  </button>
                </div>
              ) : null}
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-bold">Attendees</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.attendees.length > 0 ? (
                  selectedEvent.attendees.map((a) => (
                    <span
                      key={a.name}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {a.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-muted-foreground">No attendees added</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold">Description</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedEvent.description}</p>
            </div>

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button variant="outline" width="mobile-full">
                Edit Event
              </Button>
              {selectedEvent.type === "team" ? (
                <Button width="mobile-full" onClick={() => router.push("/video")}>
                  <Video className="mr-2 h-4 w-4" /> Join via SYNTHIA
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Panel>

      <Sheet open={newEventOpen} onOpenChange={setNewEventOpen}>
        <SheetContent className="mobile-sheet">
          <SheetHeader>
            <SheetTitle>Set a Scheduled Meeting</SheetTitle>
            <SheetDescription>Create an event quickly.</SheetDescription>
          </SheetHeader>

          <form className="mt-4 space-y-5">
            <div>
              <label htmlFor="event-title" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <Input id="event-title" placeholder="Add event title here" required />
            </div>

            <div>
              <label htmlFor="attendees" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Required attendees
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="attendees" placeholder="Enter attendees here" className="pl-10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="start-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                  Start Time
                </label>
                <Input type="time" id="start-time" defaultValue="12:00" />
              </div>
              <div>
                <label htmlFor="end-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                  End Time
                </label>
                <Input type="time" id="end-time" defaultValue="13:00" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Location
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" placeholder="Enter location" className="pl-10" />
              </div>
            </div>

            <div className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
              <Repeat className="h-4 w-4" />
              <span>Does not repeat</span>
            </div>

            <SheetFooter>
              <Button type="button" variant="outline" width="mobile-full" onClick={() => setNewEventOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" width="mobile-full">
                Confirm
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </Screen>
  );
}

