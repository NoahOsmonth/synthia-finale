"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { AppHeader } from "@/components/shared/header";
import { AppSidebar } from "@/components/shared/sidebar";

const TITLE_BY_PATH: Array<[RegExp, string]> = [
  [/^\/dashboard$/, "Dashboard"],
  [/^\/calendar$/, "Calendar"],
  [/^\/meetings$/, "Meetings"],
  [/^\/notifications$/, "Notifications"],
  [/^\/profile$/, "Profile"],
  [/^\/meeting-history$/, "Meeting History"],
  [/^\/meeting-summary(\/.*)?$/, "Meeting Summary"],
  [/^\/settings$/, "Settings"],
  [/^\/collaboration$/, "Collaboration"],
  [/^\/tasks$/, "Tasks"]
];

function titleForPath(pathname: string) {
  for (const [re, title] of TITLE_BY_PATH) {
    if (re.test(pathname)) return title;
  }
  return "Synthia";
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titleForPath(pathname);

  return (
    <div className="flex h-dvh overflow-hidden bg-muted/30">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
