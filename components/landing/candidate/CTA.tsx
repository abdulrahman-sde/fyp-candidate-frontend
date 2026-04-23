import Link from "next/link";

export function CTA() {
  return (
    <section id="cta" className="w-full py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-darken" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="p-1 rounded-[3rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-2xl">
          <div className="rounded-[calc(3rem-0.25rem)] bg-gradient-to-b from-black/[0.02] to-transparent p-12 md:p-24 text-center shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
              Connect With the Best
            </h2>
            <p className="text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Stop endlessly tweaking resumes. Secure your future role today
              seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="p-1 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-2xl inline-block">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center rounded-[calc(1.5rem-0.25rem)] px-6 py-3 text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  Create Free Profile
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
