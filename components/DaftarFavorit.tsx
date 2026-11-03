"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Event } from "@/data/events";

export default function DaftarFavorit() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(JSON.parse(localStorage.getItem("favorit") ?? "[]"));
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal mengambil data");
        return r.json();
      })
      .then((d: Event[]) => setSemua(d))
      .catch((e: Error) => setGalat(e.message))
      .finally(() => setMemuat(false));
  }, []);

  // Fungsi untuk memformat angka ke dalam bentuk Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  if (memuat) return <p>Memuat...</p>;
  if (galat) return <p className="text-red-600">{galat}</p>;

  const daftar = semua.filter((e) => ids.includes(e.id));
  if (daftar.length === 0)
    return <p className="text-slate-500">Belum ada favorit.</p>;

  return (
    <ul className="space-y-2">
      {daftar.map((e) => (
        <li key={e.id} className="flex justify-between items-center">
          <Link
            href={`/event/${e.id}`}
            className="text-blue-600 hover:underline"
          >
            {e.judul}
          </Link>
          {/* Menampilkan harga di samping judul dengan fungsi rupiah */}
          <span className="text-slate-700 font-medium">
            {formatRupiah(e.harga)}
          </span>
        </li>
      ))}
    </ul>
  );
}
