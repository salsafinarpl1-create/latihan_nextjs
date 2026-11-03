"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState(""); // 1. State baru untuk email
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    setBerhasil(false);
    if (nama.trim().length < 3) return setPesan("Nama minimal 3 huruf.");

    // 2. Validasi email sesuai tantangan kecil
    if (!email.includes("@"))
      return setPesan("Email harus mengandung tanda @.");

    if (jumlah < 1) return setPesan("Jumlah tiket minimal 1.");
    if (jumlah > sisa) return setPesan(`Sisa tiket hanya ${sisa}.`);
    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>
      <input
        value={nama}
        onChange={(e: any) => setNama(e.target.value)}
        placeholder="Nama pemesan"
        className="block w-full rounded border px-3 py-2"
      />
      {/* 3. Input tambahan untuk email */}
      <input
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="Alamat email"
        className="block w-full rounded border px-3 py-2"
      />
      <input
        type="number"
        value={jumlah}
        onChange={(e: any) => setJumlah(Number(e.target.value))}
        className="block w-32 rounded border px-3 py-2"
      />
      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>
      {pesan && <p className="text-red-600">{pesan}</p>}
      {berhasil && (
        <p className="text-green-700">
          Terima kasih {nama}! {jumlah} tiket dipesan (belum tersimpan, ini
          masih latihan).
        </p>
      )}
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Pesan
      </button>
    </form>
  );
}
