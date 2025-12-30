"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, Hash, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const CHANNELS = ["general", "announcements", "projects", "random"] as const;

export default function WorkspacePage() {
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<(typeof CHANNELS)[number]>("general");

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside className="flex w-72 flex-col border-r bg-muted/20">
        <div className="border-b p-3">
          <button
            onClick={() => router.push("/collaboration")}
            className="flex w-full items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-bold">S</div>
              <span className="truncate font-bold">SBIT-3K</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</span>
            <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Add channel">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1">
            {CHANNELS.map((channel) => (
              <button
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                  activeChannel === channel ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Hash className="h-4 w-4" />
                <span className="truncate">{channel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-lg bg-background p-2">
            <div className="h-9 w-9 rounded-full bg-muted" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Peter Parker</div>
              <div className="truncate text-xs text-muted-foreground">peter.park@mail.com</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{activeChannel}</span>
          </div>
          <div className="relative hidden w-64 sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search..."
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </header>

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
                This is a simplified Workspace view. The real-time chat + presence layer can be added later (WebSockets / Supabase Realtime).
              </div>
              <div className="rounded-xl border bg-background p-4 shadow-sm">
                <div className="text-xs text-muted-foreground">Sarah • 10:01</div>
                <div className="mt-1">Kumusta team, quick sync tayo later?</div>
              </div>
              <div className="rounded-xl border bg-background p-4 shadow-sm">
                <div className="text-xs text-muted-foreground">You • 10:02</div>
                <div className="mt-1">G! I’ll share the updated agenda in a bit.</div>
              </div>
            </div>
          </div>

          <div className="border-t bg-background p-4">
            <div className="mx-auto flex max-w-3xl gap-3">
              <input
                placeholder={`Message #${activeChannel}`}
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

