"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckSquare, Users, Video } from "lucide-react";

import { Panel } from "@/components/shell/panel";
import { Screen } from "@/components/shell/screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";

interface Task {
  id: number;
  title: string;
  status: string;
  workspace: string;
  dueDate: string;
  priority: string;
  description: string;
}

function statusPill(status: string) {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "Completed":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "Pending":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const [briefingOpen, setBriefingOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const tasks: Task[] = [
    {
      id: 1,
      title: "UI Design",
      status: "In Progress",
      workspace: "Capstone 101",
      dueDate: "11/20/2025",
      priority: "High Priority",
      description:
        "Draft the initial wireframes for the new dashboard layout, focusing on the widget grid system and responsive behavior for mobile devices. Incorporate the new Violet brand color scheme."
    },
    {
      id: 2,
      title: "Database Schema",
      status: "Completed",
      workspace: "Capstone 101",
      dueDate: "11/15/2025",
      priority: "High Priority",
      description:
        "Analyze requirements for the new 'Projects' feature and update the ERD. Create migration scripts to add the 'workspaces' table and establish foreign key constraints."
    },
    {
      id: 3,
      title: "API Integration",
      status: "Pending",
      workspace: "Internal Tools",
      dueDate: "11/25/2025",
      priority: "Medium",
      description:
        "Integrate the third-party calendar API to sync user events. Implement OAuth2 authentication flow and handle token refreshing mechanism."
    }
  ];

  return (
    <Screen>
      <Screen.Content>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Total Tasks</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View all tasks" onClick={() => router.push("/tasks")}>
                    <CheckSquare className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Active Workspaces</p>
                    <p className="text-3xl font-bold">2</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View workspaces" onClick={() => router.push("/collaboration")}>
                    <Users className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Meetings Today</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View meetings" onClick={() => router.push("/meetings")}>
                    <Video className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Pre Meeting Heads-up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-semibold">Tomorrow, 10:00 AM!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Strategic Planning and Policy Alignment Meeting - Q4 2025
                  </p>
                </div>
                <Button onClick={() => setBriefingOpen(true)} className="gap-2" width="mobile-full">
                  <span>View Briefing</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b p-4 md:p-6">
              <h3 className="text-lg font-bold">Task List Overview</h3>
              <Button variant="link" onClick={() => router.push("/tasks")}>
                View all
              </Button>
            </div>
            <ResponsiveTable
              data={tasks}
              rowKey={(t) => String(t.id)}
              virtualizeMobile={tasks.length > 20}
              onRowLongPress={(task) => setSelectedTask(task)}
              onRowSwipeLeft={(task) => setSelectedTask(task)}
              columns={[
                {
                  key: "title",
                  header: "Task",
                  mobileLabel: "Task",
                  cell: (t) => <div className="font-semibold">{t.title}</div>
                },
                {
                  key: "status",
                  header: "Status",
                  mobileLabel: "Status",
                  cell: (t) => (
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPill(t.status)}`}>{t.status}</span>
                  )
                },
                {
                  key: "dueDate",
                  header: "Due",
                  mobileLabel: "Due",
                  cell: (t) => <span className="text-muted-foreground">{t.dueDate}</span>
                },
                {
                  key: "action",
                  header: "",
                  mobileLabel: "Action",
                  className: "text-right",
                  cell: (t) => (
                    <Button size="sm" width="mobile-full" onClick={() => setSelectedTask(t)}>
                      View
                    </Button>
                  )
                }
              ]}
            />
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <Button variant="ghost" size="icon" aria-label="Previous month">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <h3 className="text-sm font-bold">December 2025</h3>
                <Button variant="ghost" size="icon" aria-label="Next month">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>

              <div className="mb-1 grid grid-cols-7 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="py-1 text-[10px] font-medium text-muted-foreground">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="min-h-touch flex items-center justify-center text-muted-foreground/40">30</div>
                <button className="min-h-touch rounded-lg font-medium text-foreground/90 hover:bg-muted/50">1</button>
                <button className="min-h-touch rounded-lg font-medium text-foreground/90 hover:bg-muted/50">2</button>
                <button className="min-h-touch rounded-lg font-medium text-foreground/90 hover:bg-muted/50">3</button>
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-primary shadow-sm" />
                  <button className="relative min-h-touch w-full rounded-lg font-bold text-primary-foreground">4</button>
                </div>
                {Array.from({ length: 27 }).map((_, i) => (
                  <button key={i + 5} className="min-h-touch rounded-lg font-medium text-foreground/90 hover:bg-muted/50">
                    {i + 5}
                  </button>
                ))}
                <div className="min-h-touch flex items-center justify-center text-muted-foreground/40">1</div>
                <div className="min-h-touch flex items-center justify-center text-muted-foreground/40">2</div>
                <div className="min-h-touch flex items-center justify-center text-muted-foreground/40">3</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-bold">Schedule</h3>
                <p className="mt-1 text-[10px] text-muted-foreground">Today - November 18, 2025</p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex gap-3 border-b pb-2 last:border-0">
                  <div className="w-12 flex-shrink-0 pt-0.5">
                    <p className="text-xs font-bold text-primary">9:00</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Monthly Meeting</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Capstone 101 Workspace</p>
                  </div>
                </div>
                <div className="flex gap-3 border-b pb-2 last:border-0">
                  <div className="w-12 flex-shrink-0 pt-0.5">
                    <p className="text-xs font-bold text-primary">10:00</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Design Sync</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Internal Tools</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-red-200 dark:border-red-900/50">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-red-500" />
            <CardContent className="p-4 pl-6">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold">Missed Meetings</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-red-500">
                    <AlertCircle className="h-3 w-3" /> Action Required
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {[
                  { title: "Project Alpha Sync", time: "Yesterday, 2:00 PM" },
                  { title: "Client Onboarding", time: "Nov 16, 11:00 AM" }
                ].map((m) => (
                  <div key={m.title} className="flex flex-col gap-2 border-b pb-2 last:border-0">
                    <div>
                      <p className="text-xs font-bold">{m.title}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{m.time}</p>
                    </div>
                    <Button variant="outline" width="mobile-full" onClick={() => router.push("/meeting-summary")}>
                      View Summary
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </Screen.Content>

      <Panel
        open={briefingOpen}
        onOpenChange={setBriefingOpen}
        side="right"
        title="Planning for the Synergy 2025"
        description="Quick context before you walk into the room."
      >
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date & Time</p>
                  <p className="mt-1 text-sm font-semibold">
                    Oct 7, 10:00 AM <span className="font-normal text-muted-foreground">(60m)</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Owner</p>
                  <p className="mt-1 text-sm font-semibold">Hastiel</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Strategic", "Alignment"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-2 py-1 text-xs font-bold uppercase text-muted-foreground ring-1 ring-inset ring-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold">Agenda</h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Review of last quarter&apos;s performance indicators</li>
                <li>Presentation of new policy directives from the control office</li>
                <li>Budget reallocation for planning activities</li>
                <li>Open forum for recommendations and process improvement</li>
                <li>Discussion on inter-departmental coordination for Q4</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold">Attendees</h4>
              <div className="mt-3 space-y-2">
                {[
                  { initials: "AC", name: "Althea Cain", pill: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                  { initials: "NV", name: "Neil Villanueva", pill: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
                  { initials: "AA", name: "Anne Abedi", pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" }
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${a.pill}`}>
                      {a.initials}
                    </span>
                    <span className="text-sm font-medium">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end">
            <Button variant="outline" width="mobile-full" onClick={() => setBriefingOpen(false)}>
              Close
            </Button>
          </div>
      </Panel>

      <Panel
        open={Boolean(selectedTask)}
        onOpenChange={(open) => (open ? null : setSelectedTask(null))}
        side="right"
        title={selectedTask?.title ?? "Task"}
        description="Details and context for this task."
      >

          {selectedTask ? (
            <div className="mt-4 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Status</p>
                  <div className="mt-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPill(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Due Date</p>
                  <p className="mt-2 text-sm font-medium">{selectedTask.dueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Workspace</p>
                <p className="mt-2 text-sm font-bold">{selectedTask.workspace}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Description</p>
                <div className="mt-2 rounded-lg bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
                  {selectedTask.description}
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end">
            <Button width="mobile-full" onClick={() => setSelectedTask(null)}>
              Done
            </Button>
          </div>
      </Panel>
    </Screen>
  );
}
