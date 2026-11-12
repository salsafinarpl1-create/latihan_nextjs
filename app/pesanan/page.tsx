import { cookies } from "next/headers";
import { pesanan } from "@/data/pesanan";
import { batalkanPesanan } from "../actions";

export default async function HalamanPesanan() {
  // Membaca cookie nama dengan await
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value;

  const daftarPesanan = pesanan;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Sapaan Halo, {nama}! (hanya jika cookie ada) */}
      {namaCookie && (
        <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800 font-medium">
          Halo, {namaCookie}!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>

      {/* Tabel Pesanan */}
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b text-left text-sm text-gray-600">
            <th className="p-3">Nama Pemesan</th>
            <th className="p-3">Event</th>
            <th className="p-3">Jumlah</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftarPesanan.map((p: any, index: number) => {
            // Cek apakah pesanan ini milik user yang sedang aktif berdasarkan cookie
            const adalahMilikSaya =
              namaCookie && p.nama.toLowerCase() === namaCookie.toLowerCase();

            return (
              <tr key={p.nomor ?? index} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <span>{p.nama}</span>
                  {/* Label hijau "Kamu" bila cookie ada dan cocok */}
                  {adalahMilikSaya && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      Kamu
                    </span>
                  )}
                </td>
                <td className="p-3">{p.judul ?? p.eventJudul ?? p.eventId}</td>
                <td className="p-3">{p.jumlah}</td>
                <td className="p-3">
                  {/* Tombol batalkan hanya muncul jika pesanan milik user yang sedang login */}
                  {adalahMilikSaya && (
                    <form action={batalkanPesanan}>
                      <input type="hidden" name="nomor" value={p.nomor} />
                      <button
                        type="submit"
                        className="text-red-600 text-sm underline hover:text-red-800"
                      >
                        Batalkan
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
