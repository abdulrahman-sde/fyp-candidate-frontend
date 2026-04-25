"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronUp,
  Clock,
  Filter,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { usePublicJobs } from "@/hooks/usePublicJobs";
import type { JobsListResponse, PublicJobSummary } from "@/types/job";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"] as const;
const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};
const EXPERIENCE_LEVELS = ["ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"] as const;
const EXPERIENCE_LABELS: Record<string, string> = {
  ENTRY: "Entry",
  MID: "Mid",
  SENIOR: "Senior",
  LEAD: "Lead",
  EXECUTIVE: "Executive",
};

function salaryLabel(job: PublicJobSummary): string | null {
  if (!job.salary_min && !job.salary_max) return null;
  const currency = job.salary_currency ?? "USD";
  const fmt = (n: string) =>
    `${currency === "USD" ? "$" : currency}${Number(n) >= 1000 ? `${Math.round(Number(n) / 1000)}k` : n}`;
  if (job.salary_min && job.salary_max) return `${fmt(job.salary_min)} – ${fmt(job.salary_max)}`;
  if (job.salary_min) return `From ${fmt(job.salary_min)}`;
  return `Up to ${fmt(job.salary_max!)}`;
}

export function JobsBrowser({ initialData }: { initialData: JobsListResponse }) {
  const { jobs, total, loading, filters, setFilters, clearFilters } =
    usePublicJobs(initialData);

  const hasActiveFilters =
    filters.search || filters.job_type || filters.experience_level || filters.location;

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-emerald-600 text-xs font-bold tracking-widest uppercase">
          Find Your Next Role
        </p>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-tight">
          Explore open positions
        </h1>
        <p className="text-neutral-500 text-[14px] font-light max-w-2xl">
          Search by job title, keyword, or company to find the perfect match for your skills.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-2 p-1.5 rounded-[1.5rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl relative z-20">
        <div className="flex-1 flex items-center bg-white/50 rounded-[1.25rem] px-5 border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] h-12">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Job title, keywords, or company"
            className="bg-transparent border-none outline-none text-neutral-900 px-4 py-2 w-full placeholder:text-neutral-400 text-[14px] font-light"
          />
          {filters.search && (
            <button onClick={() => setFilters({ search: "" })} className="text-neutral-400 hover:text-neutral-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex-1 flex items-center bg-white/50 rounded-[1.25rem] px-5 border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] h-12">
          <MapPin className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
            placeholder="City, state, or remote"
            className="bg-transparent border-none outline-none text-neutral-900 px-4 py-2 w-full placeholder:text-neutral-400 text-[14px] font-light"
          />
          {filters.location && (
            <button onClick={() => setFilters({ location: "" })} className="text-neutral-400 hover:text-neutral-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10 pt-4">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] uppercase tracking-wider text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Job Type */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-medium text-neutral-700 flex items-center justify-between">
              Job Type <ChevronUp className="w-4 h-4 text-neutral-500" />
            </h4>
            <div className="space-y-3">
              {JOB_TYPES.map((type) => {
                const active = filters.job_type === type;
                return (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <button
                      type="button"
                      onClick={() => setFilters({ job_type: active ? "" : type })}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        active
                          ? "bg-emerald-400 border-emerald-400"
                          : "border-black/20 bg-black/5 group-hover:border-black/40"
                      }`}
                    >
                      {active && <span className="w-2 h-2 bg-white rounded-sm" />}
                    </button>
                    <span className="text-[14px] font-light text-neutral-600 group-hover:text-neutral-800 transition-colors">
                      {JOB_TYPE_LABELS[type]}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-4 pt-6 border-t border-black/5">
            <h4 className="text-[13px] font-medium text-neutral-700 flex items-center justify-between">
              Experience Level <ChevronUp className="w-4 h-4 text-neutral-500" />
            </h4>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map((level) => {
                const active = filters.experience_level === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFilters({ experience_level: active ? "" : level })}
                    className={`px-3.5 py-1.5 rounded-full border text-[12px] transition-all active:scale-[0.98] ${
                      active
                        ? "border-emerald-500/30 text-emerald-600 bg-emerald-50"
                        : "border-black/10 text-neutral-600 hover:text-neutral-900 hover:border-black/30 bg-transparent"
                    }`}
                  >
                    {EXPERIENCE_LABELS[level]}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <p className="text-[13px] text-neutral-500 font-medium tracking-wide">
              {loading ? "Searching…" : `${total} job${total !== 1 ? "s" : ""} found`}
            </p>
            {loading && <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />}
          </div>

          {jobs.length === 0 && !loading ? (
            <div className="py-20 text-center text-neutral-400 text-[15px] font-light">
              No jobs found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const salary = salaryLabel(job);
                return (
                  <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
                    <div className="p-1 rounded-[2rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl group transition-all hover:bg-black/[0.04]">
                      <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.02] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-emerald-500/0 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-10">
                          <div>
                            <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-2 tracking-tight">
                              {job.title}
                            </h3>
                            <p className="text-[15px] text-neutral-500 font-light">
                              {job.company_name}
                              {job.company_industry && (
                                <span className="text-neutral-400"> · {job.company_industry}</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 text-neutral-900 group-hover:bg-black/10 group-hover:border-black/20 transition-all text-[12px] font-medium shrink-0">
                            View <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-700 transition-colors" />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-[13px] text-neutral-500 mb-4 relative z-10 font-medium">
                          {job.location && (
                            <span className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> {job.location}
                            </span>
                          )}
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {JOB_TYPE_LABELS[job.job_type] ?? job.job_type}
                          </span>
                          <span className="text-[12px] bg-black/4 border border-black/8 px-2.5 py-1 rounded-full">
                            {EXPERIENCE_LABELS[job.experience_level] ?? job.experience_level}
                          </span>
                          {salary && (
                            <span className="text-emerald-600 font-semibold tracking-wide bg-emerald-400/[0.05] px-2.5 py-1 rounded-md">
                              {salary}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
