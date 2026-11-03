import { notFound } from "next/navigation";
import Link from "next/link"; // <-- 1. Impor Link dari next/link
import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;
  return (
    <article className="rounded-xl border bg-white p-6">
      {/* 2. Tambahkan tombol / teks tautan kembali ke katalog di bagian atas */}
      <Link
        href="/event"
        className="text-blue-600 underline text-sm inline-block mb-4"
      >
        ← Kembali ke katalog
      </Link>

      <span className="block w-max rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>
      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>
      <p className="text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>

      <TombolFavorit id={event.id} />
      <FormPesan event={event} />
    </article>
  );
}
