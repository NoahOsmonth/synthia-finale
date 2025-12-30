"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, CheckSquare, LayoutDashboard, Users, Video } from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
};

const PRIMARY_ITEMS: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Meetings", path: "/meetings", icon: Video },
  { name: "Collaboration", path: "/collaboration", icon: Users },
  { name: "Tasks", path: "/tasks", icon: CheckSquare }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 md:hidden",
        "pb-safe-bottom"
      )}
      aria-label="Primary navigation"
    >
      <div className="mx-auto grid h-16 max-w-screen-sm grid-cols-5">
        {PRIMARY_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path + "/"));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "touch-target relative flex flex-col items-center justify-center gap-1 px-2 text-[11px] font-medium",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="relative">
                <Icon className={cn("h-5 w-5 transition-transform", isActive ? "scale-105" : "scale-100")} />
                {item.badge ? (
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-background bg-destructive" />
                ) : null}
              </span>
              <span className="leading-none">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

