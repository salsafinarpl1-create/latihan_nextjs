import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Sesuaikan dengan lokasi Navbar kamu

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventKu",
  description: "Temukan event seru di sekolahmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* Navbar dipasang di sini agar tampil di semua halaman */}
        <Navbar /> 
        
        {/* Konten utama diberi padding/container agar ada jarak */}
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}