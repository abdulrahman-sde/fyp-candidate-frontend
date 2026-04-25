import { redirect } from "next/navigation";
import { getSession } from "@/lib/dal";
import { Sidebar } from "@/components/layout/candidate/Sidebar";
import { Header } from "@/components/layout/candidate/Header";

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect("/auth/sign-in");
  if (!user.onboardingDone) redirect("/auth/onboarding");

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-dvh overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/6 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none opacity-80 dark:opacity-100 -z-10" />
          {children}
        </main>
      </div>
    </div>
  );
}
