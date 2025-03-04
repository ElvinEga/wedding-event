"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { Table } from "@/lib/types";
import HallLayout from "./hall";

interface TableSelectionProps {
  tables: Table[];
  onSelectTable: (tableNo: string) => void;
  loading: boolean;
  eventId: string;
}

export default function TableSelection({
  tables,
  onSelectTable,
  loading,
  eventId,
}: TableSelectionProps) {
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);

  const handleTableHover = (tableNo: string) => {
    setHighlightedTable(tableNo);
  };

  const handleTableLeave = () => {
    setHighlightedTable(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Select a Table</h3>
        <p className="text-sm text-muted-foreground">
          The following tables have available seats
        </p>
      </div>

      <HallLayout
        eventId={eventId}
        selectedTable={highlightedTable}
        interactive={true}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {tables.map((table) => (
          <Card
            key={table.table_no}
            className="cursor-pointer transition-colors hover:bg-accent"
            onMouseEnter={() => handleTableHover(table.table_no)}
            onMouseLeave={handleTableLeave}
            onClick={() => onSelectTable(table.table_no)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Table {table.table_no}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm">
                <span className="font-medium text-primary">
                  {table.seat_availabe}
                </span>{" "}
                seats available
              </p>
              <p className="text-xs text-muted-foreground">
                {table.seat_assigned} seats already assigned
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Back to Search"
        )}
      </Button>
    </div>
  );
}
