"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type CalendarDay = { day: number; currentMonth: boolean; date: string };
type CalendarEvent = { id: string; title: string; type: string; date: string };

function eventPill(type: string) {
  switch (type) {
    case "team":
      return "bg-pink-500 text-white border-pink-600";
    case "client":
      return "bg-emerald-500 text-white border-emerald-600";
    case "work":
      return "bg-blue-500 text-white border-blue-600";
    case "personal":
      return "bg-violet-500 text-white border-violet-600";
    default:
      return "bg-gray-500 text-white border-gray-600";
  }
}

export default function CalendarMonthView({
  calendarDays,
  events,
  isMobile,
  onSelectEvent,
  onNewEvent
}: {
  calendarDays: CalendarDay[];
  events: CalendarEvent[];
  isMobile: boolean;
  onSelectEvent: (event: CalendarEvent) => void;
  onNewEvent: () => void;
}) {
  return (
    <div className="grid h-full grid-cols-7 overflow-hidden rounded-lg border bg-background shadow-sm">
      {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
        <div
          key={day}
          className="border-b border-r bg-muted/40 p-2 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground last:border-r-0 md:p-3 md:text-xs"
        >
          {day}
        </div>
      ))}

      <div className="col-span-7 grid auto-rows-fr grid-cols-7">
        {calendarDays.map((dayObj, i) => {
          const dayEvents = events.filter((e) => e.date === dayObj.date);
          const isToday = dayObj.date === "2025-12-15";

          return (
            <div
              key={dayObj.date}
              className={`group relative min-h-[84px] border-b border-r p-2 transition-colors ${
                dayObj.currentMonth ? "bg-background" : "bg-muted/30"
              } ${(i + 1) % 7 === 0 ? "border-r-0" : ""} hover:bg-muted/40 md:min-h-[120px]`}
            >
              <div className="mb-1 flex items-start justify-between">
                <button
                  type="button"
                  className={`min-h-touch min-w-touch rounded-full text-sm font-semibold ${
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : dayObj.currentMonth
                        ? "text-foreground/90 hover:bg-muted"
                        : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    if (dayEvents[0]) onSelectEvent(dayEvents[0]);
                  }}
                >
                  {dayObj.day}
                </button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:inline-flex"
                  aria-label="Add new event"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNewEvent();
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, isMobile ? 1 : 3).map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelectEvent(event)}
                    className={`w-full truncate rounded border-l-2 px-2 py-1 text-left text-[11px] font-medium shadow-sm transition-opacity hover:opacity-90 ${eventPill(
                      event.type
                    )}`}
                  >
                    {event.title}
                  </button>
                ))}
                {isMobile && dayEvents.length > 1 ? (
                  <div className="text-[10px] font-semibold text-muted-foreground">+{dayEvents.length - 1} more</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

