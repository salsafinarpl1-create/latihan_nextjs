import Link from "next/link";
import Image from "next/image";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/events";

export default async function DaftarEvent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; urut?: string; tersedia?: string; hargaMax?: string }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const kategori = params.kategori ?? "Semua";
  const urut = params.urut ?? "terdekat";
  const tersedia = params.tersedia === "true";
  const hargaMax = params.hargaMax ? Number(params.hargaMax) : undefined;

  let events = await ambilEvents();

  // Filter pencarian judul
  if (q) {
    events = events.filter((e) => e.judul.toLowerCase().includes(q.toLowerCase()));
  }

  // Filter kategori
  if (kategori && kategori !== "Semua") {
    events = events.filter((e) => e.kategori === kategori);
  }

  // Filter tiket tersedia
  if (tersedia) {
    events = events.filter((e) => e.kuota - e.terisi > 0);
  }

  // Filter harga maksimum
  if (hargaMax !== undefined && !isNaN(hargaMax)) {
    events = events.filter((e) => e.harga <= hargaMax);
  }

  // Urutkan
  if (urut === "terdekat") {
    events.sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());
  } else if (urut === "termurah") {
    events.sort((a, b) => a.harga - b.harga);
  } else if (urut === "termahal") {
    events.sort((a, b) => b.harga - a.harga);
  }

  const totalSisaTiket = events.reduce((acc, e) => acc + (e.kuota - e.terisi), 0);
  const rataRataHarga = events.length > 0 ? Math.round(events.reduce((acc, e) => acc + e.harga, 0) / events.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Katalog Event</h1>
        <p className="text-slate-500">Cari dan temukan event seru di sekitarmu.</p>
      </div>

      {/* Form Filter & Pencarian */}
      <form method="GET" className="rounded-xl border bg-white p-4 space-y-4 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Cari event..."
            className="rounded-lg border px-3 py-2 text-sm"
          />
          <select name="kategori" defaultValue={kategori} className="rounded-lg border px-3 py-2 text-sm">
            <option value="Semua">Semua</option>
            <option value="Workshop">Workshop</option>
            <option value="Olahraga">Olahraga</option>
            <option value="Musik">Musik</option>
            <option value="Bazar">Bazar</option>
            <option value="Lomba">Lomba</option>
          </select>
          <select name="urut" defaultValue={urut} className="rounded-lg border px-3 py-2 text-sm">
            <option value="terdekat">Tanggal terdekat</option>
            <option value="termurah">Harga termurah</option>
            <option value="termahal">Harga termahal</option>
          </select>
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="tersedia" value="true" defaultChecked={tersedia} id="tersedia" />
            <label htmlFor="tersedia" className="text-sm">Hanya yang masih ada tiket</label>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex gap-4 text-xs text-slate-500">
            <span>{events.length} event ditemukan</span>
            <span>Rata-rata harga {rupiah(rataRataHarga)}</span>
            <span>Total sisa tiket {totalSisaTiket}</span>
          </div>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Terapkan
          </button>
        </div>
      </form>

      {/* List Kartu Event */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const sisa = event.kuota - event.terisi;
          return (
            <div key={event.id} className="rounded-xl border bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative mb-3 aspect-[48/21] w-full">
                  <Image src={event.gambar ?? "/img/default.png"} alt={event.judul} fill className="rounded-lg object-cover" />
                </div>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{event.kategori}</span>
                <h2 className="mt-2 text-xl font-bold">{event.judul}</h2>
                <p className="mt-1 text-sm text-slate-500">{event.tanggal} · {event.lokasi}</p>
                <p className="mt-2 font-semibold">{event.harga === 0 ? "Gratis" : rupiah(event.harga)}</p>
                <p className={`text-xs ${sisa > 0 ? "text-emerald-600" : "text-rose-600 font-semibold"}`}>
                  {sisa > 0 ? `Sisa ${sisa} tiket` : "Tiket habis"}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/event/${event.id}`}
                  className="block w-full rounded bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Lihat detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}