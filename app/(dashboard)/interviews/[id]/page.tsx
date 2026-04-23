type InterviewDetailsPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function InterviewDetailsPage({
	params,
}: InterviewDetailsPageProps) {
	const { id } = await params;

	return (
		<div className="max-w-[1100px] mx-auto space-y-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-none">
					Interview Details
				</h1>
				<p className="text-muted-foreground font-light text-[15px] max-w-[65ch]">
					Review the details for interview #{id}.
				</p>
			</header>

			<section className="p-6 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] ring-1 ring-black/[0.02] dark:ring-white/[0.02] backdrop-blur-xl">
				<p className="text-[15px] text-muted-foreground">
					Interview details view is ready for integration with your API data.
				</p>
			</section>
		</div>
	);
}
