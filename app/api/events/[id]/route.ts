import { NextRequest } from "next/server";
import { ambilEvent } from "@/data/ambil";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const event = await ambilEvent(Number(id));

  if (!event) {
    return Response.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 }
    );
  }

  return Response.json(event);
}