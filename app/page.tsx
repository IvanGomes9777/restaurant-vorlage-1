import { Navbar } from "@/components/hero/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Kueche } from "@/components/sections/Kueche";
import { Menu } from "@/components/sections/Menu";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Kueche />
      <Menu />
      {/* Weitere Sektionen folgen nach Freigabe (Reservierung …) */}
    </main>
  );
}
