import { LandingHeader } from "@/components/landing/candidate/LandingHeader";
import { JobsBrowser } from "@/components/jobs/JobsBrowser";
import { getPublicJobs } from "@/lib/dal";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const initialData = await getPublicJobs({
    search: params["search"],
    job_type: params["job_type"],
    experience_level: params["experience_level"],
    location: params["location"],
    page: params["page"] ? Number(params["page"]) : 1,
  });

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] w-full">
      <LandingHeader />
      <JobsBrowser initialData={initialData} />
    </div>
  );
}
