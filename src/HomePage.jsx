import React, { useEffect, useRef, useState } from "react";
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap');

    .pg{
      --plum:#3A3350; --plum-ink:#221D2E; --butter:#F7E3A1; --butter-deep:#E8C86A;
      --lavender:#C9C1E3; --rose:#E6B7B0; --sage:#A8C0A8;
      --ink:#2A2438; --ink-soft:rgba(42,36,56,.66); --ink-faint:rgba(42,36,56,.44);
      --line:rgba(255,255,255,.55); --line-ink:rgba(58,51,80,.16);
      --spring:cubic-bezier(.34,1.3,.64,1);
      font-family:'Inter',system-ui,sans-serif; color:var(--ink);
      position:relative; isolation:isolate; overflow-x:hidden;
      -webkit-font-smoothing:antialiased;
    }
    .pg h1,.pg h2,.pg h3,.pg .disp{ font-family:'Fraunces',Georgia,serif; font-optical-sizing:auto; letter-spacing:-.015em; }
    .pg ::selection{ background:var(--butter); color:var(--ink); }
    .pg button,.pg a{ font-family:inherit; }

    /* ---------- ambient field ---------- */
    .pg-field{ position:fixed; inset:0; z-index:-1; overflow:hidden;
      background:
        radial-gradient(120% 90% at 82% 8%, #F6EEDC 0%, transparent 55%),
        linear-gradient(165deg,#EFEBFA 0%,#F5F0E7 48%,#E9E2F5 100%); }
    .pg-orb{ position:absolute; border-radius:50%; filter:blur(66px); will-change:transform; }
    .pg-o1{ width:36rem;height:36rem;top:-13rem;left:-9rem; opacity:.5;
      background:radial-gradient(circle at 32% 32%, var(--plum), transparent 70%); animation:d1 26s ease-in-out infinite; }
    .pg-o2{ width:30rem;height:30rem;bottom:-9rem;right:-7rem; opacity:.5;
      background:radial-gradient(circle at 58% 42%, var(--butter-deep), transparent 70%); animation:d2 31s ease-in-out infinite; }
    .pg-o3{ width:26rem;height:26rem;top:30%;right:6%; opacity:.5;
      background:radial-gradient(circle at 50% 50%, var(--lavender), transparent 72%); animation:d3 35s ease-in-out infinite; }
    .pg-o4{ width:18rem;height:18rem;bottom:16%;left:4%; opacity:.34;
      background:radial-gradient(circle at 50% 50%, var(--rose), transparent 72%); animation:d2 22s ease-in-out infinite reverse; }
    @keyframes d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(3rem,4rem) scale(1.07)}}
    @keyframes d2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-3.5rem,-2.5rem) scale(1.09)}}
    @keyframes d3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-2rem,3rem) scale(.94)}}

    /* ruled-paper substrate and grain: the analog layer under the glass */
    .pg-field::before{ content:""; position:absolute; inset:0; opacity:.5;
      background-image:linear-gradient(rgba(58,51,80,.055) 1px, transparent 1px);
      background-size:100% 30px; mask-image:radial-gradient(85% 70% at 50% 40%, #000 20%, transparent 78%); }
    .pg-field::after{ content:""; position:absolute; inset:0; opacity:.42; mix-blend-mode:overlay; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

    /* ---------- glass ---------- */
    .glass{ position:relative; background:rgba(255,255,255,.42);
      backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%);
      border:1px solid var(--line);
      box-shadow:0 8px 34px rgba(42,36,56,.15), inset 0 1px 0 rgba(255,255,255,.62); }
    .glass::after{ content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:.05; mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E"); }
    .glass-dk{ background:rgba(34,29,46,.58); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%);
      border:1px solid rgba(255,255,255,.14); }

    .sheen::before{ content:""; position:absolute; left:8%; right:8%; top:0; height:1px; border-radius:2px; pointer-events:none;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.95),transparent); }

    /* ---------- torn edge motif ---------- */
    .torn{ height:9px; width:100%; flex:none;
      clip-path:polygon(0% 0%,6.25% 100%,12.5% 0%,18.75% 100%,25% 0%,31.25% 100%,37.5% 0%,43.75% 100%,50% 0%,56.25% 100%,62.5% 0%,68.75% 100%,75% 0%,81.25% 100%,87.5% 0%,93.75% 100%,100% 0%,100% 100%,0% 100%); }

    /* ---------- pinned paper cards ---------- */
    .pin{ transition:transform .3s var(--spring), box-shadow .3s ease; }
    .pin:nth-child(4n+1){ transform:rotate(-.5deg) }
    .pin:nth-child(4n+2){ transform:rotate(.42deg) }
    .pin:nth-child(4n+3){ transform:rotate(.3deg) }
    .pin:nth-child(4n){ transform:rotate(-.32deg) }
    .pin:hover{ transform:rotate(0) translateY(-5px); box-shadow:0 20px 46px rgba(42,36,56,.2), inset 0 1px 0 rgba(255,255,255,.7); }

    .btn-solid{ background:linear-gradient(158deg,#4a4166,#2f2741); color:#fff; border:1px solid rgba(255,255,255,.2);
      box-shadow:0 8px 22px rgba(42,36,56,.34), inset 0 1px 0 rgba(255,255,255,.26);
      transition:transform .18s var(--spring), box-shadow .18s ease; }
    .btn-solid:hover{ transform:translateY(-2px); box-shadow:0 12px 30px rgba(42,36,56,.4), inset 0 1px 0 rgba(255,255,255,.32); }
    .btn-solid:active{ transform:translateY(0) scale(.97); }
    .btn-glass{ background:rgba(255,255,255,.45); border:1px solid var(--line); color:var(--plum);
      backdrop-filter:blur(14px) saturate(170%); -webkit-backdrop-filter:blur(14px) saturate(170%);
      transition:transform .18s var(--spring), background .18s ease; }
    .btn-glass:hover{ background:rgba(255,255,255,.68); transform:translateY(-2px); }
    .btn-glass:active{ transform:translateY(0) scale(.97); }
    .btn-butter{ background:linear-gradient(158deg,#FBEDBD,#E8C86A); color:var(--plum-ink);
      border:1px solid rgba(255,255,255,.55); box-shadow:0 8px 24px rgba(232,200,106,.42), inset 0 1px 0 rgba(255,255,255,.7);
      transition:transform .18s var(--spring), box-shadow .18s ease; }
    .btn-butter:hover{ transform:translateY(-2px); box-shadow:0 12px 32px rgba(232,200,106,.55), inset 0 1px 0 rgba(255,255,255,.8); }
    .btn-butter:active{ transform:translateY(0) scale(.97); }

    .fx:focus-visible{ outline:none; box-shadow:0 0 0 2px rgba(255,255,255,.9), 0 0 0 4px var(--plum); }

    /* ---------- marquee ---------- */
    .mq{ display:flex; width:max-content; animation:mq 36s linear infinite; }
    @keyframes mq{ to{ transform:translateX(-50%) } }
    .mq-item{ display:inline-flex; align-items:center; gap:.6rem; padding:0 1.6rem; white-space:nowrap; }

    /* ---------- thread and pulse ---------- */
    .stitch{ stroke-dasharray:5 6; animation:stitch 2.4s linear infinite; }
    @keyframes stitch{ to{ stroke-dashoffset:-22 } }
    .breathe{ animation:breathe 4.5s ease-in-out infinite; transform-origin:center; }
    @keyframes breathe{ 0%,100%{ opacity:.5 } 50%{ opacity:1 } }
    .orbit{ animation:orbit 26s linear infinite; transform-origin:190px 150px; }
    @keyframes orbit{ to{ transform:rotate(360deg) } }

    /* ---------- reveal ---------- */
    .rv{ opacity:0; transform:translateY(16px); transition:opacity .7s ease, transform .7s var(--spring); }
    .rv.in{ opacity:1; transform:none; }

    @media (prefers-reduced-motion:reduce){
      .pg-orb,.mq,.stitch,.breathe,.orbit{ animation:none !important }
      .rv{ opacity:1; transform:none; transition:none }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO ARTWORK                                                        */
/* A class arranged in a circle, joined by string, working out a       */
/* concept together. Decorative, not a preview of any one activity.    */
/* ------------------------------------------------------------------ */
function LearningCircle() {
  const R = 108;
  const CX = 190;
  const CY = 150;
  const seats = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), i };
  });
  const chords = [
    [0, 5], [5, 9], [9, 1], [1, 7], [7, 12], [12, 3],
    [3, 10], [10, 6], [6, 13], [13, 2], [2, 8], [8, 4], [4, 11],
  ];

  return (
    <svg viewBox="0 0 380 300" className="w-full h-auto" role="img"
      aria-label="A class seated in a circle, their ideas joined by lengths of string">
      <defs>
        <radialGradient id="pd" cx="34%" cy="30%">
          <stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#EFE9DA" />
        </radialGradient>
        <radialGradient id="pb" cx="34%" cy="30%">
          <stop offset="0%" stopColor="#FBEDBD" /><stop offset="100%" stopColor="#E8C86A" />
        </radialGradient>
        <linearGradient id="str" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A3350" stopOpacity=".42" />
          <stop offset="100%" stopColor="#3A3350" stopOpacity=".12" />
        </linearGradient>
        <filter id="sf" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.6" floodColor="#2A2438" floodOpacity=".22" />
        </filter>
      </defs>

      {/* chalk guide ring */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(58,51,80,.16)" strokeWidth="1.3" strokeDasharray="2 6" />
      <circle cx={CX} cy={CY} r={R - 30} fill="none" stroke="rgba(58,51,80,.09)" strokeWidth="1" strokeDasharray="1 7" />

      {/* string between seats: the idea passing around the room */}
      <g fill="none" stroke="url(#str)" strokeWidth="1.15" strokeLinecap="round">
        {chords.map(([a, b], i) => (
          <line key={i} x1={seats[a].x} y1={seats[a].y} x2={seats[b].x} y2={seats[b].y}
            className={i % 3 === 0 ? "stitch" : ""} style={{ animationDelay: `${(i % 6) * 0.25}s` }} />
        ))}
      </g>

      {/* the seated class, as punched paper discs */}
      {seats.map((s) => {
        const lit = [0, 4, 7, 11].includes(s.i);
        return (
          <g key={s.i} filter="url(#sf)">
            <circle cx={s.x} cy={s.y} r={lit ? 11.5 : 10}
              fill={lit ? "url(#pb)" : "url(#pd)"} stroke="rgba(58,51,80,.2)" strokeWidth="1" />
            <circle cx={s.x} cy={s.y} r="2.6" fill="rgba(58,51,80,.26)"
              className={lit ? "breathe" : ""} style={{ animationDelay: `${s.i * 0.4}s` }} />
          </g>
        );
      })}

      {/* the concept being built in the middle of the room */}
      <g filter="url(#sf)">
        <g transform={`rotate(-6 ${CX} ${CY})`}>
          <rect x={CX - 34} y={CY - 26} width="68" height="52" rx="4"
            fill="#fff" stroke="rgba(58,51,80,.24)" strokeWidth="1.2" />
          <path d={`M${CX - 22} ${CY - 12}h44M${CX - 22} ${CY - 4}h44M${CX - 22} ${CY + 4}h28`}
            stroke="rgba(58,51,80,.26)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx={CX + 18} cy={CY + 13} r="6.5" fill="#EAE6F5" stroke="rgba(58,51,80,.26)" strokeWidth="1" />
          <path d={`M${CX + 14.6} ${CY + 13.2}l2.6 2.6 4.6-5`} fill="none" stroke="#3A3350"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
        </g>
      </g>

      {/* a slow orbiting marker: the question travelling the room */}
      <g className="orbit">
        <circle cx={CX} cy={CY - R - 20} r="4.2" fill="var(--rose, #E6B7B0)" stroke="rgba(58,51,80,.22)" strokeWidth="1" />
      </g>

      {/* chalk underline */}
      <path d="M52 284C140 292 250 292 330 284" fill="none" stroke="rgba(58,51,80,.2)"
        strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* FEATURE ARTWORK                                                     */
/* ------------------------------------------------------------------ */
const art = {
  hands: (
    <svg viewBox="0 0 72 56" className="w-[72px] h-[56px]">
      <rect x="7" y="12" width="26" height="34" rx="2.4" fill="#fff" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" transform="rotate(-8 20 29)" />
      <rect x="27" y="10" width="26" height="34" rx="2.4" fill="#F7E3A1" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" transform="rotate(6 40 27)" />
      <circle cx="58" cy="20" r="6.5" fill="#EAE6F5" stroke="rgba(58,51,80,.28)" strokeWidth="1.2" />
      <path d="M12 50c6 4 14 4 20 0s14-4 20 0" fill="none" stroke="rgba(58,51,80,.3)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  screenfree: (
    <svg viewBox="0 0 72 56" className="w-[72px] h-[56px]">
      <rect x="6" y="8" width="38" height="27" rx="3.4" fill="rgba(58,51,80,.1)" stroke="rgba(58,51,80,.32)" strokeWidth="1.4" />
      <path d="M17 41h16M25 35v6" stroke="rgba(58,51,80,.32)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 15l24 14M37 15L13 29" stroke="rgba(58,51,80,.28)" strokeWidth="1.5" strokeLinecap="round" />
      <g transform="rotate(9 58 32)">
        <rect x="45" y="17" width="23" height="29" rx="2" fill="#fff" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" />
        <path d="M49 24h15M49 29h15M49 34h10" stroke="rgba(58,51,80,.3)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <circle cx="63" cy="14" r="5" fill="#F7E3A1" stroke="rgba(58,51,80,.26)" strokeWidth="1.1" />
    </svg>
  ),
  script: (
    <svg viewBox="0 0 72 56" className="w-[72px] h-[56px]">
      <rect x="12" y="6" width="42" height="44" rx="3" fill="#fff" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" />
      <path d="M12 14h42" stroke="rgba(58,51,80,.18)" strokeWidth="1.1" />
      {[22, 30, 38].map((y, i) => (
        <g key={i}>
          <circle cx="20" cy={y} r="3.1" fill={i === 0 ? "#F7E3A1" : "rgba(58,51,80,.12)"} stroke="rgba(58,51,80,.3)" strokeWidth="1" />
          <path d={`M27 ${y}h${22 - i * 5}`} stroke="rgba(58,51,80,.3)" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="56" cy="44" r="10" fill="#EAE6F5" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" />
      <path d="M56 38v6l4 2.5" fill="none" stroke="#3A3350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  reviewed: (
    <svg viewBox="0 0 72 56" className="w-[72px] h-[56px]">
      <rect x="8" y="8" width="38" height="42" rx="2.6" fill="#fff" stroke="rgba(58,51,80,.3)" strokeWidth="1.3" />
      <path d="M14 18h26M14 24h26M14 30h16" stroke="rgba(58,51,80,.24)" strokeWidth="1.2" strokeLinecap="round" />
      <g transform="rotate(-13 48 36)">
        <circle cx="48" cy="36" r="15" fill="rgba(168,192,168,.26)" stroke="#6E8F6E" strokeWidth="1.8" />
        <circle cx="48" cy="36" r="11" fill="none" stroke="#6E8F6E" strokeWidth=".9" strokeDasharray="2 2.6" />
        <path d="M42 36.4l4.4 4.4L55 32" fill="none" stroke="#6E8F6E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  ),
};

const FEATURES = [
  {
    k: "hands",
    t: "Concepts taught by doing",
    d: "Students do not read about training data and bias, they act them out. Each activity turns an abstract mechanism into something the class builds, argues about and can point to afterwards.",
  },
  {
    k: "screenfree",
    t: "Screen-free by design",
    d: "Activities run on paper, string and conversation with objects already in the room. No devices, no connectivity and no student logins, so the lesson never depends on a charged battery.",
  },
  {
    k: "script",
    t: "Ready to teach, not to adapt",
    d: "Each activity arrives with its materials list, timings, step-by-step facilitation and the discussion prompts that make the point land. A teacher can pick one up and walk into class.",
  },
  {
    k: "reviewed",
    t: "Reviewed before it reaches a child",
    d: "Nothing enters the official collection without passing review, so teachers can trust what they pick up instead of vetting it themselves.",
  },
];

const STEPS = [
  { n: "01", t: "Find the concept", d: "Start from what you want taught, whether that is bias, training data or feedback loops, then filter by age band, subject and the time you have." },
  { n: "02", t: "Open the facilitation guide", d: "Materials, timings and a walkthrough written for a live room rather than a manual, with the prompts that carry the discussion." },
  { n: "03", t: "Run it with your class", d: "Teach it with chalk, paper and talk. No projector, no lab slot and no data plan, in whichever language the room speaks." },
];

const MARQUEE = [
  "TAUGHT THROUGH ACTIVITIES",
  "SCREEN-FREE",
  "NO DEVICES NEEDED",
  "BUILT FOR INDIAN CLASSROOMS",
  "AN INITIATIVE BY STRAVELLE",
];

/* ------------------------------------------------------------------ */
function Mark({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="leading-tight">
        <div className="disp font-bold text-[15px]" style={{ color: light ? "#fff" : "var(--ink)" }}>Pragya AI</div>
        <div className="text-[10.5px] tracking-wide" style={{ color: light ? "rgba(255,255,255,.62)" : "var(--ink-faint)" }}>
          AN INITIATIVE BY STRAVELLE
        </div>
      </div>
    </div>
  );
}

const Arrow = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ================================================================== */
export default function HomePage({ onLogin = () => {} }) {
  return (
    <div className="pg min-h-screen">
      <Styles />

      <div className="pg-field" aria-hidden="true">
        <div className="pg-orb pg-o1" /><div className="pg-orb pg-o2" />
        <div className="pg-orb pg-o3" /><div className="pg-orb pg-o4" />
      </div>

      {/* ---------------- nav ---------------- */}
      <header className="sticky top-0 z-50 glass-dk">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[66px] flex items-center justify-between">
          <Mark light />
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium" style={{ color: "rgba(255,255,255,.76)" }}>
            <a href="#initiative" className="fx hover:text-white transition-colors">The initiative</a>
            <a href="#approach" className="fx hover:text-white transition-colors">Our approach</a>
            <a href="#how" className="fx hover:text-white transition-colors">For teachers</a>
          </nav>
          <button onClick={onLogin} className="fx btn-butter px-4 py-2 rounded-xl text-[13.5px] font-semibold flex items-center gap-1.5">
            Login <Arrow s={14} />
          </button>
        </div>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px] font-semibold glass"
              style={{ borderRadius: 999, color: "var(--plum)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--butter-deep)" }} />
              An initiative by Stravelle
            </span>

            <h1 className="font-bold mt-5 mb-5" style={{ fontSize: "clamp(2.2rem,5.2vw,3.5rem)", lineHeight: 1.04 }}>
              Teaching AI literacy through{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                activities
                <svg viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true"
                  style={{ position: "absolute", left: 0, right: 0, bottom: "-.12em", width: "100%", height: ".42em" }}>
                  <path d="M3 8.6C56 3.4 150 2.6 217 6.4" fill="none" stroke="#E8C86A" strokeWidth="6" strokeLinecap="round" opacity=".62" />
                </svg>
              </span>
              , not screens.
            </h1>

            <p className="text-[17px] leading-relaxed mb-7 max-w-xl" style={{ color: "var(--ink-soft)" }}>
              Pragya AI is an initiative by Stravelle to make AI literacy something a class can
              actually do. Students learn how these systems work by building them out with paper,
              string and discussion, in classrooms that were never going to have a device for
              every child.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={onLogin} className="fx btn-solid px-6 py-3.5 rounded-2xl text-sm font-semibold flex items-center gap-2">
                Login to the platform <Arrow />
              </button>
              <a href="#initiative" className="fx btn-glass px-6 py-3.5 rounded-2xl text-sm font-semibold">
                About the initiative
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass sheen pin rounded-[26px] p-5 sm:p-8">
              <img src="assets\photo2.jpg" alt="Pragya AI"/>
              <div className="torn mt-2 mb-4" style={{ background: "linear-gradient(100deg,var(--lavender),var(--butter-deep))" }} />
              <p className="text-[13.5px] leading-relaxed text-center" style={{ color: "var(--ink-soft)" }}>
                A class works out a mechanism together, using nothing but what is already in the room.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- marquee ---------------- */}
      <div className="relative py-3 overflow-hidden" style={{ background: "linear-gradient(90deg,#3A3350,#2A2438)" }}>
        <div className="mq text-[11.5px] font-semibold tracking-[.12em]" style={{ color: "rgba(255,255,255,.82)" }}>
          {[0, 1].map((rep) => (
            <div key={rep} className="flex" aria-hidden={rep === 1}>
              {MARQUEE.map((m, i) => (
                <span key={i} className="mq-item">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--butter)" }} />
                  <span>{m}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- the initiative ---------------- */}
      <section id="initiative" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="grid md:grid-cols-[1.1fr_.9fr] gap-12 items-start">
          <Reveal>
            <div className="text-[11px] font-bold tracking-[.16em] uppercase mb-3" style={{ color: "var(--plum)" }}>
              The initiative
            </div>
            <h2 className="font-bold mb-5" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", lineHeight: 1.14 }}>
              Stravelle started Pragya AI because AI literacy kept stopping at the classroom door.
            </h2>
            <p className="leading-relaxed mb-4 text-[15.5px]" style={{ color: "var(--ink-soft)" }}>
              Most AI education quietly assumes a working laptop, a steady connection and a lab
              period to use them in. A great many classrooms have none of the three, so the material
              never arrives, and the students who will feel these systems most are the last to be
              taught anything about them.
            </p>
            <p className="leading-relaxed mb-4 text-[15.5px]" style={{ color: "var(--ink-soft)" }}>
              Pragya AI works the other way around. We design activities first and ask what a
              teacher already has second, which turns out to be chalk, paper, a room full of
              students and forty minutes. Every activity is built to teach a real mechanism,
              training data, weights, bias, feedback loops, rather than vocabulary a student can
              only repeat.
            </p>
            <p className="leading-relaxed text-[15.5px]" style={{ color: "var(--ink-soft)" }}>
              The platform is simply where that work is kept, reviewed and handed to teachers. The
              initiative is the activities themselves, and the teaching they make possible.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {[
                ["0", "devices needed in the room to run any activity"],
                ["40", "minutes is the usual length of a single activity"],
                ["1", "reviewed collection every teacher draws from"],
              ].map(([big, small], i) => (
                <div key={i} className="glass pin rounded-2xl p-4">
                  <div className="disp font-bold mb-1" style={{ fontSize: "1.9rem", color: "var(--plum)", lineHeight: 1.1 }}>{big}</div>
                  <div className="text-[12.5px] leading-snug" style={{ color: "var(--ink-soft)" }}>{small}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass pin rounded-[24px] overflow-hidden">
              <div className="torn" style={{ background: "linear-gradient(100deg,var(--rose),var(--lavender))" }} />
              <div className="p-6">
                <div className="disp font-bold text-[17px] mb-4">Who it is for</div>
                <ul className="space-y-4">
                  {[
                    ["Teachers", "who want an activity they can run tomorrow, not a framework to adapt first"],
                    ["Coordinators", "assembling a screen-free AI curriculum that holds together across grades"],
                    ["Facilitators", "running sessions outside a formal school timetable"],
                  ].map(([role, why], i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[3px] flex-none w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold"
                        style={{ background: "linear-gradient(150deg,#FBEDBD,#E8C86A)", color: "var(--plum-ink)" }}>
                        {i + 1}
                      </span>
                      <span className="text-[14px] leading-snug">
                        <span className="font-semibold">{role}</span>
                        <span style={{ color: "var(--ink-soft)" }}>, {why}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5" style={{ borderTop: "1px dashed rgba(58,51,80,.22)" }}>
                  <p className="disp text-[15.5px] leading-relaxed" style={{ color: "var(--plum)" }}>
                    “Understanding does not require a screen. It requires something to work out
                    together.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- approach ---------------- */}
      <section id="approach" className="py-20 sm:py-24"
        style={{ background: "rgba(255,255,255,.26)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[11px] font-bold tracking-[.16em] uppercase mb-3" style={{ color: "var(--plum)" }}>Our approach</div>
              <h2 className="font-bold" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", lineHeight: 1.14 }}>
                Built for the classroom you actually have
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.k} delay={i * 90}>
                <div className="glass pin rounded-[24px] p-6 h-full flex gap-5">
                  <div className="flex-none rounded-2xl p-2.5" style={{ background: "rgba(255,255,255,.5)", border: "1px solid var(--line)" }}>
                    {art[f.k]}
                  </div>
                  <div>
                    <div className="disp font-bold text-[16.5px] mb-1.5">{f.t}</div>
                    <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- for teachers ---------------- */}
      <section id="how" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <Reveal>
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-[.16em] uppercase mb-3" style={{ color: "var(--plum)" }}>For teachers</div>
            <h2 className="font-bold" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", lineHeight: 1.14 }}>
              From concept to classroom in three steps
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <svg className="hidden sm:block absolute left-0 right-0 pointer-events-none" viewBox="0 0 900 40"
            preserveAspectRatio="none" style={{ top: 42, height: 40 }} aria-hidden="true">
            <path className="stitch" d="M150 20 C 300 -2, 450 42, 750 18" fill="none"
              stroke="rgba(58,51,80,.3)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <div className="grid sm:grid-cols-3 gap-5 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="glass pin rounded-[24px] p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center disp font-bold text-[15px]"
                      style={{ background: "linear-gradient(150deg,#4a4166,#2f2741)", color: "var(--butter)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.22)" }}>
                      {s.n}
                    </div>
                    <div className="flex-1 h-px" style={{ background: "rgba(58,51,80,.16)" }} />
                  </div>
                  <div className="disp font-bold text-[16.5px] mb-1.5">{s.t}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="px-4 sm:px-6 pb-20">
        <Reveal>
          <div className="max-w-5xl mx-auto relative rounded-[30px] overflow-hidden glass-dk">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(70% 120% at 18% 0%, rgba(247,227,161,.3), transparent 60%), radial-gradient(60% 110% at 88% 100%, rgba(201,193,227,.26), transparent 62%)"
            }} />
            <div className="torn" style={{ background: "linear-gradient(100deg,var(--butter-deep),var(--lavender))" }} />
            <div className="relative px-6 sm:px-12 py-14 text-center">
              <h2 className="font-bold text-white mb-4" style={{ fontSize: "clamp(1.6rem,3.6vw,2.35rem)", lineHeight: 1.14 }}>
                Bring AI literacy into your classroom,<br className="hidden sm:block" /> no screens required.
              </h2>
              <p className="mb-9 max-w-lg mx-auto text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.74)" }}>
                Log in to explore the activities, keep the ones that suit your class, or build and
                submit a new one for review.
              </p>
              <button onClick={onLogin} className="fx btn-butter px-8 py-3.5 rounded-2xl text-sm font-semibold inline-flex items-center gap-2">
                Login to Pragya AI <Arrow />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--line-ink)" }}>
          <Mark />
          <div className="text-[12px] text-center sm:text-right" style={{ color: "var(--ink-faint)" }}>
            Taught through activities. Screen-free. Built for Indian classrooms.
            <div className="mt-0.5">© {new Date().getFullYear()} Stravelle</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
