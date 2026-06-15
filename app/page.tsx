import { Navbar } from "@/components/hero/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Kueche } from "@/components/sections/Kueche";
import { Menu } from "@/components/sections/Menu";
import { Reservierung } from "@/components/sections/Reservierung";
import { FAQ } from "@/components/sections/FAQ";
import { Kontakt } from "@/components/sections/Kontakt";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeGraph } from "@/lib/schema";

export default function Home() {
  return (
    <main>
      {/* JSON-LD @graph (Restaurant, Organization, WebSite, WebPage, FAQPage) */}
      <JsonLd data={homeGraph()} />
      <Navbar />
      <Hero />
      <Kueche />
      <Menu />
      <Reservierung />
      <FAQ />
      <Kontakt />
    </main>
  );
}
