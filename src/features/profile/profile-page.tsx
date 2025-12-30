"use client";

import * as React from "react";
import { Clock, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [name, setName] = React.useState("Peter Parker");
  const [role, setRole] = React.useState("Software Engineer at Microsoft");
  const [email, setEmail] = React.useState("peter.park@mail.com");
  const [linkedIn, setLinkedIn] = React.useState("Show Profile");

  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-4 md:p-8">
      <Card className="mb-6 rounded-2xl">
        <CardContent className="space-y-4 md:space-y-0">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-cyan-300">
                <span className="text-3xl font-bold text-cyan-700">PP</span>
              </div>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-background bg-green-500" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-bold md:text-3xl">{name}</h1>
              <p className="mt-1 font-medium text-muted-foreground">{role}</p>
            </div>

            <label className="touch-target inline-flex w-full cursor-pointer items-center justify-center rounded-lg border bg-background px-6 py-2 font-medium text-muted-foreground transition-colors hover:bg-muted md:w-auto">
              Update photo
              <input type="file" className="hidden" />
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div>
                <p className="font-semibold">Available</p>
                <p className="text-sm text-muted-foreground">Work hours: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t pt-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">Local time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-bold">Edit Profile</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground">Role</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-2xl">
        <CardContent className="space-y-5">
          <h2 className="text-xl font-bold">Contact</h2>

          <div className="flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center">
            <Mail className="h-6 w-6 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-semibold">{email}</p>
            </div>
            <div className="w-full sm:w-72">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
              <button type="button" className="font-semibold text-primary hover:underline">
                {linkedIn}
              </button>
            </div>
            <div className="w-full sm:w-72">
              <Input value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-0 mt-8 border-t bg-background/80 py-4 pb-safe-bottom backdrop-blur md:static md:bg-transparent md:backdrop-blur-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" width="mobile-full" className="sm:w-auto">
            Cancel
          </Button>
          <Button width="mobile-full" className="sm:w-auto">
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

