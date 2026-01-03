import { Screen } from "@/components/shell/screen";

export default function Loading() {
  return (
    <Screen>
      <Screen.Header>
        <Screen.Title>
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        </Screen.Title>
      </Screen.Header>

      <Screen.Content>
        <div className="space-y-6">
          <div className="h-12 w-full animate-pulse rounded bg-muted" />
          <div className="h-32 w-full animate-pulse rounded bg-muted" />
          <div className="h-32 w-full animate-pulse rounded bg-muted" />
          <div className="h-32 w-full animate-pulse rounded bg-muted" />
        </div>
      </Screen.Content>
    </Screen>
  );
}
