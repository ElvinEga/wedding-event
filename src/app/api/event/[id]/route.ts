import { type NextRequest, NextResponse } from "next/server";

const wedEvents = {
  "sarah-wedding": {
    bride: "Sarah",
    groom: "Michael",
    wedding_date: "2025-06-15T18:00:00Z",
    hall_layout_image: "",
    tables: [
      {
        table_no: "1",
        seat_availabe: 2,
        seat_assigned: 8,
        position_x: 0.2,
        position_y: 0.3,
        families: [
          {
            table_id: 1,
            name: "Johnson",
            member_count: 4,
            phone_number: "555-123-4567",
            checked_at: "2025-06-15T19:30:00Z",
          },
          {
            table_id: 1,
            name: "Smith",
            member_count: 4,
            phone_number: "555-987-6543",
            checked_at: "2025-06-15T19:45:00Z",
          },
        ],
      },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const eventId = params.id;

  if (!wedEvents[eventId as keyof typeof wedEvents]) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const event = { ...wedEvents[eventId as keyof typeof wedEvents] };

  event.tables = event.tables.map((table) => {
    const { families, ...rest } = table;
    return rest;
  });

  return NextResponse.json(event);
}
