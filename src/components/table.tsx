"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            className="cursor-pointer transition-colors hover:bg-accent text-center"
            onMouseEnter={() => handleTableHover(table.table_no)}
            onMouseLeave={handleTableLeave}
            onClick={() => onSelectTable(table.table_no)}
          >
            <div>
              <div className=" font-medium text-lg">Table {table.table_no}</div>
              <div className="text-sm text-gray-600">
                {table.seat_availabe}{" "}
                {table.seat_availabe === 1 ? "seat" : "seats"} available
              </div>
            </div>
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
