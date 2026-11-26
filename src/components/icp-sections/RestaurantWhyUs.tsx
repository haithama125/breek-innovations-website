"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  tag: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "Keep them coming back",
    tag: "LOYALTY STACK",
    desc: "Points, tiers, and rewards your regulars actually use. Push and SMS to re-engage guests who haven't been in for a while.",
  },
  {
    label: "Fill your slow nights",
    tag: "LOCAL ADS",
    desc: "Target a 5-mile radius with tonight-only offers. Ad spend that moves tables, not vanity impressions in another city.",
  },
  {
    label: "Own your customer list",
    tag: "DATA OWNERSHIP",
    desc: "Visit history, orders, and preferences live in your database. Not Fivestars', not Thanx's, not Toast's dashboard.",
  },
  {
    label: "One admin, every surface",
    tag: "UNIFIED CONSOLE",
    desc: "Your manager runs loyalty, campaigns, orders, and reviews from one screen. No spreadsheets, no vendor logins to lose.",
  },
];

const TAB_SECONDS = 5;

export function RestaurantWhyUs() {
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
            WHY RESTAURANTS PICK US
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            Loyalty that drives margin, not another vendor invoice.
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
          {tab === 0 && <PanelLoyalty key="loyalty" />}
          {tab === 1 && <PanelAds key="ads" />}
          {tab === 2 && <PanelData key="data" />}
          {tab === 3 && <PanelAdmin key="admin" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelLoyalty() {
  return (
    <div
      className="w-full max-w-[320px] rounded-[26px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Rewards</div>
        <span className="rounded-full bg-[#E3EEE4] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#2E6B47]">
          Gold tier
        </span>
      </div>
      <div className="mb-[14px] rounded-xl bg-[#F5F6F0] p-4">
        <div className="text-[11px] text-[#6B776F]">Points balance</div>
        <div
          className="font-display text-[34px] font-bold leading-tight text-[#2E6B47]"
          style={{ letterSpacing: "-0.03em" }}
        >
          1,420
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#DCE3DA]">
          <div
            className="h-full rounded-full bg-[#2E6B47]"
            style={{ width: "0%", animation: "growRight 1.1s 0.2s cubic-bezier(.2,.7,.2,1) forwards" }}
          />
        </div>
        <div className="mt-1.5 text-[11px] text-[#6B776F]">80 pts to your next reward</div>
      </div>
      {[
        { h: "Free dessert", pts: "500 pts", d: "0.15s" },
        { h: "20% off next visit", pts: "1,000 pts", d: "0.28s" },
        { h: "Chef's tasting menu", pts: "1,500 pts", d: "0.42s" },
      ].map((r) => (
        <div
          key={r.h}
          className="mt-2 flex items-center justify-between rounded-lg border border-[#EDF1EC] bg-white px-3 py-2.5 text-[13px]"
          style={{ animation: `fadeUp 0.4s ease ${r.d} both` }}
        >
          <span className="font-medium text-[#13201A]">{r.h}</span>
          <span className="font-mono text-[11.5px] text-[#2E6B47]">{r.pts}</span>
        </div>
      ))}
    </div>
  );
}

function PanelAds() {
  return (
    <div
      className="relative flex w-full max-w-[380px] flex-col items-center gap-4"
      style={anim()}
    >
      <div className="relative h-[220px] w-[220px]">
        {/* Radar rings */}
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/40"
          style={{ animation: "ringPulse 2.4s ease-out 0s infinite" }}
        />
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/35"
          style={{ animation: "ringPulse 2.4s ease-out 0.8s infinite" }}
        />
        <div
          className="absolute inset-0 rounded-full border border-[#9FD0AE]/30"
          style={{ animation: "ringPulse 2.4s ease-out 1.6s infinite" }}
        />
        {/* Center pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F4EF] shadow-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18s6-5 6-10a6 6 0 10-12 0c0 5 6 10 6 10z"
                  stroke="#2E6B47"
                  strokeWidth="1.8"
                />
                <circle cx="10" cy="8" r="2.4" fill="#2E6B47" />
              </svg>
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#13201A]">
              You are here
            </span>
          </div>
        </div>
      </div>
      <div
        className="rounded-xl bg-white px-4 py-3 text-center text-[13px]"
        style={{
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.5s ease 0.3s both",
        }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2E6B47]">
          Tonight only · 5 mi radius
        </div>
        <div className="mt-0.5 font-display text-[18px] font-bold text-[#13201A]">
          2× points on every entree
        </div>
      </div>
    </div>
  );
}

function PanelData() {
  const rows = [
    { name: "M. Patel", visits: "14 visits", tag: "VIP", color: "#2E6B47" },
    { name: "R. Kim", visits: "6 visits", tag: "Regular", color: "#4C8A62" },
    { name: "S. Alvarez", visits: "2 visits", tag: "New", color: "#7BC395" },
    { name: "J. Nguyen", visits: "Last seen 42d", tag: "Lapsed", color: "#B59E4A" },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Your customers</div>
        <div className="font-mono text-[11px] text-[#6B776F]">1,284 · your data</div>
      </div>
      <div className="mb-3 text-[11.5px] text-[#6B776F]">Owned on your server. Export anytime.</div>
      {rows.map((r, i) => (
        <div
          key={r.name}
          className="flex items-center justify-between border-t border-[#EDF1EC] py-3"
          style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.1}s both` }}
        >
          <div>
            <div className="text-[13.5px] font-semibold text-[#13201A]">{r.name}</div>
            <div className="text-[11.5px] text-[#6B776F]">{r.visits}</div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white"
            style={{ background: r.color }}
          >
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function PanelAdmin() {
  const widgets = [
    { label: "Today's covers", value: "68", sub: "+12 vs last Tue" },
    { label: "Rewards redeemed", value: "19", sub: "~$156 margin cost" },
    { label: "SMS opens", value: "82%", sub: "Tonight's blast" },
  ];
  return (
    <div
      className="w-full max-w-[400px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Today</div>
        <div className="font-mono text-[11px] text-[#6B776F]">One login · everything</div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {widgets.map((w, i) => (
          <div
            key={w.label}
            className="rounded-xl bg-[#F5F6F0] p-3"
            style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.1}s both` }}
          >
            <div className="text-[10.5px] font-medium text-[#6B776F]">{w.label}</div>
            <div
              className="mt-1 font-display text-[22px] font-bold text-[#13201A]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {w.value}
            </div>
            <div className="mt-0.5 text-[10.5px] text-[#2E6B47]">{w.sub}</div>
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex items-center justify-between rounded-xl bg-[#13201A] px-4 py-3 text-[13px] text-[#F0F4EF]"
        style={{ animation: "fadeUp 0.4s ease 0.4s both" }}
      >
        <span>Send push: 2× points tonight</span>
        <span className="rounded-full bg-[#9FD0AE] px-3 py-1 text-[11px] font-bold text-[#13201A]">
          Send to 384
        </span>
      </div>
    </div>
  );
}
