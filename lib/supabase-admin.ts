import "server-only";
import { createClient } from "@supabase/supabase-js";

// Klien dengan kunci RAHASIA (secret key). Melewati semua aturan database,
// jadi hanya boleh dipakai di server. "server-only" membuat build gagal
// bila berkas ini tidak sengaja diimpor dari Client Component.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);