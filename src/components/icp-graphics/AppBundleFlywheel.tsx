"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// App + Marketing Flywheel — signature graphic for the App + Marketing Bundle.
// A circular 4-node loop (Build → Launch → Ads → Learn → repeat). A cream pulse
// travels the arc clockwise forever; each node blooms as it passes.
// -----------------------------------------------------------------------------

const LOOP_MS = 8000;

const CENTER = { x: 600, y: 360 };
const NODE_RADIUS = 230;

type NodeDef = {
  id: string;
  angle: number;
  title: string;
  sub: string;
  icon: "build" | "launch" | "ads" | "learn";
};

const NODES: NodeDef[] = [
  { id: "build", angle: 0, title: "We design & build", sub: "iPhone + Android app", icon: "build" },
  { id: "launch", angle: 90, title: "We launch it live", sub: "App Store & Google Play", icon: "launch" },
  { id: "ads", angle: 180, title: "We run the ads", sub: "Reels, Google, TikTok", icon: "ads" },
  { id: "learn", angle: 270, title: "We study the data", sub: "Tune, retarget, ship v1.1", icon: "learn" },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER.x + radius * Math.cos(a),
    y: CENTER.y + radius * Math.sin(a),
  };
}

function pointOnLoop(tNormalized: number) {
  const angle = tNormalized * 360;
  return { ...polar(angle, NODE_RADIUS), angle };
}

export function AppBundleFlywheel() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pulse = svg.querySelector("#abf-pulse") as SVGGElement | null;
    const nodeEls = NODES.map(
      (n) => svg.querySelector(`#abf-node-${n.id}`) as SVGGElement | null,
    );

    function render(tSec: number) {
      const tNorm = (tSec / (LOOP_MS / 1000)) % 1;
      const pt = pointOnLoop(tNorm);
      if (pulse) {
        pulse.setAttribute("transform", `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
      }

      const bloomBand = 24;
      NODES.forEach((n, i) => {
        const el = nodeEls[i];
        if (!el) return;
        let delta = Math.abs(pt.angle - n.angle);
        if (delta > 180) delta = 360 - delta;
        const closeness = Math.max(0, 1 - delta / bloomBand);
        const scale = 1 + closeness * 0.08;
        el.style.transform = `scale(${scale.toFixed(3)})`;
        const p = polar(n.angle, NODE_RADIUS);
        el.style.transformOrigin = `${p.x}px ${p.y}px`;
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
      elapsed = (elapsed + (now - last)) % LOOP_MS;
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
          <radialGradient id="abf-aura" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#4FB683" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#1E5235" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="abf-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E6B47" stopOpacity="1" />
            <stop offset="100%" stopColor="#154A31" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="abf-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C8A5E" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="1" />
          </linearGradient>
          <filter id="abf-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="10" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="abf-node-glow" x="-40%" y="-40%" width="180%" height="180%">
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

        <ellipse cx={CENTER.x} cy={CENTER.y} rx={340} ry={260} fill="url(#abf-aura)" />

        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={NODE_RADIUS}
          fill="none"
          stroke="rgba(180, 230, 200, 0.08)"
          strokeWidth={1}
          strokeDasharray="3 8"
        />

        {NODES.map((n, i) => {
          const start = polar(n.angle, NODE_RADIUS);
          const end = polar(NODES[(i + 1) % NODES.length].angle, NODE_RADIUS);
          return (
            <path
              key={`arc-${n.id}`}
              d={`M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${NODE_RADIUS} ${NODE_RADIUS} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`}
              fill="none"
              stroke="rgba(207, 232, 213, 0.22)"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
          );
        })}

        <g filter="url(#abf-node-glow)">
          <rect
            x={CENTER.x - 120}
            y={CENTER.y - 46}
            width={240}
            height={92}
            rx={16}
            fill="url(#abf-center-fill)"
            stroke="rgba(200, 245, 215, 0.4)"
            strokeWidth={1}
          />
          <text
            x={CENTER.x}
            y={CENTER.y - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
            fontSize={11}
            letterSpacing="0.18em"
            fill="#9FD0AE"
          >
            YOUR APP + GROWTH
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
            fontWeight={700}
            fontSize={20}
            letterSpacing="-0.02em"
            fill="#F2F8F3"
          >
            One flywheel
          </text>
        </g>

        {NODES.map((n) => {
          const p = polar(n.angle, NODE_RADIUS);
          return (
            <g
              key={n.id}
              id={`abf-node-${n.id}`}
              style={{ transition: "transform 180ms ease-out" }}
            >
              <NodeTile x={p.x} y={p.y} node={n} />
            </g>
          );
        })}

        <g id="abf-pulse" filter="url(#abf-glow)">
          <circle r={10} fill="#f5f0d8" opacity="0.5" />
          <circle r={5} fill="#fffdf5" />
        </g>
      </svg>
    </div>
  );
}

function NodeTile({ x, y, node }: { x: number; y: number; node: NodeDef }) {
  const W = 210;
  const H = 88;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={14}
        fill="url(#abf-node-fill)"
        stroke="rgba(170, 220, 190, 0.35)"
        strokeWidth={1}
      />
      <g transform={`translate(26, ${H / 2})`}>
        <NodeIcon icon={node.icon} />
      </g>
      <text
        x={60}
        y={H / 2 - 6}
        dominantBaseline="middle"
        fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
        fontWeight={700}
        fontSize={15}
        letterSpacing="-0.015em"
        fill="#F2F8F3"
      >
        {node.title}
      </text>
      <text
        x={60}
        y={H / 2 + 14}
        dominantBaseline="middle"
        fontFamily="var(--font-sans, Inter), sans-serif"
        fontSize={11.5}
        fill="rgba(200, 225, 208, 0.85)"
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
    case "build":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -8 -4 l -4 4 l 4 4" />
          <path d="M 8 -4 l 4 4 l -4 4" />
          <path d="M 2 -8 l -4 16" />
        </g>
      );
    case "launch":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -10 c 4 4 6 9 6 14 l -6 -3 l -6 3 c 0 -5 2 -10 6 -14 Z" />
          <path d="M -6 6 l -2 4 M 6 6 l 2 4 M 0 4 v 6" />
        </g>
      );
    case "ads":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-9} y={-7} width={18} height={14} rx={2} />
          <polygon points="-2,-3 5,0 -2,3" fill={stroke} stroke="none" />
        </g>
      );
    case "learn":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M -10 7 l 5 -6 l 4 3 l 6 -8" />
          <path d="M 2 -4 h 5 v 5" />
        </g>
      );
  }
}
