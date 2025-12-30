"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, CheckSquare, LayoutDashboard, NotepadText, Settings, User, Users, Video } from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Notifications", path: "/notifications", icon: Bell, badge: true },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Meetings", path: "/meetings", icon: Video },
  { name: "Collaboration", path: "/collaboration", icon: Users },
  { name: "Meeting Summary", path: "/meeting-summary", icon: NotepadText },
  { name: "Tasks", path: "/tasks", icon: CheckSquare }
];

export function AppSidebar() {
  const pathname = usePathname();
  const [hasUnread, setHasUnread] = React.useState(false);

  React.useEffect(() => {
    const checkUnread = () => {
      const unreadCount = sessionStorage.getItem("unreadNotificationCount");
      setHasUnread(unreadCount ? Number.parseInt(unreadCount, 10) > 0 : true);
    };

    checkUnread();
    window.addEventListener("storage", checkUnread);
    return () => window.removeEventListener("storage", checkUnread);
  }, []);

  return (
    <aside className="hidden w-72 flex-shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-14 items-center gap-3 border-b px-4">
        <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-muted">
          <Image src="/brand/synthia-logo.png" alt="Synthia" fill className="object-contain p-1" priority />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Synthia</div>
          <div className="text-xs text-muted-foreground">IMMS</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Menu</div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path + "/"));
            const Icon = item.icon;
            const showBadge = item.badge && hasUnread;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="relative">
                  <Icon className="h-4 w-4" />
                  {showBadge ? (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-background bg-destructive" />
                  ) : null}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Others
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/profile" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/settings"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="border-t p-3">
        <Link href="/profile" className="flex items-center justify-between rounded-xl p-2 hover:bg-muted">
          <div className="flex items-center gap-3">
            <Image
              src="https://picsum.photos/100/100"
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border object-cover"
            />
            <div>
              <p className="text-sm font-semibold">Peter Parker</p>
              <p className="text-xs text-muted-foreground">peter.park@mail.com</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
