"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { Event, Table } from "@/lib/types";

interface HallLayoutProps {
  eventId: string;
  selectedTable: string | null;
  interactive?: boolean;
}

export default function HallLayout({
  eventId,
  selectedTable,
  interactive = false,
}: HallLayoutProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/event/${eventId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError("Unable to load hall layout. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    if (!event || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = event.hall_layout_image;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.width / aspectRatio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      event.tables.forEach((table: Table) => {
        const x = table.position_x * canvas.width;
        const y = table.position_y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);

        if (table.table_no === selectedTable) {
          ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
        } else if (interactive && table.seat_availabe > 0) {
          ctx.fillStyle = "rgba(34, 197, 94, 0.6)";
        } else {
          ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
        }

        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(table.table_no, x, y);
      });
    };
  }, [event, selectedTable, interactive]);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
        {error || "Failed to load hall layout"}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="mb-2 font-medium">Hall Layout</h3>
          {selectedTable && (
            <p className="mb-4 text-sm">
              Your table is{" "}
              <span className="font-bold text-primary">#{selectedTable}</span>
            </p>
          )}
        </div>
        <div className="relative w-full">
          <canvas ref={canvasRef} className="w-full rounded-md border" />
        </div>
      </CardContent>
    </Card>
  );
}
