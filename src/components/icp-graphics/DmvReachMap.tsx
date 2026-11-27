"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// DMV Reach Map — signature graphic for the social media DMV ICP page.
// A central "your storefront" pin with five platform tiles orbiting it and
// concentric cream reach rings expanding outward on a continuous loop.
// Each platform tile blooms as a ring sweeps past it. Visual family
// matches BusinessFlow (dark emerald, cream glow, glass tiles).
// -----------------------------------------------------------------------------

const RING_CYCLE_MS = 3500;
const RING_COUNT = 3;
const CENTER = { x: 600, y: 420 };

type Platform = {
  id: string;
  angle: number;
  distance: number;
  label: string;
  sub: string;
  icon: "ig" | "tiktok" | "gbp" | "yelp" | "nextdoor";
};

const PLATFORMS: Platform[] = [
  { id: "ig", angle: -75, distance: 310, label: "Instagram", sub: "Reels + feed", icon: "ig" },
  { id: "tiktok", angle: -20, distance: 340, label: "TikTok", sub: "Short-form video", icon: "tiktok" },
  { id: "gbp", angle: 45, distance: 320, label: "Google Business", sub: "Local pack ranking", icon: "gbp" },
  { id: "yelp", angle: 130, distance: 320, label: "Yelp", sub: "Reviews + replies", icon: "yelp" },
  { id: "nextdoor", angle: -140, distance: 320, label: "Nextdoor", sub: "Neighborhood reach", icon: "nextdoor" },
];

const NEIGHBORHOODS: Array<{ x: number; y: number; label: string }> = [
  { x: 170, y: 160, label: "Bethesda" },
  { x: 1020, y: 170, label: "Silver Spring" },
  { x: 90, y: 430, label: "Arlington" },
  { x: 1100, y: 430, label: "Tysons" },
  { x: 220, y: 700, label: "Alexandria" },
  { x: 980, y: 700, label: "Georgetown" },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(a), y: CENTER.y + radius * Math.sin(a) };
}

