"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "One team. Both halves.",
    tag: "NO HANDOFFS",
    desc: "Instead of hiring a dev shop AND a marketing agency and watching them blame each other, you get one team that ships the app and runs the campaigns. Same group, same accountability.",
  },
  {
    label: "Launch day is Day 1 of marketing",
    tag: "SAME DAY",
    desc: "The week your app goes live on the App Store, the first ads are already running, the first videos are already posted. No 6-month gap between build and 'now what?'.",
  },
  {
    label: "Fixed app price + simple monthly",
    tag: "CLEAN MONEY",
    desc: "The app is a fixed price, quoted up front. Marketing is a simple monthly fee, cancel anytime after month 3. You always know the number. No hourly bills, no scope creep.",
  },
  {
    label: "The data loop closes itself",
    tag: "FLYWHEEL",
    desc: "Users signup → we see what works → we feed it back into the next ad → the next v1.1 build. The team that made the app sees every signup, so the product keeps getting sharper.",
  },
];

const TAB_SECONDS = 5;

export function AppBundleWhyUs() {
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
            WHY FOUNDERS PICK THIS BUNDLE
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            An app without a marketing plan is a very expensive hobby.
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
          {tab === 0 && <PanelOneTeam key="team" />}
          {tab === 1 && <PanelLaunchDay key="launch" />}
          {tab === 2 && <PanelMoney key="money" />}
          {tab === 3 && <PanelLoop key="loop" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelOneTeam() {
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">Your roster</div>
      {[
        { role: "Design & build", who: "Us", d: "0.1s" },
        { role: "Launch on the stores", who: "Us", d: "0.22s" },
        { role: "Content & videos", who: "Us", d: "0.34s" },
        { role: "Ads & analytics", who: "Us", d: "0.46s" },
        { role: "Weekly reporting", who: "Us", d: "0.58s" },
      ].map((it) => (
        <div
          key={it.role}
          className="mb-2 flex items-center justify-between rounded-xl border border-[#EDF1EC] px-3.5 py-2.5"
          style={{ animation: `fadeUp 0.4s ease ${it.d} both` }}
        >
          <span className="text-[13.5px] font-medium text-[#13201A]">{it.role}</span>
          <span className="rounded-full bg-[#EFF5F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#2E6B47]">
            {it.who}
          </span>
        </div>
      ))}
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.7s both" }}
      >
        One invoice. One point of contact. No finger-pointing.
      </div>
    </div>
  );
}

function PanelLaunchDay() {
  const timeline = [
    { label: "Build kicks off", w: "W1", delay: "0.1s" },
    { label: "Beta on your phone", w: "W3", delay: "0.22s" },
    { label: "Content shoot + ad prep", w: "W5", delay: "0.34s" },
    { label: "App Store live + ads on", w: "W8", delay: "0.5s" },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">One shared timeline</div>
        <span className="rounded-full bg-[#2E6B47] px-2 py-0.5 text-[11px] font-semibold text-white">
          ~8 weeks
        </span>
      </div>
      {timeline.map((t) => (
        <div
          key={t.label}
          className="mb-2 flex items-center gap-3 rounded-xl border border-[#EDF1EC] px-3.5 py-3"
          style={{ animation: `fadeUp 0.4s ease ${t.delay} both` }}
        >
          <span className="flex h-7 w-10 items-center justify-center rounded-md bg-[#13201A] text-[11px] font-semibold text-white">
            {t.w}
          </span>
          <span className="text-[13.5px] font-medium text-[#13201A]">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function PanelMoney() {
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div
        className="rounded-xl border border-[#EDF1EC] p-4"
        style={{ animation: "fadeUp 0.45s ease 0.1s both" }}
      >
        <div className="text-[11px] font-mono text-[#2E6B47]" style={{ letterSpacing: "0.08em" }}>
          THE BUILD
        </div>
        <div className="mt-1 font-display text-[22px] font-bold text-[#13201A]" style={{ letterSpacing: "-0.02em" }}>
          Fixed price
        </div>
        <div className="mt-1 text-[12.5px] text-[#6B776F]">
          Quoted before we start. Won&apos;t change.
        </div>
      </div>
      <div
        className="mt-3 rounded-xl border border-[#EDF1EC] p-4"
        style={{ animation: "fadeUp 0.45s ease 0.3s both" }}
      >
        <div className="text-[11px] font-mono text-[#2E6B47]" style={{ letterSpacing: "0.08em" }}>
          THE MARKETING
        </div>
        <div className="mt-1 font-display text-[22px] font-bold text-[#13201A]" style={{ letterSpacing: "-0.02em" }}>
          Simple monthly
        </div>
        <div className="mt-1 text-[12.5px] text-[#6B776F]">
          Starts the week you launch. Cancel after month 3.
        </div>
      </div>
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.45s ease 0.5s both" }}
      >
        Ad spend is at cost — no agency markup.
      </div>
    </div>
  );
}

function PanelLoop() {
  const steps = [
    "User sees the ad",
    "Installs the app",
    "We see what sticks",
    "Tune the ad & ship v1.1",
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 text-[13px] font-semibold text-[#13201A]">The feedback loop</div>
      {steps.map((s, i) => (
        <div
          key={s}
          className="mb-2 flex items-center gap-3 rounded-xl bg-[#F5F6F0] px-3.5 py-2.5 text-[13px]"
          style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.12}s both` }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E6B47] text-[11px] font-semibold text-white">
            {i + 1}
          </span>
          <span className="font-medium text-[#13201A]">{s}</span>
        </div>
      ))}
      <div
        className="mt-3 rounded-xl bg-[#13201A] px-4 py-3 text-[12.5px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.6s both" }}
      >
        The team that built the app is the team that reads the data.
      </div>
    </div>
  );
}
