import { Navbar } from "@/components/hero/Navbar";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Weitere Sektionen folgen nach Freigabe (Küche, Menü, Reservierung …) */}
    </main>
  );
}
