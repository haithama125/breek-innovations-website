"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "One codebase, both stores",
    tag: "SHARED BUILD",
    desc: "React Native with Expo ships to App Store and Play Store from one repo. Cuts cost roughly 40% and halves the timeline vs. shipping two native builds.",
  },
  {
    label: "Backend and admin included",
    tag: "FULL STACK",
    desc: "You get the API, database, auth, payments, and admin dashboard. Not just the app your users see — the whole thing that makes it run.",
  },
  {
    label: "You own the code",
    tag: "IP OWNERSHIP",
    desc: "Source goes into a GitHub repo you own on day one. No license fees, no retainer trap, portable to any engineer you hire next.",
  },
  {
    label: "We handle the store submission",
    tag: "RELEASE OPS",
    desc: "Provisioning, certificates, screenshots, App Store Connect, Play Console, review back-and-forth — we take the submission pipeline off your plate.",
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
          <div
            className="mb-[18px] font-mono text-[13px] text-[#2E6B47]"
            style={{ letterSpacing: "0.06em" }}
          >
            WHY HIRE US FOR MOBILE
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            Senior engineers, not a rotating freelancer roster.
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
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
                    {t.label}
                  </span>
                  <span className="font-mono text-[12px] text-[#2E6B47]">{t.tag}</span>
                </div>
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
          {tab === 0 && <PanelShared key="shared" />}
          {tab === 1 && <PanelStack key="stack" />}
          {tab === 2 && <PanelOwn key="own" />}
          {tab === 3 && <PanelRelease key="release" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelShared() {
  return (
    <div
      className="flex w-full max-w-[400px] flex-col items-center gap-4"
      style={anim()}
    >
      <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 text-[13px] shadow-lg">
        <span className="h-2 w-2 rounded-full bg-[#2E6B47]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#13201A]">
          One commit → both stores
        </span>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <StoreTile label="iOS" sub="App Store" delay="0.15s" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <StoreTile label="Android" sub="Google Play" delay="0.3s" />
      </div>
      <div
        className="w-full rounded-xl bg-[#13201A] px-4 py-3 font-mono text-[12.5px] text-[#9FD0AE]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.3)", animation: "fadeUp 0.5s ease 0.45s both" }}
      >
        <div className="text-[#6B776F]">$ eas build --platform all</div>
        <div className="mt-1 text-[#F6EED8]">✓ ios build queued</div>
        <div className="text-[#F6EED8]">✓ android build queued</div>
      </div>
    </div>
  );
}

function StoreTile({ label, sub, delay }: { label: string; sub: string; delay: string }) {
  return (
    <div
      className="flex min-w-[130px] flex-col items-center rounded-2xl bg-white px-5 py-4"
      style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: `fadeUp 0.45s ease ${delay} both` }}
    >
      <span className="font-display text-[20px] font-bold text-[#13201A]">{label}</span>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#6B776F]">
        {sub}
      </span>
      <span className="mt-2 rounded-full bg-[#E3EEE4] px-2.5 py-0.5 text-[11px] font-semibold text-[#2E6B47]">
        Shipped
      </span>
    </div>
  );
}

function PanelStack() {
  const layers = [
    { h: "Mobile app", sub: "React Native + Expo", color: "#2E6B47" },
    { h: "API layer", sub: "REST + tRPC", color: "#4C8A62" },
    { h: "Database + auth", sub: "Supabase · Postgres", color: "#7BC395" },
    { h: "Payments + billing", sub: "Stripe · RevenueCat", color: "#9FD0AE" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Your stack</div>
        <div className="font-mono text-[11px] text-[#6B776F]">All in scope</div>
      </div>
      {layers.map((l, i) => (
        <div
          key={l.h}
          className="mb-2 flex items-center gap-3 rounded-xl border border-[#EDF1EC] px-3 py-3"
          style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.1}s both` }}
        >
          <span
            className="h-7 w-7 rounded-md"
            style={{ background: l.color, opacity: 1 - i * 0.12 }}
          />
          <div>
            <div className="text-[13.5px] font-semibold text-[#13201A]">{l.h}</div>
            <div className="text-[11.5px] text-[#6B776F]">{l.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelOwn() {
  return (
    <div
      className="flex w-full max-w-[360px] flex-col gap-3"
      style={anim()}
    >
      <div
        className="rounded-2xl bg-white px-5 py-4 text-[13px]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: "fadeUp 0.45s ease 0.1s both" }}
      >
        <div className="mb-1 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#13201A" aria-hidden="true">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.25-1.28-5.25-5.68 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.07 0 0 .97-.31 3.17 1.18A11 11 0 0112 6.8c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.37-5.26 5.66.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
          </svg>
          <span className="font-mono text-[12px] text-[#13201A]">your-org/your-app</span>
        </div>
        <div className="text-[12px] text-[#6B776F]">main · 42 commits · MIT-licensed by you</div>
      </div>
      <div
        className="rounded-xl border border-[#DCE3DA] bg-[#F5F6F0] px-4 py-3 text-[12.5px] text-[#13201A]"
        style={{ animation: "fadeUp 0.45s ease 0.25s both" }}
      >
        <div className="mb-1.5 font-semibold">Breek retains:</div>
        <div className="flex items-center gap-2 text-[#6B776F]">
          <span className="text-[16px] font-bold text-[#B23A3A]">—</span>
          Nothing. Not IP, not credentials, not license terms.
        </div>
      </div>
      <div
        className="rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.45s ease 0.4s both" }}
      >
        <div className="text-[#9FB8A7]">Day-one access</div>
        <div className="mt-1 text-[13px] font-semibold">
          Repo owner · Apple Developer · Play Console
        </div>
      </div>
    </div>
  );
}

function PanelRelease() {
  const steps = [
    { h: "Provisioning + certs", d: "0.1s" },
    { h: "App Store screenshots", d: "0.2s" },
    { h: "Play Console setup", d: "0.3s" },
    { h: "Review submission", d: "0.4s" },
    { h: "Live on both stores", d: "0.55s" },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">Release pipeline</div>
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
    </div>
  );
}
