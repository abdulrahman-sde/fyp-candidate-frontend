import Link from "next/link";

import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";

export function CandidateOnboardingSection() {
  return (
    <AuthShell
      eyebrow="Candidate Onboarding"
      title="Complete your profile"
      description="Share your background, role preferences, and resume so we can match you with the right opportunities."
      sideTitle="Profile completion improves matching"
      sideDescription="A complete onboarding profile helps recruiters evaluate your fit faster and schedule relevant interviews sooner."
      sidePoints={[
        "Higher quality role recommendations",
        "Faster recruiter shortlisting decisions",
        "Interview-ready candidate profile",
      ]}
      alignTop
      stickyAside
      footer={
        <p>
          Want to finish later?{" "}
          <Link
            href="/dashboard"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Save draft and open dashboard
          </Link>
        </p>
      }
    >
      <form className="space-y-8" action="#" method="post">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
              Personal Information
            </h2>
            <span className="rounded-full border border-black/10 bg-black/[0.02] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
              Required
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="profilePhoto" className="text-[13px] font-medium text-neutral-700">
                Profile photo
              </label>
              <div className="rounded-2xl border border-dashed border-black/[0.15] bg-white/95 p-4">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-[12px] font-semibold text-neutral-600">
                    Add Photo
                  </span>
                  <div className="grid gap-2">
                    <input
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      className="text-[13px] text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    <p className="text-[12px] font-light text-neutral-500">
                      Use a clear headshot. Accepted formats: PNG, JPG, WEBP. Max 2MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-[13px] font-medium text-neutral-700">
                First name
              </label>
              <input id="firstName" name="firstName" required placeholder="Ava" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-[13px] font-medium text-neutral-700">
                Last name
              </label>
              <input id="lastName" name="lastName" required placeholder="Morgan" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-[13px] font-medium text-neutral-700">
                Email address
              </label>
              <input id="email" name="email" type="email" required placeholder="name@domain.com" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-[13px] font-medium text-neutral-700">
                Phone number
              </label>
              <input id="phone" name="phone" required placeholder="+1 (312) 847-1928" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="location" className="text-[13px] font-medium text-neutral-700">
                Current location
              </label>
              <input id="location" name="location" required placeholder="Chicago, Illinois, United States" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Professional Background
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="headline" className="text-[13px] font-medium text-neutral-700">
                Professional headline
              </label>
              <input id="headline" name="headline" required placeholder="Frontend Engineer focused on React ecosystems" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="experienceYears" className="text-[13px] font-medium text-neutral-700">
                Years of experience
              </label>
              <input id="experienceYears" name="experienceYears" type="number" min={0} max={40} required placeholder="4" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="summary" className="text-[13px] font-medium text-neutral-700">
                Candidate summary
              </label>
              <textarea id="summary" name="summary" rows={4} required placeholder="Describe your strengths, domain expertise, and impact across previous roles." className="rounded-xl border border-black/[0.08] bg-white/95 px-3 py-2.5 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Education and Skills
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="highestEducation" className="text-[13px] font-medium text-neutral-700">
                Highest education level
              </label>
              <select id="highestEducation" name="highestEducation" required className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100">
                <option value="">Select level</option>
                <option value="bachelors">Bachelor's degree</option>
                <option value="masters">Master's degree</option>
                <option value="doctorate">Doctorate</option>
                <option value="diploma">Diploma or certification</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="fieldOfStudy" className="text-[13px] font-medium text-neutral-700">
                Field of study
              </label>
              <input id="fieldOfStudy" name="fieldOfStudy" required placeholder="Computer Science" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="skills" className="text-[13px] font-medium text-neutral-700">
                Core skills
              </label>
              <input id="skills" name="skills" required placeholder="React, TypeScript, Next.js, GraphQL, Design Systems" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
              <p className="text-[12px] font-light text-neutral-500">Separate each skill with a comma.</p>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="certifications" className="text-[13px] font-medium text-neutral-700">
                Certifications (optional)
              </label>
              <input id="certifications" name="certifications" placeholder="AWS Certified Developer, Professional Scrum Master" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Resume and Portfolio
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="resume" className="text-[13px] font-medium text-neutral-700">
                Resume upload
              </label>
              <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className="rounded-xl border border-dashed border-black/[0.15] bg-white/95 px-3 py-2.5 text-[14px] text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100" />
              <p className="text-[12px] font-light text-neutral-500">Accepted formats: PDF, DOC, DOCX. Max file size: 5MB.</p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="linkedinUrl" className="text-[13px] font-medium text-neutral-700">
                LinkedIn profile
              </label>
              <input id="linkedinUrl" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/your-profile" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="portfolioUrl" className="text-[13px] font-medium text-neutral-700">
                Portfolio or GitHub URL
              </label>
              <input id="portfolioUrl" name="portfolioUrl" type="url" placeholder="https://github.com/your-handle" className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Final Confirmation
          </h2>

          <label className="flex items-start gap-2 rounded-xl border border-black/[0.06] bg-black/[0.01] px-3 py-2 text-[12px] text-neutral-600">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-black/15 text-emerald-600"
            />
            <span>
              I confirm that the submitted information is accurate and I agree to share my profile and resume with verified recruiters on this platform.
            </span>
          </label>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-[13px] font-semibold text-neutral-700 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.03] active:scale-[0.98]"
            >
              Save as Draft
            </button>
            <AuthPrimaryButton>Complete Onboarding</AuthPrimaryButton>
          </div>
        </section>
      </form>
    </AuthShell>
  );
}
