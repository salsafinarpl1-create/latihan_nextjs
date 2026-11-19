import { events, type Event } from "@/data/events";
import { supabase } from "@/lib/supabase";

// Pura-pura mengambil data dari database yang agak lambat (masih dipakai dua fungsi di bawah).
function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select("*").order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}


export async function ambilEvent(id: number) {
  await jeda(800);
  return events.find((e) => e.id === id);
}

export async function ambilTerkait(event: Event) {
  await jeda(2000);
  return events.filter((e) => e.kategori === event.kategori && e.id !== event.id);
}