"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Check,
  FileText,
  Loader2,
  LogIn,
  ShieldCheck,
  Sparkle,
  X,
} from "lucide-react";
import Link from "next/link";
import { submitApplication } from "@/app/actions/applications";
import type { ApplicationActionState } from "@/types/job";

type JobApplicationFlowProps = {
  job: {
    id: string;
    slug: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    screeningQuestions: string[];
  };
  isLoggedIn: boolean;
  alreadyApplied: boolean;
  existingStatus: string | null;
};

const steps = ["Resume", "Questions", "Review"] as const;

export function JobApplicationFlow({
  job,
  isLoggedIn,
  alreadyApplied,
  existingStatus,
}: JobApplicationFlowProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);

  // Resume selection — for now uses a single resume (the one from profile)
  // We show it as the only option; the UI still renders the selection step for consistency
  const resumeOption = {
    id: "profile-resume",
    name: "My Resume",
    fileName: "Uploaded at onboarding",
    tag: "Profile resume",
  };

  // Answers keyed by question index
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    Object.fromEntries(job.screeningQuestions.map((_, i) => [i, ""]))
  );

  const [state, formAction, pending] = useActionState<ApplicationActionState, FormData>(
    submitApplication,
    undefined
  );

  const submitted = state?.success === true;

  const progress = useMemo(() => `${Math.round((step / steps.length) * 100)}%`, [step]);

  const hasQuestions = job.screeningQuestions.length > 0;
  const effectiveSteps = hasQuestions ? steps : (["Resume", "Review"] as const);
  const totalSteps = effectiveSteps.length;

  const isReady = answers && Object.values(answers).every((a) => !a || a.trim().length >= 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setStep(1);
      setAnswers(Object.fromEntries(job.screeningQuestions.map((_, i) => [i, ""])));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Build screening answers payload for form submission
  const buildScreeningAnswers = () =>
    job.screeningQuestions.map((q, i) => ({
      question: q,
      answer: answers[i] ?? "",
    }));

  // Map display step → actual step considering no-questions mode
  const getActualStep = (displayStep: number) => {
    if (!hasQuestions && displayStep === 2) return 3; // skip questions step
    return displayStep;
  };

  if (alreadyApplied) {
    return (
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-50 p-4 text-sm text-emerald-700">
        <div className="flex items-center gap-2 font-medium">
          <Check className="h-4 w-4" />
          Applied — {existingStatus?.replace(/_/g, " ") ?? "Under review"}
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="space-y-3">
        <Link
          href={`/auth/sign-in?redirect=/jobs/${encodeURIComponent(job.slug)}`}
          className="group inline-flex w-full items-center justify-between rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-emerald-600 active:scale-[0.98]"
        >
          Sign in to Apply
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <LogIn className="h-3.5 w-3.5" />
          </span>
        </Link>
        <p className="text-center text-xs text-neutral-400">
          No account?{" "}
          <Link href="/auth/sign-up" className="text-emerald-600 hover:underline">
            Create one free
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex w-full items-center justify-between rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-emerald-600 active:scale-[0.98]"
      >
        Apply with Aura Profile
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </button>

      <div className="mt-3 rounded-3xl border border-black/5 bg-black/2 p-4 text-sm text-neutral-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-emerald-500/10 p-2 text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-neutral-900">Estimated completion time</p>
            <p className="text-neutral-500">
              Under {hasQuestions ? "3" : "1"} minute{hasQuestions ? "s" : ""} when profile is ready.
            </p>
          </div>
        </div>
      </div>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div
                aria-label="Close application flow"
                onClick={() => !submitted && setOpen(false)}
                className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
              />

              <section className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-black/5 bg-black/2 p-1 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.24)]">
                <div className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-[calc(2.5rem-0.25rem)] bg-linear-to-b from-white/95 to-white/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                  {/* Header */}
                  <div className="shrink-0 p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-5">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                          Application flow
                        </div>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                          Apply for {job.title}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-500 md:text-[15px]">
                          Review your profile, answer the role questions, and submit your application.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-600 transition-all hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {!submitted && (
                      <>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          {effectiveSteps.map((label, index) => {
                            const active = step === index + 1;
                            const done = step > index + 1;
                            return (
                              <div key={label} className="flex items-center gap-3">
                                <div
                                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-semibold transition-all ${
                                    done
                                      ? "border-emerald-500/25 bg-emerald-50 text-emerald-700"
                                      : active
                                        ? "border-emerald-500/20 bg-foreground text-background"
                                        : "border-black/10 bg-black/3 text-neutral-500"
                                  }`}
                                >
                                  {done ? <Check className="h-4 w-4" /> : index + 1}
                                </div>
                                <div className="hidden sm:block">
                                  <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                    Step {index + 1}
                                  </p>
                                  <p className="text-sm font-medium text-neutral-900">{label}</p>
                                </div>
                                {index < effectiveSteps.length - 1 && (
                                  <div className="hidden sm:block h-px w-10 bg-black/10" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-black/5">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-[width] duration-500"
                            style={{ width: progress }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                    {state?.message && !submitted && (
                      <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {state.message}
                      </div>
                    )}

                    {!submitted ? (
                      <form
                        action={(formData) => {
                          formData.set("job_id", job.id);
                          formData.set(
                            "screening_answers",
                            JSON.stringify(buildScreeningAnswers())
                          );
                          formAction(formData);
                        }}
                        className="space-y-8 pt-3"
                      >
                        {/* Step 1: Resume */}
                        {step === 1 && (
                          <section className="space-y-5">
                            <div className="rounded-[1.75rem] border border-black/5 bg-black/2 p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                    Your Resume
                                  </p>
                                  <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                    Your profile resume will be submitted with this application.
                                  </h3>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="flex w-full items-start gap-4 rounded-3xl border border-emerald-500/25 bg-emerald-50 p-4 text-left shadow-[0_8px_30px_-18px_rgba(16,185,129,0.25)]">
                                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500 text-white">
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="font-medium text-neutral-900">{resumeOption.name}</p>
                                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                        {resumeOption.tag}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-sm text-neutral-500">{resumeOption.fileName}</p>
                                  </div>
                                  <div className="mt-1 h-5 w-5 rounded-full border border-emerald-500 bg-emerald-500">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        )}

                        {/* Step 2: Screening Questions (only if hasQuestions) */}
                        {hasQuestions && step === 2 && (
                          <section className="space-y-5">
                            <div className="rounded-3xl border border-black/5 bg-black/2 p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                    Recruiter questions
                                  </p>
                                  <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                    Answer the questions the recruiter cares about most.
                                  </h3>
                                </div>
                                <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                  {job.screeningQuestions.length} question{job.screeningQuestions.length !== 1 ? "s" : ""}
                                </span>
                              </div>

                              <div className="mt-5 space-y-4">
                                {job.screeningQuestions.map((question, i) => (
                                  <div
                                    key={i}
                                    className="space-y-2 rounded-3xl border border-black/5 bg-white/50 p-4"
                                  >
                                    <label className="block text-[13px] font-medium text-neutral-700">
                                      {i + 1}. {question}
                                    </label>
                                    <textarea
                                      value={answers[i] ?? ""}
                                      onChange={(e) =>
                                        setAnswers((prev) => ({ ...prev, [i]: e.target.value }))
                                      }
                                      rows={3}
                                      placeholder="Your answer…"
                                      className="w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-emerald-400"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </section>
                        )}

                        {/* Review Step */}
                        {step === totalSteps && (
                          <section className="space-y-5">
                            <div className="rounded-[1.75rem] border border-black/5 bg-black/2 p-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                Application review
                              </p>
                              <div className="mt-4 space-y-3 text-sm text-neutral-600">
                                <div className="flex items-center justify-between gap-4">
                                  <span>Role</span>
                                  <span className="font-medium text-neutral-900">{job.title}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span>Company</span>
                                  <span className="font-medium text-neutral-900">{job.company}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span>Resume</span>
                                  <span className="font-medium text-neutral-900">Profile resume</span>
                                </div>
                                {hasQuestions && (
                                  <div className="flex items-center justify-between gap-4">
                                    <span>Questions answered</span>
                                    <span className="font-medium text-neutral-900">
                                      {Object.values(answers).filter((a) => a.trim()).length} /{" "}
                                      {job.screeningQuestions.length}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <label className="flex items-start gap-3 rounded-[1.75rem] border border-black/5 bg-black/2 p-4 text-sm text-neutral-600">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="mt-1 h-4 w-4 rounded border-black/20 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span>
                                I confirm the information is accurate and agree to share it with the
                                hiring team.
                              </span>
                            </label>
                          </section>
                        )}

                        {/* Navigation */}
                        <div className="flex flex-col-reverse gap-3 border-t border-black/6 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                          >
                            Cancel
                          </button>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => setStep((s) => Math.max(1, s - 1))}
                              disabled={step === 1}
                              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                            >
                              Back
                            </button>

                            {step < totalSteps ? (
                              <button
                                type="button"
                                onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
                                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                              >
                                Continue
                              </button>
                            ) : (
                              <button
                                type="submit"
                                disabled={!isReady || pending}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {pending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Sparkle className="h-4 w-4" />
                                )}
                                {pending ? "Submitting…" : "Submit application"}
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="mt-8 grid min-h-[320px] place-items-center rounded-4xl border border-emerald-500/15 bg-emerald-50/60 p-6 text-center">
                        <div className="max-w-md space-y-5">
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_40px_-18px_rgba(16,185,129,0.6)]">
                            <Check className="h-8 w-8" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                              Application submitted
                            </h3>
                            <p className="text-sm text-neutral-600 md:text-[15px]">
                              Your profile has been delivered to {job.company}. Track the status
                              from your applications dashboard.
                            </p>
                          </div>
                          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                            >
                              Close
                            </button>
                            <Link
                              href="/applications"
                              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                            >
                              View applications
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
