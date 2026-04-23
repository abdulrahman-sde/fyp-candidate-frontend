import Link from "next/link";

import { AuthField } from "@/components/auth/AuthField";
import { AuthPrimaryButton } from "@/components/auth/AuthPrimaryButton";
import { AuthShell } from "@/components/auth/AuthShell";

export function ResetPasswordSection() {
  return (
    <AuthShell
      eyebrow="Reset Password"
      title="Create a new password"
      description="Choose a new password for your account and continue where you left off."
      sideTitle="Protect your profile access"
      sideDescription="A strong password keeps your applications, interview links, and profile data secure."
      sidePoints={[
        "Password updates are encrypted",
        "Active sessions can be refreshed after reset",
        "Return to sign in immediately after confirmation",
      ]}
      footer={
        <p>
          Need a new recovery link?{" "}
          <Link
            href="/auth/forgot-password"
            className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            Request again
          </Link>
        </p>
      }
    >
      <form className="space-y-4" action="#" method="post">
        <AuthField
          id="newPassword"
          label="New password"
          type="password"
          placeholder="Enter new password"
          required
          helperText="Use at least 8 characters with one number."
        />
        <AuthField
          id="confirmPassword"
          label="Confirm new password"
          type="password"
          placeholder="Re-enter new password"
          required
        />

        <p className="rounded-xl border border-black/[0.06] bg-black/[0.01] px-3 py-2 text-[12px] font-light leading-relaxed text-neutral-600">
          Reset tokens are single use. If this token has expired, request a new reset link.
        </p>

        <div className="pt-2">
          <AuthPrimaryButton>Update Password</AuthPrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
