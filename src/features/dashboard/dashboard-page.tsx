"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckSquare, Users, Video, X } from "lucide-react";

interface Task {
  id: number;
  title: string;
  status: string;
  workspace: string;
  dueDate: string;
  priority: string;
  description: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [showBriefing, setShowBriefing] = React.useState(false);
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
      description: "Integrate the third-party calendar API to sync user events. Implement OAuth2 authentication flow and handle token refreshing mechanism."
    }
  ];

  React.useEffect(() => {
    if (showBriefing || selectedTask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showBriefing, selectedTask]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowBriefing(false);
        setSelectedTask(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes("High")) return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300";
    if (priority.includes("Medium")) return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-full bg-muted/30 p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <button
                  aria-label="View all tasks"
                  onClick={() => router.push("/tasks")}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted"
                >
                  <CheckSquare className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Active Workspaces</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <button
                  aria-label="View active workspaces"
                  onClick={() => router.push("/collaboration")}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted"
                >
                  <Users className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Meetings Today</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <button
                  aria-label="View today's meetings"
                  onClick={() => router.push("/meetings")}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted"
                >
                  <Video className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Pre Meeting Heads-up</h3>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-semibold">Tomorrow, 10:00 AM!</p>
                <p className="mt-1 text-sm text-muted-foreground">Strategic Planning and Policy Alignment Meeting - Q4 2025</p>
              </div>
              <button
                onClick={() => setShowBriefing(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <span>View Briefing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="flex items-center justify-between border-b p-6">
              <h3 className="text-lg font-bold">Task List Overview</h3>
              <button onClick={() => router.push("/tasks")} className="text-sm font-medium text-primary hover:text-primary/80">
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Task Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Workspace
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Due Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tasks.map((task) => (
                    <tr key={task.id} className="transition-colors hover:bg-muted/40">
                      <td className="px-6 py-4 font-medium">{task.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{task.workspace}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <button
                aria-label="Previous month"
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <h3 className="text-sm font-bold">December 2025</h3>
              <button
                aria-label="Next month"
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="py-1 text-[10px] font-medium text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-x-1 gap-y-1 text-center text-xs">
              <div className="py-1.5 text-muted-foreground/40">30</div>
              <div className="cursor-pointer rounded-lg py-1.5 font-medium text-foreground/90 hover:bg-muted/50">1</div>
              <div className="cursor-pointer rounded-lg py-1.5 font-medium text-foreground/90 hover:bg-muted/50">2</div>
              <div className="cursor-pointer rounded-lg py-1.5 font-medium text-foreground/90 hover:bg-muted/50">3</div>
              <div className="relative">
                <div className="absolute inset-0 rounded-md bg-primary shadow-sm" />
                <div className="relative cursor-pointer py-1.5 font-bold text-primary-foreground">4</div>
              </div>
              {[...Array(27)].map((_, i) => (
                <div key={i + 5} className="cursor-pointer rounded-lg py-1.5 font-medium text-foreground/90 hover:bg-muted/50">
                  {i + 5}
                </div>
              ))}
              <div className="py-1.5 text-muted-foreground/40">1</div>
              <div className="py-1.5 text-muted-foreground/40">2</div>
              <div className="py-1.5 text-muted-foreground/40">3</div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-bold">Schedule</h3>
              <p className="mt-1 text-[10px] text-muted-foreground">Today - November 18, 2025</p>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex gap-3 border-b pb-2 last:border-0">
                <div className="w-10 flex-shrink-0 pt-0.5">
                  <p className="text-xs font-bold text-primary">9:00</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">Monthly Meeting</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Capstone 101 Workspace</p>
                </div>
              </div>
              <div className="flex gap-3 border-b pb-2 last:border-0">
                <div className="w-10 flex-shrink-0 pt-0.5">
                  <p className="text-xs font-bold text-primary">10:00</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold">Design Sync</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Internal Tools</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-red-200 bg-background p-4 shadow-sm dark:border-red-900/50">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-red-500" />

            <div className="mb-3 flex items-center justify-between pl-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold">Missed Meetings</h3>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-red-500">
                  <AlertCircle className="h-3 w-3" /> Action Required
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pl-2">
              <div className="flex flex-col gap-2 border-b pb-2 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold">Project Alpha Sync</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Yesterday, 2:00 PM</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/meeting-summary")}
                  className="w-full rounded border border-red-100 bg-red-50 py-1 text-[10px] font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                >
                  View Summary
                </button>
              </div>

              <div className="flex flex-col gap-2 border-b pb-2 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold">Client Onboarding</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Nov 16, 11:00 AM</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/meeting-summary")}
                  className="w-full rounded border border-red-100 bg-red-50 py-1 text-[10px] font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                >
                  View Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBriefing ? (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBriefing(false)} />

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-xl border bg-background text-left shadow-xl transition-all">
              <div className="px-6 pb-4 pt-5 sm:p-6 sm:pl-8">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <h3 className="text-lg font-bold leading-6" id="modal-title">
                      Planning for the Synergy 2025
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-background text-muted-foreground hover:text-foreground"
                    onClick={() => setShowBriefing(false)}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6 flex items-start gap-10 border-b pb-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">DATE &amp; TIME</p>
                      <p className="text-sm font-semibold">
                        Oct 7, 10:00 AM <span className="font-normal text-muted-foreground">(60m)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">OWNER</p>
                      <p className="text-sm font-semibold">Hastiel</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828l-5-5z" />
                        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">TAGS</p>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-bold uppercase text-muted-foreground ring-1 ring-inset ring-border">
                          Strategic
                        </span>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-bold uppercase text-muted-foreground ring-1 ring-inset ring-border">
                          Alignment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 border-b pb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-md bg-muted p-1.5 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 13h5" />
                        <path d="M12 17h5" />
                        <path d="M9 13h.01" />
                        <path d="M9 17h.01" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold">Agenda for the meeting:</h4>
                  </div>
                  <ul className="list-disc space-y-2 pl-12 text-sm text-muted-foreground marker:text-muted-foreground/70">
                    <li>Review of last quarter&apos;s performance indicators</li>
                    <li>Presentation of new policy directives from the control office</li>
                    <li>Budget reallocation for planning activities</li>
                    <li>Open forum for recommendations and process improvement</li>
                    <li>Discussion on inter-departmental coordination for Q4</li>
                  </ul>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-md bg-muted p-1.5 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold">Attendees</h4>
                  </div>

                  <div className="space-y-3 pl-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                        AC
                      </span>
                      <span className="text-sm font-medium">Althea Cain</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                        NV
                      </span>
                      <span className="text-sm font-medium">Neil Villanueva</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-300">
                        AA
                      </span>
                      <span className="text-sm font-medium">Anne Abedi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedTask ? (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="task-modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl border bg-background text-left shadow-xl transition-all">
              <div className="flex items-start justify-between border-b p-6">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <h2 className="text-xl font-bold leading-tight" id="task-modal-title">
                    {selectedTask.title}
                  </h2>
                </div>
                <button
                  aria-label="Close task details"
                  onClick={() => setSelectedTask(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Status</p>
                    <span className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Priority</p>
                    <span className={`rounded px-2 py-1 text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Due Date</p>
                    <p className="text-sm font-medium">{selectedTask.dueDate}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Workspace</p>
                  <p className="text-sm font-bold">{selectedTask.workspace}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Description</p>
                  <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
                    {selectedTask.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

