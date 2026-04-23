"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push("/jobs");
      }}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/3 hover:text-neutral-900 active:scale-[0.98]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
