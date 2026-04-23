import Link from "next/link";

export default function CandidateDashboard() {
  const applications = [
    {
      role: "Senior Frontend Engineer",
      company: "Acme Corp",
      status: "INTERVIEW SCHEDULED",
      action: "Join Session",
      score: "Top match",
      statusClass: "bg-foreground text-background",
      actionClass:
        "bg-foreground text-background shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-neutral-200 active:scale-[0.98]",
      isActive: true,
    },
    {
      role: "Product Designer",
      company: "Lumen Inc",
      status: "UNDER REVIEW",
      action: "View Application",
      score: "Pending Review",
      statusClass: "bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/[0.05] dark:border-white/[0.05]",
      actionClass:
        "bg-transparent text-foreground border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/5 dark:bg-white/5 active:scale-[0.98]",
      isActive: false,
    },
    {
      role: "Fullstack Developer",
      company: "Stellar Co",
      status: "REJECTED",
      action: "Review Feedback",
      score: "Not a match",
      statusClass: "bg-transparent text-[#a1a1aa] border border-black/[0.05] dark:border-white/[0.05]",
      actionClass:
        "bg-transparent text-foreground border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/5 dark:bg-white/5 active:scale-[0.98]",
      isActive: false,
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-12 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-none">
          Welcome back, Alex.
        </h1>
        <p className="text-muted-foreground font-light text-base max-w-[65ch]">
          You have 1 upcoming interview scheduled today.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium pl-2">
          ACTIVE APPLICATIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, i) => (
            // The "Double-Bezel" (Doppelrand) Outer Shell matching Recruiter exactly
            <div
              key={i}
              className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group cursor-pointer"
            >
              {/* Inner Core */}
              <div className="relative flex flex-col justify-between h-[280px] rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                {/* Specific subtle glow effect on hover exactly copying StatsOverview.tsx */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    {/* Nested Circular Wrapper for Avatar */}
                    <div className="w-12 h-12 rounded-full border border-black/[0.05] dark:border-white/[0.05] bg-black/5 dark:bg-white/5 text-foreground flex items-center justify-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-lg">
                      {app.company[0]}
                    </div>
                    {/* Badge */}
                    <span
                      className={`px-3.5 py-1.5 text-[10px] tracking-[0.08em] font-semibold rounded-full uppercase ${app.statusClass}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[22px] font-medium text-foreground leading-tight mb-1.5 tracking-tight group-hover:text-foreground transition-colors">
                      {app.role}
                    </h3>
                    <p className="text-[15px] text-muted-foreground font-light">
                      {app.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-black/[0.05] dark:border-white/[0.05] mt-4 relative z-10">
                  <span
                    className={`text-[13px] tracking-wide ${app.isActive ? "text-emerald-400 font-medium" : "text-muted-foreground"}`}
                  >
                    {app.score}
                  </span>
                  <button
                    className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-300 ${app.actionClass}`}
                  >
                    {app.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        <div className="p-1 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[12rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest mb-4">
              Profile Status
            </h3>
            <div className="flex flex-col gap-4">
              <span className="text-5xl leading-none font-medium tracking-tight text-foreground drop-shadow-sm">
                85%
              </span>
              <div>
                <span className="text-xs text-emerald-400/80 font-light mt-4 tracking-wide bg-emerald-400/[0.05] py-1 px-2 rounded-md inline-block">
                  Nearly complete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-1 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group">
          <div className="h-full rounded-[calc(1.5rem-0.25rem)] bg-gradient-to-b from-background to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col justify-between min-h-[12rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest mb-4">
              Pending Interviews
            </h3>
            <div className="flex flex-col gap-4">
              <span className="text-5xl leading-none font-medium tracking-tight text-foreground drop-shadow-sm">
                1
              </span>
              <div>
                <span className="text-xs text-emerald-400/80 font-light mt-4 tracking-wide bg-emerald-400/[0.05] py-1 px-2 rounded-md inline-block">
                  Awaiting connection
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
            <button className="relative z-10 px-6 py-3.5 rounded-[1.25rem] bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05] text-foreground font-medium hover:bg-black/10 dark:bg-white/10 active:scale-[0.98] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-sm">
              Run System Test
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
