"use client";

import * as React from "react";
import { Menu, Moon, Plus, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader({ title, onOpenMenu }: { title: string; onOpenMenu?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const handleNewEvent = () => window.dispatchEvent(new Event("open-new-event-modal"));

  return (
    <div className="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 pt-safe-top">
      <header className="flex min-h-14 items-center justify-between px-3 md:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={onOpenMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="w-64 pl-9" />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            onClick={() => setMobileSearchOpen((v) => !v)}
          >
            {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

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

      {mobileSearchOpen ? (
        <div className="px-3 pb-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input autoFocus placeholder="Search..." className="w-full pl-9" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

