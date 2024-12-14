import { NextRequest } from "next/server";
import { getSearchResults } from "@/lib/queries";
import { safeStringToInteger } from "@/lib/utils";

export const preferredRegion = ["fra1", "cdg1"];

export async function GET(request: NextRequest) {
  // format is /api/guides?q=term&page=1
  const searchTerm = request.nextUrl.searchParams.get("q");
  if (!searchTerm || !searchTerm.length) {
    return Response.json([]);
  }

  let page = safeStringToInteger(request.nextUrl.searchParams.get("page"));
  if (page <= 0) {
    page = 1;
  }

  const results = await getSearchResults(searchTerm, page);

  const response = Response.json(results);
  // cache for 30 minutes
  response.headers.set("Cache-Control", "public, max-age=1800");
  return response;
}
