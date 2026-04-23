import { Hero } from "@/components/landing/candidate/Hero";
import { Features } from "@/components/landing/candidate/Features";
import { CTA } from "@/components/landing/candidate/CTA";

export default function CandidateLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <main className="flex-1">
        <Hero />
        <Features />
        <CTA />
      </main>
    </div>
  );
}
