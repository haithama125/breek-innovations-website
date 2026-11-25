"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CONTACT_EMAIL, CONTACT_SHEET_WEBHOOK_URL } from "@/lib/config";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used inside <ContactModalProvider>");
  }
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

type TriggerProps = {
  className?: string;
  children: ReactNode;
  source?: string;
};

export function ContactTrigger({ className = "", children, source }: TriggerProps) {
  const { open } = useContactModal();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && source) {
          (window as unknown as { __contactSource?: string }).__contactSource = source;
        }
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

const PROJECT_TYPES = [
  "Website",
  "Mobile app",
  "Social growth",
  "GEO / AI search",
  "Automation / internal tools",
  "Not sure yet",
] as const;

const BUDGETS = [
  "Under $2k",
  "$2k – $5k",
  "$5k – $15k",
  "$15k+",
  "Not sure",
] as const;

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMsg(null);
    }
  }, [isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if ((formData.get("company_website") as string)?.length) {
      setStatus("success");
      return;
    }

    formData.append("submittedAt", new Date().toISOString());
    formData.append("page", typeof window !== "undefined" ? window.location.href : "");
    const src = (window as unknown as { __contactSource?: string }).__contactSource;
    if (src) formData.append("source", src);

    if (!CONTACT_SHEET_WEBHOOK_URL) {
      setStatus("error");
      setErrorMsg(
        `Form isn't connected yet. Please email ${CONTACT_EMAIL} and we'll get back within 24 hours.`,
      );
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);
    try {
      await fetch(CONTACT_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      );
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto px-4 pb-4 pt-8 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        background: "rgba(10, 20, 14, 0.52)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "contactFade 180ms ease-out",
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] bg-[#F5F6F0] shadow-[0_30px_80px_rgba(18,50,34,0.35)]"
        style={{ animation: "contactPop 240ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          className="relative px-8 pb-8 pt-9 text-[#F0F4EF] sm:px-10 sm:pt-10"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, #4A8A61 0%, #245638 55%, #123222 100%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#F0F4EF] transition-colors hover:bg-white/15"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9D6CD]">
            Get in touch
          </p>
          <h2
            id={titleId}
            className="mt-2 font-display text-[28px] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[32px]"
          >
            Tell us what you&apos;re building.
          </h2>
          <p id={descId} className="mt-3 max-w-[420px] text-[14.5px] leading-relaxed text-[#C9D6CD]">
            A senior engineer reads every submission and replies within 24 hours.
          </p>
        </div>

        <div className="px-8 pb-9 pt-7 sm:px-10">
          {status === "success" ? (
            <SuccessState onClose={onClose} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required ref={firstFieldRef} autoComplete="name" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
                <Field label="Company" name="company" autoComplete="organization" />
                <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField label="What do you need?" name="projectType" required>
                  <option value="">Select one…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </SelectField>
                <SelectField label="Budget range" name="budget">
                  <option value="">Select one…</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="mt-4">
                <TextArea
                  label="What are you trying to accomplish?"
                  name="message"
                  required
                  rows={4}
                  placeholder="A few sentences on the goal, timeline, and anything you've tried."
                />
              </div>

              {status === "error" && errorMsg && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-[#E8C7C7] bg-[#FBF1F1] px-3.5 py-2.5 text-[13.5px] text-[#8A2A2A]"
                >
                  {errorMsg}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[12.5px] text-[#6B776F]">
                  Or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2E6B47] underline-offset-2 hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="pill-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Spinner /> Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes contactFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes contactPop {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[role="dialog"], div[role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="py-6 text-center">
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
        Thanks — we&apos;ve got it.
      </h3>
      <p className="mx-auto mt-2 max-w-[360px] text-[14.5px] leading-relaxed text-[#4D5A51]">
        You&apos;ll hear from a senior engineer within 24 hours. Check your inbox (and spam) for a note from {CONTACT_EMAIL}.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="pill-primary mt-6 inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold"
      >
        Close
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className="mr-2 animate-spin"
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

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, name, type = "text", required, autoComplete },
  ref,
) {
  const id = `cf-${name}`;
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

function SelectField({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  const id = `cf-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B776F]">
        {label}
        {required && <span className="ml-1 text-[#2E6B47]">*</span>}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="w-full appearance-none rounded-xl border border-[#DCE3DA] bg-white px-3.5 py-2.5 pr-9 text-[15px] text-[#13201A] outline-none transition-colors focus:border-[#2E6B47] focus:ring-2 focus:ring-[#2E6B47]/20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%236B776F' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
      >
        {children}
      </select>
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const id = `cf-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#6B776F]">
        {label}
        {required && <span className="ml-1 text-[#2E6B47]">*</span>}
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-[#DCE3DA] bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-[#13201A] outline-none transition-colors placeholder:text-[#9FB8A7] focus:border-[#2E6B47] focus:ring-2 focus:ring-[#2E6B47]/20"
      />
    </label>
  );
}
