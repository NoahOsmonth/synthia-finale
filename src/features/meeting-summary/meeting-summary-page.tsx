"use client";

import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Clock, FileText, Folder, LayoutGrid, Layers, List, Search, Star, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const initialFiles = [
  {
    id: 1,
    name: "Capstone Project Proposal Defense",
    subtext: "Meeting Summary • 45m duration",
    modified: "10m ago",
    owner: "Klariz Habla",
    activity: "You recently opened this",
    isFavorite: false,
    workspace: "Capstone 101"
  },
  {
    id: 2,
    name: "SIA 101 - Requirements Analysis",
    subtext: "Transcript & Action Items",
    modified: "2h ago",
    owner: "Klariz Habla",
    activity: "You edited this file",
    isFavorite: true,
    workspace: "Capstone 101"
  },
  {
    id: 3,
    name: "UI/UX Design Review - Sprint 4",
    subtext: "Recording & Notes",
    modified: "Yesterday",
    owner: "Peter Parker",
    activity: "Shared with team",
    isFavorite: false,
    workspace: "Internal Tools"
  },
  {
    id: 4,
    name: "Database Schema Finalization",
    subtext: "Technical Documentation",
    modified: "Nov 15, 2025",
    owner: "Klariz Habla",
    activity: "",
    isFavorite: false,
    workspace: "Capstone 101"
  }
] as const;

type ViewMode = "list" | "grid";
type Filter = "All" | "Recently opened" | "Workspace" | "Favorites";

export default function MeetingSummaryPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("list");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);

  const workspaces = useMemo(() => {
    const uniqueNames = Array.from(new Set(initialFiles.map((f) => f.workspace)));
    return uniqueNames.map((name) => ({
      name,
      fileCount: initialFiles.filter((f) => f.workspace === name).length
    }));
  }, []);

  const filteredFiles = useMemo(() => {
    let data = [...initialFiles];

    if (activeFilter === "Workspace" && selectedWorkspace) {
      data = data.filter((f) => f.workspace === selectedWorkspace);
    } else if (activeFilter === "Recently opened") {
      data = data.filter((f) => f.modified.includes("ago") || f.modified === "Yesterday");
    } else if (activeFilter === "Favorites") {
      data = data.filter((f) => f.isFavorite);
    }

    if (searchQuery) {
      data = data.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    data.sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return data;
  }, [activeFilter, searchQuery, sortOrder, selectedWorkspace]);

  const toggleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  const openFile = (id: number) => router.push(`/meeting-summary/${id}`);

  const handleFilterClick = (filter: Filter) => {
    setActiveFilter(filter);
    setSelectedWorkspace(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-full bg-muted/30 p-6 md:p-8">
      <div className="mb-8">
        {selectedWorkspace ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedWorkspace(null)}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold">{selectedWorkspace}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Viewing files in workspace</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Meeting Summary</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Access documentation, transcripts, and records from past sessions.
            </p>
          </>
        )}
      </div>

      {!selectedWorkspace ? (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {(["All", "Recently opened", "Workspace", "Favorites"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all active:scale-95 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {filter === "All" ? <Layers className="h-4 w-4" /> : null}
              {filter === "Recently opened" ? <Clock className="h-4 w-4" /> : null}
              {filter === "Workspace" ? <Folder className="h-4 w-4" /> : null}
              {filter === "Favorites" ? <Star className="h-4 w-4" /> : null}
              {filter}
            </button>
          ))}
        </div>
      ) : null}

      {activeFilter === "Workspace" && !selectedWorkspace ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workspaces.map((ws) => (
            <button
              key={ws.name}
              onClick={() => setSelectedWorkspace(ws.name)}
              className="group rounded-xl border bg-background p-6 text-center transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4 text-primary transition-transform group-hover:scale-110">
                <Folder className="h-8 w-8" />
              </div>
              <div className="text-lg font-bold">{ws.name}</div>
              <div className="text-sm text-muted-foreground">
                {ws.fileCount} {ws.fileCount === 1 ? "file" : "files"}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search summaries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex w-full items-center justify-end gap-4 sm:w-auto">
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <Upload className="h-4 w-4" /> Upload
              </button>
              <div className="h-5 w-px bg-border" />
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView("list")}
                  className={`rounded p-1.5 transition-colors ${
                    view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`rounded p-1.5 transition-colors ${
                    view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {view === "list" ? (
            <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b bg-muted/30 text-xs font-semibold uppercase text-muted-foreground">
                      <th className="w-[45%] cursor-pointer px-6 py-3 hover:text-foreground" onClick={toggleSort}>
                        Meeting Name{" "}
                        {sortOrder === "asc" ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                      </th>
                      <th className="w-[20%] px-6 py-3">Date Modified</th>
                      <th className="w-[20%] px-6 py-3">Owner</th>
                      <th className="w-[15%] px-6 py-3">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr
                        key={file.id}
                        onClick={() => openFile(file.id)}
                        className="cursor-pointer border-b transition-colors hover:bg-muted/40"
                      >
                        <td className="flex items-center gap-4 px-6 py-3">
                          <div className="relative flex h-10 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-blue-200 bg-background">
                            <div className="absolute bottom-1 right-1 text-[6px] font-bold text-blue-600">DOC</div>
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{file.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{file.subtext}</p>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-muted-foreground">{file.modified}</td>
                        <td className="px-6 py-3 text-sm text-muted-foreground">{file.owner}</td>
                        <td className="px-6 py-3">
                          {file.activity ? (
                            <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                              {file.activity}
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => openFile(file.id)}
                  className="rounded-lg border bg-background p-4 text-left transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-10 items-center justify-center rounded-sm border border-blue-200 bg-background shadow-sm">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="truncate font-semibold">{file.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{file.subtext}</p>
                  <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                    <span>{file.modified}</span>
                    <span>{file.owner}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 ? (
            <div className="mt-4 rounded-lg border bg-background p-12 text-center text-muted-foreground">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-6 w-6" />
              </div>
              <div className="text-lg font-medium text-foreground">No files found</div>
              <div className="mt-1">Try adjusting your filters.</div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

