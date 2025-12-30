"use client";

import * as React from "react";
import { Mic } from "lucide-react";

type Panel = "notes" | "chat" | "people";

export default function PanelBody({ activePanel }: { activePanel: Panel }) {
  if (activePanel === "notes") {
    return (
      <div className="mt-4 space-y-6">
        <div>
          <h4 className="mb-2 text-sm font-bold text-white">Meeting Notes</h4>
          <textarea
            className="w-full resize-none rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white outline-none focus:ring-1 focus:ring-primary"
            rows={8}
            placeholder="Type your notes here..."
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold text-white">Follow-up tasks</h4>
          <button type="button" className="text-sm text-white/70 hover:text-white">
            + Add task
          </button>
        </div>
      </div>
    );
  }

  if (activePanel === "chat") {
    return (
      <div className="mt-4 flex flex-col gap-4">
        <div className="space-y-3 text-sm">
          <div className="text-white/60">Meeting started</div>
          <div className="rounded-lg bg-black/40 p-3">
            <div className="text-xs text-white/50">Klariz • 10:15</div>
            <div className="mt-1">Welcome everyone. Please verify if you can access the shared drive folder.</div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Type a message"
          className="h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-3 rounded border border-white/10 bg-black/40 px-3 py-2">
        <input
          type="text"
          placeholder="Search participants"
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 text-xs font-semibold text-white/60">In this meeting (1)</div>
        <div className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              KH
            </div>
            <span className="text-sm font-medium">Klariz Habla</span>
          </div>
          <Mic className="h-4 w-4 text-white/60" />
        </div>
      </div>
    </div>
  );
}

