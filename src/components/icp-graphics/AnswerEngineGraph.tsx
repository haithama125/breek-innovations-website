"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Answer Engine Graph — signature graphic for the GEO landing page.
// A central "Your business" tile surrounded by five AI engine nodes
// (ChatGPT, Perplexity, Google AI, Claude, Gemini). Pulses continuously
// flow outward from the business to each engine; each engine blooms as
// the pulse arrives, representing a citation.
// -----------------------------------------------------------------------------

const PULSE_CYCLE_MS = 4000;
const CENTER = { x: 600, y: 420 };

type EngineDef = {
  id: string;
  angle: number;
  distance: number;
  title: string;
  sub: string;
};

const ENGINES: EngineDef[] = [
  { id: "chatgpt", angle: -90, distance: 290, title: "ChatGPT", sub: "OpenAI" },
  { id: "perplexity", angle: -18, distance: 320, title: "Perplexity", sub: "Answer engine" },
  { id: "google-ai", angle: 54, distance: 320, title: "Google AI", sub: "Overviews" },
  { id: "claude", angle: 126, distance: 320, title: "Claude", sub: "Anthropic" },
  { id: "gemini", angle: -162, distance: 320, title: "Gemini", sub: "Google" },
];

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(a), y: CENTER.y + radius * Math.sin(a) };
}

export function AnswerEngineGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pulses = ENGINES.map(
      (e) => svg.querySelector(`#aeg-pulse-${e.id}`) as SVGGElement | null,
    );
    const nodeEls = ENGINES.map(
      (e) => svg.querySelector(`#aeg-node-${e.id}`) as SVGGElement | null,
    );

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function clamp01(v: number) {
      return Math.max(0, Math.min(1, v));
    }

    function render(tSec: number) {
      const cyc = (tSec * 1000) % PULSE_CYCLE_MS;
      const travelPhase = clamp01(cyc / 1800);
      const easedT = easeOutCubic(travelPhase);
      const arrivalBloom = cyc > 1600 && cyc < 2800 ? 1 - (cyc - 1600) / 1200 : 0;

      ENGINES.forEach((e, i) => {
        const end = polar(e.angle, e.distance);
        const x = CENTER.x + (end.x - CENTER.x) * easedT;
        const y = CENTER.y + (end.y - CENTER.y) * easedT;
        const pulse = pulses[i];
        if (pulse) {
          pulse.setAttribute("transform", `translate(${x.toFixed(2)}, ${y.toFixed(2)})`);
          let opacity = 0;
          if (cyc < 2000) {
            opacity = Math.min(1, cyc / 220) * (1 - Math.max(0, (cyc - 1600) / 400));
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
          <radialGradient id="aeg-aura" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#4FB683" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#1E5235" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0C2419" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aeg-node-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E6B47" stopOpacity="1" />
            <stop offset="100%" stopColor="#154A31" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="aeg-center-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C8A5E" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E5235" stopOpacity="1" />
          </linearGradient>
          <filter id="aeg-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b1" />
            <feGaussianBlur stdDeviation="10" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="aeg-node-glow" x="-40%" y="-40%" width="180%" height="180%">
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

        <ellipse cx={CENTER.x} cy={CENTER.y} rx={340} ry={260} fill="url(#aeg-aura)" />

        {/* Spokes from center to each engine */}
        {ENGINES.map((e) => {
          const end = polar(e.angle, e.distance);
          return (
            <line
              key={`spoke-${e.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(207, 232, 213, 0.18)"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          );
        })}

        {/* Central business tile */}
        <g filter="url(#aeg-node-glow)">
          <rect
            x={CENTER.x - 130}
            y={CENTER.y - 52}
            width={260}
            height={104}
            rx={18}
            fill="url(#aeg-center-fill)"
            stroke="rgba(200, 245, 215, 0.4)"
            strokeWidth={1}
          />
          <text
            x={CENTER.x}
            y={CENTER.y - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-display, 'Bricolage Grotesque'), sans-serif"
            fontWeight={700}
            fontSize={22}
            letterSpacing="-0.02em"
            fill="#F2F8F3"
          >
            Your business
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 18}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-sans, Inter), sans-serif"
            fontSize={12.5}
            fill="rgba(210, 232, 216, 0.82)"
          >
            Cited by every AI engine that matters
          </text>
        </g>

        {/* Engine nodes */}
        {ENGINES.map((e) => {
          const pos = polar(e.angle, e.distance);
          return (
            <g
              key={e.id}
              id={`aeg-node-${e.id}`}
              style={{ transition: "transform 180ms ease-out" }}
            >
              <EngineTile x={pos.x} y={pos.y} engine={e} />
            </g>
          );
        })}

        {/* Traveling pulses (one per engine) */}
        {ENGINES.map((e) => (
          <g key={`pulse-${e.id}`} id={`aeg-pulse-${e.id}`} filter="url(#aeg-glow)" opacity="0">
            <circle r={10} fill="#f5f0d8" opacity="0.5" />
            <circle r={5} fill="#fffdf5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function EngineTile({ x, y, engine }: { x: number; y: number; engine: EngineDef }) {
  const W = 180;
  const H = 72;
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      <rect
        width={W}
        height={H}
        rx={14}
        fill="url(#aeg-node-fill)"
        stroke="rgba(170, 220, 190, 0.35)"
        strokeWidth={1}
      />
      <g transform={`translate(22, ${H / 2})`}>
        <circle cx={0} cy={0} r={11} fill="none" stroke="#EEF8F1" strokeWidth={1.6} />
        <path
          d="M -5 -1 l 4 4 l 7 -7"
          fill="none"
          stroke="#EEF8F1"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        {engine.title}
      </text>
      <text
        x={48}
        y={H / 2 + 12}
        dominantBaseline="middle"
        fontFamily="var(--font-sans, Inter), sans-serif"
        fontSize={11}
        fill="rgba(200, 225, 208, 0.82)"
      >
        {engine.sub}
      </text>
    </g>
  );
}
