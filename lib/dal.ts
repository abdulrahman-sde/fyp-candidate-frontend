import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import type { AuthUser } from "@/types/auth";
import type {
  JobsListResponse,
  PublicJobDetail,
  ApplicationsListResponse,
} from "@/types/job";

const API_BASE = process.env.BACKEND_URL ?? "http://localhost:4000";

async function authHeaders(): Promise<HeadersInit | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get("hf_access");
  if (!access) return null;
  return { Cookie: `hf_access=${access.value}` };
}

export const getSession = cache(async (): Promise<AuthUser | null> => {
  const headers = await authHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { user: AuthUser } };
    return body.success ? body.data.user : null;
  } catch {
    return null;
  }
});

export const getPublicJobs = cache(
  async (params?: {
    search?: string;
    job_type?: string;
    experience_level?: string;
    location?: string;
    page?: number;
  }): Promise<JobsListResponse> => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.job_type) qs.set("job_type", params.job_type);
    if (params?.experience_level) qs.set("experience_level", params.experience_level);
    if (params?.location) qs.set("location", params.location);
    if (params?.page) qs.set("page", String(params.page));

    try {
      const res = await fetch(`${API_BASE}/api/jobs/public?${qs.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) return { jobs: [], total: 0, page: 1, limit: 12 };
      const body = (await res.json()) as { success: boolean; data: JobsListResponse };
      return body.success ? body.data : { jobs: [], total: 0, page: 1, limit: 12 };
    } catch {
      return { jobs: [], total: 0, page: 1, limit: 12 };
    }
  }
);

export const getPublicJobBySlug = cache(async (slug: string): Promise<PublicJobDetail | null> => {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/public/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: { job: PublicJobDetail } };
    return body.success ? body.data.job : null;
  } catch {
    return null;
  }
});

export const getMyApplications = cache(
  async (params?: { status?: string; page?: number }): Promise<ApplicationsListResponse | null> => {
    const headers = await authHeaders();
    if (!headers) return null;

    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));

    try {
      const res = await fetch(`${API_BASE}/api/applications?${qs.toString()}`, {
        headers,
        cache: "no-store",
      });
      if (!res.ok) return null;
      const body = (await res.json()) as { success: boolean; data: ApplicationsListResponse };
      return body.success ? body.data : null;
    } catch {
      return null;
    }
  }
);

export const checkApplicationStatus = cache(
  async (jobId: string): Promise<{ applied: boolean; status: string | null }> => {
    const headers = await authHeaders();
    if (!headers) return { applied: false, status: null };

    try {
      const res = await fetch(`${API_BASE}/api/applications/status/${jobId}`, {
        headers,
        cache: "no-store",
      });
      if (!res.ok) return { applied: false, status: null };
      const body = (await res.json()) as {
        success: boolean;
        data: { applied: boolean; status: string | null };
      };
      return body.success ? body.data : { applied: false, status: null };
    } catch {
      return { applied: false, status: null };
    }
  }
);
