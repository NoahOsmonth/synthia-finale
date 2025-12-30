"use client";

import * as React from "react";
import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrimaryActionProps = {
  icon: React.ReactNode;
  label: string;
  position?: "floating" | "inline";
  href?: string;
  onClick?: () => void;
  className?: string;
  floatingClassName?: string;
} & Omit<ButtonProps, "children" | "onClick">;

export function PrimaryAction({
  icon,
  label,
  position = "floating",
  href,
  onClick,
  className,
  floatingClassName,
  variant = "default",
  ...buttonProps
}: PrimaryActionProps) {
  const content = (
    <>
      {icon}
      <span className="hidden md:inline">{label}</span>
      <span className="sr-only md:hidden">{label}</span>
    </>
  );

  const commonProps = {
    variant,
    ...buttonProps
  } satisfies Partial<ButtonProps>;

  const inline = (
    <Button
      {...commonProps}
      className={cn(className)}
      onClick={onClick}
      asChild={Boolean(href)}
    >
      {href ? <Link href={href}>{content}</Link> : content}
    </Button>
  );

  if (position === "inline") return inline;

  return (
    <>
      <div
        className={cn(
          "fixed right-4 z-40 md:hidden",
          "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
        )}
      >
        <Button
          {...commonProps}
          size="icon"
          className={cn("shadow-lg", floatingClassName)}
          aria-label={label}
          onClick={onClick}
          asChild={Boolean(href)}
        >
          {href ? <Link href={href}>{icon}</Link> : icon}
        </Button>
      </div>

      <div className="hidden md:inline-flex">{inline}</div>
    </>
  );
}

