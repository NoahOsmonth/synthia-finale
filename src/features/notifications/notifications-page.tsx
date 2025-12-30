"use client";

import React from "react";
import { Bell, Calendar, Check, CheckSquare, MessageSquare, MoreHorizontal, Users } from "lucide-react";

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

export default function NotificationsPage() {
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

  const renderDetail = () => {
    if (!selectedItem) {
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

    if (selectedItem.type === "meeting") {
      return (
        <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-8 shadow-sm">
          <div className="mb-8 flex items-start justify-between border-b pb-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Design Review</h2>
                <p className="text-sm text-muted-foreground">
                  Invitation from <span className="font-semibold text-foreground">{selectedItem.name}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                Accept
              </button>
              <button className="rounded-lg border bg-background px-6 py-2 text-sm font-bold text-muted-foreground hover:bg-muted">
                Decline
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/20 p-6">
            <h4 className="text-sm font-bold">Agenda</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Review initial wireframes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Discuss navigation flow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Assign next steps</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (selectedItem.type === "mention") {
      return (
        <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Mentioned in Comment</h2>
              <p className="text-sm text-muted-foreground">On task UI Design System</p>
            </div>
          </div>
          <div className="rounded-xl border bg-muted/20 p-6 text-sm text-muted-foreground">
            Hey <span className="font-semibold text-primary">@Peter</span>, can you take a look at the latest color palette updates?
          </div>
        </div>
      );
    }

    if (selectedItem.type === "task") {
      return (
        <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Task Assigned</h2>
              <p className="text-sm text-muted-foreground">From {selectedItem.name}</p>
            </div>
          </div>
          <div className="rounded-xl border bg-muted/20 p-6 text-sm text-muted-foreground">
            Complete comprehensive documentation for all REST API endpoints including request/response formats.
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl animate-fade-in rounded-2xl border bg-background p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Team Invitation</h2>
            <p className="text-sm text-muted-foreground">Join the team workspace.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            <Check className="h-4 w-4" /> Accept
          </button>
          <button className="rounded-lg border bg-background px-6 py-2 text-sm font-bold text-muted-foreground hover:bg-muted">Decline</button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <div className="flex w-full flex-shrink-0 flex-col border-r bg-background md:w-[340px] lg:w-[400px]">
        <div className="border-b p-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Activity</h2>
            <div className="relative">
              <button onClick={() => setShowMenu((v) => !v)} className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
              {showMenu ? (
                <div className="absolute right-0 top-full z-10 mt-2 w-52 overflow-hidden rounded-lg border bg-background shadow-xl">
                  <button
                    onClick={markAllAsRead}
                    className="block w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
                  >
                    Mark all as read
                  </button>
                  <button className="block w-full px-4 py-3 text-left text-sm text-foreground hover:bg-muted">
                    Notification settings
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "unread", "mentions", "tasks", "invites"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeFilter === filter ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {filter === "mentions" ? "@Mentions" : filter === "invites" ? "Invites" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No notifications found.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => select(item.id)}
                className={`group relative w-full border-b p-4 text-left transition-colors ${
                  selectedId === item.id ? "bg-muted/40" : "hover:bg-muted/30"
                }`}
              >
                {selectedId === item.id ? <div className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-primary" /> : null}
                <div className="flex items-start justify-between pl-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`truncate text-sm ${item.unread ? "font-bold" : "font-semibold text-muted-foreground"}`}>{item.name}</p>
                      {item.badge ? (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{item.badge}</span>
                      ) : null}
                      {item.unread ? <span className="h-2 w-2 rounded-full bg-destructive" /> : null}
                    </div>
                    <p className={`mt-0.5 truncate text-xs ${item.unread ? "text-muted-foreground" : "text-muted-foreground/80"}`}>{item.preview}</p>
                  </div>
                  <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted-foreground">{item.time}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="hidden flex-1 overflow-y-auto bg-muted/20 p-8 md:block">{renderDetail()}</div>
    </div>
  );
}

