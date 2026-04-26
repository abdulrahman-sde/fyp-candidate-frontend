export interface PublicJobSummary {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  job_type: string;
  experience_level: string;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string;
  deadline: string | null;
  published_at: string;
  company_name: string;
  company_industry: string | null;
  applicants_count: number;
  share_link: string;
}

export interface PublicJobDetail extends PublicJobSummary {
  description: string;
  requirements: string;
  qualifications: string | null;
  responsibilities: string | null;
  company_website: string | null;
  screening_questions: string | null;
}

export interface JobsListResponse {
  jobs: PublicJobSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface ApplicationSummary {
  id: string;
  job_id: string;
  job_title: string;
  job_slug: string;
  company_name: string;
  location: string | null;
  job_type: string;
  status: string;
  match_score: number | null;
  applied_at: string;
  updated_at: string;
  interview: { id: string; status: string; scheduled_at: string | null; expires_at: string } | null;
}

export interface ApplicationsListResponse {
  applications: ApplicationSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface ScreeningAnswer {
  question: string;
  answer: string;
}

export type ApplicationActionState =
  | { success?: boolean; message?: string; applicationId?: string }
  | undefined;

export interface InterviewSummary {
  id: string;
  status: string;
  scheduled_at: string | null;
  expires_at: string;
  access_token: string;
  application_id: string;
  job_title: string;
  company_name: string;
}

export interface InterviewsListResponse {
  interviews: InterviewSummary[];
}
