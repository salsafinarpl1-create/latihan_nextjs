"use client";

type Props = {
  cari: string;
  setCari: (val: string) => void;
  kategori: string;
  setKategori: (val: string) => void;
  urut: string;
  setUrut: (val: string) => void;
  hanyaAdaTiket: boolean;
  setHanyaAdaTiket: (val: boolean) => void;
  hargaMaks: string;
  setHargaMaks: (val: string) => void;
  daftarKategori: string[];
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  urut,
  setUrut,
  hanyaAdaTiket,
  setHanyaAdaTiket,
  hargaMaks,
  setHargaMaks,
  daftarKategori,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Input Pencarian */}
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      {/* Filter Kategori */}
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      {/* Urutan */}
      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      {/* Kotak Centang Hanya Ada Tiket */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={hanyaAdaTiket}
            onChange={(e) => setHanyaAdaTiket(e.target.checked)}
            className="rounded border"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      {/* Input Harga Maksimal */}
      <input
        type="number"
        value={hargaMaks}
        onChange={(e) => setHargaMaks(e.target.value)}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}
