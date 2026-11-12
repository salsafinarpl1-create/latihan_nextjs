export default function MemuatDetail() {
  return (
    <div className="rounded-xl border bg-white p-6 animate-pulse">
      {/* Kotak kecil untuk kategori */}
      <div className="h-5 w-20 rounded bg-slate-200" />

      {/* Kotak lebar untuk judul */}
      <div className="mt-2 h-9 w-3/4 rounded bg-slate-200" />

      {/* Baris untuk tanggal dan lokasi */}
      <div className="mt-1 h-4 w-1/2 rounded bg-slate-200" />

      {/* Harga dan kuota */}
      <div className="mt-4 h-6 w-32 rounded bg-slate-200" />
      <div className="mt-1 h-4 w-40 rounded bg-slate-200" />

      {/* Tombol atau kotak tinggi untuk formulir */}
      <div className="mt-6 h-48 w-full rounded-xl bg-slate-200" />
    </div>
  );
}
