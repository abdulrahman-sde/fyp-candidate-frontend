import type { ReactNode } from "react";

interface AuthPrimaryButtonProps {
  children: ReactNode;
}

export function AuthPrimaryButton({ children }: AuthPrimaryButtonProps) {
  return (
    <button
      type="submit"
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-[13px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-emerald-600 active:scale-[0.98]"
    >
      {children}
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4.5 1.5H13.5V10.5H12V3.56066L2.56066 13L1.5 11.9393L10.9393 2.5H4.5V1.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
}
