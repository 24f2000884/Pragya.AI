import React, { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, X, ChevronRight, ChevronLeft, Download,
  Plus, Check, ArrowRight, ArrowLeft, LayoutGrid, Settings, Sparkles,
  Lock, Save, Send, Trash2, AlertCircle, Menu, BookOpen, Users,
  ClipboardList, Zap, CheckCircle2, Circle, LogOut, Mail, KeyRound, GraduationCap
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand tokens (from Pragya AI Brand Colour Reference)                */
/* ------------------------------------------------------------------ */
const Tokens = () => ( 
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&display=swap');
    :root{
      --plum:#3A3350; --plum-ink:#2A2438; --butter:#F7E3A1; --butter-deep:#E8C86A;
      --lavender:#C9C1E3; --pale-lavender:rgba(243,241,249,0.55); --lavender-card:rgba(205,197,231,0.36); --white:#FFFFFF;
      --ink:#2A2438; --ink-soft:rgba(42,36,56,0.66); --ink-faint:rgba(42,36,56,0.46);
      --line:rgba(255,255,255,0.6); --line-soft:rgba(255,255,255,0.34);
      --glass-blur:22px;
      --glass-shadow:0 8px 32px rgba(42,36,56,0.16), 0 1px 0 rgba(255,255,255,0.5) inset;
      --ease-spring:cubic-bezier(.34,1.56,.64,1);
    }
    .pragya-root{
      font-family:'Inter',system-ui,sans-serif; color:var(--ink); position:relative; isolation:isolate;
      font-feature-settings:"cv11","ss01"; -webkit-font-smoothing:antialiased;
    }
    .pragya-root h1,.pragya-root h2,.pragya-root h3,.pragya-root .display{
      font-family:'Fraunces',Georgia,serif; font-optical-sizing:auto; letter-spacing:-0.01em;
    }
    .pragya-root ::selection{ background:var(--butter); color:var(--ink); }

    /* ---- Liquid glass ambient backdrop ---- */
    .pragya-bg{
      position:fixed; inset:0; z-index:-1; overflow:hidden;
      background:linear-gradient(160deg,#EFEBFA 0%,#F6F0E4 46%,#EAE3F6 100%);
    }
    .pragya-bg::after{
      content:""; position:absolute; inset:0; opacity:0.5; mix-blend-mode:overlay; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .pragya-orb{ position:absolute; border-radius:50%; filter:blur(70px); will-change:transform; }
    .pragya-orb--1{ width:34rem; height:34rem; top:-12rem; left:-8rem; background:radial-gradient(circle at 30% 30%, var(--plum) 0%, transparent 72%); opacity:0.55; animation:pragyaDrift1 24s ease-in-out infinite; }
    .pragya-orb--2{ width:30rem; height:30rem; bottom:-10rem; right:-6rem; background:radial-gradient(circle at 60% 40%, var(--butter-deep) 0%, transparent 70%); opacity:0.5; animation:pragyaDrift2 28s ease-in-out infinite; }
    .pragya-orb--3{ width:26rem; height:26rem; top:24%; right:8%; background:radial-gradient(circle at 50% 50%, var(--lavender) 0%, transparent 72%); opacity:0.55; animation:pragyaDrift3 32s ease-in-out infinite; }
    .pragya-orb--4{ width:20rem; height:20rem; bottom:12%; left:6%; background:radial-gradient(circle at 50% 50%, var(--butter) 0%, transparent 72%); opacity:0.4; animation:pragyaDrift2 20s ease-in-out infinite reverse; }
    @keyframes pragyaDrift1{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(3rem,4rem) scale(1.06); } }
    @keyframes pragyaDrift2{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(-3.5rem,-2.5rem) scale(1.08); } }
    @keyframes pragyaDrift3{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(-2rem,3rem) scale(0.95); } }
    @media (prefers-reduced-motion: reduce){ .pragya-orb{ animation:none; } }

    /* ---- Core glass surface ---- */
    .pragya-glass{
      background:rgba(255,255,255,0.44);
      backdrop-filter:blur(var(--glass-blur)) saturate(180%);
      -webkit-backdrop-filter:blur(var(--glass-blur)) saturate(180%);
      border:1px solid var(--line);
      box-shadow:var(--glass-shadow);
      position:relative;
    }
    .pragya-glass::before{
      content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
      opacity:0.05; mix-blend-mode:overlay;
    }
    .pragya-glass-nav{
      background:rgba(42,36,56,0.52);
      backdrop-filter:blur(26px) saturate(180%);
      -webkit-backdrop-filter:blur(26px) saturate(180%);
      border-bottom:1px solid rgba(255,255,255,0.14);
    }
    .pragya-glass-dark{
      background:rgba(42,36,56,0.72);
      backdrop-filter:blur(20px) saturate(160%);
      -webkit-backdrop-filter:blur(20px) saturate(160%);
      border:1px solid rgba(255,255,255,0.14);
    }
    /* frost + blur any panel still using the flat lavender-card token via inline style */
    .pragya-root [style*="lavender-card"]{
      backdrop-filter:blur(16px) saturate(170%);
      -webkit-backdrop-filter:blur(16px) saturate(170%);
    }
    .pragya-root [style*="pale-lavender"]{
      backdrop-filter:blur(10px) saturate(160%);
      -webkit-backdrop-filter:blur(10px) saturate(160%);
    }

    /* ---- Signature top edge on activity cards ---- */
    .pragya-card-edge{
      height:6px; width:100%; flex-shrink:0;
      background:linear-gradient(100deg, var(--lavender), var(--butter-deep));
    }

    .pragya-scroll::-webkit-scrollbar{ width:8px; height:8px; }
    .pragya-scroll::-webkit-scrollbar-thumb{ background:rgba(201,193,227,0.7); border-radius:8px; }

    .pragya-btn-primary{
      background:linear-gradient(155deg,#4a4166 0%,#302842 100%);
      color:var(--white); border:1px solid rgba(255,255,255,0.2);
      box-shadow:0 6px 20px rgba(42,36,56,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
      transition:transform .18s var(--ease-spring), box-shadow .18s ease, background .15s ease;
    }
    .pragya-btn-primary:hover{ background:linear-gradient(155deg,#544a75,#3a3350); box-shadow:0 8px 26px rgba(42,36,56,0.4), inset 0 1px 0 rgba(255,255,255,0.3); transform:translateY(-1px); }
    .pragya-btn-primary:active{ transform:translateY(0) scale(0.97); }
    .pragya-btn-primary:disabled{ background:rgba(169,162,187,0.7); box-shadow:none; cursor:not-allowed; transform:none; }

    .pragya-chip{
      background:rgba(255,255,255,0.4); color:var(--plum);
      backdrop-filter:blur(12px) saturate(160%); -webkit-backdrop-filter:blur(12px) saturate(160%);
      border:1px solid var(--line-soft) !important;
      transition:transform .15s var(--ease-spring), background .15s ease;
    }
    .pragya-chip:hover{ background:rgba(255,255,255,0.6); }
    .pragya-chip:active{ transform:scale(0.95); }
    .pragya-chip-active{
      background:rgba(247,227,161,0.8); color:var(--plum-ink);
      backdrop-filter:blur(12px) saturate(160%); -webkit-backdrop-filter:blur(12px) saturate(160%);
      border:1px solid rgba(255,255,255,0.7) !important;
      box-shadow:0 3px 12px rgba(232,200,106,0.4);
    }

    /* ---- Activity cards: a slight, human hand-set tilt instead of a rigid grid ---- */
    .pragya-card{ transition:transform .28s var(--ease-spring), box-shadow .28s ease; }
    .pragya-card:nth-child(3n+1){ transform:rotate(-0.35deg); }
    .pragya-card:nth-child(3n+2){ transform:rotate(0.3deg); }
    .pragya-card:nth-child(3n){ transform:rotate(-0.15deg); }
    .pragya-card:hover{ transform:translateY(-3px) rotate(0deg); box-shadow:0 16px 40px rgba(42,36,56,0.22); }

    /* ---- De-genericize native form controls ---- */
    .pragya-root select{
      -webkit-appearance:none; appearance:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%233A3350' stroke-width='1.6'%3E%3Cpath d='M5 8l5 5 5-5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat:no-repeat; background-position:right 0.7rem center; background-size:14px;
      padding-right:2.25rem;
    }

    .pragya-focus:focus-visible{ outline:none; box-shadow:0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px var(--plum); border-radius:6px; }
    input,select,textarea{ font-family:'Inter',system-ui,sans-serif; }
    .pragya-fade-in{ animation:pragyaFade .25s ease; }
    @keyframes pragyaFade{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);} }
  `}</style>
);

function GlassBackdrop() {
  return (
    <div className="pragya-bg" aria-hidden="true">
      <div className="pragya-orb pragya-orb--1" />
      <div className="pragya-orb pragya-orb--2" />
      <div className="pragya-orb pragya-orb--3" />
      <div className="pragya-orb pragya-orb--4" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reference data (dropdown enums per PRD schema)                      */
/* ------------------------------------------------------------------ */
const CONCEPTS = [
  "Repeating vs. Understanding", "Classification", "Prediction", "Exact Instructions",
  "Input-Rule-Output", "Learning from Examples", "Machine Learning", "AI Ethics",
  "Prediction & Error", "Data Bias", "Decision Making"
];
const CLASS_LEVELS = ["Classes 1–2", "Classes 1–3", "Class 3+", "Classes 6–8", "Classes 9–12"];
const DURATIONS = [30, 35, 40, 45, 60];
const MATERIALS_OPTIONS = ["None (story/chant)", "Paper Only", "Index Cards", "Picture Cards", "Mixed objects", "Cardboard + cards", "Other"];
const LANGUAGES = ["Hindi", "English", "Bilingual"];
const TIERS = ["Foundational (1–3)", "Middle School", "Senior School"];

/* ------------------------------------------------------------------ */
/* Seed activities (hardcoded per PRD §15 pre-build checklist —        */
/* sample content standing in for the Pragya AI Activities pack)       */
/* ------------------------------------------------------------------ */
const SEED_ACTIVITIES = [
  {
    id: "mitthu-miyan", title: "Mitthu Miyan", subtitle: "The parrot who only repeats",
    status: "Published", class_level: "Classes 1–2", duration_mins: 30, language: "Bilingual",
    materials: "None — story + chant", curriculum_tier: "Foundational (1–3)", curriculum_sequence: 1,
    ai_concept: "Repeating vs. Understanding",
    big_idea: "A parrot that repeats every word sounds smart, until you ask it something it has never heard.",
    kids_walk_away_knowing: "Repeating words back isn't the same as understanding them.",
    misconception: "If it talks like it knows, it knows.",
    safety_note: null,
    setting: "A talking parrot named Mitthu, kept in a village courtyard.",
    the_break: "Mitthu is asked a question it has never been taught an answer for, and it just repeats the question back.",
    ask_at_the_end: "Agar Mitthu sirf dohrata hai, toh kya woh sach mein samajhta hai?",
    why_its_real_ai: "Early chat systems that echo patterns without understanding work exactly like Mitthu.",
    shape: {
      setup: "Students learn Mitthu repeats anything said to it, word for word.",
      run: "They test Mitthu with greetings and simple lines. It echoes each one back perfectly.",
      brk: "Someone asks Mitthu a real question. It can only repeat the question, not answer it."
    },
    script: [
      { step_number: 1, time_mins: 5, instruction: "Introduce Mitthu the parrot. Explain the one rule: Mitthu repeats exactly what it hears.", is_break: false },
      { step_number: 2, time_mins: 8, instruction: "Students take turns saying short phrases to 'Mitthu' (a chosen student or puppet). Mitthu repeats each one back.", is_break: false },
      { step_number: 3, time_mins: 7, instruction: "Build confidence: students say trickier phrases, jokes, rhymes. Mitthu keeps repeating flawlessly.", is_break: false },
      { step_number: 4, time_mins: 5, instruction: "THE BREAK — a student asks Mitthu a genuine question ('Kal school aaogi?'). Mitthu can only repeat the question, not answer it.", is_break: true },
      { step_number: 5, time_mins: 5, instruction: "Discuss what just happened. Ask the closing question and connect it to how some machines only echo patterns.", is_break: false }
    ]
  },
  {
    id: "kaun-kiske-ghar", title: "Kaun Kiske Ghar?", subtitle: "Who belongs in whose house?",
    status: "Published", class_level: "Classes 1–3", duration_mins: 30, language: "Bilingual",
    materials: "Picture cards + one trick card", curriculum_tier: "Foundational (1–3)", curriculum_sequence: 2,
    ai_concept: "Classification",
    big_idea: "The grouping isn't in the objects, it's in the rule you choose.",
    kids_walk_away_knowing: "Sorting means picking a rule first, then following it strictly.",
    misconception: "Sorting is just about what looks similar.",
    safety_note: null,
    setting: "Animal picture cards being sorted into 'houses' by habitat.",
    the_break: "A trick card (like a bat) doesn't cleanly fit any house under the class's chosen rule.",
    ask_at_the_end: "Bat kis ghar mein jayega — sky wale mein, ya ek naya ghar chahiye?",
    why_its_real_ai: "This is exactly how a classifier sorts data into categories using a fixed rule.",
    shape: {
      setup: "Three 'houses' are drawn on the floor: sky, water, land. The rule: each animal goes to its house.",
      run: "Students sort a stack of animal cards confidently — bird to sky, fish to water, cow to land.",
      brk: "A bat card appears. It flies, but it isn't quite a 'sky' animal by the rule the class agreed on."
    },
    script: [
      { step_number: 1, time_mins: 4, instruction: "Mark three houses on the floor: Sky, Water, Land. State the rule together as a class.", is_break: false },
      { step_number: 2, time_mins: 8, instruction: "Hand out animal cards one at a time. Students place each in the correct house and explain why.", is_break: false },
      { step_number: 3, time_mins: 6, instruction: "Speed round — cards come faster. The class sorts quickly and confidently using the same rule.", is_break: false },
      { step_number: 4, time_mins: 7, instruction: "THE BREAK — reveal the bat card. Let the class argue about which house it belongs in.", is_break: true },
      { step_number: 5, time_mins: 5, instruction: "Discuss: was the rule wrong, or just incomplete? Ask the closing question.", is_break: false }
    ]
  },
  {
    id: "aage-kya-aayega", title: "Aage Kya Aayega?", subtitle: "What comes next?",
    status: "Published", class_level: "Classes 1–3", duration_mins: 30, language: "Bilingual",
    materials: "Mixed objects, paper", curriculum_tier: "Foundational (1–3)", curriculum_sequence: 3,
    ai_concept: "Prediction",
    big_idea: "Predicting the next thing in a pattern means finding the rule the pattern is following.",
    kids_walk_away_knowing: "Prediction comes from patterns, and a predictor can be fooled.",
    misconception: "Guessing right once means you understood the whole pattern.",
    safety_note: null,
    setting: "A sequence of objects or claps laid out or performed for the class.",
    the_break: "The pattern changes rule halfway through, and the class's confident guess turns out wrong.",
    ask_at_the_end: "Jab pattern badal jaaye, toh hamara andaza galat kyun ho jaata hai?",
    why_its_real_ai: "Predicting the next beat is exactly what predict-the-next-word language models do.",
    shape: {
      setup: "A simple repeating pattern of claps or objects is shown — red, blue, red, blue.",
      run: "Students predict what comes next, again and again, and are right every time.",
      brk: "Midway, the pattern quietly changes its rule. The class's confident next guess is wrong."
    },
    script: [
      { step_number: 1, time_mins: 4, instruction: "Show a simple two-item pattern (e.g. clap-clap-stomp, repeated). Ask students to predict the next beat.", is_break: false },
      { step_number: 2, time_mins: 8, instruction: "Continue the pattern for several rounds. Students predict aloud and are correct each time — confidence builds.", is_break: false },
      { step_number: 3, time_mins: 6, instruction: "Introduce a second, slightly longer pattern using objects on the floor. Repeat the prediction game.", is_break: false },
      { step_number: 4, time_mins: 7, instruction: "THE BREAK — silently shift the underlying rule partway through. The class's next prediction, made with total confidence, is wrong.", is_break: true },
      { step_number: 5, time_mins: 5, instruction: "Ask why the guess failed. Trace it back to the rule, not bad luck. Close with the question.", is_break: false }
    ]
  }
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
function StatusBadge({ status }) {
  const map = {
    "Published": { bg: "var(--lavender-card)", fg: "var(--plum)" },
    "Coming Soon": { bg: "var(--lavender)", fg: "var(--plum-ink)" },
    "In Development": { bg: "var(--butter)", fg: "var(--plum-ink)" },
    "Draft": { bg: "var(--pale-lavender)", fg: "var(--ink-soft)" },
    "Under Review": { bg: "var(--butter)", fg: "var(--plum-ink)" },
    "Archived": { bg: "#e5e3e0", fg: "var(--ink-soft)" }
  };
  const s = map[status] || map["Draft"];
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.fg }}>
      {status}
    </span>
  );
}

function Chip({ children, active, onClick, small }) {
  return (
    <button
      onClick={onClick}
      className={`pragya-focus rounded-full border transition-colors ${small ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"} ${active ? "pragya-chip-active border-transparent font-semibold" : "pragya-chip border-transparent"}`}
    >
      {children}
    </button>
  );
}

function ZigzagBreak({ label = "THE BREAK" }) {
  const w = 600, h = 26, teeth = 20, pts = [];
  for (let i = 0; i <= teeth; i++) {
    const x = (w / teeth) * i;
    const y = i % 2 === 0 ? 4 : h - 4;
    pts.push(`${x},${y}`);
  }
  return (
    <div className="flex items-center gap-3 my-4">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: 40, height: 18, flexShrink: 0 }}>
        <polyline points={pts.slice(0, 6).join(" ")} fill="none" stroke="var(--butter-deep)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--plum)" }}>{label}</span>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ flex: 1, height: 18 }}>
        <polyline points={pts.join(" ")} fill="none" stroke="var(--butter-deep)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pragya-fade-in">
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg" style={{ background: "var(--plum)", color: "var(--white)" }}>
        <CheckCircle2 size={18} style={{ color: "var(--butter)" }} />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="pragya-focus ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
      </div>
    </div>
  );
}