export function DmvReachMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ringEls = Array.from({ length: RING_COUNT }, (_, i) =>
      svg.querySelector(`#dmv-ring-${i}`) as SVGCircleElement | null,
    );
    const nodeEls = PLATFORMS.map(
      (p) => svg.querySelector(`#dmv-node-${p.id}`) as SVGGElement | null,
    );

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 2.2);
    }

    const maxR = 480;
    const minR = 80;

    function render(tSec: number) {
      const cyc = (tSec * 1000) % RING_CYCLE_MS;

      // Stagger 3 rings
      ringEls.forEach((el, i) => {
        if (!el) return;
        const offset = (i / RING_COUNT) * RING_CYCLE_MS;
        const localCyc = ((cyc + offset) % RING_CYCLE_MS) / RING_CYCLE_MS;
        const r = minR + easeOut(localCyc) * (maxR - minR);
        const opacity = 0.7 * (1 - localCyc * 0.95);
        el.setAttribute("r", r.toFixed(2));
        el.setAttribute("opacity", opacity.toFixed(3));
      });

      // Bloom each platform node when the leading ring passes through it.
      PLATFORMS.forEach((p, i) => {
        const node = nodeEls[i];
        if (!node) return;
        const pulseR = minR + easeOut(cyc / RING_CYCLE_MS) * (maxR - minR);
        const distFromCenter = p.distance;
        const closeness = Math.max(0, 1 - Math.abs(pulseR - distFromCenter) / 40);
        const scale = 1 + closeness * 0.08;
        const end = polar(p.angle, p.distance);
        node.style.transform = `scale(${scale.toFixed(3)})`;
        node.style.transformOrigin = `${end.x}px ${end.y}px`;
      });
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
          <radialGradient id="dmv-aura" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#8FE1B0" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#4FB683" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dmv-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8ECC9" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#4FA876" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="dmv-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDF2DB" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3C8A5E" stopOpacity="0.52" />
          </linearGradient>
          <filter id="dmv-node-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.56  0 0 0 0 0.88  0 0 0 0 0.68  0 0 0 0.9 0"
              result="tint"
            />
            <feMerge>
              <feMergeNode in="tint" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx={CENTER.x} cy={CENTER.y} rx={520} ry={360} fill="url(#dmv-aura)" />

        {/* Neighborhood labels floating in the background */}
        {NEIGHBORHOODS.map((n) => (
          <text
            key={n.label}
            x={n.x}
            y={n.y}
            fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
            fontSize={11}
            letterSpacing="0.18em"
            fill="rgba(159, 208, 174, 0.55)"
            textAnchor="middle"
          >
            {n.label.toUpperCase()}
          </text>
        ))}

        {/* Expanding reach rings */}
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <circle
            key={i}
            id={`dmv-ring-${i}`}
            cx={CENTER.x}
            cy={CENTER.y}
            r={80}
            fill="none"
            stroke="rgba(207, 232, 213, 0.55)"
            strokeWidth={1.6}
          />
        ))}

        {/* Central storefront */}
        <g filter="url(#dmv-node-glow)">
          <rect
            x={CENTER.x - 120}
            y={CENTER.y - 48}
            width={240}
            height={96}
            rx={16}
            fill="url(#dmv-center-fill)"
            stroke="rgba(200, 245, 215, 0.55)"
            strokeWidth={1}
          />
          <g transform={`translate(${CENTER.x - 85}, ${CENTER.y})`}>
            <g fill="none" stroke="#EEF8F1" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <path d="M -14 -4 l 4 -10 h 20 l 4 10" />
              <path d="M -14 -4 v 18 h 28 v -18" />
              <path d="M -4 14 v -8 h 8 v 8" />
              <path d="M -14 -4 h 28" />
            </g>
          </g>
          <text
            x={CENTER.x + 12}
            y={CENTER.y - 10}
            fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
            fontSize={10.5}
            letterSpacing="0.16em"
            fill="#9FD0AE"
          >
            YOUR STOREFRONT
          </text>
          <text
            x={CENTER.x + 12}
            y={CENTER.y + 14}
            fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
            fontWeight={700}
            fontSize={18}
            letterSpacing="-0.02em"
            fill="#F2F8F3"
          >
            DC · MD · VA
          </text>
        </g>

        {/* Platform nodes */}
        {PLATFORMS.map((p) => {
          const pos = polar(p.angle, p.distance);
          return (
            <g
              key={p.id}
              id={`dmv-node-${p.id}`}
              style={{ transition: "transform 180ms ease-out" }}
            >
              <PlatformTile x={pos.x} y={pos.y} platform={p} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PlatformTile({ x, y, platform }: { x: number; y: number; platform: Platform }) {
  const W = 200;
  const H = 86;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={16}
        fill="url(#dmv-node-fill)"
        stroke="rgba(190, 240, 210, 0.45)"
        strokeWidth={1}
      />
      <g transform={`translate(26, ${H / 2})`}>
        <PlatformIcon icon={platform.icon} />
      </g>
      <text
        x={62}
        y={36}
        fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
        fontWeight={700}
        fontSize={15}
        letterSpacing="-0.015em"
        fill="#F2F8F3"
      >
        {platform.label}
      </text>
      <text
        x={62}
        y={55}
        fontFamily="var(--font-sans, Inter), sans-serif"
        fontSize={11.5}
        fill="rgba(210, 232, 216, 0.85)"
      >
        {platform.sub}
      </text>
    </g>
  );
}

function PlatformIcon({ icon }: { icon: Platform["icon"] }) {
  const stroke = "#EEF8F1";
  const sw = 1.6;
  switch (icon) {
    case "ig":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-10} y={-10} width={20} height={20} rx={5} />
          <circle cx={0} cy={0} r={4.5} />
          <circle cx={6} cy={-6} r={1} fill={stroke} />
        </g>
      );
    case "tiktok":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 2 -11 v 14 c 0 3 -2 5 -5 5 s -5 -2 -5 -5 s 2 -5 5 -5" />
          <path d="M 2 -11 c 0 3 3 6 7 6" />
        </g>
      );
    case "gbp":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 10 c 7 -6 8 -10 8 -13 a 8 8 0 0 0 -16 0 c 0 3 1 7 8 13 z" />
          <circle cx={0} cy={-3} r={3} />
        </g>
      );
    case "yelp":
      return (
        <g fill="#EEF8F1">
          <path d="M -2 -10 l -4 10 l 4 2 z" />
          <path d="M 3 -8 l 4 6 l -4 2 z" />
          <path d="M -6 2 l 0 7 l 4 -2 z" />
          <path d="M 2 4 l 5 5 l -1 -5 z" />
        </g>
      );
    case "nextdoor":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -10 10 v -12 l 10 -7 l 10 7 v 12 z" />
          <path d="M -3 10 v -7 h 6 v 7" />
        </g>
      );
  }
}
