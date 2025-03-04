import { wedEvents } from "@/store/wedEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const eventId = params.id;

  if (!wedEvents[eventId as keyof typeof wedEvents]) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const event = { ...wedEvents[eventId as keyof typeof wedEvents] };

  event.tables = event.tables.map((table) => {
    const { ...rest } = table;
    return rest;
  });

  return NextResponse.json(event);
}
