import * as React from "react";

import { cn } from "@/lib/utils";

type ScreenVariant = "default" | "fullWidth" | "noPadding";

type ScreenProps = {
  children: React.ReactNode;
  variant?: ScreenVariant;
  className?: string;
};

function ScreenRoot({ children, variant = "default", className }: ScreenProps) {
  const padding =
    variant === "default"
      ? "p-4 md:p-8"
      : variant === "fullWidth"
        ? "px-0 py-0"
        : "p-0";

  return <div className={cn("min-h-full bg-muted/30", padding, className)}>{children}</div>;
}

function ScreenHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header className={cn("mb-6 space-y-1", className)} {...props} />;
}

function ScreenTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-2xl font-bold md:text-3xl", className)} {...props} />;
}

function ScreenDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
}

function ScreenContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-6", className)} {...props} />;
}

export const Screen = Object.assign(ScreenRoot, {
  Header: ScreenHeader,
  Title: ScreenTitle,
  Description: ScreenDescription,
  Content: ScreenContent
});

