import Link from "next/link";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";

export function ForgotPasswordSection() {
  return (
    <AuthShell
      eyebrow="Password Recovery"
      title="Forgot your password?"
      description="Enter your email and we will send a secure link to reset your password."
      sideTitle="Fast, secure account recovery"
      sideDescription="Recovery links expire quickly and can only be used once for your safety."
      sidePoints={[
        "Time-limited reset links",
        "One-time verification process",
        "Immediate access after password update",
      ]}
      footer={
        <p>
          Remembered your password?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Return to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" action="#" method="post">
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="name@domain.com"
          required
          helperText="We will send a reset link only if this account exists."
        />

        <p className="rounded-xl border border-black/[0.06] bg-black/[0.01] px-3 py-2 text-[12px] font-light leading-relaxed text-neutral-600">
          If you do not receive an email within a few minutes, check your spam folder or request a new link.
        </p>

        <div className="pt-2">
          <AuthPrimaryButton>Send Reset Link</AuthPrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
