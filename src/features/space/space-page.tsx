"use client";

import React, { useState } from "react";
import { BookOpen, ChevronLeft, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const PAGES = [
  { id: "overview", title: "Overview" },
  { id: "meeting-playbook", title: "Meeting Playbook" },
  { id: "rag-notes", title: "RAG Notes" },
  { id: "glossary", title: "Taglish Glossary" }
] as const;

export default function SpacePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<(typeof PAGES)[number]["id"]>("overview");

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside className="flex w-80 flex-col border-r bg-muted/20">
        <div className="border-b p-4">
          <button
            onClick={() => router.push("/workspace")}
            className="mb-3 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Workspace
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Space</div>
              <div className="text-xs text-muted-foreground">Docs & knowledge</div>
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search space..."
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pages</div>
          <div className="space-y-1">
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                  activePage === p.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="truncate">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center border-b bg-background px-6">
          <h1 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {PAGES.find((p) => p.id === activePage)?.title ?? "Space"}
          </h1>
        </header>

        <div className="min-w-0 flex-1 overflow-y-auto p-6">
          {activePage === "overview" ? (
            <article className="prose prose-zinc max-w-3xl dark:prose-invert">
              <h2>Welcome to Space</h2>
              <p>
                Space is the calm shelf where meeting outputs live: summaries, action items, and the bits that become your retrieval corpus.
              </p>
              <p>
                Note: Taglish stays Taglish unless the user explicitly asks to “rewrite to English”.
              </p>
            </article>
          ) : null}

          {activePage === "meeting-playbook" ? (
            <article className="prose prose-zinc max-w-3xl dark:prose-invert">
              <h2>Meeting Playbook</h2>
              <ul>
                <li>Start with agenda + roles (facilitator, note-taker).</li>
                <li>Capture transcript segments (finalized) and store in Supabase.</li>
                <li>Post-meeting: summarize, extract action items, then embed for RAG.</li>
              </ul>
            </article>
          ) : null}

          {activePage === "rag-notes" ? (
            <article className="prose prose-zinc max-w-3xl dark:prose-invert">
              <h2>RAG Notes</h2>
              <p>
                Keep chunks small, attach metadata (meeting id, speaker, timestamps), and store the edited transcript as the source of truth.
              </p>
            </article>
          ) : null}

          {activePage === "glossary" ? (
            <article className="prose prose-zinc max-w-3xl dark:prose-invert">
              <h2>Taglish Glossary</h2>
              <p>Examples (do not “correct” these by default):</p>
              <ul>
                <li>&quot;G&quot; = &quot;Game&quot; / &quot;Sige&quot;</li>
                <li>&quot;Kumusta&quot; = &quot;How are you&quot;</li>
                <li>&quot;Tayo later&quot; = &quot;Let&apos;s do it later&quot;</li>
              </ul>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  );
}
