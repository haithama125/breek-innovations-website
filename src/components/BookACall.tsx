"use client";

import { CALENDLY_URL } from "@/lib/config";
import { useBookingModal } from "./BookingModal";

type CalendlyGlobal = {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void };
};

type Props = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "light" | "outline-dark";
  source?: string;
};

export function BookACall({
  className = "",
  children,
  variant = "primary",
  source,
}: Props) {
  const booking = useBookingModal();

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

  const classes = `${base} ${variantClass} ${className}`;

  if (booking.isConfigured) {
    return (
      <button
        type="button"
        onClick={() => booking.open(source)}
        className={classes}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener"
      className={classes}
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
