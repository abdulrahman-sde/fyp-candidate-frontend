import { getMyApplications } from "@/lib/dal";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const data = await getMyApplications({
    status: params["status"],
    page: params["page"] ? Number(params["page"]) : 1,
  });

  return (
    <div className="max-w-[1100px] mx-auto space-y-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-none">
          My Applications
        </h1>
        <p className="text-muted-foreground font-light text-[15px] max-w-[65ch]">
          Track the status of roles you have applied for and complete any pending tasks.
        </p>
      </header>

      <ApplicationsTable
        applications={data?.applications ?? []}
        total={data?.total ?? 0}
      />
    </div>
  );
}
