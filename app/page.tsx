import { Navbar } from "@/components/hero/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Kueche } from "@/components/sections/Kueche";
import { Menu } from "@/components/sections/Menu";
import { Reservierung } from "@/components/sections/Reservierung";
import { Kontakt } from "@/components/sections/Kontakt";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Kueche />
      <Menu />
      <Reservierung />
      <Kontakt />
    </main>
  );
}
