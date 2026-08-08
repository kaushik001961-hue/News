import IndustriesHero from "@/components/IndustriesHero";
import IndustriesGrid from "@/components/IndustriesGrid";
import ContactCTA from "@/components/ContactCTA";

export default function IndustriesPage() {
  return (
    <main className="bg-slate-950 text-white">

      <IndustriesHero />

      <IndustriesGrid />

      <ContactCTA />

    </main>
  );
}