import type { AuthShellProps } from "@/types/auth";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  sideTitle,
  sideDescription,
  sidePoints,
}: AuthShellProps) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-teal-500/10 blur-[100px]" />

      <div className="relative mx-auto grid min-h-[100dvh] w-full max-w-[1240px] grid-cols-1 items-center gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="order-2 lg:order-1">
          <div className="rounded-[2rem] border border-black/[0.05] bg-black/[0.02] p-1 ring-1 ring-black/[0.02] backdrop-blur-xl">
            <div className="rounded-[calc(2rem-0.25rem)] border border-white/70 bg-white/85 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] md:p-8">
              <div className="mb-8 space-y-4">
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {eyebrow}
                </span>
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                    {title}
                  </h1>
                  <p className="max-w-[48ch] text-[15px] font-light leading-relaxed text-neutral-600">
                    {description}
                  </p>
                </div>
              </div>

              {children}

              <div className="mt-8 border-t border-black/[0.06] pt-5 text-[13px] text-neutral-600">
                {footer}
              </div>
            </div>
          </div>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="rounded-[2rem] border border-black/[0.05] bg-black/[0.02] p-1 ring-1 ring-black/[0.02]">
            <div className="rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-white/75 to-white/45 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] md:p-8">
              <div className="mb-8 w-fit rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                Secure Access
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                {sideTitle}
              </h2>
              <p className="mt-3 max-w-[44ch] text-[15px] font-light leading-relaxed text-neutral-600">
                {sideDescription}
              </p>

              <ul className="mt-8 space-y-3">
                {sidePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-black/[0.05] bg-white/70 px-4 py-3"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 5.2L3.8 7.5L8.5 2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[14px] font-medium leading-relaxed text-neutral-700">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
