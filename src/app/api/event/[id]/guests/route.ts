import { wedEvents } from "@/store/wedEvents";
import { type NextRequest, NextResponse } from "next/server";

interface SearchResult {
  table_no: string;
  name: string;
  member_count: number;
}
export async function GET(request: NextRequest) {
  const eventId = request.nextUrl.pathname.split("/").at(-2);
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!wedEvents[eventId as keyof typeof wedEvents]) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  const event = wedEvents[eventId as keyof typeof wedEvents];
  const results: SearchResult[] = [];

  event.tables.forEach((table) => {
    table.families?.forEach((family) => {
      const nameWords = family.name.toLowerCase().split(/\s+/);
      const queryLower = query.toLowerCase();

      if (nameWords.includes(queryLower)) {
        results.push({
          table_no: table.table_no,
          name: family.name,
          member_count: family.member_count,
        });
      }
    });
  });

  return NextResponse.json(results);
}
