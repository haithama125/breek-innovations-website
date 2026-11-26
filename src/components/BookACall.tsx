"use client";

import { useBookingModal } from "./BookingModal";

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

  return (
    <button
      type="button"
      onClick={() => booking.open(source)}
      className={`${base} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
