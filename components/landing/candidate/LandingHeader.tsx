import Link from "next/link";
import { getSession } from "@/lib/dal";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Join Today", href: "#cta" },
  { label: "Open Roles", href: "/jobs" },
];

export async function LandingHeader() {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto max-w-[1000px] p-1 rounded-[1.75rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.03] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="h-14 rounded-[calc(1.75rem-0.25rem)] bg-white/80 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)] px-3 sm:px-4 md:px-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.03]"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 text-[13px] font-semibold tracking-tight">
              AU
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-neutral-900">
              Aura Candidates
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/jobs"
              className="hidden sm:inline-flex rounded-full px-4 py-2.5 text-[12px] font-medium border border-black/10 text-neutral-700 hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              Open Roles
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5 text-[12px] font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                Dashboard
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            ) : (
              <Link
                href="/auth/sign-in"
                className="group inline-flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5 text-[12px] font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                Get Started
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
