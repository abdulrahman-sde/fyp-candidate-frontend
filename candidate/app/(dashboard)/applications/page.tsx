export default function ApplicationsPage() {
  const applications = [
    {
      role: "Senior Frontend Engineer",
      company: "Acme Corp",
      status: "INTERVIEW SCHEDULED",
      applied: "2d ago",
      score: "92%",
    },
    {
      role: "Product Designer",
      company: "Lumen Inc",
      status: "UNDER REVIEW",
      applied: "5d ago",
      score: "88%",
    },
    {
      role: "Fullstack Developer",
      company: "Stellar Co",
      status: "REJECTED",
      applied: "1w ago",
      score: "45%",
    },
    {
      role: "Backend Engineer",
      company: "Nebula Systems",
      status: "APPLIED",
      applied: "2w ago",
      score: "85%",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white leading-none">
          My Applications
        </h1>
        <p className="text-white/50 font-light text-[15px] max-w-[65ch]">
          Track the status of roles you have applied for and complete any
          pending tasks.
        </p>
      </header>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl w-fit">
        {["Active", "In Review", "Interviews", "Archived"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              i === 0
                ? "bg-white/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-white/50 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-1 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] ring-1 ring-white/[0.02] backdrop-blur-xl">
        <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden relative">
          {/* Subtle Ambient Hover Background (Double-Bezel Core) */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-emerald-500/0 blur-2xl hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40">
                <th className="pb-4 font-medium px-4">Role & Company</th>
                <th className="pb-4 font-medium px-4">Status</th>
                <th className="pb-4 font-medium px-4 border-r border-white/5 text-right">
                  Match
                </th>
                <th className="pb-4 font-medium px-4 text-right">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app, i) => (
                <tr
                  key={i}
                  className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="py-5 px-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex flex-shrink-0 items-center justify-center font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      {app.company[0]}
                    </div>
                    <div>
                      <p className="text-base text-white font-medium group-hover:text-white/90 transition-colors">
                        {app.role}
                      </p>
                      <p className="text-[13px] text-white/50 font-light">
                        {app.company}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-semibold rounded-full uppercase ${app.status === "INTERVIEW SCHEDULED" ? "bg-white text-black" : app.status === "REJECTED" ? "bg-transparent border border-white/10 text-white/30" : "bg-white/[0.05] border border-white/10 text-white/70"}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-r border-white/5 text-right">
                    <span className="text-emerald-400 font-medium text-[13px]">
                      {app.score}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <span className="text-white/40 text-[13px]">
                      {app.applied}
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
