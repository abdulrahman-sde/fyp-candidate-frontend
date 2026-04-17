export function Header() {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="flex items-center">
        {/* Placeholder for Breadcrumbs if needed */}
      </div>

      <div className="flex items-center gap-4">
        {/* Quick action corresponding to Recruiter's "Post New Job" */}
        <button className="rounded-full px-4 h-8 text-[12px] font-medium bg-foreground text-background hover:opacity-90 transition-all active:scale-95 shadow-sm flex items-center justify-center">
          Search Jobs
        </button>

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
