import Link from "next/link";

import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";

export function VerifyEmailSection() {
  return (
    <AuthShell
      eyebrow="Email Verification"
      title="Verify your email address"
      description="Enter the verification code sent to your email to activate your account."
      sideTitle="Final step before dashboard access"
      sideDescription="Verification confirms account ownership and enables secure role application workflows."
      sidePoints={[
        "Code expires after a short period",
        "You can request a new code anytime",
        "Access activates right after verification",
      ]}
      footer={
        <p>
          Wrong email address?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Create account again
          </Link>
        </p>
      }
    >
      <form className="space-y-4" action="#" method="post">
        <div className="grid gap-2">
          <label htmlFor="code" className="text-[13px] font-medium text-neutral-700">
            Verification code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            required
            className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] tracking-[0.35em] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:tracking-normal placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
          <p className="text-[12px] font-light text-neutral-500">
            Enter the 6-digit code we sent to your inbox.
          </p>
        </div>

        <div className="pt-2">
          <AuthPrimaryButton>Verify Email</AuthPrimaryButton>
        </div>

        <div className="pt-1 text-center text-[13px] text-neutral-600">
          Did not get the code?{" "}
          <Link
            href="/auth/verify-email"
            className="font-semibold text-neutral-800 transition-colors hover:text-neutral-900"
          >
            Resend code
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
