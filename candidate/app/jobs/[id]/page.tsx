import Link from 'next/link';
import { ArrowLeft, Briefcase, MapPin, Building2 } from 'lucide-react';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-white">
       <nav className="border-b border-black/[0.05] p-6 sticky top-0 bg-black/50 backdrop-blur-2xl z-50">
         <div className="max-w-4xl mx-auto">
            <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to open roles
            </Link>
         </div>
       </nav>

       <main className="max-w-4xl mx-auto py-16 px-6">
          <div className="p-1 rounded-[2rem] bg-black/[0.02] border border-black/[0.05] ring-1 ring-black/[0.02] backdrop-blur-xl mb-12">
             <div className="p-8 md:p-12 rounded-[calc(2rem-0.25rem)] bg-gradient-to-b from-black/[0.02] to-transparent">
                <div className="w-16 h-16 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-center mb-8 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]">
                   <Building2 className="w-8 h-8 text-neutral-500" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-neutral-900">Senior Frontend Engineer</h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 border-b border-black/[0.05] pb-8 mb-8">
                   <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Acme Corp</span>
                   <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Remote (US)</span>
                   <span className="px-3 py-1 rounded-md bg-black/10 text-neutral-600 text-xs uppercase tracking-widest">Full-time</span>
                </div>

                <div className="space-y-12 text-neutral-600 font-light leading-relaxed max-w-3xl">
                   <section>
                      <h2 className="text-xl font-medium text-neutral-900 mb-6">About the Role</h2>
                      <p className="mb-4">We are looking for an experienced Frontend Engineer to join our core product team. You will be responsible for building responsive, accessible, and highly interactive user interfaces.</p>
                      <p>Our stack relies heavily on modern React features, global state management, and edge-computing. We value engineers who think deeply about the DOM, paint performance, and modular design systems.</p>
                   </section>

                   <section>
                      <h2 className="text-xl font-medium text-neutral-900 mb-6">Requirements</h2>
                      <ul className="space-y-4">
                         {["5+ years of production experience with React frameworks (Next.js strongly preferred).", "Deep proficiency with HTML semantics, CSS architectures, and Tailwind CSS.", "Experience building and maintaining accessible component libraries.", "Solid understanding of rendering patterns (SSR, CSR, SSG)."].map((req, i) => (
                           <li key={i} className="flex items-start gap-4">
                              <span className="text-emerald-600 mt-1 flex-shrink-0">✦</span>
                              <span>{req}</span>
                           </li>
                         ))}
                      </ul>
                   </section>
                </div>

                <div className="mt-16 pt-8 border-t border-black/[0.05] flex justify-between items-center bg-black/[0.02] p-6 rounded-2xl">
                   <div className="hidden sm:block">
                      <p className="text-sm font-medium text-neutral-900">Ready to join?</p>
                      <p className="text-xs text-neutral-500 font-light">Submit your profile directly to the team.</p>
                   </div>
                   <button className="w-full sm:w-auto px-10 py-5 rounded-[1rem] bg-emerald-400 text-black font-medium hover:bg-emerald-300 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all">
                      Apply with Aura Profile
                   </button>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
}
