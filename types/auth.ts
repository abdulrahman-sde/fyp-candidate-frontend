import type { ReactNode } from "react";

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
