import type { AuthFieldProps } from "@/types/auth";

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  helperText,
  required = false,
}: AuthFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-xl border border-black/[0.08] bg-white/95 px-3 text-[14px] text-neutral-900 outline-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-neutral-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
      />
      {helperText ? (
        <p className="text-[12px] font-light text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  );
}
