"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useLongPress } from "@/hooks/use-long-press";
import { useSwipe } from "@/hooks/use-swipe";

export type ResponsiveColumn<Row> = {
  key: string;
  header: React.ReactNode;
  cell: (row: Row) => React.ReactNode;
  mobileLabel?: React.ReactNode;
  className?: string;
};

type Props<Row> = {
  data: Row[];
  columns: Array<ResponsiveColumn<Row>>;
  rowKey: (row: Row, index: number) => string;
  empty?: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  virtualizeMobile?: boolean;
  estimateRowHeight?: number;
  onRowLongPress?: (row: Row, index: number) => void;
  onRowSwipeLeft?: (row: Row, index: number) => void;
};

export function ResponsiveTable<Row>({
  data,
  columns,
  rowKey,
  empty,
  className,
  mobileClassName,
  virtualizeMobile = false,
  estimateRowHeight = 132,
  onRowLongPress,
  onRowSwipeLeft
}: Props<Row>) {
  const mobileContainerRef = React.useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => mobileContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 6
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="hidden w-full md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {columns.map((col) => (
                  <th key={col.key} className={cn("border-b px-4 py-3", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>
                    {empty ?? "No items"}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={rowKey(row, index)} className="border-b last:border-b-0">
                    {columns.map((col) => (
                      <td key={col.key} className={cn("border-b px-4 py-3 align-top last:border-b-0", col.className)}>
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">
        {data.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">{empty ?? "No items"}</div>
        ) : (
          <div ref={mobileContainerRef} className={cn("relative max-h-[70vh] overflow-y-auto scroll-touch px-4 pb-4", mobileClassName)}>
            {virtualizeMobile ? (
              <div className="relative" style={{ height: rowVirtualizer.getTotalSize() }}>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const row = data[virtualRow.index];
                  return (
                    <div
                      key={rowKey(row, virtualRow.index)}
                      className="absolute left-0 top-0 w-full"
                      style={{ transform: `translateY(${virtualRow.start}px)` }}
                    >
                      <MobileRow
                        row={row}
                        index={virtualRow.index}
                        columns={columns}
                        onLongPress={onRowLongPress}
                        onSwipeLeft={onRowSwipeLeft}
                        spaced
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {data.map((row, index) => (
                  <MobileRow
                    key={rowKey(row, index)}
                    row={row}
                    index={index}
                    columns={columns}
                    onLongPress={onRowLongPress}
                    onSwipeLeft={onRowSwipeLeft}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileRow<Row>({
  row,
  index,
  columns,
  onLongPress,
  onSwipeLeft,
  spaced = false
}: {
  row: Row;
  index: number;
  columns: Array<ResponsiveColumn<Row>>;
  onLongPress?: (row: Row, index: number) => void;
  onSwipeLeft?: (row: Row, index: number) => void;
  spaced?: boolean;
}) {
  const longPress = useLongPress({
    onLongPress: () => onLongPress?.(row, index)
  });
  const swipe = useSwipe({
    threshold: 80,
    onSwipeLeft: () => onSwipeLeft?.(row, index)
  });

  return (
    <Card variant="mobile-stacked" className={cn("p-0", spaced ? "mb-3" : "")} {...longPress} {...swipe}>
      <div className="space-y-3 p-4">
        {columns.map((col) => (
          <div key={col.key} className="flex items-start justify-between gap-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.mobileLabel ?? col.header}</div>
            <div className="min-w-0 text-right text-sm">{col.cell(row)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
