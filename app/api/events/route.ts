import { events } from "@/data/events";

export async function GET() {
  return Response.json(events);
}
