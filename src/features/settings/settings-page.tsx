"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Check, ChevronRight, LogOut, Plus, Search, Shield } from "lucide-react";

type TabId = "general" | "workflows" | "audit" | "roles";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "general", label: "General" },
  { id: "workflows", label: "Approval Chains" },
  { id: "audit", label: "Audit Logs" },
  { id: "roles", label: "Roles & Permissions" }
];

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<TabId>("general");

  const darkMode = theme === "dark";

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-5xl flex-col p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings &amp; Administration</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configure organization-level policies and UI preferences.</p>
      </div>

      <div className="mb-6 overflow-x-auto border-b">
        <nav className="flex min-w-max space-x-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 space-y-6">
        {activeTab === "general" ? (
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Appearance</h3>
              <div className="flex items-center justify-between rounded-xl border bg-background p-4 shadow-sm">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <button
                  onClick={() => setTheme(darkMode ? "light" : "dark")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? "bg-primary" : "bg-muted"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Organization</h3>
              <div className="flex cursor-pointer items-center justify-between rounded-xl border bg-background p-4 shadow-sm transition-colors hover:bg-muted/40">
                <div>
                  <p className="font-medium">Organization Settings</p>
                  <p className="text-sm text-muted-foreground">Branding and configuration</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "workflows" ? (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Workflows</h3>
            <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
              {[
                { title: "Meeting Request Approval", desc: "Require admin approval for new meetings", enabled: true },
                { title: "Transcript Distribution", desc: "Auto-send transcripts to participants", enabled: false },
                { title: "External Sharing", desc: "Allow documents to be shared outside the org", enabled: false }
              ].map((w, idx) => (
                <div key={w.title} className={`flex items-center justify-between p-4 ${idx ? "border-t" : ""}`}>
                  <div>
                    <p className="font-medium">{w.title}</p>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                  <span className={`inline-flex h-6 w-11 items-center rounded-full ${w.enabled ? "bg-primary" : "bg-muted"}`}>
                    <span className={`h-4 w-4 rounded-full bg-background transition-transform ${w.enabled ? "translate-x-6" : "translate-x-1"}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "audit" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
              {[
                { time: "Today, 10:21 AM", user: "Admin", action: "changed permission for", target: "#general" },
                { time: "Today, 10:45 AM", user: "Admin", action: "created role", target: "Reviewer" },
                { time: "Yesterday, 4:45 PM", user: "Katherine Laroga", action: "exported report", target: "Weekly Summary" }
              ].map((log, idx) => (
                <div key={idx} className={`p-4 ${idx ? "border-t" : ""} hover:bg-muted/40`}>
                  <p className="mb-1 text-xs text-muted-foreground">{log.time}</p>
                  <p className="text-sm">
                    <span className="font-semibold">{log.user}</span> {log.action}{" "}
                    <span className="font-semibold">{log.target}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "roles" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Roles &amp; Permissions</h3>
                <p className="text-sm text-muted-foreground">Define what each role can access.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Create Role
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border bg-background">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Permission</th>
                    <th className="px-4 py-3 text-center">Admin</th>
                    <th className="px-4 py-3 text-center">Manager</th>
                    <th className="px-4 py-3 text-center">Member</th>
                    <th className="px-4 py-3 text-center">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    "Manage Organization",
                    "Edit Settings",
                    "Invite Users",
                    "View Audit Logs",
                    "Create Channels",
                    "Send Messages"
                  ].map((perm, idx) => (
                    <tr key={perm} className="hover:bg-muted/40">
                      <td className="px-4 py-3 font-medium">{perm}</td>
                      <td className="px-4 py-3 text-center text-primary">
                        <Check className="mx-auto h-4 w-4" />
                      </td>
                      <td className="px-4 py-3 text-center text-primary">{idx > 1 ? <Check className="mx-auto h-4 w-4" /> : null}</td>
                      <td className="px-4 py-3 text-center text-primary">{idx > 3 ? <Check className="mx-auto h-4 w-4" /> : null}</td>
                      <td className="px-4 py-3 text-center text-primary">{idx > 4 ? <Check className="mx-auto h-4 w-4" /> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Keep permissions minimal by default. Add capabilities only when a role needs them for a workflow.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-12 border-t pt-6">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20"
          onClick={() => router.push("/login")}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

