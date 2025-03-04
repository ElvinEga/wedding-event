import { wedEvents } from "@/store/wedEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const eventId = request.nextUrl.pathname.split("/").at(-1);

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
