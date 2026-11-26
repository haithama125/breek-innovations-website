"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Retention Loop — signature graphic for the restaurant ICP page.
// A circular 4-node loop (Guest → POS → Points → Push → repeat). A cream
// pulse travels the arc clockwise forever; each node blooms as the pulse
// passes. Visual language matches BusinessFlow (dark emerald, glow filters,
// cream dots). Intersection-gated and respects prefers-reduced-motion.
// -----------------------------------------------------------------------------

const LOOP_MS = 8000;

const CENTER = { x: 600, y: 360 };
const NODE_RADIUS = 230;

type NodeDef = {
  id: string;
  angle: number; // degrees, 0 = top, clockwise
  title: string;
  sub: string;
  icon: "guest" | "pos" | "points" | "push";
};

const NODES: NodeDef[] = [
  { id: "guest", angle: 0, title: "Guest walks in", sub: "Scans or taps the app", icon: "guest" },
  { id: "pos", angle: 90, title: "POS logs visit", sub: "Toast · Square · Clover", icon: "pos" },
  { id: "points", angle: 180, title: "Points earned", sub: "Reward auto-credited", icon: "points" },
  { id: "push", angle: 270, title: "Push lights up", sub: "Offer for the return visit", icon: "push" },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0° is top
  return {
    x: CENTER.x + radius * Math.cos(a),
    y: CENTER.y + radius * Math.sin(a),
  };
}

function pointOnLoop(tNormalized: number) {
  // Walk clockwise from top (angle 0).
  const angle = tNormalized * 360;
  return { ...polar(angle, NODE_RADIUS), angle };
}

export function RetentionLoop() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pulse = svg.querySelector("#rl-pulse") as SVGGElement | null;
    const nodeEls = NODES.map(
      (n) => svg.querySelector(`#rl-node-${n.id}`) as SVGGElement | null,
    );

    function render(tSec: number) {
      const tNorm = (tSec / (LOOP_MS / 1000)) % 1;
      const pt = pointOnLoop(tNorm);
      if (pulse) {
        pulse.setAttribute("transform", `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
      }

      // Bloom each node when pulse angle is within +/- 24° of it.
      const bloomBand = 24;
      NODES.forEach((n, i) => {
        const el = nodeEls[i];
        if (!el) return;
        let delta = Math.abs(pt.angle - n.angle);
        if (delta > 180) delta = 360 - delta;
        const closeness = Math.max(0, 1 - delta / bloomBand);
        const scale = 1 + closeness * 0.08;
        el.style.transform = `scale(${scale.toFixed(3)})`;
        el.style.transformOrigin = `${polar(n.angle, NODE_RADIUS).x}px ${polar(
          n.angle,
          NODE_RADIUS,
        ).y}px`;
        el.setAttribute("data-glow", closeness > 0.1 ? "on" : "off");
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
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : stop()));
      },
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
          <radialGradient id="rl-aura" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#8FE1B0" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#4FB683" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rl-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8ECC9" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#4FA876" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="rl-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDF2DB" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3C8A5E" stopOpacity="0.5" />
          </linearGradient>
          <filter id="rl-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="10" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="rl-node-glow" x="-40%" y="-40%" width="180%" height="180%">
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

        {/* Ambient aura */}
        <ellipse cx={CENTER.x} cy={CENTER.y} rx={420} ry={340} fill="url(#rl-aura)" />

        {/* Faint guide ring */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={NODE_RADIUS}
          fill="none"
          stroke="rgba(180, 230, 200, 0.14)"
          strokeWidth={1.5}
          strokeDasharray="3 8"
        />

        {/* Directional arrows around the loop (4 subtle arcs) */}
        {NODES.map((n, i) => {
          const start = polar(n.angle, NODE_RADIUS);
          const end = polar(NODES[(i + 1) % NODES.length].angle, NODE_RADIUS);
          return (
            <path
              key={`arc-${n.id}`}
              d={`M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${NODE_RADIUS} ${NODE_RADIUS} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`}
              fill="none"
              stroke="rgba(207, 232, 213, 0.45)"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Center "your restaurant" tile */}
        <g filter="url(#rl-node-glow)">
          <rect
            x={CENTER.x - 110}
            y={CENTER.y - 44}
            width={220}
            height={88}
            rx={16}
            fill="url(#rl-center-fill)"
            stroke="rgba(200, 245, 215, 0.55)"
            strokeWidth={1}
          />
          <text
            x={CENTER.x}
            y={CENTER.y - 6}
            textAnchor="middle"
            fontFamily="var(--font-mono, 'IBM Plex Mono'), monospace"
            fontSize={11}
            letterSpacing="0.18em"
            fill="#9FD0AE"
          >
            YOUR RESTAURANT
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 20}
            textAnchor="middle"
            fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
            fontWeight={700}
            fontSize={20}
            letterSpacing="-0.02em"
            fill="#F2F8F3"
          >
            Retention loop
          </text>
        </g>

        {/* Nodes around the loop */}
        {NODES.map((n) => {
          const p = polar(n.angle, NODE_RADIUS);
          return (
            <g
              key={n.id}
              id={`rl-node-${n.id}`}
              style={{ transition: "transform 180ms ease-out" }}
            >
              <NodeTile x={p.x} y={p.y} node={n} />
            </g>
          );
        })}

        {/* Traveling pulse */}
        <g id="rl-pulse" filter="url(#rl-glow)">
          <circle r={10} fill="#f5f0d8" opacity="0.5" />
          <circle r={5} fill="#fffdf5" />
        </g>
      </svg>
    </div>
  );
}

function NodeTile({
  x,
  y,
  node,
}: {
  x: number;
  y: number;
  node: NodeDef;
}) {
  const W = 200;
  const H = 88;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={16}
        fill="url(#rl-node-fill)"
        stroke="rgba(190, 240, 210, 0.45)"
        strokeWidth={1}
      />
      <g transform={`translate(26, ${H / 2})`}>
        <NodeIcon icon={node.icon} />
      </g>
      <text
        x={64}
        y={36}
        fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
        fontWeight={700}
        fontSize={15}
        letterSpacing="-0.015em"
        fill="#F2F8F3"
      >
        {node.title}
      </text>
      <text
        x={64}
        y={56}
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
    case "guest":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={0} cy={-5} r={5} />
          <path d="M -9 10 C -9 4 -4 1 0 1 C 4 1 9 4 9 10" />
        </g>
      );
    case "pos":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-9} y={-9} width={18} height={14} rx={2} />
          <path d="M -6 -5 h 12 M -6 -1 h 8 M -9 5 l -3 6 h 24 l -3 -6 Z" />
        </g>
      );
    case "points":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x={-6} y={-10} width={12} height={20} rx={3} />
          <circle cx={0} cy={6} r={1.5} fill={stroke} />
          <path d="M -4 -5 h 8" />
          <circle cx={9} cy={-7} r={3} fill={stroke} stroke="none" />
        </g>
      );
    case "push":
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -9 c -4 0 -7 3 -7 7 v 4 l -2 3 h 18 l -2 -3 v -4 c 0 -4 -3 -7 -7 -7 Z" />
          <path d="M -3 8 c 0 2 1 3 3 3 s 3 -1 3 -3" />
          <circle cx={7} cy={-7} r={3} fill="#F6B861" stroke="none" />
        </g>
      );
  }
}
