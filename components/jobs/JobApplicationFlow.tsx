"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, FileText, Loader2, ShieldCheck, Sparkle, X } from "lucide-react";

type JobApplicationFlowProps = {
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
  };
};

const steps = ["Profile", "Questions", "Review"] as const;

const uploadedResumes = [
  {
    id: "resume-1",
    name: "Ava Johnson - Product Engineer",
    fileName: "ava-johnson-product-engineer.pdf",
    size: "286 KB",
    updatedAt: "Updated 2 days ago",
    tag: "Primary resume",
  },
  {
    id: "resume-2",
    name: "Ava Johnson - Frontend Portfolio",
    fileName: "ava-johnson-frontend-portfolio.pdf",
    size: "412 KB",
    updatedAt: "Updated 9 days ago",
    tag: "Tailored for frontend roles",
  },
  {
    id: "resume-3",
    name: "Ava Johnson - ATS Version",
    fileName: "ava-johnson-ats-optimized.pdf",
    size: "198 KB",
    updatedAt: "Updated 1 month ago",
    tag: "Lean resume version",
  },
];

const recruiterQuestions = [
  {
    id: "availability",
    label: "Availability",
    helper: "When can you start if selected?",
    placeholder: "For example, I can start within 2 weeks.",
    type: "text" as const,
  },
  {
    id: "expertise",
    label: "Specific expertise",
    helper: "Mention the skill you are strongest in for this role.",
    placeholder: "For example, I have deep experience with React performance and design systems.",
    type: "textarea" as const,
  },
  {
    id: "portfolio",
    label: "Portfolio or work sample link",
    helper: "Add a link the recruiter can review quickly.",
    placeholder: "https://",
    type: "text" as const,
  },
  {
    id: "workMode",
    label: "Work mode preference",
    helper: "Tell the recruiter whether you prefer remote, hybrid, or onsite work.",
    placeholder: "Remote, hybrid, or onsite with context.",
    type: "text" as const,
  },
];

