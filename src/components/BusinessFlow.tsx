"use client";

import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// Direct port of the HTML prototype: isometric 4-tier emerald pyramid with
// cubic-bezier connectors to five service cards, a looping 8s timeline that
// separates tiers → routes cream pulses → illuminates tiers → settles.
// -----------------------------------------------------------------------------

const LOOP_DURATION_MS = 8000;

const TIER_KEYS = ["strategy", "distribution", "product", "operations"] as const;
type TierKey = (typeof TIER_KEYS)[number];

const MAX_TIER_OFFSET_Y: Record<TierKey, number> = {
  strategy: -24,
  distribution: -13,
  product: -4,
  operations: 4,
};

type Point = { x: number; y: number };

type Connection = {
  id: string;
  tier: TierKey;
  start: Point;
  endBase: Point;
  control1: Point;
  control2: Point;
};

const CONNECTIONS: Connection[] = [
  {
    id: "consulting",
    tier: "strategy",
    start: { x: 497, y: 189 },
    endBase: { x: 721, y: 275.6 },
    control1: { x: 586, y: 189 },
    control2: { x: 628, y: 275.6 },
  },
  {
    id: "geo",
    tier: "distribution",
    start: { x: 397, y: 423 },
    endBase: { x: 611.6, y: 455 },
    control1: { x: 484, y: 423 },
    control2: { x: 525, y: 455 },
  },
  {
    id: "marketing",
    tier: "distribution",
    start: { x: 1166, y: 309 },
    endBase: { x: 969.3, y: 444.8 },
    control1: { x: 1082, y: 309 },
    control2: { x: 1054, y: 444.8 },
  },
  {
    id: "software",
    tier: "product",
    start: { x: 1210, y: 549 },
    endBase: { x: 1061.8, y: 604.6 },
    control1: { x: 1148, y: 549 },
    control2: { x: 1126, y: 604.6 },
  },
  {
    id: "automation",
    tier: "operations",
    start: { x: 358, y: 689 },
    endBase: { x: 403.3, y: 796.8 },
    control1: { x: 386, y: 689 },
    control2: { x: 376, y: 796.8 },
  },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function evalCubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

export function BusinessFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hoverRef = useRef<{ service: string | null; tier: TierKey | null }>({
    service: null,
    tier: null,
  });

  useEffect(() => {
    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tierEls: Record<TierKey, SVGGElement> = {
      strategy: svg.querySelector("#tier-strategy") as SVGGElement,
      distribution: svg.querySelector("#tier-distribution") as SVGGElement,
      product: svg.querySelector("#tier-product") as SVGGElement,
      operations: svg.querySelector("#tier-operations") as SVGGElement,
    };
    const glowOverlays: Record<TierKey, SVGGElement> = {
      strategy: tierEls.strategy.querySelector(".tier-glow-overlay") as SVGGElement,
      distribution: tierEls.distribution.querySelector(".tier-glow-overlay") as SVGGElement,
      product: tierEls.product.querySelector(".tier-glow-overlay") as SVGGElement,
      operations: tierEls.operations.querySelector(".tier-glow-overlay") as SVGGElement,
    };

    const connRefs = CONNECTIONS.map((c) => ({
      def: c,
      pathEl: svg.querySelector(`#path-${c.id}`) as SVGPathElement,
      pulseEl: svg.querySelector(`#pulse-${c.id}`) as SVGGElement,
      nodeEl: svg.querySelector(`#node-${c.id}`) as SVGGElement,
    }));

    // Hover wiring
    const serviceEls = svg.querySelectorAll<SVGGElement>(".service-card-group");
    const serviceHandlers: Array<() => void> = [];
    serviceEls.forEach((card) => {
      const svc = card.getAttribute("data-service");
      const onEnter = () => {
        hoverRef.current.service = svc;
      };
      const onLeave = () => {
        hoverRef.current.service = null;
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      serviceHandlers.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    const tierHandlers: Array<() => void> = [];
    (Object.entries(tierEls) as [TierKey, SVGGElement][]).forEach(([key, el]) => {
      const onEnter = () => {
        hoverRef.current.tier = key;
      };
      const onLeave = () => {
        hoverRef.current.tier = null;
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      tierHandlers.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    function renderFrame(tSec: number) {
      // Vertical tier separation (0→1 over 0-2s, hold until 6s, 1→0 over 6-8s)
      let separation = 0;
      if (tSec < 2) separation = easeInOutCubic(tSec / 2);
      else if (tSec < 6) separation = 1;
      else separation = 1 - easeInOutCubic((tSec - 6) / 2);

      const tierOffsets: Record<TierKey, number> = {
        strategy: 0,
        distribution: 0,
        product: 0,
        operations: 0,
      };
      TIER_KEYS.forEach((key) => {
        const dy = MAX_TIER_OFFSET_Y[key] * separation;
        tierOffsets[key] = dy;
        tierEls[key].setAttribute("transform", `translate(0, ${dy.toFixed(3)})`);
      });

      // Pulse travel (2.0s - 4.0s)
      const pulseActive = tSec >= 2 && tSec <= 4;
      const pulseRaw = pulseActive ? clamp01((tSec - 2) / 2) : 0;
      const pulseEased = easeInOutCubic(pulseRaw);
      let pulseOpacity = 0;
      if (pulseActive) {
        const fadeIn = clamp01((tSec - 2) / 0.22);
        const fadeOut = clamp01((4 - tSec) / 0.18);
        pulseOpacity = Math.min(fadeIn, fadeOut);
      }

      // Tier illumination (3.85s - 7.85s window)
      let illumination = 0;
      if (tSec >= 3.85 && tSec < 4.45) {
        illumination = easeOutCubic((tSec - 3.85) / 0.6);
      } else if (tSec >= 4.45 && tSec < 6) {
        illumination = 1;
      } else if (tSec >= 6 && tSec <= 7.85) {
        illumination = 1 - easeInOutCubic((tSec - 6) / 1.85);
      }

      const tierIllumination: Record<TierKey, number> = {
        strategy: illumination,
        distribution: illumination,
        product: illumination,
        operations: illumination,
      };

      const hover = hoverRef.current;

      connRefs.forEach(({ def, pathEl, pulseEl, nodeEl }) => {
        const dy = tierOffsets[def.tier];
        const p0 = def.start;
        const p3 = { x: def.endBase.x, y: def.endBase.y + dy };
        const p1 = def.control1;
        const p2 = def.control2;

        const d = `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x.toFixed(
          2,
        )} ${p3.y.toFixed(2)}`;
        pathEl.setAttribute("d", d);

        const isHovered =
          hover.service === def.id || (hover.tier !== null && hover.tier === def.tier);

        if (isHovered) {
          tierIllumination[def.tier] = Math.max(tierIllumination[def.tier], 0.95);
        }

        const lineBoost = Math.max(illumination * 0.18, isHovered ? 0.18 : 0);
        pathEl.setAttribute("stroke-opacity", (0.8 + lineBoost).toFixed(2));
        pathEl.setAttribute("stroke-width", isHovered ? "3.1" : "2.4");

        const nodeBoost = Math.max(illumination, isHovered ? 1 : 0);
        const haloScale = 1 + nodeBoost * 0.65;
        const haloOpacity = 0.26 + nodeBoost * 0.52;
        nodeEl.setAttribute("transform", `translate(${p3.x.toFixed(2)}, ${p3.y.toFixed(2)})`);
        const halo = nodeEl.querySelector(".node-halo") as SVGCircleElement;
        const core = nodeEl.querySelector(".node-core") as SVGCircleElement;
        halo.setAttribute("r", (13 * haloScale).toFixed(2));
        halo.setAttribute("opacity", haloOpacity.toFixed(2));
        core.setAttribute("r", (6 + nodeBoost * 1.6).toFixed(2));

        if (pulseOpacity > 0.001) {
          const pt = evalCubicBezier(p0, p1, p2, p3, pulseEased);
          pulseEl.setAttribute("transform", `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
          pulseEl.setAttribute("opacity", pulseOpacity.toFixed(3));
        } else {
          pulseEl.setAttribute("opacity", "0");
        }
      });

      TIER_KEYS.forEach((key) => {
        glowOverlays[key].setAttribute(
          "opacity",
          (tierIllumination[key] * 0.78).toFixed(3),
        );
      });

      serviceEls.forEach((card) => {
        const svc = card.getAttribute("data-service");
        const matchingConn = CONNECTIONS.find((c) => c.id === svc);
        const active =
          hover.service === svc ||
          (hover.tier !== null && matchingConn !== undefined && matchingConn.tier === hover.tier);
        card.classList.toggle("is-highlighted", Boolean(active));
      });
    }

    if (reduce) {
      // Render a static, settled frame — no loop.
      renderFrame(1.0);
      return () => {
        serviceHandlers.forEach((fn) => fn());
        tierHandlers.forEach((fn) => fn());
      };
    }

    let elapsedMs = 0;
    let lastTs: number | null = null;
    let running = false;
    let rafId = 0;

    function tick(now: number) {
      if (!running) return;
      if (lastTs === null) lastTs = now;
      elapsedMs = (elapsedMs + (now - lastTs)) % LOOP_DURATION_MS;
      lastTs = now;
      renderFrame(elapsedMs / 1000);
      rafId = requestAnimationFrame(tick);
    }

    const start = () => {
      if (running) return;
      running = true;
      lastTs = null;
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.1 },
    );
    io.observe(section);

    // Render a settled frame immediately so the SVG isn't blank before start.
    renderFrame(0);

    return () => {
      io.disconnect();
      stop();
      serviceHandlers.forEach((fn) => fn());
      tierHandlers.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#010e07",
        backgroundImage:
          "radial-gradient(circle at 50% 48%, #07391e 0%, #032212 42%, #011309 82%, #010b05 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 text-white">
        <div className="mx-auto mb-10 max-w-[720px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9FD0AE]">
            How we fit
          </p>
          <h2
            className="m-0 mt-4 font-display font-bold"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
          >
            Every layer of your business, mapped to the system that moves it.
          </h2>
          <p className="m-0 mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#C9D6CD]">
            Four layers run every business. Each of our services maps to the
            layer it powers — one team, one plan, every surface connected.
          </p>
        </div>

        <div className="relative mx-auto w-full" style={{ aspectRatio: "16 / 10", maxHeight: "86vh", minHeight: 460 }}>
          <svg
            ref={svgRef}
            id="consultancy-svg"
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid meet"
            className="block h-full w-full"
            style={{ overflow: "visible", userSelect: "none" }}
            role="img"
            aria-label="Four-tiered emerald pyramid connecting Consulting, GEO, Automation, Marketing, and Custom Software to Strategy, Distribution, Product, and Operations"
          >
            <defs>
              <radialGradient id="floor-ambient-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#35b56d" stopOpacity="0.42" />
                <stop offset="45%" stopColor="#146c3b" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#02170c" stopOpacity="0" />
              </radialGradient>

              <filter id="tier-drop-shadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#010c06" floodOpacity="0.72" />
              </filter>

              <filter id="cream-node-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="5.5" result="blur1" />
                <feGaussianBlur stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="card-backdrop-shadow" x="-10%" y="-15%" width="120%" height="135%">
                <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#010b05" floodOpacity="0.45" />
              </filter>

              <linearGradient id="t1-front" x1="15%" y1="5%" x2="85%" y2="95%">
                <stop offset="0%" stopColor="#75d69a" />
                <stop offset="35%" stopColor="#2c9258" />
                <stop offset="100%" stopColor="#115530" />
              </linearGradient>
              <linearGradient id="t1-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#298150" />
                <stop offset="50%" stopColor="#114d2c" />
                <stop offset="100%" stopColor="#072b17" />
              </linearGradient>

              <linearGradient id="t2-top" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#48b376" />
                <stop offset="100%" stopColor="#145632" />
              </linearGradient>
              <linearGradient id="t2-front" x1="10%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#43b373" />
                <stop offset="45%" stopColor="#1e7b47" />
                <stop offset="100%" stopColor="#0f4c2a" />
              </linearGradient>
              <linearGradient id="t2-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#185d37" />
                <stop offset="100%" stopColor="#062715" />
              </linearGradient>

              <linearGradient id="t3-top" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#3fa76c" />
                <stop offset="100%" stopColor="#114b2b" />
              </linearGradient>
              <linearGradient id="t3-front" x1="10%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#359c61" />
                <stop offset="48%" stopColor="#186b3d" />
                <stop offset="100%" stopColor="#0c4224" />
              </linearGradient>
              <linearGradient id="t3-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#134f2e" />
                <stop offset="100%" stopColor="#052112" />
              </linearGradient>

              <linearGradient id="t4-top" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#389c63" />
                <stop offset="100%" stopColor="#0f4427" />
              </linearGradient>
              <linearGradient id="t4-front" x1="10%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#2b8b54" />
                <stop offset="48%" stopColor="#135a33" />
                <stop offset="100%" stopColor="#09361d" />
              </linearGradient>
              <linearGradient id="t4-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f4226" />
                <stop offset="100%" stopColor="#041a0e" />
              </linearGradient>

              <linearGradient id="bevel-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d5f7e2" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#76d89e" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#247a49" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="tier-illumination-overlay" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#f5f0d8" stopOpacity="0.42" />
                <stop offset="45%" stopColor="#74e3a3" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2ca360" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            <ellipse cx="835" cy="872" rx="460" ry="64" fill="url(#floor-ambient-glow)" />
            <polygon
              points="366,858 1094,884 1272,812 544,786"
              fill="#010904"
              opacity="0.64"
              style={{ filter: "blur(14px)" }}
            />

            {/* TIER 4: OPERATIONS */}
            <g id="tier-operations" className="pyramid-tier-group" data-tier="operations" filter="url(#tier-drop-shadow)">
              <polygon points="459.31,704.92 1030.79,725.33 1170.52,668.81 599.04,648.40" fill="url(#t4-top)" />
              <polygon points="459.31,704.92 1030.79,725.33 1094.00,884.00 366.00,858.00" fill="url(#t4-front)" />
              <polygon points="1030.79,725.33 1170.52,668.81 1272.00,812.00 1094.00,884.00" fill="url(#t4-right)" />
              <g className="tier-glow-overlay" opacity="0">
                <polygon points="459.31,704.92 1030.79,725.33 1170.52,668.81 599.04,648.40" fill="url(#tier-illumination-overlay)" />
                <polygon points="459.31,704.92 1030.79,725.33 1094.00,884.00 366.00,858.00" fill="url(#tier-illumination-overlay)" />
                <polygon points="1030.79,725.33 1170.52,668.81 1272.00,812.00 1094.00,884.00" fill="url(#tier-illumination-overlay)" />
              </g>
              <polyline
                points="366.00,858.00 459.31,704.92 1030.79,725.33 1170.52,668.81"
                fill="none"
                stroke="url(#bevel-highlight)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="1030.79" y1="725.33" x2="1094.00" y2="884.00" stroke="#68cf93" strokeOpacity="0.42" strokeWidth="1.8" />
              <line x1="459.31" y1="704.92" x2="599.04" y2="648.40" stroke="#9beac0" strokeOpacity="0.48" strokeWidth="1.6" />
              <g transform="translate(738, 795) rotate(2.05)">
                <g transform="translate(-142, 0)" stroke="#f5f0d8" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="0" cy="0" r="12" />
                  <path d="M-5,-32 L5,-32 L7,-24 C10,-23 13,-21 15,-19 L23,-22 L29,-13 L23,-7 C24,-4 24,-1 24,2 L31,7 L27,17 L19,15 C17,18 14,20 11,22 L12,30 L2,33 L-2,25 C-5,25 -8,25 -11,24 L-16,31 L-25,26 L-22,18 C-24,15 -26,12 -27,9 L-35,9 L-35,-2 L-27,-4 C-26,-8 -25,-11 -23,-14 L-28,-20 L-20,-28 L-13,-23 C-10,-24 -8,-25 -5,-26 Z" />
                </g>
                <text x="-74" y="-3" fill="#ffffff" fontSize="33" fontWeight="700" letterSpacing="-0.02em">
                  Operations
                </text>
                <text x="-74" y="32" fill="#d9ece1" fontSize="21" fontWeight="400" opacity="0.92">
                  Automate &amp; run efficiently
                </text>
              </g>
            </g>

            {/* TIER 3: PRODUCT */}
            <g id="tier-product" className="pyramid-tier-group" data-tier="product" filter="url(#tier-drop-shadow)">
              <polygon points="563.47,534.04 960.23,548.21 1057.24,508.97 660.48,494.80" fill="url(#t3-top)" />
              <polygon points="563.47,534.04 960.23,548.21 1023.44,706.88 470.16,687.12" fill="url(#t3-front)" />
              <polygon points="960.23,548.21 1057.24,508.97 1158.72,652.16 1023.44,706.88" fill="url(#t3-right)" />
              <g className="tier-glow-overlay" opacity="0">
                <polygon points="563.47,534.04 960.23,548.21 1057.24,508.97 660.48,494.80" fill="url(#tier-illumination-overlay)" />
                <polygon points="563.47,534.04 960.23,548.21 1023.44,706.88 470.16,687.12" fill="url(#tier-illumination-overlay)" />
                <polygon points="960.23,548.21 1057.24,508.97 1158.72,652.16 1023.44,706.88" fill="url(#tier-illumination-overlay)" />
              </g>
              <polyline
                points="470.16,687.12 563.47,534.04 960.23,548.21 1057.24,508.97"
                fill="none"
                stroke="url(#bevel-highlight)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="960.23" y1="548.21" x2="1023.44" y2="706.88" stroke="#68cf93" strokeOpacity="0.42" strokeWidth="1.8" />
              <line x1="563.47" y1="534.04" x2="660.48" y2="494.80" stroke="#9beac0" strokeOpacity="0.50" strokeWidth="1.6" />
              <g transform="translate(754, 621) rotate(2.05)">
                <g transform="translate(-122, 0)" stroke="#f5f0d8" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="0,-24 28,-10 0,4 -28,-10" />
                  <polyline points="-28,2 0,16 28,2" />
                  <polyline points="-28,14 0,28 28,14" />
                </g>
                <text x="-58" y="-3" fill="#ffffff" fontSize="31" fontWeight="700" letterSpacing="-0.02em">
                  Product
                </text>
                <text x="-58" y="30" fill="#d9ece1" fontSize="20" fontWeight="400" opacity="0.92">
                  Digital experiences &amp; apps
                </text>
              </g>
            </g>

            {/* TIER 2: DISTRIBUTION */}
            <g id="tier-distribution" className="pyramid-tier-group" data-tier="distribution" filter="url(#tier-drop-shadow)">
              <polygon points="667.63,363.16 889.67,371.09 943.96,349.13 721.92,341.20" fill="url(#t2-top)" />
              <polygon points="667.63,363.16 889.67,371.09 952.88,529.76 574.32,516.24" fill="url(#t2-front)" />
              <polygon points="889.67,371.09 943.96,349.13 1045.44,492.32 952.88,529.76" fill="url(#t2-right)" />
              <g className="tier-glow-overlay" opacity="0">
                <polygon points="667.63,363.16 889.67,371.09 943.96,349.13 721.92,341.20" fill="url(#tier-illumination-overlay)" />
                <polygon points="667.63,363.16 889.67,371.09 952.88,529.76 574.32,516.24" fill="url(#tier-illumination-overlay)" />
                <polygon points="889.67,371.09 943.96,349.13 1045.44,492.32 952.88,529.76" fill="url(#tier-illumination-overlay)" />
              </g>
              <polyline
                points="574.32,516.24 667.63,363.16 889.67,371.09 943.96,349.13"
                fill="none"
                stroke="url(#bevel-highlight)"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="889.67" y1="371.09" x2="952.88" y2="529.76" stroke="#75d99e" strokeOpacity="0.45" strokeWidth="1.8" />
              <line x1="667.63" y1="363.16" x2="721.92" y2="341.20" stroke="#aef0ca" strokeOpacity="0.52" strokeWidth="1.6" />
              <g transform="translate(771, 445) rotate(2.05)">
                <g transform="translate(-100, -1)" stroke="#f5f0d8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="-9" cy="-10" r="8" />
                  <path d="M-24,16 C-24,6 -17,2 -9,2 C-1,2 6,6 6,16" />
                  <circle cx="13" cy="-8" r="6.5" />
                  <path d="M5,16 C6,8 11,4 17,4 C22,4 26,8 26,16" />
                </g>
                <text x="-48" y="-3" fill="#ffffff" fontSize="29" fontWeight="700" letterSpacing="-0.02em">
                  Distribution
                </text>
                <text x="-48" y="28" fill="#d9ece1" fontSize="19" fontWeight="400" opacity="0.92">
                  Get more customers
                </text>
              </g>
            </g>

            {/* TIER 1: STRATEGY */}
            <g id="tier-strategy" className="pyramid-tier-group" data-tier="strategy" filter="url(#tier-drop-shadow)">
              <polygon points="800.00,146.00 882.32,352.64 678.48,345.36" fill="url(#t1-front)" />
              <polygon points="800.00,146.00 932.16,332.16 882.32,352.64" fill="url(#t1-right)" />
              <g className="tier-glow-overlay" opacity="0">
                <polygon points="800.00,146.00 882.32,352.64 678.48,345.36" fill="url(#tier-illumination-overlay)" />
                <polygon points="800.00,146.00 932.16,332.16 882.32,352.64" fill="url(#tier-illumination-overlay)" />
              </g>
              <polyline
                points="678.48,345.36 800.00,146.00 882.32,352.64"
                fill="none"
                stroke="#d5f7e2"
                strokeOpacity="0.86"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <line x1="800.00" y1="146.00" x2="932.16" y2="332.16" stroke="#8de4b1" strokeOpacity="0.52" strokeWidth="1.8" />
              <line x1="678.48" y1="345.36" x2="882.32" y2="352.64" stroke="#85e0ab" strokeOpacity="0.58" strokeWidth="1.8" />
              <g transform="translate(788, 282) rotate(2.05)">
                <g transform="translate(0, -44)" stroke="#f5f0d8" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="-24,11 -7,-4 4,3 22,-13" />
                  <polyline points="10,-13 22,-13 22,-1" />
                </g>
                <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontSize="27" fontWeight="700" letterSpacing="-0.02em">
                  Strategy
                </text>
                <text x="0" y="34" textAnchor="middle" fill="#e2f2e9" fontSize="17.5" fontWeight="400" opacity="0.94">
                  Growth &amp; planning
                </text>
              </g>
            </g>

            {/* SERVICE CARDS */}
            <g id="card-consulting" className="service-card-group" data-service="consulting" filter="url(#card-backdrop-shadow)">
              <rect className="service-card-bg" x="145" y="132" width="352" height="114" rx="22" />
              <path d="M192,162 C194,175 197,178 210,180 C197,182 194,185 192,198 C190,185 187,182 174,180 C187,178 190,175 192,162 Z" fill="#f5f0d8" />
              <text x="232" y="176" fill="#ffffff" fontSize="25" fontWeight="700" letterSpacing="-0.015em">
                Consulting
              </text>
              <text x="232" y="203" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                Strategy, planning,
              </text>
              <text x="232" y="224" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                and digital transformation
              </text>
            </g>

            <g id="card-geo" className="service-card-group" data-service="geo" filter="url(#card-backdrop-shadow)">
              <rect className="service-card-bg" x="125" y="366" width="272" height="114" rx="22" />
              <polygon points="166,396 171,407 183,408 174,416 177,428 166,422 155,428 158,416 149,408 161,407" fill="#f5f0d8" />
              <text x="204" y="410" fill="#ffffff" fontSize="25" fontWeight="700" letterSpacing="-0.015em">
                GEO
              </text>
              <text x="204" y="437" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                AI &amp; local search
              </text>
              <text x="204" y="458" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                visibility
              </text>
            </g>

            <g id="card-automation" className="service-card-group" data-service="automation" filter="url(#card-backdrop-shadow)">
              <rect className="service-card-bg" x="72" y="632" width="286" height="114" rx="22" />
              <path d="M114,662 C116,675 119,678 132,680 C119,682 116,685 114,698 C112,685 109,682 96,680 C109,678 112,675 114,662 Z" fill="#f5f0d8" />
              <text x="152" y="676" fill="#ffffff" fontSize="25" fontWeight="700" letterSpacing="-0.015em">
                Automation
              </text>
              <text x="152" y="703" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                Workflows, AI, and
              </text>
              <text x="152" y="724" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                business operations
              </text>
            </g>

            <g id="card-marketing" className="service-card-group" data-service="marketing" filter="url(#card-backdrop-shadow)">
              <rect className="service-card-bg" x="1166" y="252" width="336" height="114" rx="22" />
              <polygon points="1210,282 1215,293 1227,294 1218,302 1221,314 1210,308 1199,314 1202,302 1193,294 1205,293" fill="#f5f0d8" />
              <text x="1250" y="296" fill="#ffffff" fontSize="25" fontWeight="700" letterSpacing="-0.015em">
                Marketing
              </text>
              <text x="1250" y="323" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                Social, content, ads,
              </text>
              <text x="1250" y="344" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                and customer acquisition
              </text>
            </g>

            <g id="card-software" className="service-card-group" data-service="software" filter="url(#card-backdrop-shadow)">
              <rect className="service-card-bg" x="1210" y="492" width="336" height="114" rx="22" />
              <polygon points="1254,522 1259,533 1271,534 1262,542 1265,554 1254,548 1243,554 1246,542 1237,534 1249,533" fill="#f5f0d8" />
              <text x="1294" y="536" fill="#ffffff" fontSize="25" fontWeight="700" letterSpacing="-0.015em">
                Custom Software
              </text>
              <text x="1294" y="563" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                Websites, apps, and
              </text>
              <text x="1294" y="584" fill="#cde0d5" fontSize="17.5" fontWeight="400">
                internal tools
              </text>
            </g>

            {/* CONNECTIONS */}
            <g id="connections-layer">
              {CONNECTIONS.map((c) => (
                <g key={c.id} className="connection-item" data-service={c.id} data-tier={c.tier}>
                  <path
                    id={`path-${c.id}`}
                    fill="none"
                    stroke="#f5f0d8"
                    strokeWidth="2.4"
                    strokeOpacity="0.82"
                    strokeLinecap="round"
                  />
                  <g id={`pulse-${c.id}`} opacity="0" filter="url(#cream-node-glow)">
                    <circle r="9" fill="#f5f0d8" opacity="0.45" />
                    <circle r="4.5" fill="#fffdf5" />
                  </g>
                  <g id={`node-${c.id}`} filter="url(#cream-node-glow)">
                    <circle className="node-halo" r="13" fill="#f5f0d8" opacity="0.28" />
                    <circle className="node-core" r="6" fill="#fffdf5" />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      <style jsx>{`
        section :global(.service-card-group) {
          cursor: pointer;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        section :global(.service-card-bg) {
          fill: rgba(7, 42, 23, 0.62);
          stroke: rgba(88, 179, 126, 0.34);
          stroke-width: 1.5;
          transition: stroke 0.3s ease, fill 0.3s ease, filter 0.3s ease;
        }
        section :global(.service-card-group:hover .service-card-bg),
        section :global(.service-card-group.is-highlighted .service-card-bg) {
          fill: rgba(13, 66, 37, 0.82);
          stroke: rgba(245, 240, 216, 0.78);
          filter: drop-shadow(0 0 18px rgba(72, 187, 120, 0.25));
        }
        section :global(.pyramid-tier-group) {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
