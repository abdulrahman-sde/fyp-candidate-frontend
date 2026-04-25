"use server";

import { cookies } from "next/headers";
import type { ApplicationActionState, ScreeningAnswer } from "@/types/job";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function submitApplication(
  _state: ApplicationActionState,
  formData: FormData
): Promise<ApplicationActionState> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return { message: "You must be logged in to apply." };

  const jobId = formData.get("job_id") as string | null;
  if (!jobId) return { message: "Invalid job." };

  const answersRaw = formData.get("screening_answers") as string | null;
  let screeningAnswers: ScreeningAnswer[] = [];
  if (answersRaw) {
    try {
      screeningAnswers = JSON.parse(answersRaw) as ScreeningAnswer[];
    } catch {
      screeningAnswers = [];
    }
  }

  const res = await fetch(`${API_BASE}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `hf_access=${access.value}`,
    },
    body: JSON.stringify({ job_id: jobId, screening_answers: screeningAnswers }),
  });

  const body = (await res.json()) as
    | { success: true; data: { application: { id: string; status: string } } }
    | { success: false; message: string; code?: string };

  if (!body.success) {
    if (body.code === "CONFLICT") return { message: "You have already applied for this position." };
    return { message: body.message ?? "Failed to submit application." };
  }

  return { success: true, applicationId: body.data.application.id };
}
