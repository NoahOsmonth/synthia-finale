"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Bell, Calendar, Check, CheckSquare, MessageSquare, MoreHorizontal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

type FilterType = "all" | "unread" | "mentions" | "tasks" | "invites";
type NotificationType = "meeting" | "mention" | "task" | "invite";

type NotificationItem = {
  id: string;
  type: NotificationType;
  category: FilterType;
  unread: boolean;
  name: string;
  preview: string;
  time: string;
  badge?: string;
};

const INITIAL: NotificationItem[] = [
  {
    id: "1",
    type: "invite",
    category: "invites",
    unread: true,
    name: "Design System Team",
    preview: "Invitation from Sarah Chen",
    time: "2m",
    badge: "Invite"
  },
  {
    id: "2",
    type: "meeting",
    category: "tasks",
    unread: true,
    name: "Neil Villanueva",
    preview: "Meeting invitation for design review",
    time: "8:46 PM",
    badge: "Meeting"
  },
  {
    id: "3",
    type: "mention",
    category: "mentions",
    unread: true,
    name: "Alex Smith",
    preview: "@mentioned you in a comment",
    time: "10m",
    badge: "Mention"
  },
  {
    id: "4",
    type: "task",
    category: "tasks",
    unread: false,
    name: "Jennifer Martinez",
    preview: "Task assigned: Backend API documentation",
    time: "2h",
    badge: "Task"
  }
];

function updateUnreadCount(notifs: NotificationItem[]) {
  const unreadCount = notifs.filter((n) => n.unread).length;
  sessionStorage.setItem("unreadNotificationCount", unreadCount.toString());
  window.dispatchEvent(new Event("storage"));
}

const FILTERS: FilterType[] = ["all", "unread", "mentions", "tasks", "invites"];

export default function NotificationsPage() {
  const { isMobile } = useMobile();
  const [activeFilter, setActiveFilter] = React.useState<FilterType>("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL);

  React.useEffect(() => {
    updateUnreadCount(notifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = notifications.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return item.unread;
    return item.category === activeFilter;
  });

  const selectedItem = notifications.find((n) => n.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, unread: false } : n));
      updateUnreadCount(updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, unread: false }));
      updateUnreadCount(updated);
      return updated;
    });
    setShowMenu(false);
  };

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const shouldVirtualize = filtered.length > 20;
  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 74,
    overscan: 8
  });

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <div className="flex w-full flex-shrink-0 flex-col border-r bg-background md:w-[340px] lg:w-[400px]">
        <div className="border-b p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Activity</h2>
            <div className="relative">
              <Button variant="ghost" size="icon" aria-label="More options" onClick={() => setShowMenu((v) => !v)}>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              {showMenu ? (
                <div className="absolute right-0 top-full z-10 mt-2 w-52 overflow-hidden rounded-lg border bg-background shadow-xl">
                  <button onClick={markAllAsRead} className="block w-full px-4 py-3 text-left text-sm hover:bg-muted">
                    Mark all as read
                  </button>
                  <button className="block w-full px-4 py-3 text-left text-sm hover:bg-muted">Notification settings</button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  activeFilter === filter ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                {filter === "mentions"
                  ? "@Mentions"
                  : filter === "invites"
                    ? "Invites"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} className="relative flex-1 overflow-y-auto scroll-touch">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No notifications found.</div>
          ) : shouldVirtualize ? (
            <div className="relative" style={{ height: rowVirtualizer.getTotalSize() }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = filtered[virtualRow.index];
                return (
                  <div
                    key={item.id}
                    className="absolute left-0 top-0 w-full"
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    <NotificationRow item={item} selected={selectedId === item.id} onSelect={() => select(item.id)} />
                  </div>
                );
              })}
            </div>
          ) : (
            filtered.map((item) => (
              <NotificationRow key={item.id} item={item} selected={selectedId === item.id} onSelect={() => select(item.id)} />
            ))
          )}
        </div>
      </div>

      <div className="hidden flex-1 overflow-y-auto bg-muted/20 p-8 md:block">
        <NotificationDetail item={selectedItem} />
      </div>

      <Sheet open={Boolean(selectedItem) && isMobile} onOpenChange={(open) => (open ? null : setSelectedId(null))}>
        <SheetContent className="mobile-sheet">
          <SheetHeader>
            <SheetTitle>Notification</SheetTitle>
            <SheetDescription>Details and quick actions.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <NotificationDetail item={selectedItem} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NotificationRow({
  item,
  selected,
  onSelect
}: {
  item: NotificationItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative w-full border-b p-4 text-left transition-colors",
        selected ? "bg-muted/40" : "hover:bg-muted/30"
      )}
    >
      {selected ? <div className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-primary" /> : null}
      <div className="flex items-start justify-between pl-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn("truncate text-sm", item.unread ? "font-bold" : "font-semibold text-muted-foreground")}>{item.name}</p>
            {item.badge ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{item.badge}</span>
            ) : null}
            {item.unread ? <span className="h-2 w-2 rounded-full bg-destructive" /> : null}
          </div>
          <p className={cn("mt-0.5 truncate text-xs", item.unread ? "text-muted-foreground" : "text-muted-foreground/80")}>
            {item.preview}
          </p>
        </div>
        <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted-foreground">{item.time}</span>
      </div>
    </button>
  );
}

function NotificationDetail({ item }: { item: NotificationItem | null }) {
  if (!item) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full border bg-background p-6 shadow-sm">
          <Bell className="h-12 w-12 text-muted-foreground/40" />
        </div>
        <div className="text-xl font-semibold">No notification selected</div>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Select a notification from the list to view details and actions.
        </p>
      </div>
    );
  }

  if (item.type === "meeting") {
    return (
      <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-5 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Design Review</h2>
              <p className="text-sm text-muted-foreground">
                Invitation from <span className="font-semibold text-foreground">{item.name}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button width="mobile-full">Accept</Button>
            <Button variant="outline" width="mobile-full">
              Decline
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-muted/20 p-5 md:p-6">
          <h4 className="text-sm font-bold">Agenda</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {["Review initial wireframes", "Discuss navigation flow", "Assign next steps"].map((a) => (
              <li key={a} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (item.type === "mention") {
    return (
      <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Mentioned in Comment</h2>
            <p className="text-sm text-muted-foreground">On task UI Design System</p>
          </div>
        </div>
        <div className="rounded-xl border bg-muted/20 p-5 text-sm text-muted-foreground md:p-6">
          Hey <span className="font-semibold text-primary">@Peter</span>, can you take a look at the latest color palette updates?
        </div>
      </div>
    );
  }

  if (item.type === "task") {
    return (
      <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <CheckSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Task Assigned</h2>
            <p className="text-sm text-muted-foreground">From {item.name}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-muted/20 p-5 text-sm text-muted-foreground md:p-6">
          Complete comprehensive documentation for all REST API endpoints including request/response formats.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-5 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Team Invitation</h2>
          <p className="text-sm text-muted-foreground">Join the team workspace.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button width="mobile-full">
          <Check className="mr-2 h-4 w-4" /> Accept
        </Button>
        <Button variant="outline" width="mobile-full">
          Decline
        </Button>
      </div>
    </div>
  );
}

