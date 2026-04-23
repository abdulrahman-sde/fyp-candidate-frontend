import { LandingHeader } from "@/components/landing/candidate/LandingHeader";
import { BackButton } from "@/components/jobs/BackButton";
import { JobApplicationFlow } from "@/components/jobs/JobApplicationFlow";
import {
   Briefcase,
   Building2,
   Calendar,
   Clock3,
   Landmark,
   MapPin,
} from "lucide-react";

type JobDetails = {
   id: string;
   title: string;
   company: string;
   location: string;
   workMode: string;
   type: string;
   level: string;
   salary: string;
   posted: string;
   team: string;
   overview: string;
   responsibilities: string[];
   requirements: string[];
   benefits: string[];
};

const jobs: JobDetails[] = [
   {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "TechFlow Studio",
      location: "Remote (US)",
      workMode: "Remote",
      type: "Full-time",
      level: "Senior",
      salary: "$120k - $160k",
      posted: "3 days ago",
      team: "Product Engineering",
      overview:
         "Drive the frontend architecture for core candidate workflows, collaborate with product and design, and ship interface quality that feels fast, clear, and reliable across every breakpoint.",
      responsibilities: [
         "Own major frontend surfaces from discovery through production hardening.",
         "Partner with design to evolve reusable UI patterns and interaction quality.",
         "Improve performance budgets, rendering behavior, and accessibility outcomes.",
         "Guide code quality practices across reviews, testing, and release readiness.",
      ],
      requirements: [
         "5+ years building React applications in production-scale environments.",
         "Strong command of Next.js rendering patterns and TypeScript architecture.",
         "Hands-on expertise in semantic HTML, modern CSS, and design systems.",
         "Experience mentoring engineers and shaping engineering direction.",
      ],
      benefits: [
         "Annual learning stipend and conference support",
         "Flexible async-first schedule",
         "Home office setup budget",
         "Comprehensive health coverage",
      ],
   },
   {
      id: "2",
      title: "Full Stack Developer",
      company: "Northstar Labs",
      location: "San Francisco, CA",
      workMode: "Hybrid",
      type: "Full-time",
      level: "Mid",
      salary: "$105k - $145k",
      posted: "1 week ago",
      team: "Platform",
      overview:
         "Build product features across frontend and backend services, collaborating closely with design and data teams to deliver practical, customer-facing improvements.",
      responsibilities: [
         "Ship features across React interfaces and API services.",
         "Design resilient data flows and maintain clean contracts between systems.",
         "Contribute to CI quality checks and release workflows.",
         "Support production debugging and iterative optimization.",
      ],
      requirements: [
         "3+ years with TypeScript, React, and Node-based service development.",
         "Experience with SQL data models and API design.",
         "Comfort working in cross-functional teams with product ownership.",
         "Ability to communicate technical trade-offs clearly.",
      ],
      benefits: [
         "Quarterly performance bonus",
         "Hybrid commute support",
         "Dedicated mentorship track",
         "Extended wellness coverage",
      ],
   },
   {
      id: "3",
      title: "AI/ML Engineer",
      company: "Signal Forge",
      location: "New York, NY",
      workMode: "Onsite",
      type: "Full-time",
      level: "Senior",
      salary: "$135k - $180k",
      posted: "5 days ago",
      team: "Applied AI",
      overview:
         "Transform practical machine learning research into production product features, with a focus on model quality, evaluation rigor, and integration reliability.",
      responsibilities: [
         "Build and evaluate ML models for real-world product workflows.",
         "Collaborate with platform engineers on serving and observability.",
         "Define model quality metrics and monitor drift behavior.",
         "Contribute to architecture decisions for AI-enabled product features.",
      ],
      requirements: [
         "4+ years in ML engineering or applied research roles.",
         "Strong Python ecosystem experience for model development.",
         "Experience with experimentation and performance reporting.",
         "Clear communication with product and engineering stakeholders.",
      ],
      benefits: [
         "Research budget",
         "Premium health plan",
         "Annual innovation week",
         "Relocation support",
      ],
   },
   {
      id: "4",
      title: "Product Designer",
      company: "Lumen Works",
      location: "Remote (EU)",
      workMode: "Remote",
      type: "Contract",
      level: "Mid",
      salary: "$90k - $125k",
      posted: "2 days ago",
      team: "Experience Design",
      overview:
         "Craft product experiences across discovery, interaction design, and visual polish while pairing with engineering to ensure outcomes remain coherent in production.",
      responsibilities: [
         "Lead interface concepts from low-fidelity to polished implementation specs.",
         "Validate flows through user feedback and product analytics.",
         "Work with engineers on detail-level interaction quality.",
         "Maintain consistency with shared visual patterns and content structure.",
      ],
      requirements: [
         "3+ years designing digital products for web applications.",
         "Strong Figma systems knowledge and interaction design craft.",
         "Portfolio demonstrating thoughtful end-to-end product decisions.",
         "Comfort collaborating directly with engineering teams.",
      ],
      benefits: [
         "Remote-first collaboration",
         "Design tooling stipend",
         "Flexible paid time off",
         "Wellness reimbursement",
      ],
   },
];

