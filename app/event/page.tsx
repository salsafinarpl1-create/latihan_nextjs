import { notFound } from "next/navigation";
import { events, rupiah } from "@/data/events";
import Link from "next/link";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;
  return (
    <article className="rounded-xl border bg-white p-6">
      <Link href="/event" className="inline-block mb-4 text-blue-600 hover:underline">
        ← Kembali ke katalog
      </Link>
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>
      <p className="mt-1 text-slate-500">
        {event.tanggal} - {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>
      <p className="text-slate-600">Sisa {sisa} dari {event.kuota} tiket</p>
    </article>
  );
}