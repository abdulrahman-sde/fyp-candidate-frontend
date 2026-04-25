import { getSession } from "@/lib/dal";
import type { CandidateProfileShape } from "@/types/auth";

export default async function ProfilePage() {
  const user = await getSession();
  const profile = user?.profile?.kind === "candidate" ? (user.profile as CandidateProfileShape) : null;

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "";
  const initials = profile
    ? `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()
    : "?";

  return (
    <div className="max-w-[1100px] mx-auto space-y-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-none">
          My Profile
        </h1>
        <p className="text-muted-foreground font-light text-base max-w-[65ch]">
          Manage your personal details, resume, and contact preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="p-1 rounded-[2rem] bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/5 ring-1 ring-black/2 dark:ring-white/2 backdrop-blur-xl group">
            <div className="h-full rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-background/80 to-transparent p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
              <h2 className="text-[12px] font-medium uppercase tracking-widest text-muted-foreground mb-6">Personal Information</h2>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-black/5 dark:border-white/5">
                <div className="w-24 h-24 rounded-full border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 flex items-center justify-center text-3xl font-light text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  {initials}
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-foreground mb-2">{fullName}</h3>
                  <p className="text-muted-foreground text-[15px] font-light">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={fullName}
                    className="w-full bg-background/80 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-shadow text-[15px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={profile?.location ?? ""}
                    className="w-full bg-background/80 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-shadow text-[15px]"
                  />
                </div>
                {profile?.interests && profile.interests.length > 0 && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1.5 rounded-full text-[13px] bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-foreground"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-1 rounded-[2rem] bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/5 ring-1 ring-black/2 dark:ring-white/2 backdrop-blur-xl group">
            <div className="h-full rounded-[calc(2rem-0.25rem)] bg-linear-to-b from-background/80 to-transparent p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between min-h-[14rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/0 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
              <h3 className="text-[12px] text-muted-foreground font-medium uppercase tracking-widest mb-4">Resume</h3>
              <div className="flex flex-col gap-4">
                <span className="text-4xl leading-none font-medium tracking-tight text-foreground drop-shadow-sm">
                  1 file
                </span>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  Your resume is on file and being used for AI-matching on job applications.
                </p>
                <button className="mt-4 px-6 py-3 rounded-full text-[13px] font-medium bg-foreground text-background hover:opacity-90 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all">
                  Update Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
