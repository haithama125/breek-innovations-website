"use client";

import { CALENDLY_URL } from "@/lib/config";

type CalendlyGlobal = {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void };
};

type Props = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "light" | "outline-dark";
};

export function BookACall({ className = "", children, variant = "primary" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap select-none";
  const variantClass =
    variant === "dark"
      ? "pill-dark"
      : variant === "light"
        ? "bg-[#F0F4EF] text-[#123222] hover:bg-white transition-colors"
        : variant === "outline-dark"
          ? "border border-white/35 text-[#F0F4EF] hover:border-[#F0F4EF] transition-colors"
          : "pill-primary";

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener"
      className={`${base} ${variantClass} ${className}`}
      onClick={(e) => {
        const w = window as unknown as CalendlyGlobal;
        if (w.Calendly) {
          e.preventDefault();
          w.Calendly.initPopupWidget({ url: CALENDLY_URL });
        }
      }}
    >
      {children}
    </a>
  );
}
