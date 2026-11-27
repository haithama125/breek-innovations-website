"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Platform Fan — signature graphic for the mobile app dev ICP page.
// Central "shared codebase" tile with four outputs radiating outward
// (iOS, Android, Backend, Admin). Four cream pulses launch from the center
// every 4s, race outward along the fan ribs, and bloom the nodes together.
// -----------------------------------------------------------------------------

const PULSE_CYCLE_MS = 4000;
const CENTER = { x: 600, y: 420 };

type NodeDef = {
  id: string;
  angle: number; // degrees, 0 = top, clockwise
  distance: number;
  title: string;
  sub: string;
  icon: "ios" | "android" | "backend" | "admin";
};

const NODES: NodeDef[] = [
  { id: "ios", angle: -60, distance: 320, title: "iOS app", sub: "App Store", icon: "ios" },
  { id: "android", angle: 60, distance: 320, title: "Android app", sub: "Google Play", icon: "android" },
  { id: "backend", angle: 125, distance: 300, title: "Backend & API", sub: "Supabase · Node", icon: "backend" },
  { id: "admin", angle: -125, distance: 300, title: "Admin dashboard", sub: "Web console", icon: "admin" },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER.x + radius * Math.cos(a),
    y: CENTER.y + radius * Math.sin(a),
  };
}

