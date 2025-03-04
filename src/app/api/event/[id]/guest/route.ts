import { wedEvents } from "@/store/wedEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const eventId = params.id;

  if (!wedEvents[eventId as keyof typeof wedEvents]) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { table_no, name, phone_number, member_count } = body;

    if (!table_no || !name || !phone_number || !member_count) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = wedEvents[eventId as keyof typeof wedEvents];

    const tableIndex = event.tables.findIndex((t) => t.table_no === table_no);

    if (tableIndex === -1) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    const table = event.tables[tableIndex];

    if (table.seat_availabe <= 0) {
      return NextResponse.json(
        { error: "No available seats at this table" },
        { status: 400 }
      );
    }

    const newFamily = {
      table_id: Number.parseInt(table_no),
      name,
      member_count,
      phone_number,
      checked_at: new Date().toISOString(),
    };

    table.families?.push(newFamily);

    table.seat_assigned += member_count;
    table.seat_availabe = Math.max(0, table.seat_availabe - member_count);

    const updatedTables = event.tables.map((t) => {
      const { ...rest } = t;
      return rest;
    });

    return NextResponse.json(updatedTables);
  } catch (error) {
    console.error("Error registering guest:", error);
    return NextResponse.json(
      { error: "Failed to register guest" },
      { status: 500 }
    );
  }
}
