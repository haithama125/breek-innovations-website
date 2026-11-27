"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Website Streams — signature graphic for the Website + Marketing Bundle.
// A central "Your website" tile with four inbound channels (SEO, AI, Social,
// Paid Ads). Pulses travel FROM each source INTO the center — the website is
// the destination every channel is feeding.
// -----------------------------------------------------------------------------

const PULSE_CYCLE_MS = 4000;
const CENTER = { x: 600, y: 420 };

type ChannelDef = {
  id: string;
  angle: number;
  distance: number;
  title: string;
  sub: string;
  startOffsetMs: number;
};

const CHANNELS: ChannelDef[] = [
  { id: "seo", angle: -70, distance: 310, title: "Google search", sub: "SEO", startOffsetMs: 0 },
  { id: "geo", angle: 20, distance: 320, title: "AI answers", sub: "GEO", startOffsetMs: 600 },
  { id: "social", angle: 110, distance: 310, title: "Social reels", sub: "Content", startOffsetMs: 1200 },
  { id: "ads", angle: -160, distance: 310, title: "Paid ads", sub: "Meta · Google · TikTok", startOffsetMs: 1800 },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(a), y: CENTER.y + radius * Math.sin(a) };
}

export function WebsiteStreams() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pulses = CHANNELS.map(
      (c) => svg.querySelector(`#ws-pulse-${c.id}`) as SVGGElement | null,
    );
    const centerEl = svg.querySelector("#ws-center") as SVGGElement | null;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function clamp01(v: number) {
      return Math.max(0, Math.min(1, v));
    }

    function render(tSec: number) {
      let totalBloom = 0;
      CHANNELS.forEach((c, i) => {
        const cyc = ((tSec * 1000) + (PULSE_CYCLE_MS - c.startOffsetMs)) % PULSE_CYCLE_MS;
        const travelPhase = clamp01(cyc / 1800);
        const easedT = easeOutCubic(travelPhase);
        const start = polar(c.angle, c.distance);
        // Travel FROM source INTO center.
        const x = start.x + (CENTER.x - start.x) * easedT;
        const y = start.y + (CENTER.y - start.y) * easedT;
        const pulse = pulses[i];
        if (pulse) {
          pulse.setAttribute("transform", `translate(${x.toFixed(2)}, ${y.toFixed(2)})`);
          let opacity = 0;
          if (cyc < 2000) {
            opacity = Math.min(1, cyc / 220) * (1 - Math.max(0, (cyc - 1600) / 400));
          }
          pulse.setAttribute("opacity", opacity.toFixed(3));
        }
        // Center blooms when any pulse arrives.
        if (cyc > 1600 && cyc < 2600) {
          totalBloom = Math.max(totalBloom, 1 - (cyc - 1600) / 1000);
        }
      });
      if (centerEl) {
        const scale = 1 + totalBloom * 0.06;
        centerEl.style.transform = `scale(${scale.toFixed(3)})`;
        centerEl.style.transformOrigin = `${CENTER.x}px ${CENTER.y}px`;
      }
    }

    if (reduce) {
      render(0);
      return;
    }

    let elapsed = 0;
    let last: number | null = null;
    let running = false;
    let rafId = 0;

    function tick(now: number) {
      if (!running) return;
      if (last === null) last = now;
      elapsed += now - last;
      last = now;
      render(elapsed / 1000);
      rafId = requestAnimationFrame(tick);
    }

    const start = () => {
      if (running) return;
      running = true;
      last = null;
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.1 },
    );
    io.observe(section);
    render(0);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ aspectRatio: "12 / 7" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        style={{ overflow: "visible", userSelect: "none" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ws-aura" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#4FB683" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#1E5235" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ws-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E6B47" stopOpacity="1" />
            <stop offset="100%" stopColor="#154A31" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ws-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C8A5E" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="1" />
          </linearGradient>
          <filter id="ws-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="10" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ws-node-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.3  0 0 0 0 0.52  0 0 0 0 0.4  0 0 0 0.35 0"
              result="tint"
            />
            <feMerge>
              <feMergeNode in="tint" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx={CENTER.x} cy={CENTER.y} rx={340} ry={260} fill="url(#ws-aura)" />

        {/* Spokes from each channel TO the website */}
        {CHANNELS.map((c) => {
          const start = polar(c.angle, c.distance);
          return (
            <line
              key={`spoke-${c.id}`}
              x1={start.x}
              y1={start.y}
              x2={CENTER.x}
              y2={CENTER.y}
              stroke="rgba(207, 232, 213, 0.18)"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          );
        })}

        {/* Channel source tiles */}
        {CHANNELS.map((c) => {
          const pos = polar(c.angle, c.distance);
          return (
            <g key={c.id}>
              <ChannelTile x={pos.x} y={pos.y} channel={c} />
            </g>
          );
        })}

        {/* Central website tile */}
        <g id="ws-center" style={{ transition: "transform 180ms ease-out" }}>
          <g filter="url(#ws-node-glow)">
            <rect
              x={CENTER.x - 140}
              y={CENTER.y - 58}
              width={280}
              height={116}
              rx={18}
              fill="url(#ws-center-fill)"
              stroke="rgba(200, 245, 215, 0.4)"
              strokeWidth={1}
            />
            <text
              x={CENTER.x}
              y={CENTER.y - 18}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
              fontSize={11}
              letterSpacing="0.18em"
              fill="#9FD0AE"
            >
              YOUR WEBSITE
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
              fontWeight={700}
              fontSize={22}
              letterSpacing="-0.02em"
              fill="#F2F8F3"
            >
              One destination
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 32}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-sans, Inter), sans-serif"
              fontSize={12}
              fill="rgba(210, 232, 216, 0.82)"
            >
              Every channel pointed at you
            </text>
          </g>
        </g>

        {/* Traveling pulses (one per channel) */}
        {CHANNELS.map((c) => (
          <g key={`pulse-${c.id}`} id={`ws-pulse-${c.id}`} filter="url(#ws-glow)" opacity="0">
            <circle r={10} fill="#f5f0d8" opacity="0.5" />
            <circle r={5} fill="#fffdf5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function ChannelTile({ x, y, channel }: { x: number; y: number; channel: ChannelDef }) {
  const W = 180;
  const H = 72;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={14}
        fill="url(#ws-node-fill)"
        stroke="rgba(170, 220, 190, 0.35)"
        strokeWidth={1}
      />
      <g transform={`translate(22, ${H / 2})`}>
        <ChannelIcon id={channel.id} />
      </g>
      <text
        x={48}
        y={H / 2 - 5}
        dominantBaseline="middle"
        fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
        fontWeight={700}
        fontSize={15}
        letterSpacing="-0.015em"
        fill="#F2F8F3"
      >
        {channel.title}
      </text>
      <text
        x={48}
        y={H / 2 + 12}
        dominantBaseline="middle"
        fontFamily="var(--font-sans, Inter), sans-serif"
        fontSize={11}
        fill="rgba(200, 225, 208, 0.82)"
      >
        {channel.sub}
      </text>
    </g>
  );
}

function ChannelIcon({ id }: { id: string }) {
  const stroke = "#EEF8F1";
  const sw = 1.7;
  switch (id) {
    case "seo":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={-2} cy={-2} r={7} />
          <path d="M 3 3 l 6 6" />
        </g>
      );
    case "geo":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -8 -4 l 0 8 l 8 4 l 8 -4 l 0 -8 l -8 -4 Z" />
          <path d="M -8 -4 l 8 4 l 8 -4" />
          <path d="M 0 0 l 0 8" />
        </g>
      );
    case "social":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-8} y={-8} width={16} height={16} rx={3} />
          <polygon points="-2,-3 4,0 -2,3" fill={stroke} stroke="none" />
        </g>
      );
    case "ads":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -8 2 l 16 -8 v 12 l -16 -8 Z" />
          <path d="M -8 -3 h -2 v 10 h 2" />
        </g>
      );
    default:
      return null;
  }
}
