"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Tab = {
  label: string;
  product: string;
  desc: string;
};

const TABS: Tab[] = [
  {
    label: "More views",
    product: "SOCIAL MEDIA",
    desc: "Content and campaigns built to spread, managed for you so you never have to think about it.",
  },
  {
    label: "More sales",
    product: "OUTREACH",
    desc: "We turn the people engaging with your content into paying customers with fast, personal follow-up.",
  },
  {
    label: "Less waste",
    product: "CONSULTING",
    desc: "We look at your business specs (financials, goals) and cut out the unnecessary waste.",
  },
  {
    label: "Less headache",
    product: "AI AUTOMATION",
    desc: "Custom process automation so the boring stuff handles itself.",
  },
];

const TAB_SECONDS = 5;

export function WhyUs() {
  const [tab, setTab] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setAutoAdvance(false);
  }, []);

  useEffect(() => {
    if (!autoAdvance) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTab((t) => (t + 1) % TABS.length);
    }, TAB_SECONDS * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvance, tab]);

  const onTabClick = (i: number) => {
    setTab(i);
  };

  return (
    <section id="why" className="mx-auto max-w-[1240px] px-7 py-24">
      <div
        className="grid items-center gap-16"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        <div data-reveal="0">
          <div
            className="mb-[18px] font-mono text-[13px] text-[#2E6B47]"
            style={{ letterSpacing: "0.06em" }}
          >
            WHY WORK WITH US
          </div>
          <h2
            className="mb-9 text-balance font-display font-bold"
            style={{
              fontSize: "clamp(34px, 4.2vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            With Breek, you get more of what matters.
          </h2>
          {TABS.map((t, i) => {
            const active = i === tab;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onTabClick(i)}
                className="w-full cursor-pointer border-t border-[#DCE3DA] pt-[22px] text-left transition-opacity duration-300"
                style={{ opacity: active ? 1 : 0.38 }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className="font-display text-[28px] font-bold"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {t.label}
                  </span>
                  <span className="font-mono text-[12px] text-[#2E6B47]">
                    {t.product}
                  </span>
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
                      key={`${tab}-${autoAdvance}`}
                      className="h-full bg-[#2E6B47]"
                      style={{
                        transformOrigin: "left",
                        animation: autoAdvance
                          ? `tabProgress ${TAB_SECONDS}s linear both`
                          : "none",
                      }}
                    />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
        <div
          data-reveal="150"
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden p-11"
          style={{
            borderRadius: "28px",
            background:
              "radial-gradient(110% 100% at 100% 0%, #4A8A61 0%, #245638 50%, #123222 100%)",
          }}
        >
          {tab === 0 && <TabPanelViews key="views" />}
          {tab === 1 && <TabPanelSales key="sales" />}
          {tab === 2 && <TabPanelWaste key="waste" />}
          {tab === 3 && <TabPanelAutomation key="auto" />}
        </div>
      </div>
    </section>
  );
}

function panelAnim() {
  return { animation: "panelIn 0.55s cubic-bezier(.2,.7,.2,1) both" };
}

function TabPanelViews() {
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-[22px]"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...panelAnim() }}
    >
      <div className="mb-[18px] flex items-center gap-3">
        <Image
          src="/youtube-logo.png"
          alt="YouTube"
          width={38}
          height={26}
          className="h-auto w-[38px]"
        />
        <div>
          <div className="text-sm font-semibold">Your campaign</div>
          <div className="text-xs text-[#6B776F]">Running on 4 platforms</div>
        </div>
      </div>
      <div className="flex h-[150px] items-end gap-2 border-b border-[#EDF1EC] px-1">
        {[
          { h: "18%", bg: "#CFE2D3", delay: "0.1s" },
          { h: "26%", bg: "#CFE2D3", delay: "0.18s" },
          { h: "34%", bg: "#A9CDB3", delay: "0.26s" },
          { h: "48%", bg: "#7FB38F", delay: "0.34s" },
          { h: "66%", bg: "#4C8A62", delay: "0.42s" },
          { h: "100%", bg: "#2E6B47", delay: "0.5s" },
        ].map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: b.h,
              background: b.bg,
              transformOrigin: "bottom",
              animation: `growBar 0.6s ease ${b.delay} both`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-[13px] text-[#6B776F]">Total views</span>
        <span
          className="font-display text-[30px] font-bold text-[#2E6B47]"
          style={{ letterSpacing: "-0.03em" }}
        >
          8.2M
        </span>
      </div>
    </div>
  );
}

function TabPanelSales() {
  return (
    <div
      className="flex w-full max-w-[400px] flex-col gap-3"
      style={panelAnim()}
    >
      <div
        className="flex items-center gap-3 rounded-2xl bg-white px-[18px] py-4"
        style={{
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.5s ease 0.05s both",
        }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E3EEE4] font-bold text-[#2E6B47]">
          J
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">
            Jamie commented on your reel
          </div>
          <div className="text-xs text-[#6B776F]">
            &ldquo;How much does this cost?&rdquo;
          </div>
        </div>
      </div>
      <div
        className="ml-7 flex items-center gap-3 rounded-2xl bg-white px-[18px] py-4"
        style={{
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          animation: "fadeUp 0.5s ease 0.25s both",
        }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E6B47] font-bold text-white">
          b
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Personal follow-up sent</div>
          <div className="text-xs text-[#6B776F]">
            Personalized offer · 12s after comment
          </div>
        </div>
      </div>
      <div
        className="ml-14 flex items-center justify-between rounded-2xl bg-[#13201A] px-[18px] py-4 text-[#F0F4EF]"
        style={{
          boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
          animation: "fadeUp 0.5s ease 0.45s both",
        }}
      >
        <div>
          <div className="text-xs text-[#9FB8A7]">Sale closed</div>
          <div className="text-[15px] font-semibold">
            Jamie · Starter package
          </div>
        </div>
        <div className="font-display text-2xl font-bold text-[#9FD0AE]">
          +$1,200
        </div>
      </div>
    </div>
  );
}

function TabPanelWaste() {
  const items = [
    { label: "Unused software seats", amount: "−$1,240" },
    { label: "Duplicate ad spend", amount: "−$860" },
    { label: "Manual data entry hours", amount: "−$2,100" },
  ];
  return (
    <div
      className="w-full max-w-[400px] rounded-[20px] bg-white p-[22px]"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...panelAnim() }}
    >
      <div className="mb-1 text-sm font-semibold">Business review</div>
      <div className="mb-[18px] text-xs text-[#6B776F]">
        3 things you&apos;re overpaying for
      </div>
      {items.map((it, i) => (
        <div
          key={i}
          className="flex justify-between border-t border-[#EDF1EC] py-3 text-sm"
        >
          <span className="text-[#6B776F] line-through">{it.label}</span>
          <span className="font-semibold text-[#2E6B47]">{it.amount}</span>
        </div>
      ))}
      <div className="mt-2.5 flex items-baseline justify-between rounded-xl bg-[#E3EEE4] p-4">
        <span className="text-[13px] font-semibold">Saved every month</span>
        <span
          className="font-display text-[28px] font-bold text-[#2E6B47]"
          style={{ letterSpacing: "-0.03em" }}
        >
          $4,200
        </span>
      </div>
    </div>
  );
}

function TabPanelAutomation() {
  const steps = [
    "Invoice sent",
    "Customer added to CRM",
    "Follow-up email scheduled",
    "Bookkeeping updated",
  ];
  return (
    <div
      className="w-full max-w-[380px] rounded-[20px] bg-white p-[22px]"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.3)", ...panelAnim() }}
    >
      <div className="mb-[18px] text-sm font-semibold">
        New order · handled automatically
      </div>
      <div className="flex flex-col gap-2.5">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl bg-[#F5F6F0] px-3.5 py-3 text-sm"
            style={{ animation: `fadeUp 0.4s ease ${0.1 + i * 0.2}s both` }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E6B47] text-xs text-white">
              ✓
            </span>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-4 text-[13px] text-[#6B776F]">
        Time you spent on it:{" "}
        <b className="text-[#13201A]">0 minutes</b>
      </div>
    </div>
  );
}