export function PlatformFan() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pulses = NODES.map(
      (n) => svg.querySelector(`#pf-pulse-${n.id}`) as SVGGElement | null,
    );
    const nodeEls = NODES.map(
      (n) => svg.querySelector(`#pf-node-${n.id}`) as SVGGElement | null,
    );

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function clamp01(v: number) {
      return Math.max(0, Math.min(1, v));
    }

    function render(tSec: number) {
      // A new wave every 4s. Each wave travels 0..1 over the first 1.6s,
      // fades out over the last 0.6s, nodes bloom at arrival.
      const cyc = (tSec * 1000) % PULSE_CYCLE_MS;
      const travelPhase = clamp01(cyc / 1600);
      const easedT = easeOutCubic(travelPhase);
      const arrivalBloom = cyc > 1400 && cyc < 2600 ? 1 - (cyc - 1400) / 1200 : 0;

      NODES.forEach((n, i) => {
        const end = polar(n.angle, n.distance);
        const x = CENTER.x + (end.x - CENTER.x) * easedT;
        const y = CENTER.y + (end.y - CENTER.y) * easedT;
        const pulse = pulses[i];
        if (pulse) {
          pulse.setAttribute("transform", `translate(${x.toFixed(2)}, ${y.toFixed(2)})`);
          let opacity = 0;
          if (cyc < 1800) {
            opacity = Math.min(1, cyc / 200) * (1 - Math.max(0, (cyc - 1500) / 300));
          }
          pulse.setAttribute("opacity", opacity.toFixed(3));
        }
        const node = nodeEls[i];
        if (node) {
          const bloom = Math.max(0, arrivalBloom);
          const scale = 1 + bloom * 0.07;
          node.style.transform = `scale(${scale.toFixed(3)})`;
          node.style.transformOrigin = `${end.x}px ${end.y}px`;
        }
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
          <radialGradient id="pf-aura" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#8FE1B0" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#4FB683" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pf-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8ECC9" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#4FA876" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="pf-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDF2DB" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3C8A5E" stopOpacity="0.52" />
          </linearGradient>
          <filter id="pf-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="10" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pf-node-glow" x="-40%" y="-40%" width="180%" height="180%">
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

        <ellipse cx={CENTER.x} cy={CENTER.y} rx={430} ry={330} fill="url(#pf-aura)" />

        {/* Fan ribs (lines from center to each node) */}
        {NODES.map((n) => {
          const end = polar(n.angle, n.distance);
          return (
            <line
              key={`rib-${n.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(207, 232, 213, 0.32)"
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          );
        })}

        {/* Central codebase tile */}
        <g filter="url(#pf-node-glow)">
          <rect
            x={CENTER.x - 140}
            y={CENTER.y - 54}
            width={280}
            height={108}
            rx={18}
            fill="url(#pf-center-fill)"
            stroke="rgba(200, 245, 215, 0.55)"
            strokeWidth={1}
          />
          <text
            x={CENTER.x}
            y={CENTER.y - 18}
            textAnchor="middle"
            fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
            fontSize={11}
            letterSpacing="0.18em"
            fill="#9FD0AE"
          >
            SHARED CODEBASE
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 8}
            textAnchor="middle"
            fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
            fontWeight={700}
            fontSize={22}
            letterSpacing="-0.02em"
            fill="#F2F8F3"
          >
            React Native · TypeScript
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 32}
            textAnchor="middle"
            fontFamily="var(--font-sans, Inter), sans-serif"
            fontSize={12}
            fill="rgba(210, 232, 216, 0.75)"
          >
            One repo, one build, four outputs
          </text>
        </g>

        {/* Outer nodes */}
        {NODES.map((n) => {
          const p = polar(n.angle, n.distance);
          return (
            <g
              key={n.id}
              id={`pf-node-${n.id}`}
              style={{ transition: "transform 180ms ease-out" }}
            >
              <NodeTile x={p.x} y={p.y} node={n} />
            </g>
          );
        })}

        {/* Traveling pulses (one per rib) */}
        {NODES.map((n) => (
          <g key={`pulse-${n.id}`} id={`pf-pulse-${n.id}`} filter="url(#pf-glow)" opacity="0">
            <circle r={10} fill="#f5f0d8" opacity="0.5" />
            <circle r={5} fill="#fffdf5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function NodeTile({ x, y, node }: { x: number; y: number; node: NodeDef }) {
  const W = 210;
  const H = 90;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={16}
        fill="url(#pf-node-fill)"
        stroke="rgba(190, 240, 210, 0.45)"
        strokeWidth={1}
      />
      <g transform={`translate(28, ${H / 2})`}>
        <NodeIcon icon={node.icon} />
      </g>
      <text
        x={66}
        y={38}
        fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
        fontWeight={700}
        fontSize={15.5}
        letterSpacing="-0.015em"
        fill="#F2F8F3"
      >
        {node.title}
      </text>
      <text
        x={66}
        y={58}
        fontFamily="var(--font-sans, Inter), sans-serif"
        fontSize={11.5}
        fill="rgba(210, 232, 216, 0.85)"
      >
        {node.sub}
      </text>
    </g>
  );
}

function NodeIcon({ icon }: { icon: NodeDef["icon"] }) {
  const stroke = "#EEF8F1";
  const sw = 1.7;
  switch (icon) {
    case "ios":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-7} y={-11} width={14} height={22} rx={3} />
          <circle cx={0} cy={7} r={1.3} fill={stroke} />
          <path d="M -3 -7 h 6" />
        </g>
      );
    case "android":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -9 -1 c 0 -6 4 -10 9 -10 s 9 4 9 10" />
          <circle cx={-5} cy={-6} r={1} fill={stroke} />
          <circle cx={5} cy={-6} r={1} fill={stroke} />
          <path d="M -8 -8 l -2 -3 M 8 -8 l 2 -3" />
          <rect x={-9} y={0} width={18} height={10} rx={1.5} />
        </g>
      );
    case "backend":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-10} y={-10} width={20} height={6} rx={1.5} />
          <rect x={-10} y={-2} width={20} height={6} rx={1.5} />
          <rect x={-10} y={6} width={20} height={6} rx={1.5} />
          <circle cx={-6} cy={-7} r={0.8} fill={stroke} />
          <circle cx={-6} cy={1} r={0.8} fill={stroke} />
          <circle cx={-6} cy={9} r={0.8} fill={stroke} />
        </g>
      );
    case "admin":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-11} y={-9} width={22} height={16} rx={2} />
          <path d="M -8 3 l 3 -5 l 3 2 l 5 -6" />
          <path d="M -11 9 h 22" />
        </g>
      );
  }
}
