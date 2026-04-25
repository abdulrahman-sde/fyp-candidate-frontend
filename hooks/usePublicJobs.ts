"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicJobSummary, JobsListResponse } from "@/types/job";

interface Filters {
  search: string;
  job_type: string;
  experience_level: string;
  location: string;
}

interface UsePublicJobsReturn {
  jobs: PublicJobSummary[];
  total: number;
  page: number;
  loading: boolean;
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  job_type: "",
  experience_level: "",
  location: "",
};

export function usePublicJobs(initialData?: JobsListResponse): UsePublicJobsReturn {
  const [filters, setFiltersState] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<PublicJobSummary[]>(initialData?.jobs ?? []);
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  const fetchJobs = useCallback(async (f: Filters, p: number) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (f.search) qs.set("search", f.search);
      if (f.job_type) qs.set("job_type", f.job_type);
      if (f.experience_level) qs.set("experience_level", f.experience_level);
      if (f.location) qs.set("location", f.location);
      qs.set("page", String(p));

      const res = await fetch(`/api/jobs/public?${qs.toString()}`, {
        signal: abortRef.current.signal,
      });
      if (!res.ok) return;
      const body = (await res.json()) as { success: boolean; data: JobsListResponse };
      if (body.success) {
        setJobs(body.data.jobs);
        setTotal(body.data.total);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchJobs(filters, page);
  }, [filters, page, fetchJobs]);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  return { jobs, total, page, loading, filters, setFilters, setPage, clearFilters };
}
