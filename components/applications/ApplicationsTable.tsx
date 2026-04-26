"use client";

import Link from "next/link";
import type { ApplicationSummary } from "@/types/job";

const STATUS_STYLES: Record<string, string> = {
  APPLIED: "bg-black/4 border border-black/10 text-foreground",
  SCREENING: "bg-amber-50 border border-amber-200 text-amber-700",
  UNDER_REVIEW: "bg-amber-50 border border-amber-200 text-amber-700",
  SHORTLISTED: "bg-blue-50 border border-blue-200 text-blue-700",
  INTERVIEW_SCHEDULED: "bg-purple-50 border border-purple-200 text-purple-700",
  INTERVIEWED: "bg-foreground text-background",
  HIRED: "bg-emerald-50 border border-emerald-300 text-emerald-700",
  REJECTED: "bg-transparent border border-black/10 text-muted-foreground",
  WITHDRAWN: "bg-transparent border border-black/10 text-muted-foreground",
};

const STATUS_LABELS: Record<string, string> = {
  APPLIED: "Applied",
  SCREENING: "Under Review",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEWED: "Interview Done",
  HIRED: "Hired",
  REJECTED: "Not Selected",
  WITHDRAWN: "Withdrawn",
};

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ApplicationsTableProps {
  applications: ApplicationSummary[];
  total: number;
}

export function ApplicationsTable({ applications, total }: ApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-400 text-[15px] font-light">
        No applications yet.{" "}
        <Link href="/jobs" className="text-emerald-600 hover:underline">
          Browse open roles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-[13px] text-neutral-500 font-medium">
        {total} application{total !== 1 ? "s" : ""}
      </p>

      <div className="p-1 rounded-[2rem] bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/5 ring-1 ring-black/2 dark:ring-white/2 backdrop-blur-xl">
        <div className="rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-background/80 to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="pb-4 font-medium px-4">Role & Company</th>
                <th className="pb-4 font-medium px-4">Status</th>
                <th className="pb-4 font-medium px-4 border-r border-black/5 dark:border-white/5 text-right">
                  Match
                </th>
                <th className="pb-4 font-medium px-4 text-right">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="group hover:bg-black/2 dark:hover:bg-white/2 transition-colors cursor-pointer"
                >
                  <td className="py-5 px-4">
                    <Link href={`/jobs/${app.job_slug}`} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 flex shrink-0 items-center justify-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        {app.company_name[0]}
                      </div>
                      <div>
                        <p className="text-base text-foreground font-medium group-hover:text-foreground transition-colors">
                          {app.job_title}
                        </p>
                        <p className="text-[13px] text-muted-foreground font-light">
                          {app.company_name}
                          {app.job_type && (
                            <span className="ml-2 text-neutral-400">
                              · {JOB_TYPE_LABELS[app.job_type] ?? app.job_type}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="py-5 px-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-semibold rounded-full uppercase ${
                        STATUS_STYLES[app.status] ?? "bg-black/4 text-neutral-600"
                      }`}
                    >
                      {STATUS_LABELS[app.status] ?? app.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-r border-black/5 dark:border-white/5 text-right">
                    {app.match_score != null ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium text-[13px]">
                        {Math.round(app.match_score)}%
                      </span>
                    ) : (
                      <span className="text-neutral-400 text-[13px]">—</span>
                    )}
                  </td>
                  <td className="py-5 px-4 text-right">
                    <span className="text-muted-foreground text-[13px]">
                      {timeAgo(app.applied_at)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
