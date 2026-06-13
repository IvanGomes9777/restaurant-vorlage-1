import { Navbar } from "@/components/hero/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Kueche } from "@/components/sections/Kueche";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Kueche />
      {/* Weitere Sektionen folgen nach Freigabe (Menü, Reservierung …) */}
    </main>
  );
}
