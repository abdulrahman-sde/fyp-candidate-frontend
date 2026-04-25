"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { AuthActionState, AuthUser } from "@/types/auth";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

const ONE_MB = 1 * 1024 * 1024;

const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  location: z.string().min(1, "Location is required").max(200),
  interests: z
    .string()
    .min(1, "At least one interest is required")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
});

export async function completeOnboarding(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) redirect("/auth/sign-in");

  // Validate text fields
  const validated = onboardingSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    location: formData.get("location"),
    interests: formData.get("interests"),
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  // Validate resume file
  const resumeFile = formData.get("resume");
  if (!(resumeFile instanceof File) || resumeFile.size === 0) {
    return { errors: { resume: ["Resume PDF is required"] } };
  }
  if (resumeFile.type !== "application/pdf") {
    return { errors: { resume: ["Only PDF files are accepted"] } };
  }
  if (resumeFile.size > ONE_MB) {
    return { errors: { resume: ["File must be under 1 MB"] } };
  }

  // Forward as multipart to the backend
  const body = new FormData();
  body.append("firstName", validated.data.firstName);
  body.append("lastName", validated.data.lastName);
  body.append("location", validated.data.location);
  body.append("interests", validated.data.interests.join(","));
  body.append("resume", resumeFile, resumeFile.name);

  const res = await fetch(`${API_BASE}/api/auth/onboarding/candidate`, {
    method: "POST",
    headers: { Cookie: `hf_access=${access.value}` },
    body,
  });

  const responseBody = (await res.json()) as
    | { success: true; data: { user: AuthUser } }
    | { success: false; message: string };

  if (!responseBody.success) return { message: responseBody.message };

  redirect("/dashboard");
}
