import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      data-reveal="100"
      className="relative mx-auto mt-[72px] max-w-[1200px] overflow-hidden px-10 pb-0 pt-[72px] text-left"
      style={{
        borderRadius: "32px",
        background:
          "radial-gradient(120% 100% at 50% 0%, #4A8A61 0%, #245638 42%, #123222 100%)",
        minHeight: "560px",
      }}
    >
      <BrowserMock />

      {/* Floating card: Process automation */}
      <div
        className="hero-floater float-a absolute z-[3] flex w-[250px] items-center gap-3 rounded-[14px] bg-white p-4 text-left"
        style={{
          top: "110px",
          left: "36px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          animation: "floatA 6s ease-in-out infinite",
        }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#E3EEE4] font-bold text-[#2E6B47]">
          ✓
        </div>
        <div>
          <div className="text-xs text-[#6B776F]">Process automation</div>
          <div className="text-sm font-semibold">
            The boring stuff handles itself
          </div>
        </div>
      </div>

      {/* Floating card: Campaign reach +312% */}
      <div
        className="hero-floater float-b absolute z-[3] w-[220px] rounded-[14px] bg-white p-4 text-left"
        style={{
          top: "330px",
          left: "60px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          animation: "floatB 7s ease-in-out 0.6s infinite",
        }}
      >
        <div className="mb-1.5 text-xs text-[#6B776F]">
          Campaign reach · wk 6
        </div>
        <div
          className="font-display text-3xl font-bold text-[#2E6B47]"
          style={{ letterSpacing: "-0.03em" }}
        >
          +312%
        </div>
        <div className="mt-2.5 h-1.5 rounded-full bg-[#E3EEE4]">
          <div className="h-1.5 w-[78%] rounded-full bg-[#2E6B47]" />
        </div>
      </div>

      {/* Floating card: YouTube views */}
      <div
        className="hero-floater float-b absolute z-[3] flex w-[230px] items-center gap-3 rounded-[14px] bg-white p-4 text-left"
        style={{
          top: "150px",
          right: "40px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          animation: "floatB 6.5s ease-in-out 1.2s infinite",
        }}
      >
        <Image
          src="/youtube-logo.png"
          alt="YouTube"
          width={40}
          height={28}
          className="h-auto w-10"
        />
        <div>
          <div className="text-xs text-[#6B776F]">New video</div>
          <div className="text-sm font-semibold">8.2M views and counting</div>
        </div>
      </div>

      {/* Floating card: Response time (dark) */}
      <div
        className="hero-floater float-a absolute z-[3] w-[200px] rounded-[14px] bg-[#13201A] p-4 text-left text-[#F0F4EF]"
        style={{
          top: "360px",
          right: "56px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.3)",
          animation: "floatA 7.5s ease-in-out 1.8s infinite",
        }}
      >
        <div className="mb-1 text-xs text-[#9FB8A7]">Response time</div>
        <div className="font-display text-2xl font-bold">Under 24h</div>
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div
      className="relative z-[2] mx-auto max-w-[760px] overflow-hidden bg-[#0E1F14] text-left"
      style={{
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -10px 60px rgba(0,0,0,0.25)",
      }}
    >
      <div className="flex items-center gap-[7px] border-b border-[#1E3826] bg-[#142A1B] px-[18px] py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3E6650]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2C4D3A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#213B2C]" />
        <div className="mx-auto rounded-md bg-[#0E1F14] px-10 py-[5px] font-mono text-[11px] text-[#7FA089]">
          breek.io/your-business
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4 px-7 pb-2 pt-[26px]">
        <div>
          <div className="mb-1.5 font-mono text-[11px] text-[#7FA089]">
            MONTHLY REVENUE
          </div>
          <div
            className="font-display text-[40px] font-bold text-[#F0F4EF]"
            style={{ letterSpacing: "-0.03em" }}
          >
            $48,210
          </div>
        </div>
        <div
          className="rounded-full px-3 py-1.5 text-[13px] font-semibold"
          style={{ background: "rgba(76,138,98,0.18)", color: "#9FD0AE" }}
        >
          ▲ 250% since Breek
        </div>
      </div>
      <div className="px-5 pt-2">
        <svg
          viewBox="0 0 800 220"
          preserveAspectRatio="none"
          className="block h-[220px] w-full"
        >
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4C8A62" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4C8A62" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="55" x2="800" y2="55" stroke="#1B3325" />
          <line x1="0" y1="110" x2="800" y2="110" stroke="#1B3325" />
          <line x1="0" y1="165" x2="800" y2="165" stroke="#1B3325" />
          <path
            d="M0,190 L70,182 L140,186 L210,168 L280,172 L350,146 L420,150 L490,118 L560,110 L630,76 L700,62 L800,24 L800,220 L0,220 Z"
            fill="url(#hg)"
          />
          <path
            d="M0,190 L70,182 L140,186 L210,168 L280,172 L350,146 L420,150 L490,118 L560,110 L630,76 L700,62 L800,24"
            fill="none"
            stroke="#7BC395"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeDasharray="1400"
            style={{
              animation: "chartDraw 2.6s cubic-bezier(.4,0,.2,1) 0.9s both",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
