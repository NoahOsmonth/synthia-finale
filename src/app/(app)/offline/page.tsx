import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="mx-auto w-full max-w-xl p-4 md:p-8">
      <Card className="animate-fade-in">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Offline Mode</CardTitle>
          <CardDescription>
            You&apos;re currently offline. Recent pages and static assets may still be available.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full md:w-auto">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full md:w-auto">
            <Link href="/meeting-history">Browse Meeting History</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

