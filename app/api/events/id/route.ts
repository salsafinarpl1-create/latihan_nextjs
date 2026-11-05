import { events } from "@/data/events";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  // Cari event berdasarkan ID (dikonversi ke Number jika ID di data berupa angka)
  const event = events.find((e) => e.id === Number(id));

  // Bila event tidak ditemukan, kembalikan status 404 dengan pesan JSON
  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 },
    );
  }

  // Jika ditemukan, kembalikan data event dalam format JSON
  return NextResponse.json(event);
}
