"use client";
import { useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  // 1. useState baru untuk checkbox
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      // 2. Syarat tambahan filter: jika dicentang, hanya ambil yang sisa kuotanya > 0
      (!hanyaAdaTiket || e.kuota - e.terisi > 0),
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        {/* 3. Elemen input checkbox */}
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={hanyaAdaTiket}
            onChange={(e) => setHanyaAdaTiket(e.target.checked)}
            className="rounded border-slate-300"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
