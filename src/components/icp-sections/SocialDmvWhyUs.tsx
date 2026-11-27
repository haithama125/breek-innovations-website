"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "We come to you and shoot the videos",
    desc: "Once a month a videographer shows up at your spot and films. The videos look like you, your staff, your food — not a stock template. That's what people actually watch and share.",
  },
  {
    label: "Ads that only reach people nearby",
    desc: "We put a small amount of ad spend behind the posts that are already working, and we point it at people who live or work within a few miles of you. No wasted dollars on someone in another state.",
  },
  {
    label: "We reply to every message and review",
    desc: "Every Instagram DM, every Google review, every Yelp comment — answered in your voice during business hours. This alone can move you up in \"near me\" search results.",
  },
  {
    label: "You only pay when it works",
    desc: "No monthly retainer. We take a small cut of the new business we actually bring in. If nothing changes, you don't owe us anything.",
  },
];

const TAB_SECONDS = 5;

export function SocialDmvWhyUs() {
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
            More walk-ins. Not more followers.
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
          {tab === 0 && <PanelReel key="reel" />}
          {tab === 1 && <PanelLocalAds key="ads" />}
          {tab === 2 && <PanelReviews key="reviews" />}
          {tab === 3 && <PanelPay key="pay" />}
        </div>
      </div>
    </section>
  );
}

function anim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function PanelReel() {
  return (
    <div
      className="relative w-full max-w-[220px] rounded-[32px] bg-white p-3"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div
        className="relative aspect-[9/16] overflow-hidden rounded-[22px]"
        style={{
          background: "linear-gradient(180deg, #1a402c 0%, #2E6B47 55%, #4C8A62 100%)",
        }}
      >
        <div
          className="absolute inset-x-6 top-10 h-28 rounded-xl bg-[#F5EFD9]/90"
          style={{ animation: "fadeUp 0.5s ease 0.15s both" }}
        />
        <div
          className="absolute inset-x-10 top-40 h-16 rounded-lg bg-[#D7A86E]/90"
          style={{ animation: "fadeUp 0.5s ease 0.3s both" }}
        />
        <div
          className="absolute bottom-6 left-3 right-3 rounded-xl bg-black/35 px-3 py-2 backdrop-blur-sm"
          style={{ animation: "fadeUp 0.5s ease 0.45s both" }}
        >
          <div className="text-[11px] text-white/80">@yourspot · 2h</div>
          <div className="mt-1 text-[12.5px] font-semibold text-white">
            Fresh pastry, shot this morning
          </div>
        </div>
      </div>
      <div
        className="mt-3 flex items-center justify-between rounded-xl bg-[#13201A] px-3 py-2 text-[11px] text-[#9FD0AE]"
        style={{ animation: "fadeUp 0.5s ease 0.6s both" }}
      >
        <span>▶ 12.4k views</span>
        <span>❤ 1.8k</span>
      </div>
    </div>
  );
}

function PanelLocalAds() {
  return (
    <div className="flex w-full max-w-[380px] flex-col items-center gap-4" style={anim()}>
      <div className="relative h-[220px] w-[220px]">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F4EF] shadow-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18s6-5 6-10a6 6 0 10-12 0c0 5 6 10 6 10z" stroke="#2E6B47" strokeWidth="1.8" />
                <circle cx="10" cy="8" r="2.4" fill="#2E6B47" />
              </svg>
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#13201A]">
              Near you
            </span>
          </div>
        </div>
      </div>
      <div
        className="rounded-xl bg-white px-4 py-3 text-center text-[13px]"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)", animation: "fadeUp 0.5s ease 0.3s both" }}
      >
        <div className="font-display text-[16px] font-bold text-[#13201A]">
          A little ad spend. Lots of walk-ins.
        </div>
      </div>
    </div>
  );
}

function PanelReviews() {
  const reviews = [
    { name: "Jordan P.", stars: 5, text: "Best latte in the neighborhood. Owner replied to my review in 2 hours.", d: "0.1s" },
    { name: "A. Martinez", stars: 5, text: "Saw them on Instagram and had to try it. Worth the drive.", d: "0.25s" },
    { name: "Kelly R.", stars: 4, text: "Love it. Had one small issue, they followed up same day.", d: "0.4s" },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-[13px] font-semibold text-[#13201A]">Your reviews this month</div>
        <div className="flex items-center gap-1 text-[12px] text-[#13201A]">
          <span className="font-bold">4.9</span>
          <span className="text-[#F5B841]">★★★★★</span>
        </div>
      </div>
      <div className="mb-3 text-[12px] text-[#6B776F]">
        127 reviews · every one of them replied to
      </div>
      {reviews.map((r) => (
        <div
          key={r.name}
          className="mb-2.5 rounded-xl border border-[#EDF1EC] bg-white px-3 py-2.5 text-[12.5px]"
          style={{ animation: `fadeUp 0.4s ease ${r.d} both` }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#13201A]">{r.name}</span>
            <span className="text-[#F5B841]">{"★".repeat(r.stars)}</span>
          </div>
          <div className="mt-1 text-[#4D5A51]">{r.text}</div>
        </div>
      ))}
    </div>
  );
}

function PanelPay() {
  const rows = [
    { label: "New customers this month", val: "+ 68", d: "0.1s" },
    { label: "Extra sales they brought in", val: "$12,840", d: "0.22s" },
    { label: "What you owe Breek", val: "$1,027", d: "0.34s", highlight: true },
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-5"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...anim() }}
    >
      <div className="mb-1 text-[13px] font-semibold text-[#13201A]">Your monthly bill</div>
      <div className="mb-3 text-[12px] text-[#6B776F]">
        No contract · no retainer · cancel anytime
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className={`mt-2 flex items-baseline justify-between rounded-xl px-3.5 py-3 text-[13px] ${
            r.highlight ? "bg-[#2E6B47] text-[#F0F4EF]" : "bg-[#F5F6F0] text-[#13201A]"
          }`}
          style={{ animation: `fadeUp 0.4s ease ${r.d} both` }}
        >
          <span className={r.highlight ? "font-semibold" : "font-medium"}>{r.label}</span>
          <span
            className={`font-display font-bold ${r.highlight ? "text-[18px]" : "text-[16px]"}`}
            style={{ letterSpacing: "-0.015em" }}
          >
            {r.val}
          </span>
        </div>
      ))}
      <div className="mt-3 text-[12px] text-[#6B776F]">
        No new customers? You owe $0.
      </div>
    </div>
  );
}
