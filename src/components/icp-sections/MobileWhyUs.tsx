"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "One app on both phones",
    desc: "Your customers all have iPhones and Androids. We build the app once and launch it on the App Store and Google Play together, so nobody is left out.",
  },
  {
    label: "Everything's included",
    desc: "The app your customers use, the dashboard you use to run it, the system that stores all your data, and the payment flow all built and delivered together. No extra bills to a different vendor.",
  },
  {
    label: "You own it when we're done",
    desc: "The app is yours. No monthly software fees to us, no lock-in. If you ever want to hire someone else to keep working on it, you can.",
  },
  {
    label: "We handle Apple and Google",
    desc: "Getting an app into the App Store and Google Play is its own headache. We submit it, we respond to Apple's reviewers, we ship the updates. You don't touch any of it.",
  },
];

const TAB_SECONDS = 5;

export function MobileWhyUs() {
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTab((t) => (t + 1) % TABS.length), TAB_SECONDS * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, tab]);

  return (
    <section className="mx-auto max-w-[1240px] px-7 py-24">
      <div
        className="grid items-center gap-16"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}
      >
        <div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            Why business owners hire us for apps.
          </h2>
          {TABS.map((t, i) => {
            const active = i === tab;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setTab(i)}
                className="w-full cursor-pointer border-t border-[#DCE3DA] pt-[22px] text-left transition-opacity duration-300"
                style={{ opacity: active ? 1 : 0.38 }}
              >
                <span className="block font-display text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
                  {t.label}
                </span>
                {active ? (
                  <p
                    className="m-0 mt-2.5 max-w-[460px] text-[16px] leading-[1.55] text-[#4D5A51]"
                    style={{ animation: "fadeUp 0.5s ease both" }}
                  >
                    {t.desc}
                  </p>
                ) : null}
                <div className="mt-[22px] h-0.5 overflow-hidden bg-transparent">
                  {active ? (
                    <div
                      key={`${tab}-${auto}`}
                      className="h-full bg-[#2E6B47]"
                      style={{
                        transformOrigin: "left",
                        animation: auto ? `tabProgress ${TAB_SECONDS}s linear both` : "none",
                      }}
                    />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
        <div
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden p-11"
          style={{
            borderRadius: "28px",
            background: "radial-gradient(110% 100% at 100% 0%, #4A8A61 0%, #245638 50%, #123222 100%)",
          }}
        >
          {tab === 0 && <PanelPhones key="phones" />}
          {tab === 1 && <PanelAllIncluded key="included" />}
          {tab === 2 && <PanelOwn key="own" />}
          {tab === 3 && <PanelStores key="stores" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PhoneFrame({
  children,
  label,
  delay,
}: {
  children: React.ReactNode;
  label: string;
  delay: string;
}) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ animation: `fadeUp 0.5s ease ${delay} both` }}
    >
      <div
        className="rounded-[26px] bg-black p-2"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}
      >
        <div className="relative h-[180px] w-[100px] overflow-hidden rounded-[18px] bg-gradient-to-b from-[#E3EEE4] via-white to-[#F5F6F0]">
          {children}
        </div>
      </div>
      <span className="mt-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#13201A]">
        {label}
      </span>
    </div>
  );
}

function PanelPhones() {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-center gap-5" style={anim()}>
      <div className="flex items-center gap-6">
        <PhoneFrame label="iPhone" delay="0.1s">
          <div className="absolute inset-x-3 top-4 h-6 rounded-full bg-[#2E6B47]/15" />
          <div className="absolute inset-x-3 top-14 h-3 rounded-full bg-[#2E6B47]/60" />
          <div className="absolute inset-x-3 top-20 h-3 rounded-full bg-[#2E6B47]/40" />
          <div className="absolute inset-x-3 top-26 h-3 rounded-full bg-[#2E6B47]/30" />
          <div className="absolute inset-x-3 bottom-4 h-10 rounded-xl bg-[#2E6B47]" />
        </PhoneFrame>
        <PhoneFrame label="Android" delay="0.25s">
          <div className="absolute inset-x-3 top-4 h-6 rounded-full bg-[#2E6B47]/15" />
          <div className="absolute inset-x-3 top-14 h-3 rounded-full bg-[#2E6B47]/60" />
          <div className="absolute inset-x-3 top-20 h-3 rounded-full bg-[#2E6B47]/40" />
          <div className="absolute inset-x-3 top-26 h-3 rounded-full bg-[#2E6B47]/30" />
          <div className="absolute inset-x-3 bottom-4 h-10 rounded-xl bg-[#2E6B47]" />
        </PhoneFrame>
      </div>
      <div
        className="rounded-xl bg-white px-4 py-3 text-center text-[13px]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: "fadeUp 0.5s ease 0.45s both" }}
      >
        <div className="font-display text-[15px] font-bold text-[#13201A]">
          Same app. Both phones. Launched together.
        </div>
      </div>
    </div>
  );
}

