"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { BOOKING_WEBHOOK_URL, CONTACT_EMAIL } from "@/lib/config";

type BookingModalContextValue = {
  open: (source?: string) => void;
  close: () => void;
  isConfigured: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used inside <BookingModalProvider>");
  return ctx;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const sourceRef = useRef<string | undefined>(undefined);
  const open = useCallback((source?: string) => {
    sourceRef.current = source;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ open, close, isConfigured: Boolean(BOOKING_WEBHOOK_URL) }),
    [open, close],
  );
  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} sourceRef={sourceRef} />
    </BookingModalContext.Provider>
  );
}

type Availability = {
  ok: true;
  timezone: string;
  durationMinutes: number;
  slots: Record<string, string[]>;
};

type Step = "picking" | "filling" | "submitting" | "success" | "error";

function BookingModal({
  isOpen,
  onClose,
  sourceRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  sourceRef: React.MutableRefObject<string | undefined>;
}) {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("picking");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ startISO: string; email: string } | null>(null);

  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const viewerTz = useMemo(
    () =>
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "UTC",
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDay(null);
      setSelectedSlot(null);
      setStep("picking");
      setSubmitError(null);
      setConfirmed(null);
    }
  }, [isOpen]);

  const fetchAvailability = useCallback(async () => {
    if (!BOOKING_WEBHOOK_URL) return;
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`${BOOKING_WEBHOOK_URL}?action=availability`, {
        method: "GET",
        redirect: "follow",
      });
      const data = (await res.json()) as Availability | { ok: false; error: string };
      if (!("ok" in data) || data.ok !== true) {
        throw new Error(("error" in data && data.error) || "Could not load availability");
      }
      setAvailability(data);
    } catch (e) {
      setLoadError(
        e instanceof Error ? e.message : "Could not load availability. Please retry.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (availability) return;
    fetchAvailability();
  }, [isOpen, availability, fetchAvailability]);

  useEffect(() => {
    if (step === "filling") {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [step]);

  const viewerDaysWithSlots = useMemo(() => {
    if (!availability) return [] as { dayKey: string; date: Date; slots: string[] }[];
    const byViewerDay: Record<string, string[]> = {};
    for (const slots of Object.values(availability.slots)) {
      for (const iso of slots) {
        const d = new Date(iso);
        const key = formatViewerDayKey(d);
        if (!byViewerDay[key]) byViewerDay[key] = [];
        byViewerDay[key].push(iso);
      }
    }
    return Object.entries(byViewerDay)
      .map(([key, slots]) => ({
        dayKey: key,
        date: parseViewerDayKey(key),
        slots: slots.sort(),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [availability]);

  useEffect(() => {
    if (!selectedDay && viewerDaysWithSlots.length > 0) {
      setSelectedDay(viewerDaysWithSlots[0].dayKey);
    }
  }, [selectedDay, viewerDaysWithSlots]);

  const slotsForSelectedDay = useMemo(() => {
    if (!selectedDay) return [] as string[];
    return viewerDaysWithSlots.find((d) => d.dayKey === selectedDay)?.slots ?? [];
  }, [selectedDay, viewerDaysWithSlots]);

  const { morning, afternoon, evening } = useMemo(() => {
    const m: string[] = [], a: string[] = [], e: string[] = [];
    for (const iso of slotsForSelectedDay) {
      const hour = new Date(iso).getHours();
      if (hour < 12) m.push(iso);
      else if (hour < 17) a.push(iso);
      else e.push(iso);
    }
    return { morning: m, afternoon: a, evening: e };
  }, [slotsForSelectedDay]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if ((data.get("company_website") as string)?.length) {
      setStep("success");
      return;
    }
    data.append("startISO", selectedSlot);
    data.append("viewerTimezone", viewerTz);
    if (sourceRef.current) data.append("source", sourceRef.current);
    data.append("page", typeof window !== "undefined" ? window.location.href : "");

    setStep("submitting");
    setSubmitError(null);
    try {
      const res = await fetch(BOOKING_WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        body: data,
      });
      const json = (await res.json()) as
        | { ok: true; eventId: string; startISO: string }
        | { ok: false; error: string; code?: string };
      if (!json.ok) {
        if (json.code === "SLOT_TAKEN") {
          setSubmitError("That slot was just taken. Pick another time.");
          setAvailability(null);
          setSelectedSlot(null);
          setStep("picking");
          fetchAvailability();
          return;
        }
        throw new Error(json.error || "Booking failed");
      }
      setConfirmed({ startISO: selectedSlot, email: String(data.get("email") || "") });
      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      );
      setStep("error");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto px-4 pb-4 pt-8 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        background: "rgba(10, 20, 14, 0.52)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "bookingFade 180ms ease-out",
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[620px] overflow-hidden rounded-[28px] bg-[#F5F6F0] shadow-[0_30px_80px_rgba(18,50,34,0.35)]"
        style={{ animation: "bookingPop 240ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          className="relative px-8 pb-7 pt-9 text-[#F0F4EF] sm:px-10 sm:pt-10"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, #4A8A61 0%, #245638 55%, #123222 100%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#F0F4EF] transition-colors hover:bg-white/15"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9D6CD]">
            Book a call
          </p>
          <h2
            id={titleId}
            className="mt-2 font-display text-[28px] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[32px]"
          >
            Free 30-minute consultation
          </h2>
          <p className="mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-[#C9D6CD]">
            A senior engineer will walk through your goals, timelines, and what&apos;s worth
            doing first. You&apos;ll get a calendar invite the moment you confirm.
          </p>
          <Stepper step={step} hasSlot={Boolean(selectedSlot)} />
        </div>

        <div className="px-6 pb-8 pt-7 sm:px-10">
          {step === "success" && confirmed ? (
            <SuccessState confirmed={confirmed} viewerTz={viewerTz} onClose={onClose} />
          ) : loading && !availability ? (
            <LoadingState />
          ) : loadError ? (
            <ErrorState message={loadError} onRetry={fetchAvailability} />
          ) : step === "filling" || step === "submitting" || step === "error" ? (
            <FillingStep
              selectedSlot={selectedSlot!}
              viewerTz={viewerTz}
              serverTz={availability?.timezone ?? "America/New_York"}
              onBack={() => {
                setStep("picking");
                setSubmitError(null);
              }}
              onSubmit={handleSubmit}
              submitting={step === "submitting"}
              error={submitError}
              firstFieldRef={firstFieldRef}
            />
          ) : (
            <PickingStep
              days={viewerDaysWithSlots}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              morning={morning}
              afternoon={afternoon}
              evening={evening}
              onSlotPick={(iso) => {
                setSelectedSlot(iso);
                setStep("filling");
              }}
              viewerTz={viewerTz}
              serverTz={availability?.timezone ?? "America/New_York"}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bookingFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bookingPop {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"], div[role="dialog"] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Stepper({ step, hasSlot }: { step: Step; hasSlot: boolean }) {
  const current =
    step === "success" ? 3 : step === "filling" || step === "submitting" || step === "error" ? 2 : hasSlot ? 2 : 1;
  const items = ["Pick a time", "Your info", "Confirmed"];
  return (
    <ol className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#C9D6CD]">
      {items.map((label, i) => {
        const n = i + 1;
        const active = n === current;
        const done = n < current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                done
                  ? "bg-[#9FD0AE] text-[#123222]"
                  : active
                    ? "bg-[#F0F4EF] text-[#123222]"
                    : "bg-white/15 text-[#C9D6CD]"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className={active || done ? "text-[#F0F4EF]" : undefined}>{label}</span>
            {n < items.length && <span className="mx-1 text-white/25">·</span>}
          </li>
        );
      })}
    </ol>
  );
}

function PickingStep({
  days,
  selectedDay,
  onDayChange,
  morning,
  afternoon,
  evening,
  onSlotPick,
  viewerTz,
  serverTz,
}: {
  days: { dayKey: string; date: Date; slots: string[] }[];
  selectedDay: string | null;
  onDayChange: (key: string) => void;
  morning: string[];
  afternoon: string[];
  evening: string[];
  onSlotPick: (iso: string) => void;
  viewerTz: string;
  serverTz: string;
}) {
  if (days.length === 0) {
    return (
      <div className="py-10 text-center text-[14.5px] text-[#4D5A51]">
        No open slots in the next three weeks. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2E6B47] underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        and we&apos;ll find a time.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B776F]">
          Pick a day
        </h3>
        <span className="text-[11.5px] text-[#6B776F]">
          Times shown in your time ({shortTz(viewerTz)})
        </span>
      </div>
      <div className="-mx-6 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10">
        <div className="flex gap-2">
          {days.map((d) => {
            const isSelected = d.dayKey === selectedDay;
            return (
              <button
                key={d.dayKey}
                type="button"
                onClick={() => onDayChange(d.dayKey)}
                className={`flex min-w-[82px] flex-col items-center rounded-2xl border px-3 py-3 text-center transition-colors ${
                  isSelected
                    ? "border-[#2E6B47] bg-[#2E6B47] text-white shadow-[0_8px_18px_rgba(46,107,71,0.22)]"
                    : "border-[#DCE3DA] bg-white text-[#13201A] hover:border-[#2E6B47]"
                }`}
              >
                <span
                  className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${
                    isSelected ? "text-[#C9D6CD]" : "text-[#6B776F]"
                  }`}
                >
                  {d.date.toLocaleDateString(undefined, { weekday: "short" })}
                </span>
                <span className="mt-1 font-display text-[22px] font-bold leading-none tracking-[-0.02em]">
                  {d.date.toLocaleDateString(undefined, { day: "numeric" })}
                </span>
                <span
                  className={`mt-0.5 text-[10.5px] ${
                    isSelected ? "text-[#C9D6CD]" : "text-[#6B776F]"
                  }`}
                >
                  {d.date.toLocaleDateString(undefined, { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <SlotGroup label="Morning" slots={morning} onPick={onSlotPick} />
        <SlotGroup label="Afternoon" slots={afternoon} onPick={onSlotPick} />
        <SlotGroup label="Evening" slots={evening} onPick={onSlotPick} />
      </div>

      <p className="mt-6 text-[11.5px] text-[#6B776F]">
        Business hours Mon–Sat, 9am–7pm {shortTz(serverTz)}. Can&apos;t find a time?{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2E6B47] underline-offset-2 hover:underline">
          Email us
        </a>
        .
      </p>
    </div>
  );
}

function SlotGroup({
  label,
  slots,
  onPick,
}: {
  label: string;
  slots: string[];
  onPick: (iso: string) => void;
}) {
  if (slots.length === 0) return null;
  return (
    <div className="mb-5">
      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B776F]">
        {label}
      </h4>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))" }}>
        {slots.map((iso) => (
          <button
            key={iso}
            type="button"
            onClick={() => onPick(iso)}
            className="inline-flex items-center justify-center rounded-xl border border-[#DCE3DA] bg-white px-2 py-2.5 text-[14px] font-semibold text-[#13201A] transition-colors hover:border-[#2E6B47] hover:bg-[#F1F5EF]"
          >
            {formatTime(iso)}
          </button>
        ))}
      </div>
    </div>
  );
}

function FillingStep({
  selectedSlot,
  viewerTz,
  serverTz,
  onBack,
  onSubmit,
  submitting,
  error,
  firstFieldRef,
}: {
  selectedSlot: string;
  viewerTz: string;
  serverTz: string;
  onBack: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  error: string | null;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}) {
  const start = new Date(selectedSlot);
  const end = new Date(start.getTime() + 30 * 60000);
  return (
    <form onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="mb-5 rounded-2xl border border-[#DCE3DA] bg-white px-4 py-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B776F]">
          You picked
        </div>
        <div className="mt-1 font-display text-[18px] font-bold leading-tight tracking-[-0.02em] text-[#13201A]">
          {start.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-[14px] text-[#4D5A51]">
          {formatTime(selectedSlot)}–{formatTime(end.toISOString())} ({shortTz(viewerTz)})
          {viewerTz !== serverTz && (
            <span className="text-[#6B776F]">
              {" · "}{formatTimeIn(selectedSlot, serverTz)} {shortTz(serverTz)}
            </span>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <BookingField label="Name" name="name" required ref={firstFieldRef} autoComplete="name" />
        <BookingField label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="mt-4">
        <BookingField label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="mt-4">
        <BookingTextArea
          label="What would you like to discuss? (optional)"
          name="message"
          rows={3}
          placeholder="A sentence on the goal or the problem you're trying to solve."
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-[#E8C7C7] bg-[#FBF1F1] px-3.5 py-2.5 text-[13.5px] text-[#8A2A2A]"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-semibold text-[#2E6B47] transition-colors hover:text-[#123222] disabled:opacity-60"
        >
          <span aria-hidden="true">←</span> Pick a different time
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="pill-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Spinner /> Booking…
            </>
          ) : (
            "Confirm booking"
          )}
        </button>
      </div>
    </form>
  );
}

function SuccessState({
  confirmed,
  viewerTz,
  onClose,
}: {
  confirmed: { startISO: string; email: string };
  viewerTz: string;
  onClose: () => void;
}) {
  const start = new Date(confirmed.startISO);
  const end = new Date(start.getTime() + 30 * 60000);
  return (
    <div className="py-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EEE4]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="#2E6B47"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.02em] text-[#13201A]">
        You&apos;re booked.
      </h3>
      <p className="mx-auto mt-2 max-w-[420px] text-[14.5px] leading-relaxed text-[#4D5A51]">
        A Google Calendar invite is on its way to{" "}
        <span className="font-semibold text-[#13201A]">{confirmed.email}</span>. Check your
        inbox (and spam folder).
      </p>
      <div className="mt-4 flex justify-center">
        <div className="rounded-2xl border border-[#DCE3DA] bg-white px-5 py-3 text-left">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B776F]">
            Confirmed
          </div>
          <div className="mt-0.5 font-display text-[18px] font-bold leading-tight tracking-[-0.02em] text-[#13201A]">
            {start.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-[14px] text-[#4D5A51]">
            {formatTime(confirmed.startISO)}–{formatTime(end.toISOString())} ({shortTz(viewerTz)})
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onClose}
          className="pill-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-[#6B776F]">
      <Spinner large />
      <span className="text-[14px]">Loading open times…</span>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="py-10 text-center">
      <p className="mx-auto max-w-[360px] text-[14.5px] text-[#4D5A51]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="pill-primary mt-4 inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold"
      >
        Try again
      </button>
      <p className="mt-3 text-[12.5px] text-[#6B776F]">
        Or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2E6B47] underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}

function Spinner({ large }: { large?: boolean } = {}) {
  const size = large ? 28 : 14;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`${large ? "" : "mr-2 "}animate-spin`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" fill="none" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

const BookingField = forwardRef<HTMLInputElement, FieldProps>(function BookingField(
  { label, name, type = "text", required, autoComplete },
  ref,
) {
  const id = `bk-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B776F]">
        {label}
        {required && <span className="ml-1 text-[#2E6B47]">*</span>}
      </span>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-[#DCE3DA] bg-white px-3.5 py-2.5 text-[15px] text-[#13201A] outline-none transition-colors placeholder:text-[#9FB8A7] focus:border-[#2E6B47] focus:ring-2 focus:ring-[#2E6B47]/20"
      />
    </label>
  );
});

function BookingTextArea({
  label,
  name,
  rows = 3,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}) {
  const id = `bk-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B776F]">
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-[#DCE3DA] bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-[#13201A] outline-none transition-colors placeholder:text-[#9FB8A7] focus:border-[#2E6B47] focus:ring-2 focus:ring-[#2E6B47]/20"
      />
    </label>
  );
}

function formatViewerDayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseViewerDayKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTimeIn(iso: string, timeZone: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
}

function shortTz(tz: string) {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      timeZoneName: "short",
    }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
  } catch {
    return tz;
  }
}
