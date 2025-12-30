"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { BottomNav } from "@/components/shared/bottom-nav";
import { AppHeader } from "@/components/shared/header";
import { NavDrawer } from "@/components/shared/nav-drawer";
import { AppSidebar } from "@/components/shared/sidebar";
import { OfflineBanner } from "@/components/shared/offline-banner";
import { InstallPrompt } from "@/components/shared/install-prompt";
import { PullToRefresh } from "@/components/shared/pull-to-refresh";
import { MobileTranscriptionBanner } from "@/components/features/mobile-transcription-banner";

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement | null>(null);
  const pullEnabled = pathname === "/dashboard" || pathname === "/meeting-history";

  return (
    <div className="flex h-dvh overflow-hidden bg-muted/30 pl-safe-left pr-safe-right">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} onOpenMenu={() => setDrawerOpen(true)} />
        <OfflineBanner />
        <MobileTranscriptionBanner />
        <main ref={mainRef} className="relative min-w-0 flex-1 overflow-y-auto scroll-touch pb-24 md:pb-0">
          <PullToRefresh
            containerRef={mainRef}
            enabled={pullEnabled}
            onRefresh={() => {
              window.location.reload();
            }}
          />
          {children}
        </main>
      </div>

      <NavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}
