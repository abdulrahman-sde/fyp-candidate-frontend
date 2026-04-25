"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthField } from "@/components/auth/AuthField";
import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { completeOnboarding } from "@/app/actions/onboarding";

const INTEREST_SUGGESTIONS = [
  "Software Engineering",
  "Product Management",
  "Data Science",
  "Machine Learning",
  "UX Design",
  "DevOps",
  "Cybersecurity",
  "Mobile Development",
  "Backend Development",
  "Frontend Development",
  "Cloud Infrastructure",
  "Technical Writing",
];

export function CandidateOnboardingSection() {
  const [state, action, pending] = useActionState(completeOnboarding, undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) { setFileName(null); return; }
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are accepted");
      e.target.value = "";
      setFileName(null);
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setFileError("File must be under 1 MB");
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileName(file.name);
  }

  function addInterest(value: string) {
    const trimmed = value.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests((prev) => [...prev, trimmed]);
    }
    setInterestInput("");
  }

  function removeInterest(tag: string) {
    setInterests((prev) => prev.filter((i) => i !== tag));
  }

  const serverResumeError = state?.errors?.resume?.[0];
  const serverInterestsError = state?.errors?.interests?.[0];

  return (
    <AuthShell
      eyebrow="Candidate Onboarding"
      title="Complete your profile"
      description="Share your details and resume so we can match you with the right opportunities."
      sideTitle="Profile completion improves matching"
      sideDescription="A complete profile helps recruiters evaluate your fit faster and schedule relevant interviews sooner."
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
            Go to dashboard
          </Link>
        </p>
      }
    >
      <form className="space-y-8" action={action}>
        {state?.message && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {state.message}
          </p>
        )}

        {/* Personal Information */}
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
            <AuthField
              id="firstName"
              label="First name"
              placeholder="Ava"
              required
              error={state?.errors?.firstName?.[0]}
            />
            <AuthField
              id="lastName"
              label="Last name"
              placeholder="Morgan"
              required
              error={state?.errors?.lastName?.[0]}
            />
            <div className="md:col-span-2">
              <AuthField
                id="location"
                label="Current location"
                placeholder="Chicago, Illinois, United States"
                required
                error={state?.errors?.location?.[0]}
              />
            </div>
          </div>
        </section>

        {/* Resume Upload */}
        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Resume
          </h2>

          <div className="grid gap-2">
            <label htmlFor="resume" className="text-[13px] font-medium text-neutral-700">
              Upload your resume <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 transition-colors ${
                fileError || serverResumeError
                  ? "border-red-300 bg-red-50/40"
                  : "border-black/[0.15] bg-white/95 hover:border-emerald-300 hover:bg-emerald-50/30"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-500">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-medium text-neutral-800">
                  {fileName ? fileName : "Click to upload PDF"}
                </p>
                <p className="text-[12px] text-neutral-500">PDF only · max 1 MB</p>
              </div>
              {fileName && (
                <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.2L3.8 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Attached
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="sr-only"
              required
            />
            {(fileError || serverResumeError) && (
              <p className="text-[12px] text-red-600">{fileError ?? serverResumeError}</p>
            )}
          </div>
        </section>

        {/* Interests */}
        <section className="space-y-4 border-t border-black/[0.06] pt-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Interests
          </h2>
          <p className="text-[13px] font-light text-neutral-500">
            Add areas you're passionate about — used to surface the best-fit roles for you.
          </p>

          {/* Hidden field carries the comma-joined value to the action */}
          <input type="hidden" name="interests" value={interests.join(",")} />

          {/* Tag cloud */}
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeInterest(tag)}
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full text-emerald-600 transition-colors hover:bg-emerald-200"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Text input + add */}
          <div className="flex gap-2">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addInterest(interestInput); }
                if (e.key === ",") { e.preventDefault(); addInterest(interestInput); }
              }}
              placeholder="Type an interest and press Enter"
              className="h-11 flex-1 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={() => addInterest(interestInput)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white/95 px-4 text-[13px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Add
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2">
            {INTEREST_SUGGESTIONS.filter((s) => !interests.includes(s)).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addInterest(suggestion)}
                className="rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 text-[12px] font-medium text-neutral-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              >
                + {suggestion}
              </button>
            ))}
          </div>

          {(serverInterestsError || (interests.length === 0 && state?.errors)) && (
            <p className="text-[12px] text-red-600">
              {serverInterestsError ?? "At least one interest is required"}
            </p>
          )}
        </section>

        {/* Submit */}
        <section className="space-y-4 border-t border-black/[0.06] pt-6">
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

          <AuthPrimaryButton disabled={pending}>
            {pending ? "Saving profile…" : "Complete Onboarding"}
          </AuthPrimaryButton>
        </section>
      </form>
    </AuthShell>
  );
}