export function JobApplicationFlow({ job }: JobApplicationFlowProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(uploadedResumes[0].id);
  const [answers, setAnswers] = useState({
    availability: "I can start within 2 weeks.",
    expertise:
      "I have strong experience building performance-focused React interfaces and reusable design systems.",
    portfolio: "https://portfolio.aura.dev",
    workMode: "Remote or hybrid works well for me, depending on the team setup.",
  });

  const progress = useMemo(() => `${Math.round((step / steps.length) * 100)}%`, [step]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(1);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmitted(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedResumeId(uploadedResumes[0].id);
    }
  }, [open, uploadedResumes]);

  const selectedResume = uploadedResumes.find((resume) => resume.id === selectedResumeId) ?? uploadedResumes[0];

  const isReady =
    Boolean(selectedResumeId) &&
    answers.availability.trim().length > 6 &&
    answers.expertise.trim().length > 20 &&
    answers.portfolio.trim().length > 6 &&
    answers.workMode.trim().length > 6;

  const submitApplication = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

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
            <p className="text-neutral-500">Under 2 minutes when profile and resume are ready.</p>
          </div>
        </div>
      </div>

      {mounted && open ? createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div
            aria-label="Close application flow"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
          />

          <section className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-black/5 bg-black/2 p-1 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.24)]">
            <div className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-[calc(2.5rem-0.25rem)] bg-linear-to-b from-white/95 to-white/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
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
                      Review your profile, answer the role questions, and submit a polished application without leaving the page.
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

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {steps.map((label, index) => {
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
                          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Step {index + 1}</p>
                          <p className="text-sm font-medium text-neutral-900">{label}</p>
                        </div>
                        {index < steps.length - 1 ? (
                          <div className="hidden sm:block h-px w-10 bg-black/10" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full rounded-full bg-emerald-500 transition-[width] duration-500" style={{ width: progress }} />
                </div>

              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                {!submitted ? (
                  <div className="space-y-8 pt-3">
                    {step === 1 ? (
                      <section className="space-y-5">
                        <div className="rounded-[1.75rem] border border-black/5 bg-black/2 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                Select resume
                              </p>
                              <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                Pick one file to submit with this application.
                              </h3>
                            </div>
                            <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                              {uploadedResumes.length} uploaded
                            </div>
                          </div>

                          <div className="mt-4 space-y-3">
                            {uploadedResumes.map((resume) => {
                              const active = resume.id === selectedResumeId;

                              return (
                                <button
                                  key={resume.id}
                                  type="button"
                                  onClick={() => setSelectedResumeId(resume.id)}
                                  className={`flex w-full items-start gap-4 rounded-3xl border p-4 text-left transition-all active:scale-[0.99] ${
                                    active
                                      ? "border-emerald-500/25 bg-emerald-50 text-neutral-900 shadow-[0_8px_30px_-18px_rgba(16,185,129,0.25)]"
                                      : "border-black/10 bg-background/70 text-neutral-700 hover:border-black/15 hover:bg-black/3"
                                  }`}
                                >
                                  <div
                                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                                      active
                                        ? "border-emerald-500/20 bg-emerald-500 text-white"
                                        : "border-black/10 bg-black/5 text-neutral-500"
                                    }`}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="font-medium text-neutral-900">{resume.name}</p>
                                      <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                        {resume.tag}
                                      </span>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-neutral-500">{resume.fileName}</p>
                                    <p className="mt-1 text-xs text-neutral-400">
                                      {resume.size} · {resume.updatedAt}
                                    </p>
                                  </div>

                                  <div className={`mt-1 h-5 w-5 rounded-full border ${active ? "border-emerald-500 bg-emerald-500" : "border-black/15"}`}>
                                    {active ? <Check className="h-4 w-4 text-white" /> : null}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </section>
                    ) : null}

                    {step === 2 ? (
                      <section className="space-y-5">
                        <div className="rounded-3xl border border-black/5 bg-black/2 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Recruiter questions</p>
                              <h3 className="mt-2 text-sm font-medium text-neutral-900">
                                Answer the questions the recruiter cares about most.
                              </h3>
                            </div>
                            <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                              {recruiterQuestions.length} questions
                            </span>
                          </div>

                          <div className="mt-5 space-y-4">
                            {recruiterQuestions.map((question) => {
                              const value = answers[question.id as keyof typeof answers];

                              return (
                                <div key={question.id} className="space-y-2 rounded-3xl border border-black/5 bg-white/50 p-4">
                                  <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                    {question.label}
                                  </label>
                                  <p className="text-sm text-neutral-500">{question.helper}</p>

                                  {question.type === "textarea" ? (
                                    <textarea
                                      value={value}
                                      onChange={(event) =>
                                        setAnswers((current) => ({
                                          ...current,
                                          [question.id]: event.target.value,
                                        }))
                                      }
                                      rows={4}
                                      placeholder={question.placeholder}
                                      className="w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-emerald-400"
                                    />
                                  ) : (
                                    <input
                                      value={value}
                                      onChange={(event) =>
                                        setAnswers((current) => ({
                                          ...current,
                                          [question.id]: event.target.value,
                                        }))
                                      }
                                      placeholder={question.placeholder}
                                      className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-emerald-400"
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </section>
                    ) : null}

                    {step === 3 ? (
                      <section className="space-y-5">
                        <div className="rounded-[1.75rem] border border-black/5 bg-black/2 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Application review</p>
                          <div className="mt-4 space-y-3 text-sm text-neutral-600">
                            <div className="flex items-center justify-between gap-4">
                              <span>Role</span>
                              <span className="font-medium text-neutral-900">{job.title}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Resume</span>
                              <span className="font-medium text-neutral-900">{selectedResume.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Portfolio</span>
                              <span className="truncate font-medium text-neutral-900">{answers.portfolio}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Availability</span>
                              <span className="font-medium text-neutral-900">{answers.availability}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Expertise</span>
                              <span className="max-w-[55%] truncate font-medium text-neutral-900">{answers.expertise}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span>Work mode</span>
                              <span className="font-medium text-neutral-900">{answers.workMode}</span>
                            </div>
                          </div>
                        </div>

                        <label className="flex items-start gap-3 rounded-[1.75rem] border border-black/5 bg-black/2 p-4 text-sm text-neutral-600">
                          <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-black/20 text-emerald-500 focus:ring-emerald-500" />
                          <span>
                            I confirm the information is accurate and I agree to share it with the hiring team.
                          </span>
                        </label>
                      </section>
                    ) : null}

                    <div className="flex flex-col-reverse gap-3 border-t border-black/6 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                      >
                        Save and close
                      </button>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setStep((current) => Math.max(1, current - 1))}
                          disabled={step === 1}
                          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:bg-black/4 hover:text-neutral-900 active:scale-[0.98]"
                        >
                          Back
                        </button>

                        {step < steps.length ? (
                          <button
                            type="button"
                            onClick={() => setStep((current) => Math.min(steps.length, current + 1))}
                            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={submitApplication}
                            disabled={!isReady || isSubmitting}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkle className="h-4 w-4" />}
                            {isSubmitting ? "Submitting" : "Submit application"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 grid min-h-[320px] place-items-center rounded-4xl border border-emerald-500/15 bg-emerald-50/60 p-6 text-center">
                    <div className="max-w-md space-y-5">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_40px_-18px_rgba(16,185,129,0.6)]">
                        <Check className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Application submitted</h3>
                        <p className="text-sm text-neutral-600 md:text-[15px]">
                          Your profile has been delivered to {job.company}. You can track the status from your applications dashboard.
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
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                        >
                          View applications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>,
        document.body
      ) : null}
    </>
  );
}
