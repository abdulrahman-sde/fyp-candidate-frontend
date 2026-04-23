import Link from "next/link";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";

export function SignUpSection() {
  return (
    <AuthShell
      eyebrow="Create Account"
      title="Build your candidate profile"
      description="Set up your account to start matching with roles and receiving interview invitations."
      sideTitle="Start with a profile that works for you"
      sideDescription="Your account unlocks direct access to role matching, interview scheduling, and progress tracking."
      sidePoints={[
        "Skill-first profile creation flow",
        "One-click role applications",
        "Secure access across all sessions",
      ]}
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" action="#" method="post">
        <AuthField
          id="fullName"
          label="Full name"
          placeholder="Ava Morgan"
          required
          helperText="Use your legal name for interview scheduling."
        />
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="name@domain.com"
          required
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Create a secure password"
          required
          helperText="Use at least 8 characters with a mix of letters and numbers."
        />
        <AuthField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          required
        />

        <label className="flex items-start gap-2 rounded-xl border border-black/[0.06] bg-black/[0.01] px-3 py-2 text-[12px] text-neutral-600">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 rounded border-black/15 text-emerald-600"
          />
          <span>
            I agree to the terms of service and privacy policy for candidate accounts.
          </span>
        </label>

        <div className="pt-2">
          <AuthPrimaryButton>Create Account</AuthPrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
