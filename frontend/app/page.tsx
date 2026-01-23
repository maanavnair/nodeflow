import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Appbar />
      <Hero />
      <HowItWorks />
      <Features />
      <FinalCTA />
    </main>
  );
}
