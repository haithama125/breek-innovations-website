import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions about working with Breek Innovations: pricing, timelines, white-label partnerships, GEO vs SEO, and support after launch.",
  alternates: {
    canonical: "https://breek-innovations.com/faq/",
  },
  openGraph: {
    title: "FAQ | Breek Innovations",
    description:
      "Pricing, timelines, white-label partnerships, GEO vs SEO, and support — the questions most people ask before they book.",
    url: "https://breek-innovations.com/faq/",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F0] text-[#13201A]">
      <Header />
      <main>
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
