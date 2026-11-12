"use client";
import { useActionState, useState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({
  event,
  namaAwal = "",
}: {
  event: Event;
  namaAwal?: string;
}) {
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, email: "" },
  };

  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);
  const [jumlah, setJumlah] = useState(1);

  // Perbaikan: Menambahkan operator pengurangan (-) yang hilang
  const sisa = event.kuota - event.terisi;

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form action={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>
      <input type="hidden" name="eventId" value={event.id} />

      <div>
        <input
          name="nama"
          defaultValue={hasil.isian.nama}
          placeholder="Nama pemesan"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.nama && (
          <p className="text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          defaultValue={hasil.isian.email}
          placeholder="Email"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.email && (
          <p className="text-sm text-red-600">{hasil.galat.email}</p>
        )}
      </div>

      <div>
        <input
          name="jumlah"
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="block w-32 rounded border px-3 py-2"
        />
        {hasil.galat.jumlah && (
          <p className="text-sm text-red-600">{hasil.galat.jumlah}</p>
        )}
      </div>

      <p>
        {/* Perbaikan: Menambahkan operator perkalian (*) yang hilang */}
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p className={hasil.berhasil ? "text-green-700" : "text-red-600"}>
          {hasil.pesan}
        </p>
      )}

      <button
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Memproses..." : "Pesan"}
      </button>
    </form>
  );
}
