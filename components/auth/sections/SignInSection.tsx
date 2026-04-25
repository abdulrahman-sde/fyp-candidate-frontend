"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AuthField } from "@/components/auth/AuthField";
import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";
import { signIn } from "@/app/actions/auth";

export function SignInSection() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Sign in to continue"
      description="Access your applications, interview schedule, and profile updates in one place."
      sideTitle="Everything in one candidate workspace"
      sideDescription="Track role progress, prepare for interviews, and stay updated with direct company responses."
      sidePoints={[
        "View application stages in real time",
        "Join interviews from your personal dashboard",
        "Receive profile and role-fit feedback",
      ]}
      footer={
        <p>
          Do not have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form className="space-y-4" action={action}>
        {state?.message && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {state.message}
          </p>
        )}

        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="name@domain.com"
          required
          error={state?.errors?.email?.[0]}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          error={state?.errors?.password?.[0]}
        />

        <div className="flex items-center justify-between gap-3 pt-1">
          <label className="inline-flex items-center gap-2 text-[13px] text-neutral-600">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-black/15 text-emerald-600"
            />
            Keep me signed in
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[13px] font-medium text-neutral-700 transition-colors hover:text-neutral-900"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <AuthPrimaryButton disabled={pending}>
            {pending ? "Signing in…" : "Sign In"}
          </AuthPrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
