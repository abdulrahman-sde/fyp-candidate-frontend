import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="flex items-center">
        {/* Placeholder for Breadcrumbs if needed */}
      </div>

      <div className="flex items-center gap-4">
        <Link
              href="/jobs"
              className="group inline-flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5 text-[12px] font-medium bg-foreground text-background hover:opacity-90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              Search Jobs
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

        {/* Minimal Dropdown trigger mimicking the recruiter header */}
        <button className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="text-[13px] text-muted-foreground font-medium">
            Alex Johnson
          </span>
          <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs text-muted-foreground">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
