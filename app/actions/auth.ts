"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { AuthActionState, AuthUser } from "@/types/auth";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

async function relayCookies(res: Response) {
  const cookieStore = await cookies();
  for (const c of res.headers.getSetCookie()) {
    const [pair] = c.split(";");
    const eqIdx = pair!.indexOf("=");
    if (eqIdx === -1) continue;
    const name = pair!.slice(0, eqIdx).trim();
    const value = pair!.slice(eqIdx + 1).trim();
    if (name === "hf_access") {
      cookieStore.set("hf_access", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });
    } else if (name === "hf_refresh") {
      cookieStore.set("hf_refresh", value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: REFRESH_TOKEN_MAX_AGE,
        path: "/",
      });
    }
  }
}

export async function signIn(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validated = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated.data),
  });

  const body = (await res.json()) as
    | { success: true; data: { user: AuthUser } }
    | { success: false; message: string };

  if (!body.success) return { message: body.message };

  await relayCookies(res);

  const user = body.data.user;
  redirect(user.onboardingDone ? "/dashboard" : "/auth/onboarding");
}

export async function signUp(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const validated = signUpSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  const { confirmPassword: _, ...payload } = validated.data;

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, role: "APPLICANT" }),
  });

  const body = (await res.json()) as
    | { success: true; data: { user: AuthUser } }
    | { success: false; message: string };

  if (!body.success) return { message: body.message };

  await relayCookies(res);
  redirect("/auth/onboarding");
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("hf_refresh");

  if (refresh) {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      headers: { Cookie: `hf_refresh=${refresh.value}` },
    }).catch(() => {});
  }

  cookieStore.delete("hf_access");
  cookieStore.delete("hf_refresh");
  redirect("/auth/sign-in");
}
