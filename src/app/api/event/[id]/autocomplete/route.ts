import { wedEvents } from "@/store/wedEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const eventId = request.nextUrl.pathname.split("/").at(-2); // Extracts `[id]` from the URL
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!wedEvents[eventId as keyof typeof wedEvents]) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const event = wedEvents[eventId as keyof typeof wedEvents];
  const suggestions: string[] = [];

  const allFamilyNames = new Set<string>();

  event.tables.forEach((table) => {
    table.families?.forEach((family) => {
      allFamilyNames.add(family.name);
    });
  });

  const queryLower = query.toLowerCase();

  Array.from(allFamilyNames).forEach((name) => {
    if (name.toLowerCase().includes(queryLower)) {
      suggestions.push(name);
    }
  });

  return NextResponse.json(suggestions.sort().slice(0, 5));
}
