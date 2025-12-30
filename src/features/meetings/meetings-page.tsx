"use client";

import * as React from "react";
import { AlignLeft, Calendar, Clock, MapPin, Paperclip, Repeat, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type MeetingRow = {
  id: string;
  meeting: string;
  subtitle: string;
  team: string;
  date: string;
  time: string;
};

export default function MeetingsPage() {
  const router = useRouter();
  const [newEventOpen, setNewEventOpen] = React.useState(false);
  const [isOnlineMeeting, setIsOnlineMeeting] = React.useState(false);

  const upcoming: MeetingRow[] = [
    {
      id: "1",
      meeting: "Design Review",
      subtitle: "ShopEase Dashboard",
      team: "Kobam Design",
      date: "Feb 20, 2025",
      time: "09:00 AM"
    },
    { id: "2", meeting: "Weekly Sync", subtitle: "General Updates", team: "Internal", date: "Feb 21, 2025", time: "02:00 PM" }
  ];

  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold md:text-3xl">Meetings</h2>
        <p className="text-muted-foreground">Plan meetings, check schedules, and stay connected.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <button
              onClick={() => setNewEventOpen(true)}
              className="touch-target flex w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="rounded-full bg-muted p-4 text-muted-foreground">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Schedule Meeting</h3>
                <p className="text-sm text-muted-foreground">Pick a date and notify your team.</p>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-red-200 dark:border-red-900">
          <CardContent className="p-0">
            <button
              onClick={() => router.push("/recording")}
              className="touch-target flex w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="rounded-full bg-red-100 p-4 text-red-600 animate-pulse dark:bg-red-900/30 dark:text-red-400">
                <div className="h-4 w-4 rounded-full bg-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Record Meeting</h3>
                <p className="text-sm text-muted-foreground">Start live transcription &amp; recording.</p>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <button
              onClick={() => router.push("/meeting-history")}
              className="touch-target flex w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="rounded-full bg-muted p-4 text-muted-foreground">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Meeting History</h3>
                <p className="text-sm text-muted-foreground">Access past recordings and notes.</p>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b p-4 md:p-6">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
          </div>
          <ResponsiveTable
            data={upcoming}
            rowKey={(m) => m.id}
            columns={[
              {
                key: "meeting",
                header: "Meeting",
                mobileLabel: "Meeting",
                cell: (m) => (
                  <div>
                    <div className="font-semibold">{m.meeting}</div>
                    <div className="text-xs text-muted-foreground">{m.subtitle}</div>
                  </div>
                )
              },
              {
                key: "team",
                header: "Team",
                mobileLabel: "Team",
                cell: (m) => (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{m.team}</span>
                )
              },
              { key: "date", header: "Date", mobileLabel: "Date", cell: (m) => <span className="text-muted-foreground">{m.date}</span> },
              { key: "time", header: "Time", mobileLabel: "Time", cell: (m) => <span className="text-muted-foreground">{m.time}</span> },
              {
                key: "join",
                header: "",
                mobileLabel: "Action",
                className: "text-right",
                cell: () => (
                  <Button size="sm" width="mobile-full" onClick={() => router.push("/meeting-room")}>
                    Join
                  </Button>
                )
              }
            ]}
          />
        </CardContent>
      </Card>

      <Sheet open={newEventOpen} onOpenChange={setNewEventOpen}>
        <SheetContent className="mobile-sheet">
          <SheetHeader>
            <SheetTitle>Set a Scheduled Meeting</SheetTitle>
            <SheetDescription>Fast scheduling, mobile-first layout.</SheetDescription>
          </SheetHeader>

          <form className="mt-4 space-y-5">
            <div>
              <label htmlFor="event-title" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <Input id="event-title" placeholder="Add event title here" required />
            </div>

            <div>
              <label htmlFor="workspace" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Workspace
              </label>
              <select
                id="workspace"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-10"
                defaultValue="Capstone 101"
              >
                <option>Capstone 101</option>
                <option>Internal Tools</option>
                <option>Client Projects</option>
                <option>Marketing Team</option>
              </select>
            </div>

            <div>
              <label htmlFor="attendees" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Required attendees
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="attendees" placeholder="Enter emails or names…" className="pl-10" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="event-date" className="mb-1 block text-sm font-semibold text-muted-foreground">
                  Date
                </label>
                <Input type="date" id="event-date" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="start-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    Start
                  </label>
                  <Input type="time" id="start-time" defaultValue="12:00" />
                </div>
                <div>
                  <label htmlFor="end-time" className="mb-1 block text-sm font-semibold text-muted-foreground">
                    End
                  </label>
                  <Input type="time" id="end-time" defaultValue="13:00" />
                </div>
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

            <div className="flex items-center justify-between gap-4 rounded-xl border bg-muted/10 p-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Repeat className="h-4 w-4" />
                <span>Does not repeat</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">Online</span>
                <button
                  type="button"
                  onClick={() => setIsOnlineMeeting((v) => !v)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    isOnlineMeeting ? "bg-primary" : "bg-muted"
                  }`}
                  aria-label="Toggle online meeting"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${
                      isOnlineMeeting ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-muted-foreground">Attachment</label>
              <label className="group flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 px-4 py-4 transition-colors hover:bg-muted/40">
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm font-medium">Click to upload</span>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>

            <div>
              <label htmlFor="agenda-item" className="mb-1 block text-sm font-semibold text-muted-foreground">
                Agenda
              </label>
              <div className="relative">
                <AlignLeft className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="agenda-item" placeholder="Add agenda item" className="pl-10" />
              </div>
            </div>

            <div className="sticky bottom-0 -mx-4 mt-6 border-t bg-background/95 px-4 py-3 pb-safe-bottom backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:pb-0 md:backdrop-blur-0">
              <SheetFooter className="pt-0">
                <Button type="button" variant="outline" width="mobile-full" onClick={() => setNewEventOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" width="mobile-full">
                  Confirm
                </Button>
              </SheetFooter>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