export default async function JobDetailPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const job = jobs.find((item) => item.id === id) ?? jobs[0];

   return (
      <div className="min-h-dvh bg-[#fafafa] text-neutral-900">
         <LandingHeader />

         <main className="mx-auto max-w-310 px-4 pb-16 pt-8 md:px-6 md:pt-10 lg:px-8">
            <div className="mb-6">
               <BackButton />
            </div>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
               <article className="rounded-4xl border border-black/5 bg-black/2 p-1 ring-1 ring-black/2">
                  <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-white/90 to-white/70 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)] md:p-10">
                     <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        Open Role
                     </div>

                     <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                        {job.title}
                     </h1>

                     <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-black/6 pb-8 text-sm text-neutral-600">
                        <span className="inline-flex items-center gap-2">
                           <Building2 className="h-4 w-4" />
                           {job.company}
                        </span>
                        <span className="inline-flex items-center gap-2">
                           <MapPin className="h-4 w-4" />
                           {job.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                           <Briefcase className="h-4 w-4" />
                           {job.type}
                        </span>
                     </div>

                     <div className="space-y-10 pt-10 text-[15px] font-light leading-relaxed text-neutral-700">
                        <section className="space-y-4">
                           <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                              Role Overview
                           </h2>
                           <p>{job.overview}</p>
                        </section>

                        <section className="space-y-4">
                           <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                              What You Will Do
                           </h2>
                           <ul className="space-y-3">
                              {job.responsibilities.map((item) => (
                                 <li key={item} className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </section>

                        <section className="space-y-4">
                           <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                              Qualifications
                           </h2>
                           <ul className="space-y-3">
                              {job.requirements.map((item) => (
                                 <li key={item} className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </section>
                     </div>
                  </div>
               </article>

               <aside className="h-fit rounded-4xl border border-black/5 bg-black/2 p-1 ring-1 ring-black/2 lg:sticky lg:top-28">
                  <div className="rounded-[calc(2rem-0.25rem)] bg-white/90 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)]">
                     <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                        Quick Snapshot
                     </h3>

                     <div className="mt-6 space-y-4 text-sm text-neutral-600">
                        <div className="flex items-center justify-between gap-3">
                           <span className="inline-flex items-center gap-2">
                              <Landmark className="h-4 w-4" /> Team
                           </span>
                           <span className="font-medium text-neutral-900">{job.team}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                           <span className="inline-flex items-center gap-2">
                              <Clock3 className="h-4 w-4" /> Level
                           </span>
                           <span className="font-medium text-neutral-900">{job.level}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                           <span className="inline-flex items-center gap-2">
                              <Calendar className="h-4 w-4" /> Posted
                           </span>
                           <span className="font-medium text-neutral-900">{job.posted}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-t border-black/6 pt-4">
                           <span>Compensation</span>
                           <span className="rounded-md bg-emerald-400/6 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              {job.salary}
                           </span>
                        </div>
                     </div>

                     <div className="mt-8 space-y-3">
                        <JobApplicationFlow
                           job={{
                              title: job.title,
                              company: job.company,
                              location: job.location,
                              type: job.type,
                              salary: job.salary,
                           }}
                        />
                        <button className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/3 hover:text-neutral-900 active:scale-[0.98]">
                           Save role
                        </button>
                     </div>

                     <div className="mt-8 border-t border-black/6 pt-6">
                        <h4 className="text-sm font-semibold text-neutral-900">Benefits</h4>
                        <ul className="mt-3 space-y-2 text-sm font-light text-neutral-600">
                           {job.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-2">
                                 <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                 <span>{benefit}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </aside>
            </section>
         </main>
      </div>
   );
}
