import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Ethereal mesh gradients matching recruiter */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="relative container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-10 z-10">
        <div>
          <span className="border border-emerald-200 text-emerald-600 bg-emerald-50 backdrop-blur-xl rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]">
            Aura Candidate Platform
          </span>
        </div>

        <div className="space-y-6 max-w-[900px]">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 drop-shadow-sm">
            Discover Opportunities. <br className="hidden md:block" /> Fast
            Track Your Career.
          </h1>
          <p className="text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
            Connect directly with leading companies matching your skill profile.
            Bypass manual applications and let our AI system elevate your
            potential instantly.
          </p>
        </div>

        {/* Double-bezel CTA Wrapper */}
        <div className="p-1 rounded-[1.5rem] bg-black/[0.02] border border-black/[0.05] shadow-xl backdrop-blur-2xl mt-4">
          <div className="flex flex-col sm:flex-row gap-2 rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-white/50">
            <Link
              href="/jobs"
              className="flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full bg-emerald-500 text-white hover:bg-emerald-600 group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
            >
              Browse Open Roles
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center ml-2 group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-500">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full bg-transparent border border-black/10 text-neutral-700 hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
