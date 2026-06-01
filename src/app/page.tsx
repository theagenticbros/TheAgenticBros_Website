import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Differentiator from "@/components/Differentiator";
import DashboardMockup from "@/components/DashboardMockup";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyber-cyan selection:text-black relative">
      <Navbar />
      <Hero />
      <Differentiator />
      <Services />
      <HowWeWork />
      <DashboardMockup />
      <Footer />
    </main>
  );
}
