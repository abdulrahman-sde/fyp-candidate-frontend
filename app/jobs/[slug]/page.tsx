import { notFound } from "next/navigation";
import { LandingHeader } from "@/components/landing/candidate/LandingHeader";
import { BackButton } from "@/components/jobs/BackButton";
import { JobApplicationFlow } from "@/components/jobs/JobApplicationFlow";
import { getPublicJobBySlug, getSession, checkApplicationStatus } from "@/lib/dal";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock3,
  MapPin,
} from "lucide-react";

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior",
  LEAD: "Lead / Principal",
  EXECUTIVE: "Executive",
};

function salaryDisplay(min: string | null, max: string | null, currency: string): string | null {
  if (!min && !max) return null;
  const sym = currency === "USD" ? "$" : currency + " ";
  const fmt = (n: string) =>
    Number(n) >= 1000 ? `${sym}${Math.round(Number(n) / 1000)}k` : `${sym}${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [job, session] = await Promise.all([getPublicJobBySlug(slug), getSession()]);

  if (!job) notFound();

  const appStatus = session ? await checkApplicationStatus(job.id) : { applied: false, status: null };

  const salary = salaryDisplay(job.salary_min, job.salary_max, job.salary_currency);
  const postedDate = new Date(job.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const screeningQuestions = job.screening_questions
    ? job.screening_questions
        .split("\n")
        .map((q) => q.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-dvh bg-[#fafafa] text-neutral-900">
      <LandingHeader />

      <main className="mx-auto max-w-[1240px] px-4 pb-16 pt-8 md:px-6 md:pt-10 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Content */}
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
                  {job.company_name}
                </span>
                {job.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {JOB_TYPE_LABELS[job.job_type] ?? job.job_type}
                </span>
              </div>

              <div className="space-y-10 pt-10 text-[15px] font-light leading-relaxed text-neutral-700">
                {job.description && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                      Role Overview
                    </h2>
                    <p className="whitespace-pre-line">{job.description}</p>
                  </section>
                )}

                {job.responsibilities && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                      What You Will Do
                    </h2>
                    <p className="whitespace-pre-line">{job.responsibilities}</p>
                  </section>
                )}

                {job.requirements && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                      Requirements
                    </h2>
                    <p className="whitespace-pre-line">{job.requirements}</p>
                  </section>
                )}

                {job.qualifications && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                      Nice to Have
                    </h2>
                    <p className="whitespace-pre-line">{job.qualifications}</p>
                  </section>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="h-fit rounded-4xl border border-black/5 bg-black/2 p-1 ring-1 ring-black/2 lg:sticky lg:top-28">
            <div className="rounded-[calc(2rem-0.25rem)] bg-white/90 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)]">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                Quick Snapshot
              </h3>

              <div className="mt-6 space-y-4 text-sm text-neutral-600">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" /> Level
                  </span>
                  <span className="font-medium text-neutral-900">
                    {EXPERIENCE_LABELS[job.experience_level] ?? job.experience_level}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Posted
                  </span>
                  <span className="font-medium text-neutral-900">{postedDate}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Deadline
                    </span>
                    <span className="font-medium text-neutral-900">
                      {new Date(job.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {salary && (
                  <div className="flex items-center justify-between gap-3 border-t border-black/6 pt-4">
                    <span>Compensation</span>
                    <span className="rounded-md bg-emerald-400/6 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {salary}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <JobApplicationFlow
                  job={{
                    id: job.id,
                    slug: job.slug,
                    title: job.title,
                    company: job.company_name,
                    location: job.location ?? "Remote",
                    type: JOB_TYPE_LABELS[job.job_type] ?? job.job_type,
                    salary: salary ?? "Not specified",
                    screeningQuestions,
                  }}
                  isLoggedIn={!!session}
                  alreadyApplied={appStatus.applied}
                  existingStatus={appStatus.status}
                />
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
