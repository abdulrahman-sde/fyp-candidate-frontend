import type { ReactNode } from "react";

export interface RecruiterProfileShape {
  kind: "recruiter";
  firstName: string;
  lastName: string;
  phone: string | null;
  jobTitle: string | null;
}

export interface CandidateProfileShape {
  kind: "candidate";
  firstName: string;
  lastName: string;
  phone: string | null;
  location: string | null;
  interests: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  role: "APPLICANT" | "RECRUITER";
  profile: RecruiterProfileShape | CandidateProfileShape | null;
  company: {
    name: string;
    website: string | null;
    industry: string | null;
    size: string | null;
  } | null;
  onboardingDone: boolean;
}

export type AuthActionState =
  | { errors?: Record<string, string[]>; message?: string }
  | undefined;

export interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  sideTitle: string;
  sideDescription: string;
  sidePoints: string[];
  alignTop?: boolean;
  stickyAside?: boolean;
}

export interface AuthFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}
