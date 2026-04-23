import Link from "next/link";
import { LandingHeader } from "@/components/landing/candidate/LandingHeader";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  ChevronUp,
  Filter,
} from "lucide-react";

export default function JobsPage() {
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "TechFlow Inc.",
      description:
        "Build next-generation web applications using React and TypeScript. Lead frontend architecture decisions and mentor junior developers.",
      location: "Remote",
      type: "full-time",
      salary: "$120k - $160k",
      skills: ["React", "TypeScript", "Next.js", "Remote"],
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "InnovateLab",
      description:
        "Work on exciting products from concept to deployment. Build both frontend and backend systems in a fast-paced startup environment.",
      location: "San Francisco, CA",
      type: "full-time",
      salary: "$100k - $140k",
      skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    },
    {
      id: "3",
      title: "AI/ML Engineer",
      company: "DataMind AI",
      description:
        "Research and implement machine learning models for natural language processing. Work on cutting-edge NLP applications.",
      location: "New York, NY",
      type: "hybrid",
      salary: "$130k - $180k",
      skills: ["Python", "NLP", "PyTorch", "Machine Learning"],
    },
    {
      id: "4",
      title: "Product Designer",
      company: "Creative Studio",
      description:
        "Design beautiful, intuitive interfaces for web and mobile products. Collaborate closely with engineering and product management.",
      location: "Remote",
      type: "full-time",
      salary: "$90k - $130k",
      skills: ["Figma", "UI/UX", "Design Systems", "Remote"],
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] w-full">
      <LandingHeader />
      <div className="max-w-[1240px] mx-auto px-6 py-12 space-y-10">
        {/* Header Section */}
        <div className="space-y-3">
          <p className="text-emerald-600 text-xs font-bold tracking-widest uppercase">
            Find Your Next Role
          </p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-tight">
            Explore thousands of open positions
          </h1>
          <p className="text-neutral-500 text-[14px] font-light max-w-2xl">
            Search by job title, keyword, or company to find the perfect match
            for your skills.
          </p>
        </div>


        {/* Search Bar - Doppelrand Core Style */}
        <div className="flex flex-col md:flex-row gap-2 p-1.5 rounded-[1.5rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl relative z-20">
          <div className="flex-1 flex items-center bg-white/50 rounded-[1.25rem] px-5 border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] h-12">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="bg-transparent border-none outline-none text-neutral-900 px-4 py-2 w-full placeholder:text-neutral-400 text-[14px] font-light"
            />
          </div>
          <div className="flex-1 flex items-center bg-white/50 rounded-[1.25rem] px-5 border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] h-12">
            <MapPin className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or remote"
              className="bg-transparent border-none outline-none text-neutral-900 px-4 py-2 w-full placeholder:text-neutral-400 text-[14px] font-light"
            />
          </div>
          <button className="h-12 px-6 rounded-[1.25rem] bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition-all active:scale-[0.98] whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center">
            Search Jobs
          </button>
        </div>

        {/* Main Layout Split */}
        <div className="flex flex-col lg:flex-row gap-10 pt-4">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-900">Filters</h3>
              <button className="text-[11px] uppercase tracking-wider text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Clear
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-[13px] font-medium text-neutral-700 flex items-center justify-between">
                Job Type <ChevronUp className="w-4 h-4 text-neutral-500" />
              </h4>
              <div className="space-y-3">
                {[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Freelance",
                  "Internship",
                ].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-4 h-4 rounded border border-black/20 group-hover:border-white/40 bg-black/5 flex items-center justify-center transition-colors">
                      {/* Placeholder for checkbox tick */}
                    </div>
                    <span className="text-[14px] font-light text-neutral-600 group-hover:text-neutral-800 transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-black/5">
              <h4 className="text-[13px] font-medium text-neutral-700 flex items-center justify-between">
                Location <ChevronUp className="w-4 h-4 text-neutral-500" />
              </h4>
              <div className="space-y-3">
                {["Remote", "On-site", "Hybrid"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-4 h-4 rounded border border-black/20 group-hover:border-white/40 bg-black/5 flex items-center justify-center transition-colors px-[1px]">
                      {/* Checked dummy state for Remote */}
                      {t === "Remote" && (
                        <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                      )}
                    </div>
                    <span className="text-[14px] font-light text-neutral-600 group-hover:text-neutral-800 transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-black/5">
              <h4 className="text-[13px] font-medium text-neutral-700 flex items-center justify-between">
                Experience Level{" "}
                <ChevronUp className="w-4 h-4 text-neutral-500" />
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Entry", "Mid", "Senior", "Lead", "Manager"].map(
                  (level, i) => (
                    <button
                      key={level}
                      className={`px-3.5 py-1.5 rounded-full border text-[12px] transition-all active:scale-[0.98] ${i === 2 ? "border-emerald-500/30 text-emerald-600 bg-emerald-50" : "border-black/10 text-neutral-600 hover:text-neutral-900 hover:border-black/30 bg-transparent"}`}
                    >
                      {level}
                    </button>
                  ),
                )}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 space-y-6">
            <p className="text-[13px] text-neutral-500 font-medium tracking-wide">
              {jobs.length} jobs found
            </p>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                  <div className="p-1 rounded-[2rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl group transition-all hover:bg-black/[0.04]">
                    <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.02] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] relative overflow-hidden">
                      {/* Hover Glow */}
                      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-emerald-500/0 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-10">
                        <div>
                          <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-2 tracking-tight">
                            {job.title}
                          </h3>
                          <p className="text-[15px] text-neutral-500 font-light">
                            {job.company}
                          </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer bg-black/5 border border-black/10 text-neutral-900 group-hover:bg-black/10 group-hover:border-black/20 transition-all text-[12px] font-medium shrink-0">
                          View{" "}
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
                        </button>
                      </div>

                      <p className="text-[14.5px] text-neutral-600 font-light leading-relaxed max-w-3xl mb-4 relative z-10">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-[13px] text-neutral-500 mb-4 relative z-10 font-medium">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                        <span className="text-emerald-600 font-semibold tracking-wide bg-emerald-400/[0.05] px-2.5 py-1 rounded-md">
                          {job.salary}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 relative z-10">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-[11px] tracking-wide font-semibold text-neutral-600 group-hover:border-neutral-300 transition-colors shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
