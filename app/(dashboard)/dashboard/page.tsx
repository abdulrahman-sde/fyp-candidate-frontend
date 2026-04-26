import Link from "next/link";
import { getMyApplications, getSession } from "@/lib/dal";

function getStatusStyle(status: string): string {
  switch (status) {
    case "INTERVIEW_SCHEDULED":
      return "bg-foreground text-background";
    case "SHORTLISTED":
    case "HIRED":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20";
    case "REJECTED":
    case "WITHDRAWN":
      return "bg-transparent text-[#a1a1aa] border border-black/[0.05] dark:border-white/[0.05]";
    default:
      return "bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/[0.05] dark:border-white/[0.05]";
  }
}

function getScoreLabel(status: string, matchScore: number | null): { label: string; active: boolean } {
  if (status === "INTERVIEW_SCHEDULED") return { label: "Interview scheduled", active: true };
  if (status === "SHORTLISTED") return { label: "Shortlisted", active: true };
  if (status === "HIRED") return { label: "Hired", active: true };
  if (status === "REJECTED") return { label: "Not selected", active: false };
  if (matchScore !== null && matchScore >= 70) return { label: `${matchScore}% match`, active: true };
  if (matchScore !== null) return { label: `${matchScore}% match`, active: false };
  return { label: "Pending review", active: false };
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

export default async function CandidateDashboard() {
  const [session, applicationsData] = await Promise.all([
    getSession(),
    getMyApplications({ limit: 6 }),
  ]);

  const firstName = session?.profile?.firstName ?? "there";
  const applications = applicationsData?.applications ?? [];
  const totalApplications = applicationsData?.total ?? 0;
  const interviewCount = applications.filter(
    (a) => a.status === "INTERVIEW_SCHEDULED" || a.status === "INTERVIEWED"
  ).length;

  const upcomingInterviewCount = applications.filter(
    (a) => a.status === "INTERVIEW_SCHEDULED"
  ).length;

  return (
    <div className="max-w-[1100px] mx-auto space-y-12 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-none">
          Welcome back, {firstName}.
        </h1>
        <p className="text-muted-foreground font-light text-base max-w-[65ch]">
          {upcomingInterviewCount > 0
            ? `You have ${upcomingInterviewCount} upcoming interview${upcomingInterviewCount > 1 ? "s" : ""} scheduled.`
            : totalApplications > 0
            ? `You have ${totalApplications} active application${totalApplications > 1 ? "s" : ""}.`
            : "Start applying to jobs to track your progress here."}
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium pl-2">
          ACTIVE APPLICATIONS
        </h2>

        {applications.length === 0 ? (
          <div className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl">
            <div className="h-[180px] rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-background to-transparent flex items-center justify-center">
              <p className="text-muted-foreground font-light text-sm">No applications yet. Browse open roles to get started.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const { label, active } = getScoreLabel(app.status, app.match_score);
              return (
                <Link
                  key={app.id}
                  href={`/jobs/${app.job_slug}`}
                  className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group cursor-pointer block"
                >
                  <div className="relative flex flex-col justify-between h-[280px] rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full border border-black/[0.05] dark:border-white/[0.05] bg-black/5 dark:bg-white/5 text-foreground flex items-center justify-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-lg">
                          {app.company_name[0]}
                        </div>
                        <span className={`px-3.5 py-1.5 text-[10px] tracking-[0.08em] font-semibold rounded-full uppercase ${getStatusStyle(app.status)}`}>
                          {formatStatus(app.status)}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[22px] font-medium text-foreground leading-tight mb-1.5 tracking-tight">
                          {app.job_title}
                        </h3>
                        <p className="text-[15px] text-muted-foreground font-light">
                          {app.company_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.05] dark:border-white/[0.05] mt-4 relative z-10">
                      <span className={`text-[13px] tracking-wide ${active ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                      <span className="px-4 py-2 rounded-full text-[12px] font-medium bg-transparent text-foreground border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        <div className="p-1 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[12rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest mb-4">
              Applications
            </h3>
            <div className="flex flex-col gap-4">
              <span className="text-5xl leading-none font-medium tracking-tight text-foreground drop-shadow-sm">
                {totalApplications}
              </span>
              <div>
                <span className="text-xs text-emerald-700 dark:text-emerald-400/80 font-light mt-4 tracking-wide bg-emerald-400/5 py-1 px-2 rounded-md inline-block">
                  {totalApplications === 0 ? "No applications yet" : totalApplications === 1 ? "1 submitted" : `${totalApplications} submitted`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-1 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[12rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest mb-4">
              Interviews
            </h3>
            <div className="flex flex-col gap-4">
              <span className="text-5xl leading-none font-medium tracking-tight text-foreground drop-shadow-sm">
                {interviewCount}
              </span>
              <div>
                <span className="text-xs text-emerald-700 dark:text-emerald-400/80 font-light mt-4 tracking-wide bg-emerald-400/5 py-1 px-2 rounded-md inline-block">
                  {interviewCount === 0 ? "None scheduled" : "Awaiting connection"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 p-1 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group transition-all">
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-h-[12rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/0 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />
            <div className="flex flex-col justify-center max-w-sm relative z-10">
              <h3 className="text-2xl font-medium text-foreground mb-2 tracking-tight">
                Interview Checklist
              </h3>
              <p className="text-[15px] font-light text-muted-foreground leading-relaxed">
                Make sure your camera and microphone are configured before
                connecting to your session.
              </p>
            </div>
            <button className="relative z-10 px-6 py-3.5 rounded-[1.25rem] bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05] text-foreground font-medium hover:bg-black/10 dark:hover:bg-white/10 active:scale-[0.98] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-sm">
              Run System Test
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
