"use client";

import { useEffect, useState } from "react";

const START_REVENUE = 13774;
const END_REVENUE = 48210;

// Seconds. Kept in one place so JS-timed events match CSS-timed ones.
const T = {
  laptopIn: 0.5,
  screenOn: 1.3,
  countStart: 1.5,
  countDur: 2.0,
};

// 7-month series that trends up with two dips.
// viewBox is 600×100; lower y = higher value.
const CHART_POINTS = [
  { x: 0, y: 82 },
  { x: 100, y: 68 },
  { x: 200, y: 74 },
  { x: 300, y: 52 },
  { x: 400, y: 38 },
  { x: 500, y: 46 },
  { x: 600, y: 12 },
];

function toSmoothPath(pts: typeof CHART_POINTS) {
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

const LINE_PATH = toSmoothPath(CHART_POINTS);
const AREA_PATH = `${LINE_PATH} L 600,100 L 0,100 Z`;
const LAST_POINT = CHART_POINTS[CHART_POINTS.length - 1];

const METRICS = [
  { label: "Direct orders", value: "+175%", note: "vs last quarter" },
  { label: "Campaign reach", value: "+312%", note: "week 6" },
  { label: "Response time", value: "< 24h", note: "all inbound" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export function LaptopVisual() {
  const [revenue, setRevenue] = useState(START_REVENUE);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setRevenue(END_REVENUE);
      return;
    }

    const t0 = performance.now() + T.countStart * 1000;
    let raf = 0;
    const step = (now: number) => {
      const t = (now - t0) / 1000;
      if (t < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const k = Math.min(1, t / T.countDur);
      const eased = 1 - Math.pow(1 - k, 3);
      setRevenue(
        Math.round(START_REVENUE + (END_REVENUE - START_REVENUE) * eased),
      );
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const revenueStr = "$" + revenue.toLocaleString();

  return (
    <div className="laptop-scene" aria-hidden="true">
      <div className="laptop-wrap">
        <div className="laptop-shadow" />
        <div className="laptop-body">
          <div className="laptop-lid">
            <div className="laptop-bezel">
              <span className="laptop-notch" />
              <div className="laptop-screen">
                <div className="dash-topbar">
                  <div className="dash-topbar-left">
                    <span className="dash-status" />
                    <span className="dash-brand">Breek dashboard</span>
                  </div>
                  <span className="dash-range">Last 90 days</span>
                </div>

                <div className="dash-body">
                  <div className="dash-headline">
                    <div>
                      <div className="dash-label">Revenue</div>
                      <div className="dash-revenue">{revenueStr}</div>
                    </div>
                    <div className="dash-pill">
                      <span className="dash-pill-arrow">▲</span>
                      <span className="dash-pill-num">250%</span>
                      <span className="dash-pill-note">since Breek</span>
                    </div>
                  </div>

                  <div className="dash-chart">
                    <svg
                      viewBox="0 0 600 108"
                      preserveAspectRatio="none"
                      role="img"
                    >
                      <defs>
                        <linearGradient
                          id="dashArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#2E6B47"
                            stopOpacity="0.22"
                          />
                          <stop
                            offset="100%"
                            stopColor="#2E6B47"
                            stopOpacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="dashLine"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0" stopColor="#2E6B47">
                            <animate
                              attributeName="offset"
                              values="-0.4;1.4"
                              dur="5.5s"
                              begin="6s;lineHi.end+2.8s"
                              id="lineLo1"
                            />
                          </stop>
                          <stop offset="0.15" stopColor="#7BC395">
                            <animate
                              attributeName="offset"
                              values="-0.25;1.55"
                              dur="5.5s"
                              begin="6s;lineHi.end+2.8s"
                              id="lineHi"
                            />
                          </stop>
                          <stop offset="0.3" stopColor="#2E6B47">
                            <animate
                              attributeName="offset"
                              values="-0.1;1.7"
                              dur="5.5s"
                              begin="6s;lineHi.end+2.8s"
                              id="lineLo2"
                            />
                          </stop>
                        </linearGradient>
                      </defs>
                      <line
                        x1="0"
                        y1="26"
                        x2="600"
                        y2="26"
                        stroke="#EDF1EC"
                      />
                      <line
                        x1="0"
                        y1="54"
                        x2="600"
                        y2="54"
                        stroke="#EDF1EC"
                      />
                      <line
                        x1="0"
                        y1="82"
                        x2="600"
                        y2="82"
                        stroke="#EDF1EC"
                      />
                      <path
                        d={AREA_PATH}
                        fill="url(#dashArea)"
                        className="chart-area"
                      />
                      <path
                        d={LINE_PATH}
                        fill="none"
                        stroke="url(#dashLine)"
                        strokeWidth={2.2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        pathLength={1}
                        className="chart-line"
                      />
                      <circle
                        cx={LAST_POINT.x}
                        cy={LAST_POINT.y}
                        r={5}
                        fill="#FFFFFF"
                        stroke="#2E6B47"
                        strokeWidth={2.4}
                        className="chart-point"
                      />
                    </svg>
                    <div className="dash-months">
                      {MONTHS.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="dash-metrics">
                    {METRICS.map((m, i) => (
                      <div
                        key={m.label}
                        className="metric-card"
                        style={{ animationDelay: `${3.6 + i * 0.12}s` }}
                      >
                        <div className="metric-label">{m.label}</div>
                        <div className="metric-value">{m.value}</div>
                        <div className="metric-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-hinge" />
          <div className="laptop-base">
            <span className="laptop-slot" />
          </div>
        </div>
      </div>
    </div>
  );
}
