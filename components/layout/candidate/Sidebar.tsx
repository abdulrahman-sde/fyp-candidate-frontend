"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: "M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z",
    },
    {
      label: "Applications",
      href: "/applications",
      icon: "M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z",
    },
    {
      label: "Interviews",
      href: "/interviews",
      icon: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20.2C9.5 20.2 7.29 18.92 6 16.9C6.03 14.9 10 13.8 12 13.8C13.99 13.8 17.97 14.9 18 16.9C16.71 18.92 14.5 20.2 12 20.2Z",
    },
  ];

  return (
    <aside className="w-64 h-dvh sticky top-0 border-r border-border bg-background flex-col hidden md:flex shrink-0 overflow-hidden">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-emerald-400/20 ring-1 ring-emerald-400/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-medium text-lg tracking-tight text-foreground">HireFlow Candidate</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pt-8 pb-4 space-y-1">
        {navItems.map((item, i) => {
          const isActive = pathname?.startsWith(item.href) || pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-300 ease-out group ${
                isActive
                  ? "bg-black/5 dark:bg-white/6 text-foreground shadow-sm ring-1 ring-black/8 dark:ring-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              }`}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-foreground" : "group-hover:scale-110"}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={item.icon} />
              </svg>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex justify-between items-center mb-4 px-2">
           <span className="text-xs text-muted-foreground font-medium">Theme</span>
           <ThemeToggle />
        </div>
        <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border group transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05]">
          <p className="text-xs text-muted-foreground mb-3 group-hover:text-foreground">Match Score Potential</p>
          <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full w-[85%] animate-pulse" />
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            85% Global Visibility
          </p>
        </div>
      </div>
    </aside>
  );
}