function PanelAllIncluded() {
  const items = [
    { h: "The app", d: "What your customers download", delay: "0.1s" },
    { h: "Your dashboard", d: "How you run things day-to-day", delay: "0.22s" },
    { h: "Your data", d: "Accounts, orders, everything saved", delay: "0.34s" },
    { h: "Payments", d: "Taking money, refunds, receipts", delay: "0.46s" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">What&apos;s in your build</div>
      {items.map((it) => (
        <div
          key={it.h}
          className="mb-2 flex items-center gap-3 rounded-xl border border-[#EDF1EC] px-3 py-3"
          style={{ animation: `fadeUp 0.4s ease ${it.delay} both` }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E6B47] text-sm text-white">
            ✓
          </span>
          <div>
            <div className="text-[14px] font-semibold text-[#13201A]">{it.h}</div>
            <div className="text-[12px] text-[#6B776F]">{it.d}</div>
          </div>
        </div>
      ))}
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.58s both" }}
      >
        One team. One invoice. No surprise vendors.
      </div>
    </div>
  );
}

function PanelOwn() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-3" style={anim()}>
      <div
        className="rounded-2xl bg-white px-5 py-4 text-[13px]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: "fadeUp 0.45s ease 0.1s both" }}
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E3EEE4] text-[#2E6B47]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 1 L18 5 V11 C18 15 14 18 10 19 C6 18 2 15 2 11 V5 Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <div className="font-semibold text-[#13201A]">You own the app</div>
            <div className="text-[11.5px] text-[#6B776F]">Full rights, day one</div>
          </div>
        </div>
      </div>
      <div
        className="rounded-xl border border-[#DCE3DA] bg-[#F5F6F0] px-4 py-3 text-[12.5px]"
        style={{ animation: "fadeUp 0.45s ease 0.25s both" }}
      >
        <div className="mb-1.5 font-semibold text-[#13201A]">What we keep:</div>
        <div className="text-[#6B776F]">Nothing. No fees, no license, no strings.</div>
      </div>
      <div
        className="rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.45s ease 0.4s both" }}
      >
        <div className="text-[#9FB8A7]">Your name is on:</div>
        <div className="mt-1 text-[13px] font-semibold">
          The app · the Apple account · the Google account
        </div>
      </div>
    </div>
  );
}

function PanelStores() {
  const steps = [
    { h: "App Store setup", d: "0.1s" },
    { h: "Google Play setup", d: "0.2s" },
    { h: "Screenshots and listings", d: "0.3s" },
    { h: "Submitted for review", d: "0.4s" },
    { h: "Live and downloadable", d: "0.55s" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">From build to both stores</div>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <div
            key={s.h}
            className="flex items-center gap-3 rounded-xl bg-[#F5F6F0] px-3.5 py-2.5 text-[13px]"
            style={{ animation: `fadeUp 0.4s ease ${s.d} both` }}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
                i < steps.length - 1 ? "bg-[#2E6B47]" : "bg-[#9FD0AE] text-[#13201A]"
              }`}
            >
              {i < steps.length - 1 ? "✓" : "↑"}
            </span>
            <span className="font-medium text-[#13201A]">{s.h}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[12px] text-[#6B776F]">You never deal with Apple or Google directly.</div>
    </div>
  );
}
