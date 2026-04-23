export default function InterviewsPage() {
  const interviews = [
    {
      role: "Senior Frontend Engineer",
      company: "Acme Corp",
      date: "April 18, 2026",
      time: "10:00 AM PST",
      status: "UPCOMING",
    },
    {
      role: "Product Designer",
      company: "Lumen Inc",
      date: "April 20, 2026",
      time: "2:00 PM PST",
      status: "SCHEDULED",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-none">
          Interviews
        </h1>
        <p className="text-muted-foreground font-light text-[15px] max-w-[65ch]">
          Manage and join your scheduled screening sessions.
        </p>
      </header>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl w-fit">
        {["Upcoming", "Past Interviews"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              i === 0
                ? "bg-black/10 dark:bg-white/10 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interviews.map((int, i) => (
          <div
            key={i}
            className="p-1 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl group transition-all"
          >
            <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full border border-black/8 dark:border-white/10 bg-black/3 dark:bg-white/5 text-foreground flex items-center justify-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-lg">
                    {int.company[0]}
                  </div>
                  <span
                    className={`px-3 py-1.5 text-[10px] font-semibold rounded-full uppercase ${int.status === "UPCOMING" ? "bg-foreground text-background" : "bg-black/3 dark:bg-white/5 text-muted-foreground border border-black/8 dark:border-white/10"}`}
                  >
                    {int.status}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-1 group-hover:text-foreground">
                  {int.role}
                </h3>
                <p className="text-[15px] text-muted-foreground font-light">
                  {int.company}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-foreground text-[14px] font-medium">
                    {int.date}
                  </span>
                  <span className="text-muted-foreground text-[12px]">{int.time}</span>
                </div>
                <button
                  className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${int.status === "UPCOMING" ? "bg-foreground text-background hover:opacity-90 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.08)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-black/3 dark:bg-white/5 border border-black/8 dark:border-white/10 text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"}`}
                >
                  Join Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
