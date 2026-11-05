import Closing from "@/components/Closing";
import Delivery from "@/components/Delivery";
import Detection from "@/components/Detection";
import Evidence from "@/components/Evidence";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Principles from "@/components/Principles";
import Starfield from "@/components/Starfield";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Starfield />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Evidence />
        <Delivery />
        <Detection />
        <Features />
        <Principles />
        <Closing />
      </main>
    </>
  );
}
