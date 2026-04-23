export function Features() {
  const features = [
    {
      title: "One-Click Application",
      description: "Instantly match and apply with companies using your pre-verified professional profile.",
    },
    {
      title: "Skills-First Matching",
      description: "Gain transparency into your candidate ranking and identify exactly what recruiters are looking for.",
    },
    {
      title: "Direct Access",
      description: "Receive interview invites securely without relying on cold emailing or recruiter DMs.",
    }
  ];

  return (
    <section className="w-full bg-white py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">Designed for Growth</h2>
          <p className="text-neutral-500 text-lg font-light leading-relaxed">Skip the bias and traditional roadblocks. Your career profile puts you in full control.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-1 rounded-[2rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-full rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.02] to-transparent p-8 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-emerald-500/0 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-8 text-emerald-400 font-bold group-hover:bg-emerald-400/10 group-hover:border-emerald-400/20 transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-medium text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
