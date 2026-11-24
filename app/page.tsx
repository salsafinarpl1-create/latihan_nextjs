
import { ambilEvents } from "@/data/ambil";
import KartuEvent from "@/components/KartuEvent";

export default async function Beranda() {
  const events = await ambilEvents();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Daftar Event</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {events.map((event) => (
          <KartuEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