function ShapeOfIt({ activity }) {
  if (!activity.shape) {
    return (
      <div className="text-sm rounded-xl p-4" style={{ background: "var(--lavender-card)", color: "var(--ink-soft)" }}>
        The full activity shape will appear here once this activity is finalised.
      </div>
    );
  }
  const moves = [
    { n: "1", label: "Set up the rule", text: activity.shape.setup },
    { n: "2", label: "Let them run it", text: activity.shape.run }
  ];
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        {moves.map(m => (
          <div key={m.n} className="rounded-xl p-4" style={{ background: "var(--lavender-card)" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--plum)", color: "var(--white)" }}>{m.n}</span>
              <span className="text-sm font-semibold" style={{ color: "var(--plum)" }}>{m.label}</span>
            </div>
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{m.text}</p>
          </div>
        ))}
      </div>
      <ZigzagBreak />
      <div className="rounded-xl p-4 border-2" style={{ background: "var(--butter)", borderColor: "var(--butter-deep)" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--plum)", color: "var(--white)" }}>3</span>
          <span className="text-sm font-semibold" style={{ color: "var(--plum-ink)" }}>Break it</span>
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--plum-ink)" }}>{activity.shape.brk}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Login                                                                */
/* ------------------------------------------------------------------ */
const ROLE_INFO = {
  "Licensed Teacher": { icon: GraduationCap, tabLabel: "Licensed Teacher", blurb: "Full access to the official library, downloads, and your own activity builder." },
  "Admin": { icon: Settings, tabLabel: "Admin", blurb: "Admin" },
  "Guest": { icon: Users, tabLabel: "Guest teacher", blurb: "Preview a handful of activities right away." }
};

function LoginView({ onLogin }) {
  const [tab, setTab] = useState("Licensed Teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const info = ROLE_INFO[tab];
  const Icon = info.icon;

  const submit = () => {
    if (!email.trim() || !password.trim()) { setError("Enter an email and password to continue."); return; }
    setError("");
    onLogin(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md pragya-fade-in">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center font-bold text-sm mb-3" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>PA</div>
          <h1 className="display font-extrabold text-2xl" style={{ color: "var(--plum-ink)" }}>Pragya AI</h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>Screen-free AI activities for your classroom.</p>
        </div>

        <div className="rounded-3xl pragya-glass border p-6" style={{ borderColor: "var(--line)" }}>
          <div className="flex gap-1 mb-5 p-1 rounded-xl" style={{ background: "var(--lavender-card)" }}>
            {Object.keys(ROLE_INFO).map(r => (
              <button key={r} onClick={() => { setTab(r); setError(""); }}
                className="pragya-focus flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: tab === r ? "rgba(255,255,255,0.85)" : "transparent", color: "var(--plum)", boxShadow: tab === r ? "0 3px 12px rgba(42,36,56,0.14)" : "none" }}>
                {ROLE_INFO[r].tabLabel}
              </button>
            ))}
          </div>

          <div className="flex items-start gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--lavender-card)", color: "var(--plum)" }}>
              <Icon size={16} />
            </div>
            <p className="text-xs leading-snug pt-1.5" style={{ color: "var(--ink-soft)" }}>{info.blurb}</p>
          </div>

          {tab === "Guest" ? (
            <button onClick={() => onLogin("Guest")} className="pragya-focus pragya-btn-primary w-full py-3 rounded-xl font-semibold text-sm">
              Continue as guest
            </button>
          ) : (
            <>
              <Field label="Email">
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--ink-faint)" }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu"
                    className="pragya-focus w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm pragya-glass" style={{ borderColor: "var(--line)" }} />
                </div>
              </Field>
              <Field label="Password">
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--ink-faint)" }} />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="pragya-focus w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm pragya-glass" style={{ borderColor: "var(--line)" }} />
                </div>
              </Field>

              {error && (
                <div className="flex items-center gap-2 text-sm rounded-lg p-3 mb-4" style={{ background: "#fdeceb", color: "#b23b3b" }}>
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <button onClick={submit} className="pragya-focus pragya-btn-primary w-full py-3 rounded-xl font-semibold text-sm">
                Log in as {tab}
              </button>
              <p className="text-[11px] text-center mt-3" style={{ color: "var(--ink-faint)" }}>
                Preview build: for the purpose of prototype kindly type in "admin" or "teacher" or "guest" as email and any password to continue.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */
function NavBar({ view, setView, role, onLogout, mobileOpen, setMobileOpen }) {
  const navItems = [
    { key: "library", label: "Library", icon: LayoutGrid, show: true },
    { key: "builder", label: "Create activity", icon: Plus, show: role !== "Guest" },
    { key: "admin", label: "Admin panel", icon: Settings, show: role === "Admin" }
  ];
  return (
    <div className="pragya-glass-nav sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setView("library")} className="pragya-focus flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>PA</div>
            <div className="text-left leading-tight hidden sm:block">
              <div className="display font-bold text-white text-sm">Pragya AI</div>
              <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Activity Platform</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.filter(n => n.show).map(n => {
              const Icon = n.icon;
              const active = view === n.key;
              return (
                <button key={n.key} onClick={() => setView(n.key)}
                  className="pragya-focus flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: active ? "rgba(255,255,255,0.12)" : "transparent", color: active ? "var(--butter)" : "rgba(255,255,255,0.85)" }}>
                  <Icon size={16} /> {n.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 pl-3 pr-1 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>
                {role === "Guest" ? "Guest teacher" : role}
              </span>
              <button onClick={onLogout} className="pragya-focus flex items-center gap-1 pl-2 pr-2.5 py-1.5 rounded-full text-xs font-medium transition-colors" style={{ color: "rgba(255,255,255,0.75)" }}>
                <LogOut size={13} /> Log out
              </button>
            </div>
            <button className="pragya-focus md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pragya-fade-in">
            <div className="flex items-center justify-between mb-3 px-0.5">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>
                {role === "Guest" ? "Guest teacher" : role}
              </span>
              <button onClick={onLogout} className="pragya-focus flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                <LogOut size={14} /> Log out
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {navItems.filter(n => n.show).map(n => {
                const Icon = n.icon;
                return (
                  <button key={n.key} onClick={() => { setView(n.key); setMobileOpen(false); }}
                    className="pragya-focus flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{ background: view === n.key ? "rgba(255,255,255,0.12)" : "transparent", color: view === n.key ? "var(--butter)" : "rgba(255,255,255,0.85)" }}>
                    <Icon size={16} /> {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="text-center py-1.5 text-[11px] font-medium tracking-wide" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>
      Built for Bharat.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Activity card + Library view                                        */
/* ------------------------------------------------------------------ */
function ActivityCard({ activity, onSelect }) {
  return (
    <button onClick={() => onSelect(activity.id)}
      className="pragya-card pragya-focus text-left rounded-2xl pragya-glass border overflow-hidden flex flex-col h-full"
      style={{ borderColor: "var(--line)" }}>
      <div className="pragya-card-edge" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="display font-bold text-lg leading-snug" style={{ color: "var(--plum-ink)" }}>{activity.title}</h3>
          <StatusBadge status={activity.status} />
        </div>
        <p className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>{activity.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Chip small>{activity.class_level}</Chip>
          <Chip small>{activity.duration_mins} min</Chip>
          <Chip small>{activity.language}</Chip>
        </div>
        <div className="mt-auto pt-3 border-t" style={{ borderColor: "var(--line-soft)" }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--ink-faint)" }}>Teaches</div>
          <div className="text-sm font-medium" style={{ color: "var(--plum)" }}>{activity.ai_concept}</div>
        </div>
      </div>
    </button>
  );
}

const GUEST_FREE_LIMIT = 1;

function GuestPaywall({ teaserActivities, hiddenCount, onSubscribe }) {
  return (
    <div className="relative mt-4 rounded-2xl overflow-hidden">
      {teaserActivities.length > 0 && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 select-none" style={{ filter: "blur(6px)", opacity: 0.5 }} aria-hidden="true">
          {teaserActivities.map(a => <ActivityCard key={a.id} activity={a} onSelect={() => {}} />)}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="pragya-glass rounded-2xl border p-6 text-center max-w-sm pragya-fade-in" style={{ borderColor: "var(--line)" }}>
          <div className="w-11 h-11 mx-auto rounded-full flex items-center justify-center mb-3" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>
            <Lock size={18} />
          </div>
          <p className="font-bold mb-1" style={{ color: "var(--plum-ink)" }}>
            {hiddenCount} more {hiddenCount === 1 ? "activity" : "activities"} waiting
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
            Subscribe to unlock the full Pragya AI library.
          </p>
          <button onClick={onSubscribe} className="pragya-focus pragya-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">
            Subscribe to unlock
          </button>
        </div>
      </div>
    </div>
  );
}

const FILTER_GROUPS = [
  { key: "class_level", label: "Class level", options: CLASS_LEVELS },
  { key: "duration_mins", label: "Duration", options: DURATIONS.map(d => `${d} min`) },
  { key: "language", label: "Language", options: LANGUAGES },
  { key: "ai_concept", label: "AI concept", options: CONCEPTS },
  { key: "materials_group", label: "Materials needed", options: MATERIALS_OPTIONS },
  { key: "curriculum_tier", label: "Curriculum tier", options: TIERS }
];

function FilterPanel({ filters, toggleFilter, clearFilters }) {
  const anyActive = Object.values(filters).some(s => s.size > 0);
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--lavender-card)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "var(--plum)" }}>
          <SlidersHorizontal size={15} /> Filters
        </div>
        {anyActive && (
          <button onClick={clearFilters} className="pragya-focus text-xs font-semibold underline" style={{ color: "var(--plum)" }}>Clear all</button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {FILTER_GROUPS.map(group => (
          <div key={group.key}>
            <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--ink-faint)" }}>{group.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.options.map(opt => (
                <Chip key={opt} small active={filters[group.key].has(opt)} onClick={() => toggleFilter(group.key, opt)}>{opt}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryView({ activities, customActivities, role, onSelect, onCreate, filters, toggleFilter, clearFilters, search, setSearch, sortBy, setSortBy, mineOnly, setMineOnly, onSubscribe }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Fixed regardless of search/filters/sort, so a guest can't search their way past the paywall.
  const guestFreeIds = useMemo(() => {
    return [...activities]
      .filter(a => a.status === "Published")
      .sort((a, b) => (a.curriculum_sequence || 99) - (b.curriculum_sequence || 99))
      .slice(0, GUEST_FREE_LIMIT)
      .map(a => a.id);
  }, [activities]);

  const visible = useMemo(() => {
    let list = mineOnly ? customActivities : activities.filter(a => a.status === "Published" || role === "Admin");
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.ai_concept.toLowerCase().includes(q)
      );
    }
    Object.entries(filters).forEach(([key, set]) => {
      if (set.size === 0) return;
      list = list.filter(a => {
        if (key === "duration_mins") return set.has(`${a.duration_mins} min`);
        if (key === "materials_group") return [...set].some(m => a.materials.toLowerCase().includes(m.toLowerCase().split(" (")[0].split(" only")[0]));
        return set.has(a[key]);
      });
    });
    const sorted = [...list];
    if (sortBy === "sequence") sorted.sort((a, b) => (a.curriculum_sequence || 99) - (b.curriculum_sequence || 99));
    if (sortBy === "class") sorted.sort((a, b) => a.class_level.localeCompare(b.class_level));
    if (sortBy === "duration") sorted.sort((a, b) => a.duration_mins - b.duration_mins);
    return sorted;
  }, [activities, customActivities, mineOnly, search, filters, sortBy, role]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="display font-extrabold text-3xl mb-1" style={{ color: "var(--plum-ink)" }}>Activity library</h1>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
        </p>
      </div>

      {role === "Licensed Teacher" && (
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: "var(--lavender-card)" }}>
          <button onClick={() => setMineOnly(false)} className="pragya-focus px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: !mineOnly ? "rgba(255,255,255,0.8)" : "transparent", color: "var(--plum)", boxShadow: !mineOnly ? "0 3px 12px rgba(42,36,56,0.14)" : "none", backdropFilter: !mineOnly ? "blur(8px)" : "none" }}>Official library</button>
          <button onClick={() => setMineOnly(true)} className="pragya-focus px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: mineOnly ? "rgba(255,255,255,0.8)" : "transparent", color: "var(--plum)", boxShadow: mineOnly ? "0 3px 12px rgba(42,36,56,0.14)" : "none", backdropFilter: mineOnly ? "blur(8px)" : "none" }}>My activities ({customActivities.length})</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block w-64 shrink-0">
          {!mineOnly && <FilterPanel filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-faint)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, subtitle, or AI concept"
                className="pragya-focus w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm pragya-glass"
                style={{ borderColor: "var(--line)" }} />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="pragya-focus px-3 py-2.5 rounded-xl border text-sm pragya-glass" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
              <option value="sequence">Sort: curriculum sequence</option>
              <option value="class">Sort: class level</option>
              <option value="duration">Sort: duration</option>
            </select>
            {!mineOnly && (
              <button onClick={() => setFiltersOpen(true)} className="pragya-focus lg:hidden flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold pragya-glass"
                style={{ borderColor: "var(--line)", color: "var(--plum)" }}>
                <SlidersHorizontal size={15} /> Filters
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border-2 border-dashed" style={{ borderColor: "var(--line)" }}>
              {mineOnly ? (
                <>
                  <p className="font-semibold mb-1" style={{ color: "var(--plum-ink)" }}>Build your first activity.</p>
                  <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>Use the same set up, run it, break it structure as every official Pragya AI activity.</p>
                  <button onClick={onCreate} className="pragya-focus pragya-btn-primary px-4 py-2 rounded-lg text-sm font-semibold">Create activity</button>
                </>
              ) : (
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>No activities match these filters. Try clearing a few.</p>
              )}
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {(role === "Guest" ? visible.filter(a => guestFreeIds.includes(a.id)) : visible).map(a => <ActivityCard key={a.id} activity={a} onSelect={onSelect} />)}
              </div>
              {role === "Guest" && visible.some(a => !guestFreeIds.includes(a.id)) && (() => {
                const locked = visible.filter(a => !guestFreeIds.includes(a.id));
                return (
                  <GuestPaywall
                    teaserActivities={locked.slice(0, 3)}
                    hiddenCount={locked.length}
                    onSubscribe={onSubscribe}
                  />
                );
              })()}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="relative ml-auto w-80 max-w-[85vw] h-full pragya-glass p-4 overflow-y-auto pragya-scroll pragya-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold" style={{ color: "var(--plum-ink)" }}>Filters</span>
              <button onClick={() => setFiltersOpen(false)} className="pragya-focus"><X size={20} /></button>
            </div>
            <FilterPanel filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Detail view                                                         */
/* ------------------------------------------------------------------ */
function DetailView({ activity, allActivities, role, onBack, onSelect, onDownload }) {
  if (!activity) return null;
  const canDownload = role === "Licensed Teacher" || role === "Admin";
  const tierPeers = allActivities.filter(a => a.curriculum_sequence).sort((a, b) => a.curriculum_sequence - b.curriculum_sequence);
  const idx = tierPeers.findIndex(a => a.id === activity.id);
  const prev = idx > 0 ? tierPeers[idx - 1] : null;
  const next = idx >= 0 && idx < tierPeers.length - 1 ? tierPeers[idx + 1] : null;
  const related = tierPeers.filter(a => a.id !== activity.id && (a.ai_concept === activity.ai_concept || a === prev || a === next)).slice(0, 3);
  const inDev = activity.status === "In Development";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={onBack} className="pragya-focus flex items-center gap-1.5 text-sm font-semibold mb-6" style={{ color: "var(--plum)" }}>
        <ArrowLeft size={15} /> Back to library
      </button>

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="display font-extrabold text-3xl" style={{ color: "var(--plum-ink)" }}>{activity.title}</h1>
        <StatusBadge status={activity.status} />
      </div>
      <p className="text-lg mb-5" style={{ color: "var(--ink-soft)" }}>{activity.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <Chip small>{activity.class_level}</Chip>
        <Chip small>{activity.duration_mins} min</Chip>
        <Chip small>{activity.language}</Chip>
        <Chip small>{activity.materials}</Chip>
        <Chip small>{activity.curriculum_tier}</Chip>
      </div>

      {activity.safety_note && (
        <div className="flex items-start gap-2 rounded-xl p-3 mb-6 text-sm" style={{ background: "#fdf3e2", color: "#7a5410" }}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span><strong className="font-semibold">Safety note.</strong> {activity.safety_note}</span>
        </div>
      )}

      {inDev && (
        <div className="rounded-xl p-4 mb-6 text-sm" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>
          This activity is still in development. The blueprint below is a placeholder — the full facilitator script isn't ready to download yet.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl p-5 pragya-glass border" style={{ borderColor: "var(--line)" }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--ink-faint)" }}>The big idea</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{activity.big_idea}</p>
        </div>
        <div className="rounded-2xl p-5 pragya-glass border" style={{ borderColor: "var(--line)" }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--ink-faint)" }}>Kids walk away knowing</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{activity.kids_walk_away_knowing}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="display font-bold text-lg mb-3" style={{ color: "var(--plum-ink)" }}>The shape of it</h2>
        <ShapeOfIt activity={activity} />
      </div>

      <div className="rounded-2xl p-5 mb-8" style={{ background: "var(--lavender-card)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={16} style={{ color: "var(--plum)" }} />
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--plum)" }}>Why it's real AI</span>
        </div>
        <p className="text-sm" style={{ color: "var(--ink)" }}>{activity.why_its_real_ai}</p>
      </div>

      {!inDev && activity.script.length > 0 && (
        <div className="mb-8">
          <h2 className="display font-bold text-lg mb-3" style={{ color: "var(--plum-ink)" }}>Facilitator script</h2>
          <div className="flex flex-col gap-2">
            {activity.script.map(step => (
              <div key={step.step_number}
                className="rounded-xl p-4 border-2"
                style={{ background: step.is_break ? "var(--butter)" : "white", borderColor: step.is_break ? "var(--butter-deep)" : "var(--line)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: step.is_break ? "var(--plum)" : "var(--lavender-card)", color: step.is_break ? "var(--butter)" : "var(--plum)" }}>
                    {step.step_number} · {step.time_mins} min
                  </span>
                  {step.is_break && <span className="text-xs font-extrabold tracking-widest uppercase" style={{ color: "var(--plum-ink)" }}>THE BREAK</span>}
                </div>
                <p className="text-sm" style={{ color: step.is_break ? "var(--plum-ink)" : "var(--ink)" }}>{step.instruction}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl p-4 pragya-glass border" style={{ borderColor: "var(--line)" }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--ink-faint)" }}>Ask at the end</div>
            <p className="text-sm italic" style={{ color: "var(--ink)" }}>"{activity.ask_at_the_end}"</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        {canDownload && !inDev ? (
          <button onClick={() => onDownload(activity.title)} className="pragya-focus pragya-btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm">
            <Download size={16} /> Download facilitator pack
          </button>
        ) : (
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm w-fit" style={{ background: "var(--lavender-card)", color: "var(--ink-soft)" }}>
            <Lock size={15} /> {inDev ? "Download available once published" : "Sign in with a school licence to download"}
          </div>
        )}
      </div>

      <div className="mb-8 rounded-2xl p-5 pragya-glass border" style={{ borderColor: "var(--line)" }}>
        <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "var(--ink-faint)" }}>Where it sits in the curriculum</div>
        <div className="flex items-center gap-3 text-sm">
          <button disabled={!prev} onClick={() => prev && onSelect(prev.id)} className="pragya-focus flex items-center gap-1 disabled:opacity-30 font-medium" style={{ color: "var(--plum)" }}>
            <ChevronLeft size={16} /> {prev ? prev.title : "Start"}
          </button>
          <div className="flex-1 h-0.5" style={{ background: "var(--line)" }} />
          <span className="font-bold px-3 py-1 rounded-full" style={{ background: "var(--butter)", color: "var(--plum-ink)" }}>{activity.title}</span>
          <div className="flex-1 h-0.5" style={{ background: "var(--line)" }} />
          <button disabled={!next} onClick={() => next && onSelect(next.id)} className="pragya-focus flex items-center gap-1 disabled:opacity-30 font-medium" style={{ color: "var(--plum)" }}>
            {next ? next.title : "End"} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="display font-bold text-lg mb-3" style={{ color: "var(--plum-ink)" }}>Related activities</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map(r => <ActivityCard key={r.id} activity={r} onSelect={onSelect} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Builder                                                              */
/* ------------------------------------------------------------------ */
const EMPTY_BLUEPRINT = {
  title: "", ai_concept: CONCEPTS[0], customConcept: "", big_idea: "", kids_walk_away_knowing: "",
  misconception: "", class_level: CLASS_LEVELS[0], duration_mins: DURATIONS[0], materials: MATERIALS_OPTIONS[0],
  language: LANGUAGES[2], safety_note: "", setting: "", the_break: "", ask_at_the_end: "", why_its_real_ai: ""
};

function Field({ label, required, children, hint }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--plum-ink)" }}>
        {label} {required && <span style={{ color: "#b23b3b" }}>*</span>}
      </label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: "var(--ink-faint)" }}>{hint}</p>}
    </div>
  );
}
const inputClass = "pragya-focus w-full px-3 py-2.5 rounded-lg border text-sm pragya-glass";
const inputStyle = { borderColor: "var(--line)" };

function BlueprintForm({ data, setData, onNext }) {
  const [error, setError] = useState("");
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const submit = () => {
    const required = ["title", "big_idea", "kids_walk_away_knowing", "misconception", "setting", "the_break", "ask_at_the_end", "why_its_real_ai"];
    const missing = required.find(k => !data[k].trim());
    if (missing) { setError("Fill in every required field before continuing — The break moment cannot be left blank."); return; }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="display font-bold text-xl mb-1" style={{ color: "var(--plum-ink)" }}>Step 1 · Activity blueprint</h2>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Structural decisions first, no facilitator script yet — this mirrors how every Pragya AI activity is designed.</p>

      <div className="grid sm:grid-cols-2 gap-x-5">
        <Field label="Activity title" required>
          <input className={inputClass} style={inputStyle} value={data.title} onChange={e => update("title", e.target.value)} placeholder="Hindi, English, or both" />
        </Field>
        <Field label="AI concept to teach" required>
          <select className={inputClass} style={inputStyle} value={data.ai_concept} onChange={e => update("ai_concept", e.target.value)}>
            {CONCEPTS.map(c => <option key={c} value={c}>{c}</option>)}
            <option value="Other">Other (specify below)</option>
          </select>
          {data.ai_concept === "Other" && (
            <input className={`${inputClass} mt-2`} style={inputStyle} value={data.customConcept} onChange={e => update("customConcept", e.target.value)} placeholder="Enter a custom concept" />
          )}
        </Field>
      </div>

      <Field label="The big idea" required hint="One or two sentences, written for the facilitator.">
        <textarea rows={2} className={inputClass} style={inputStyle} value={data.big_idea} onChange={e => update("big_idea", e.target.value)} placeholder="The insight this activity delivers" />
      </Field>

      <Field label="Kids walk away knowing" required hint="One sentence — the shift in student understanding after the break.">
        <input className={inputClass} style={inputStyle} value={data.kids_walk_away_knowing} onChange={e => update("kids_walk_away_knowing", e.target.value)} />
      </Field>

      <Field label="Misconception to break" required hint="The wrong belief students hold going in.">
        <input className={inputClass} style={inputStyle} value={data.misconception} onChange={e => update("misconception", e.target.value)} placeholder="e.g. AI always gets it right" />
      </Field>

      <div className="grid sm:grid-cols-3 gap-x-5">
        <Field label="Class level" required>
          <select className={inputClass} style={inputStyle} value={data.class_level} onChange={e => update("class_level", e.target.value)}>
            {CLASS_LEVELS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Duration" required>
          <select className={inputClass} style={inputStyle} value={data.duration_mins} onChange={e => update("duration_mins", Number(e.target.value))}>
            {DURATIONS.map(d => <option key={d} value={d}>{d} min</option>)}
          </select>
        </Field>
        <Field label="Language" required>
          <select className={inputClass} style={inputStyle} value={data.language} onChange={e => update("language", e.target.value)}>
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-5">
        <Field label="Materials needed" required>
          <select className={inputClass} style={inputStyle} value={data.materials} onChange={e => update("materials", e.target.value)}>
            {MATERIALS_OPTIONS.map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Safety note" hint="Leave blank if none.">
          <input className={inputClass} style={inputStyle} value={data.safety_note} onChange={e => update("safety_note", e.target.value)} placeholder="e.g. No small beads — use strips ≥ 4 cm" />
        </Field>
      </div>

      <Field label="Setting / context" required hint="The real-world scenario or framing.">
        <input className={inputClass} style={inputStyle} value={data.setting} onChange={e => update("setting", e.target.value)} placeholder="e.g. a vegetable market, a magic box in the classroom" />
      </Field>

      <Field label="The break moment" required hint="Describe the specific moment when the rule fails — this is the pivot and cannot be left blank.">
        <textarea rows={2} className={inputClass} style={{ ...inputStyle, background: "#fffdf6" }} value={data.the_break} onChange={e => update("the_break", e.target.value)} />
      </Field>

      <Field label="Ask at the end" required hint="One closing question in the students' voice, in Hindi or bilingual. Must be a question.">
        <input className={inputClass} style={inputStyle} value={data.ask_at_the_end} onChange={e => update("ask_at_the_end", e.target.value)} placeholder="e.g. Jaadu ki peti mein jaadu hai, ya sirf ek niyam?" />
      </Field>

      <Field label="Why it's real AI" required hint="One sentence connecting this activity to actual AI behaviour — no jargon.">
        <input className={inputClass} style={inputStyle} value={data.why_its_real_ai} onChange={e => update("why_its_real_ai", e.target.value)} />
      </Field>

      {error && (
        <div className="flex items-center gap-2 text-sm rounded-lg p-3 mb-4" style={{ background: "#fdeceb", color: "#b23b3b" }}>
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <button onClick={submit} className="pragya-focus pragya-btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm">
        Review blueprint <ArrowRight size={16} />
      </button>
    </div>
  );
}

function ReviewBlueprint({ data, onBack, onApprove }) {
  const concept = data.ai_concept === "Other" ? data.customConcept : data.ai_concept;
  const rows = [
    ["Teaches", concept], ["Classes", data.class_level], ["Duration", `${data.duration_mins} min`],
    ["Materials", data.materials], ["Language", data.language], ["Setting", data.setting],
    ["The big idea", data.big_idea], ["Kids walk away knowing", data.kids_walk_away_knowing],
    ["Misconception to break", data.misconception], ["The break moment", data.the_break],
    ["Ask at the end", data.ask_at_the_end], ["Why it's real AI", data.why_its_real_ai]
  ];
  if (data.safety_note) rows.push(["Safety note", data.safety_note]);

  return (
    <div>
      <h2 className="display font-bold text-xl mb-1" style={{ color: "var(--plum-ink)" }}>Step 2 · Review blueprint</h2>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Check the structure before any script gets written. Edit anything that doesn't feel right yet.</p>

      <div className="rounded-2xl pragya-glass border p-5 mb-6" style={{ borderColor: "var(--line)" }}>
        <h3 className="display font-bold text-lg mb-4" style={{ color: "var(--plum-ink)" }}>{data.title || "Untitled activity"}</h3>
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--line-soft)" }}>
          {rows.map(([label, value]) => (
            <div key={label} className="py-2.5 grid grid-cols-3 gap-3" style={{ borderColor: "var(--line-soft)" }}>
              <div className="text-xs font-bold uppercase tracking-wide col-span-1" style={{ color: "var(--ink-faint)" }}>{label}</div>
              <div className="text-sm col-span-2" style={{ color: "var(--ink)" }}>{value || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="pragya-focus flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: "var(--line)", color: "var(--plum)" }}>
          <ArrowLeft size={16} /> Edit blueprint
        </button>
        <button onClick={onApprove} className="pragya-focus pragya-btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm">
          Approve and write script <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ScriptForm({ blueprint, script, setScript, extra, setExtra, onBack, onNext }) {
  const [error, setError] = useState("");

  const addStep = () => {
    if (script.length >= 8) return;
    setScript([...script, { step_number: script.length + 1, time_mins: 5, instruction: "", is_break: false }]);
  };
  const removeStep = (i) => {
    if (script.length <= 1) return;
    const next = script.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, step_number: idx + 1 }));
    setScript(next);
  };
  const updateStep = (i, k, v) => {
    setScript(script.map((s, idx) => idx === i ? { ...s, [k]: v } : (k === "is_break" && v ? { ...s, is_break: false } : s)));
  };

  const submit = () => {
    if (script.length < 4) { setError("Add at least 4 steps (maximum 8)."); return; }
    const breakStep = script.find(s => s.is_break);
    if (!breakStep) { setError("Mark one step as THE BREAK — the builder won't save without it."); return; }
    if (!breakStep.instruction.trim()) { setError("THE BREAK step cannot be blank."); return; }
    if (script.some(s => !s.instruction.trim())) { setError("Every step needs an instruction."); return; }
    if (!extra.materials_list.trim()) { setError("Add a materials list before saving."); return; }
    setError("");
    onNext();
  };

  return (
    <div>
      <h2 className="display font-bold text-xl mb-1" style={{ color: "var(--plum-ink)" }}>Step 3 · Facilitator script</h2>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Numbered steps with time budgets. Mark exactly one step as THE BREAK — it's mandatory and cannot be blank.</p>

      <div className="flex flex-col gap-3 mb-4">
        {script.map((step, i) => (
          <div key={i} className="rounded-xl p-4 border-2" style={{ background: step.is_break ? "var(--butter)" : "white", borderColor: step.is_break ? "var(--butter-deep)" : "var(--line)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold" style={{ color: "var(--plum-ink)" }}>Step {step.step_number}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer" style={{ color: "var(--plum-ink)" }}>
                  <input type="radio" name="break-step" checked={step.is_break} onChange={() => updateStep(i, "is_break", true)} /> THE BREAK
                </label>
                <select value={step.time_mins} onChange={e => updateStep(i, "time_mins", Number(e.target.value))}
                  className="pragya-focus text-xs px-1.5 py-1 rounded border pragya-glass" style={{ borderColor: "var(--line)" }}>
                  {[3, 4, 5, 6, 7, 8, 10, 12].map(t => <option key={t} value={t}>{t} min</option>)}
                </select>
                {script.length > 1 && (
                  <button onClick={() => removeStep(i)} className="pragya-focus" style={{ color: "var(--ink-faint)" }}><Trash2 size={14} /></button>
                )}
              </div>
            </div>
            <textarea rows={2} value={step.instruction} onChange={e => updateStep(i, "instruction", e.target.value)}
              placeholder={step.is_break ? "Describe the moment the rule fails, in facilitator instructions." : "Facilitator instruction for this step"}
              className="pragya-focus w-full px-3 py-2 rounded-lg border text-sm pragya-glass" style={{ borderColor: "var(--line)" }} />
          </div>
        ))}
      </div>

      <button onClick={addStep} disabled={script.length >= 8} className="pragya-focus flex items-center gap-1.5 text-sm font-semibold mb-6 disabled:opacity-40" style={{ color: "var(--plum)" }}>
        <Plus size={15} /> Add step {script.length >= 8 && "(maximum 8)"}
      </button>

      <Field label="Adjust for the class" hint="How to simplify for the lower end of the range, or extend for the upper end.">
        <textarea rows={2} className={inputClass} style={inputStyle} value={extra.adjust_for_class} onChange={e => setExtra({ ...extra, adjust_for_class: e.target.value })} />
      </Field>

      <Field label="Ask at the end" required>
        <input className={inputClass} style={inputStyle} value={extra.ask_at_the_end} onChange={e => setExtra({ ...extra, ask_at_the_end: e.target.value })} />
      </Field>

      <Field label="Materials list" required hint="Exact list of what to prepare or collect before the session.">
        <textarea rows={2} className={inputClass} style={inputStyle} value={extra.materials_list} onChange={e => setExtra({ ...extra, materials_list: e.target.value })} />
      </Field>

      <Field label="Safety note" hint="Pre-filled from the blueprint — editable here.">
        <input className={inputClass} style={inputStyle} value={extra.safety_note} onChange={e => setExtra({ ...extra, safety_note: e.target.value })} />
      </Field>

      {error && (
        <div className="flex items-center gap-2 text-sm rounded-lg p-3 mb-4" style={{ background: "#fdeceb", color: "#b23b3b" }}>
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="pragya-focus flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: "var(--line)", color: "var(--plum)" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={submit} className="pragya-focus pragya-btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm">
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SaveScreen({ blueprint, onBack, onSave, onSaveAndSubmit, saved }) {
  if (saved) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--butter)" }}>
          <Check size={26} style={{ color: "var(--plum-ink)" }} />
        </div>
        <h2 className="display font-bold text-xl mb-2" style={{ color: "var(--plum-ink)" }}>
          {saved === "submitted" ? "Saved and submitted for review" : "Saved to your library"}
        </h2>
        <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--ink-soft)" }}>
          {saved === "submitted"
            ? "The Pragya AI team will review your activity for inclusion in the official library."
            : "It's visible only to you and your school. You can submit it for review any time."}
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="display font-bold text-xl mb-1" style={{ color: "var(--plum-ink)" }}>Step 4 · Save and optionally submit</h2>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
        "{blueprint.title || "Untitled activity"}" will be saved to your personal library first, visible only to you and your school.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onSave} className="pragya-focus flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: "var(--line)", color: "var(--plum)" }}>
          <Save size={16} /> Save to my library
        </button>
        <button onClick={onSaveAndSubmit} className="pragya-focus pragya-btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm">
          <Send size={16} /> Save and submit for review
        </button>
      </div>
      <button onClick={onBack} className="pragya-focus flex items-center gap-1.5 text-sm font-semibold mt-5" style={{ color: "var(--ink-soft)" }}>
        <ArrowLeft size={14} /> Back to script
      </button>
    </div>
  );
}

function BuilderView({ role, onSaved }) {
  const [step, setStep] = useState(1);
  const [blueprint, setBlueprint] = useState(EMPTY_BLUEPRINT);
  const [script, setScript] = useState([
    { step_number: 1, time_mins: 5, instruction: "", is_break: false },
    { step_number: 2, time_mins: 5, instruction: "", is_break: false },
    { step_number: 3, time_mins: 5, instruction: "", is_break: false },
    { step_number: 4, time_mins: 5, instruction: "", is_break: false }
  ]);
  const [extra, setExtra] = useState({ adjust_for_class: "", ask_at_the_end: "", materials_list: "", safety_note: "" });
  const [saved, setSaved] = useState(null);

  React.useEffect(() => { setExtra(e => ({ ...e, ask_at_the_end: blueprint.ask_at_the_end, safety_note: blueprint.safety_note })); }, [step === 3]);

  const steps = ["Blueprint", "Review", "Script", "Save"];

  const finalize = (status) => {
    const concept = blueprint.ai_concept === "Other" ? blueprint.customConcept : blueprint.ai_concept;
    const newActivity = {
      id: `custom-${Date.now()}`, title: blueprint.title || "Untitled activity", subtitle: "Teacher-created activity",
      status: status === "submitted" ? "Under Review" : "Draft", class_level: blueprint.class_level, duration_mins: blueprint.duration_mins,
      language: blueprint.language, materials: blueprint.materials, curriculum_tier: "Teacher-created", curriculum_sequence: null,
      ai_concept: concept, big_idea: blueprint.big_idea, kids_walk_away_knowing: blueprint.kids_walk_away_knowing,
      misconception: blueprint.misconception, safety_note: extra.safety_note || null, setting: blueprint.setting,
      the_break: blueprint.the_break, ask_at_the_end: extra.ask_at_the_end, why_its_real_ai: blueprint.why_its_real_ai,
      shape: { setup: blueprint.setting, run: "Facilitator-led, following the numbered steps below.", brk: blueprint.the_break },
      script, materials_list: extra.materials_list, adjust_for_class: extra.adjust_for_class
    };
    onSaved(newActivity, status);
    setSaved(status);
  };

  if (role === "Guest") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <Lock size={28} className="mx-auto mb-4" style={{ color: "var(--plum)" }} />
        <h1 className="display font-bold text-2xl mb-2" style={{ color: "var(--plum-ink)" }}>The Activity Builder needs a licence</h1>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Switch to Licensed Teacher above to try building an activity.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: step > i + 1 || saved ? "var(--plum)" : step === i + 1 ? "var(--butter)" : "var(--lavender-card)", color: step > i + 1 || saved ? "white" : step === i + 1 ? "var(--plum-ink)" : "var(--ink-faint)" }}>
                {step > i + 1 || saved ? <Check size={13} /> : i + 1}
              </div>
              <span className="text-xs font-semibold hidden sm:inline" style={{ color: step === i + 1 ? "var(--plum)" : "var(--ink-faint)" }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-0.5" style={{ background: "var(--line)" }} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && <BlueprintForm data={blueprint} setData={setBlueprint} onNext={() => setStep(2)} />}
      {step === 2 && <ReviewBlueprint data={blueprint} onBack={() => setStep(1)} onApprove={() => setStep(3)} />}
      {step === 3 && <ScriptForm blueprint={blueprint} script={script} setScript={setScript} extra={extra} setExtra={setExtra} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <SaveScreen blueprint={blueprint} saved={saved} onBack={() => setStep(3)} onSave={() => finalize("saved")} onSaveAndSubmit={() => finalize("submitted")} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin                                                                */
/* ------------------------------------------------------------------ */
function AdminView({ activities, setActivities, customActivities, onDownload }) {
  const published = activities.filter(a => a.status === "Published").length;
  const pending = customActivities.filter(a => a.status === "Under Review").length;
  const mockDownloads = published * 14 + 8;

  const setStatus = (id, status) => setActivities(list => list.map(a => a.id === id ? { ...a, status } : a));
  const setSequence = (id, seq) => setActivities(list => list.map(a => a.id === id ? { ...a, curriculum_sequence: seq } : a));

  const stats = [
    { label: "Published activities", value: published },
    { label: "Downloads (all-time)", value: mockDownloads },
    { label: "Pending submissions", value: pending },
    { label: "Active schools", value: 2 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="display font-extrabold text-3xl mb-1" style={{ color: "var(--plum-ink)" }}>Admin panel</h1>
      <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>Publish activities, set curriculum sequence, and track basic usage.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: "var(--lavender-card)" }}>
            <div className="text-2xl font-extrabold display" style={{ color: "var(--plum-ink)" }}>{s.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: "var(--ink-soft)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="display font-bold text-lg mb-3" style={{ color: "var(--plum-ink)" }}>Official library</h2>
      <div className="rounded-2xl pragya-glass border overflow-x-auto mb-8" style={{ borderColor: "var(--line)" }}>
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left border-b" style={{ borderColor: "var(--line)" }}>
              {["Activity", "Tier", "Sequence", "Status", ""].map(h => (
                <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--ink-faint)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map(a => (
              <tr key={a.id} className="border-b last:border-0" style={{ borderColor: "var(--line-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--plum-ink)" }}>{a.title}</td>
                <td className="px-4 py-3" style={{ color: "var(--ink-soft)" }}>{a.curriculum_tier}</td>
                <td className="px-4 py-3">
                  <input type="number" value={a.curriculum_sequence || ""} onChange={e => setSequence(a.id, Number(e.target.value))}
                    className="pragya-focus w-16 px-2 py-1 rounded border text-sm" style={{ borderColor: "var(--line)" }} />
                </td>
                <td className="px-4 py-3">
                  <select value={a.status} onChange={e => setStatus(a.id, e.target.value)}
                    className="pragya-focus px-2 py-1 rounded border text-xs font-semibold" style={{ borderColor: "var(--line)" }}>
                    {["Draft", "Under Review", "Published", "Archived", "In Development"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onDownload(`${a.title} usage report`)} className="pragya-focus text-xs font-semibold" style={{ color: "var(--plum)" }}>View stats</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="display font-bold text-lg mb-3" style={{ color: "var(--plum-ink)" }}>Teacher submissions</h2>
      {customActivities.filter(a => a.status === "Under Review").length === 0 ? (
        <div className="text-center py-10 rounded-2xl border-2 border-dashed text-sm" style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}>
          No submissions waiting for review.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {customActivities.filter(a => a.status === "Under Review").map(a => (
            <div key={a.id} className="rounded-xl pragya-glass border p-4 flex items-center justify-between gap-3" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="font-semibold" style={{ color: "var(--plum-ink)" }}>{a.title}</div>
                <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{a.ai_concept} · {a.class_level}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setActivities(list => list.map(x => x.id === a.id ? { ...x, status: "Published" } : x))}
                  className="pragya-focus text-xs font-semibold px-3 py-1.5 rounded-lg pragya-btn-primary">Publish</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [role, setRole] = useState(null);
  const [view, setView] = useState("login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activities, setActivities] = useState(SEED_ACTIVITIES);
  const [customActivities, setCustomActivities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mineOnly, setMineOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("sequence");
  const [toast, setToast] = useState("");
  const [filters, setFilters] = useState(() => Object.fromEntries(FILTER_GROUPS.map(g => [g.key, new Set()])));

  const toggleFilter = (key, value) => {
    setFilters(f => {
      const next = new Set(f[key]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...f, [key]: next };
    });
  };
  const clearFilters = () => setFilters(Object.fromEntries(FILTER_GROUPS.map(g => [g.key, new Set()])));

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };

  const allForDetail = [...activities, ...customActivities];
  const selected = allForDetail.find(a => a.id === selectedId);

  const handleLogin = (r) => { setRole(r); setView("library"); };
  const handleLogout = () => { setRole(null); setView("login"); setMineOnly(false); setSelectedId(null); setMobileOpen(false); };
  const handleSelect = (id) => { setSelectedId(id); setView("detail"); window.scrollTo?.(0, 0); };
  const handleSaved = (newActivity, status) => {
    setCustomActivities(prev => [...prev, newActivity]);
    showToast(status === "submitted" ? "Activity submitted for review" : "Activity saved to your library");
  };
  const handleDownload = (title) => showToast(`Downloaded: ${title} facilitator pack`);

  return (
    <div className="pragya-root min-h-screen">
      <Tokens />
      <GlassBackdrop />
      <div className="relative z-10">
        {!role ? (
          <LoginView onLogin={handleLogin} />
        ) : (
          <>
            <NavBar view={view} setView={setView} role={role} onLogout={handleLogout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {view === "library" && (
              <LibraryView
                activities={activities} customActivities={customActivities} role={role}
                onSelect={handleSelect} onCreate={() => setView("builder")}
                filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters}
                search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy}
                mineOnly={mineOnly} setMineOnly={setMineOnly}
                onSubscribe={() => showToast("Subscribing isn't available in this preview — this is where checkout would go.")}
              />
            )}

            {view === "detail" && (
              <DetailView activity={selected} allActivities={allForDetail} role={role}
                onBack={() => setView("library")} onSelect={handleSelect} onDownload={handleDownload} />
            )}

            {view === "builder" && <BuilderView role={role} onSaved={handleSaved} />}

            {view === "admin" && role === "Admin" && (
              <AdminView activities={activities} setActivities={setActivities} customActivities={customActivities} onDownload={handleDownload} />
            )}
          </>
        )}

        <Toast message={toast} onClose={() => setToast("")} />
      </div>
    </div>
  );
}
