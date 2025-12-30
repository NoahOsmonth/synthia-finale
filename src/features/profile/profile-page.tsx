"use client";

import React from "react";
import { Clock, Linkedin, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-6 md:p-8">
      <div className="mb-6 rounded-2xl border bg-background p-6 shadow-sm md:p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-cyan-300">
              <span className="text-3xl font-bold text-cyan-700">PP</span>
            </div>
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-background bg-green-500" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Peter Parker</h1>
            <p className="mt-1 font-medium text-muted-foreground">Software Engineer at Microsoft</p>
          </div>
          <button className="w-full rounded-lg border bg-background px-6 py-2 font-medium text-muted-foreground transition-colors hover:bg-muted md:w-auto">
            Update photo
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border bg-background p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <div>
              <p className="font-semibold">Available</p>
              <p className="text-sm text-muted-foreground">Work hours: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t pt-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">
              Local time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Contact</h2>
        <div className="mb-6 flex items-center gap-4 border-b pb-6">
          <Mail className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="font-semibold">peter.park@mail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
            <button className="font-semibold text-primary hover:underline">Show Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

