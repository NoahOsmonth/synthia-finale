"use client";

import * as React from "react";
import { Moon, Plus, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader({ title }: { title: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const handleNewEvent = () => window.dispatchEvent(new Event("open-new-event-modal"));

  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b bg-background/70 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <h1 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="w-64 pl-9" />
        </div>
        {title === "Calendar" && (
          <Button onClick={handleNewEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Event</span>
          </Button>
        )}
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
          <Sun className="hidden h-5 w-5 text-amber-500 dark:block" />
          <Moon className="block h-5 w-5 text-primary dark:hidden" />
        </Button>
      </div>
    </header>
  );
}
