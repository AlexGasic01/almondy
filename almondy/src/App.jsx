import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://qmaqmbimnhzyspvnioeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtYXFtYmltbmh6eXNwdm5pb2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MzU2MjAsImV4cCI6MjA5MzQxMTYyMH0.wicztn4rC4a46UFJRmS1w5jw3tgM4uLj376HpEFlvs4"
);

/* ─── SHARED ASSETS ─── */
const AlmondLogo = ({ size = 24, fill = "#fff" }) => (
  <svg viewBox="0 0 214 410" xmlns="http://www.w3.org/2000/svg" style={{ height: size, width: "auto", fill }}>
    <path d="M.95,217.78c2.4,18.11,9.13,33.98,19.75,46.86.13-6.65.66-13.44,1.61-20.36,7.4-53.46,38.56-106.25,85.49-144.84,27.01-22.2,55.67-38.66,83.49-49.08-40.13-22.13-108,3.65-155,60.07C9.13,143.06-3.76,182.19.95,217.78Z"/>
    <path d="M109.47,294c34.95-7.73,67.2-33.26,88.48-70.03,31.29-54.09,36.64-114.84,16.34-150.41-3.1,19.29-9.45,38.76-18.95,57.49-16.8,33.11-39.36,60.41-63.61,79.41-2.92,2.29-6.27-2.77-3.55-5.35,20.58-19.54,39.51-44.84,54.33-74.32,10.74-21.37,17.81-43.51,21.1-65.29-10.25,12.43-21.31,23.27-32.75,32.23-2.9,2.27-6.23-2.75-3.52-5.31,10.32-9.8,20.22-21.07,29.38-33.58-25.4,11.43-51.22,27.45-75.81,47.81-51.6,42.74-85.71,100.34-93.6,158.04-.29,2.13-.54,4.24-.76,6.34,3.49,3.45,7.3,6.64,11.43,9.54,20.72,14.55,45.44,19.18,71.49,13.43Z"/>
  </svg>
);

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("hidden");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("icon"), 150);
    const t2 = setTimeout(() => setPhase("text"), 950);
    const t3 = setTimeout(() => setPhase("out"),  2300);
    const t4 = setTimeout(() => onDone(),         2850);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  const H = 52;
  const W = Math.round(H * 1525.07 / 365.74);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#080808",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: phase === "out" ? 0 : 1,
      transition: phase === "out" ? "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
      pointerEvents: "none",
      overflow: "hidden",
    }}>

      {/* Single wordmark SVG — clipped to show only icon first, then full */}
      <div style={{
        position: "relative",
        width: W,
        height: H,
        // Clip the whole thing: icon fades in, then text sweeps out
        clipPath: phase === "text" || phase === "out"
          ? "inset(0 0 0 0)"           // full wordmark visible
          : `inset(0 ${Math.round(W * (1 - 210/1525.07))}px 0 0)`, // only icon portion
        transition: phase === "text"
          ? "clip-path 0.65s cubic-bezier(0.22,1,0.36,1)"
          : "none",
        opacity: phase === "hidden" ? 0 : 1,
        transform: phase === "hidden" ? "scale(0.9)" : "scale(1)",
        transformOrigin: `${Math.round(W * 210/1525.07 / 2)}px 50%`,
        transition: phase === "hidden" ? "none"
          : phase === "icon" ? "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)"
          : "clip-path 0.65s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <svg
          viewBox="0 0 1525.07 365.74"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: H, width: W, display: "block" }}
        >
          <text
            fill="white"
            fontFamily="Inter18pt-SemiBold, 'Inter 18pt', Inter, sans-serif"
            fontWeight="600"
            fontSize="306.1"
            transform="translate(221.25 264.4)"
          >
            <tspan x="0" y="0">Almondy</tspan>
          </text>
          <g fill="white">
            <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
            <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
          </g>
        </svg>
      </div>

    </div>
  );
};

const LockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect x="3" y="11" width="18" height="12" rx="2" fill="#1e1e1e" stroke="#444" strokeWidth="1.5"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="#444"/>
    <line x1="12" y1="17.5" x2="12" y2="20" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ─── GLOBAL STYLES ─── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --black: #080808; --surface: #111111; --surface2: #1a1a1a;
      --border: rgba(255,255,255,0.07); --border-bright: rgba(255,255,255,0.18);
      --white: #ffffff; --gray: #888; --muted: #444;
      --green: #22c55e; --green-dim: rgba(34,197,94,0.12);
      --font: 'Inter', sans-serif; --mono: 'Inter', sans-serif;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--black); color: var(--white); font-family: var(--font); line-height: 1.6; overflow-x: hidden; }
    a { text-decoration: none; }
    button { cursor: pointer; font-family: var(--font); }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
      50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeRight {
      from { opacity: 0; transform: translateX(32px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes floatChip {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes lockShake {
      0%   { transform: rotate(0deg) translateX(0); }
      10%  { transform: rotate(-8deg) translateX(-3px); }
      20%  { transform: rotate(8deg) translateX(3px); }
      30%  { transform: rotate(-6deg) translateX(-2px); }
      40%  { transform: rotate(6deg) translateX(2px); }
      50%  { transform: rotate(-4deg) translateX(-1px); }
      60%  { transform: rotate(4deg) translateX(1px); }
      70%  { transform: rotate(-2deg) translateX(0); }
      80%  { transform: rotate(2deg); }
      90%  { transform: rotate(-1deg); }
      100% { transform: rotate(0deg); }
    }
    .shaking { animation: lockShake 0.55s cubic-bezier(0.36,0.07,0.19,0.97) both; }
    .badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--green); box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
      animation: pulse 2.2s ease infinite; flex-shrink: 0; display: inline-block;
    }
  `}</style>
);

/* ─── NAV ─── */
const Nav = ({ page, setPage }) => {
  const links = [
    { id: "home", label: "Home" },
    { id: "systems", label: "Systems" },
    { id: "paychaser", label: "PayChaser" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 62,
      background: "rgba(8,8,8,0.88)", backdropFilter: "blur(20px) saturate(1.4)",
      borderBottom: "1px solid var(--border)"
    }}>
      <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height: 20, width: "auto", fill: "var(--white)" }}>
        <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
        <g>
          <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
          <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
        </g>
      </svg>
      </button>
      <ul style={{ display: "flex", gap: 36, listStyle: "none" }}>
        {links.map(l => (
          <li key={l.id}>
            <button onClick={() => setPage(l.id)} style={{
              background: "none", border: "none",
              color: page === l.id ? "var(--white)" : "var(--gray)",
              fontSize: 13.5, fontWeight: 500, letterSpacing: "-0.1px",
              transition: "color 0.15s", cursor: "pointer"
            }}>{l.label}</button>
          </li>
        ))}
      </ul>
      <button style={{
        background: "var(--white)", color: "var(--black)", border: "none",
        padding: "8px 20px", fontSize: 13, fontWeight: 700,
        borderRadius: 7, letterSpacing: "-0.2px"
      }}>Get in Touch</button>
    </nav>
  );
};

/* ─── FOOTER ─── */
const Footer = ({ setPage }) => (
  <>
    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />
    <footer style={{
      borderTop: "1px solid var(--border)", padding: "32px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
    }}>
      <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height: 20, width: "auto", fill: "var(--white)" }}>
        <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
        <g>
          <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
          <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
        </g>
      </svg>
      </button>
      <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>© 2026 Almondy. All rights reserved.</span>
      <ul style={{ display: "flex", gap: 20, listStyle: "none" }}>
        {["Privacy", "Terms", "Systems", "PayChaser", "Contact"].map(l => (
          <li key={l}>
            <button onClick={() => l === "Systems" ? setPage("systems") : l === "PayChaser" ? setPage("paychaser") : null}
              style={{ background: "none", border: "none", fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>{l}</button>
          </li>
        ))}
      </ul>
    </footer>
  </>
);

/* ─── LOCKED CARD ─── */
const LockedCard = ({ style }) => {
  const [shaking, setShaking] = useState(false);
  const shake = () => {
    if (shaking) return;
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };
  return (
    <div onClick={shake} style={{
      position: "relative", border: "1px solid var(--border)", borderRadius: 14,
      overflow: "hidden", minHeight: 280, background: "#0a0a0a", cursor: "pointer", ...style
    }}>
      <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 10, filter: "blur(5px)", opacity: 0.25, userSelect: "none" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>In Progress</div>
        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.8px", color: "var(--white)" }}>Coming Soon</div>
        <p style={{ fontSize: 13.5, color: "#858585", lineHeight: 1.7 }}>Something new is being built. It's going to be good.</p>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.82)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div className={shaking ? "shaking" : ""} style={{
          width: 48, height: 48, background: "#111", border: "1px solid #2e2e2e",
          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 9, boxShadow: "0 4px 20px rgba(0,0,0,0.6)"
        }}>
          <LockSVG />
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", color: "#383838", textTransform: "uppercase" }}>In Progress</p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: HOME
════════════════════════════════════════════ */
const HomePage = ({ setPage }) => {
  const mockupRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const userCount = (() => {
    const start = new Date("2026-05-03T00:00:00");
    const days = Math.floor((new Date() - start) / 86400000);
    return 40 + Math.max(0, days * 2);
  })();

  useEffect(() => {
    const el = mockupRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      targetRef.current.y = ((e.clientX - r.left) / r.width - 0.5) * 2 * 8;
      targetRef.current.x = ((e.clientY - r.top) / r.height - 0.5) * 2 * -8;
    };
    const onLeave = () => { targetRef.current = { x: 0, y: 0 }; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    const loop = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;
      if (el) el.style.transform = `perspective(800px) rotateX(${currentRef.current.x.toFixed(3)}deg) rotateY(${currentRef.current.y.toFixed(3)}deg)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(rafRef.current); };
  }, []);

  const [cardPos, setCardPos] = useState({});
  const handleCardMove = (id, e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCardPos(p => ({ ...p, [id]: { x: ((e.clientX - r.left) / r.width * 100).toFixed(1), y: ((e.clientY - r.top) / r.height * 100).toFixed(1) } }));
  };

  return (
    <div style={{ paddingTop: 62 }}>
      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(50,50,50,0.5) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", maxWidth: 1280, margin: "0 auto", padding: "40px 48px 0 64px" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingRight: 48 }}>
            <button onClick={() => setPage("systems")} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--green-dim)", border: "1px solid rgba(34,197,94,0.28)",
              borderRadius: 999, padding: "5px 14px 5px 10px",
              fontSize: 12.5, fontWeight: 600, color: "var(--green)", marginBottom: 36,
              animation: "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both", fontFamily: "var(--mono)"
            }}>
              <span className="badge-dot" /> Total Users: {userCount}
            </button>
            <h1 style={{ fontSize: "clamp(40px, 4.5vw, 68px)", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05, color: "var(--white)", marginBottom: 24, animation: "fadeUp 0.55s 0.08s cubic-bezier(0.22,1,0.36,1) both" }}>
              Get paid faster.<br />
              Without awkward<br />follow-ups.
            </h1>
            <p style={{ fontSize: 15.5, color: "#666", maxWidth: 420, lineHeight: 1.75, marginBottom: 44, animation: "fadeUp 0.55s 0.16s cubic-bezier(0.22,1,0.36,1) both" }}>
              Almondy sends your customers overdue invoice reminders automatically. <strong style={{ color: "#999" }}>Friendly at first. Firm when needed.</strong> You focus on the work — Almondy chases the money.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.55s 0.24s cubic-bezier(0.22,1,0.36,1) both" }}>
              <button onClick={() => setPage("systems")} style={{ background: "var(--white)", color: "var(--black)", border: "none", padding: "13px 28px", fontSize: 14, fontWeight: 700, borderRadius: 8, letterSpacing: "-0.3px" }}>
                Learn More →
              </button>
              <button onClick={() => setPage("pricing")} style={{ background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.12)", padding: "13px 28px", fontSize: 14, fontWeight: 600, borderRadius: 8, letterSpacing: "-0.3px" }}>
                Pricing
              </button>
            </div>
            <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 14, animation: "fadeUp 0.55s 0.32s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div style={{ display: "flex" }}>
                {[["JK","#6366f1,#8b5cf6"],["ML","#ec4899,#f43f5e"],["SP","#f59e0b,#ef4444"],["TR","#10b981,#059669"]].map(([init, grad], i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid var(--black)", background: `linear-gradient(135deg,${grad})`, marginLeft: i === 0 ? 0 : -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{init}</div>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: "#858585", lineHeight: 1.45 }}>
                <div style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 1 }}>★★★★★</div>
                <div><strong style={{ color: "#888" }}>Trusted by businesses</strong> with an avg rating of 4.8/5</div>
              </div>
            </div>
          </div>
          {/* Right — Lock */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", position: "relative", animation: "fadeRight 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}>
            <div ref={mockupRef} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560, cursor: "pointer", willChange: "transform" }}>
              <HeroLockCard />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 48px" }}>
        <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Our Systems</p>
        <h2 style={{ fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "var(--white)", marginBottom: 48 }}>
          Tools that get things done.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {/* Featured */}
          <button
            onClick={() => setPage("paychaser")}
            onMouseMove={e => handleCardMove("feat", e)}
            style={{
              gridColumn: "1 / -1", border: "1px solid var(--border)", borderRadius: 12, padding: 36,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "relative", overflow: "hidden", background: "#0c0c0c", cursor: "pointer",
              textAlign: "left", transition: "border-color 0.2s, transform 0.2s"
            }}>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--green)", display: "flex", alignItems: "center", gap: 7 }}>
                <span className="badge-dot" style={{ width: 6, height: 6 }} /> Live Now
              </div>
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-1.5px", color: "var(--white)", marginTop: 10 }}>PayChaser</div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, maxWidth: 380, marginTop: 10 }}>Track invoices, chase payments, and collect faster — all in one place. Automated reminders that stay friendly until they can't.</p>
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "45%", background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#333" }}>Insert Image</span>
            </div>
            <span style={{ position: "absolute", bottom: 20, right: 20, fontSize: 20, color: "var(--muted)" }}>↗</span>
          </button>
          <LockedCard />
          <LockedCard />
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

const HeroLockCard = () => {
  const [shaking, setShaking] = useState(false);
  return (
    <div onClick={() => { setShaking(true); setTimeout(() => setShaking(false), 600); }}
      style={{ width: "100%", aspectRatio: "4/3", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <div className={shaking ? "shaking" : ""} style={{ width: 48, height: 48, background: "#111", border: "1px solid #2e2e2e", borderRadius: 10, padding: 9, boxShadow: "0 4px 20px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LockSVG />
      </div>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", color: "#383838", textTransform: "uppercase" }}>In Progress</p>
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: SYSTEMS
════════════════════════════════════════════ */
const SystemsPage = ({ setPage }) => (
  <div style={{ paddingTop: 62 }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 64px 72px", animation: "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
      <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16, fontFamily: "var(--mono)" }}>Our Systems</p>
      <h1 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05, color: "var(--white)", marginBottom: 20 }}>
        Tools that get things done.
      </h1>
      <p style={{ fontSize: 15.5, color: "#858585", maxWidth: 480, lineHeight: 1.75 }}>Software built for the real world. Each system solves one problem, and solves it well.</p>
    </div>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        <SysCard onClick={() => setPage("paychaser")} live name="PayChaser" desc="Track invoices, chase payments, and collect faster — all in one place. Automated reminders that stay friendly until they can't." />
        <LockedCard />
        <LockedCard />
        <LockedCard />
      </div>
    </div>
    <Footer setPage={setPage} />
  </div>
);

const SysCard = ({ onClick, live, name, desc }) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <button
      onClick={onClick}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width * 100).toFixed(1), y: ((e.clientY - r.top) / r.height * 100).toFixed(1) }); }}
      style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", background: "#0c0c0c", minHeight: 280, display: "flex", flexDirection: "column", cursor: "pointer", textAlign: "left", padding: 36, gap: 10, transition: "border-color 0.2s, transform 0.2s" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.03) 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: live ? "var(--green)" : "var(--muted)" }}>
        {live && <span className="badge-dot" style={{ width: 6, height: 6 }} />} {live ? "Live Now" : "Coming Soon"}
      </div>
      <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.8px", color: "var(--white)", lineHeight: 1, marginTop: 6 }}>{name}</div>
      <p style={{ fontSize: 13.5, color: "#858585", lineHeight: 1.7, maxWidth: 340 }}>{desc}</p>
      <span style={{ fontSize: 18, color: "var(--muted)", marginTop: "auto" }}>↗</span>
    </button>
  );
};

/* ════════════════════════════════════════════
   PAGE: PAYCHASER
════════════════════════════════════════════ */
const STEPS = [
  {
    num: "Step 01 — Connect", heading: "Add your invoices in seconds.",
    body: <>Connect your existing tools or add invoices manually. Almondy works with your workflow — not against it. <strong style={{ color: "#888" }}>No complex setup, no training required.</strong> Just drop in your invoices and you're live.</>,
    visLabel: "Invoice Import",
    vis: <VisInvoiceImport />
  },
  {
    num: "Step 02 — Automate", heading: "Set your reminder rules. Once.",
    body: <>Tell Almondy how you want to chase — friendly nudge on day 3, firmer tone on day 7, final notice on day 14. <strong style={{ color: "#888" }}>It handles the timing, the wording, and the sending.</strong> You never have to think about it again.</>,
    visLabel: "Reminder Schedule",
    vis: <VisSchedule />
  },
  {
    num: "Step 03 — Track", heading: "Know exactly where every invoice stands.",
    body: <>Your dashboard shows every invoice, every reminder sent, and every payment received — in real time. <strong style={{ color: "#888" }}>No more chasing spreadsheets.</strong> Just a clear, honest view of what's paid and what's not.</>,
    visLabel: "Live Dashboard",
    vis: <VisTrack />
  },
  {
    num: "Step 04 — Collect", heading: "Get paid. Move on.",
    body: <>When a client pays, Almondy marks it done and stops all reminders automatically. <strong style={{ color: "#888" }}>No double-checking, No Worry.</strong> Automated end to end so you can stop worrying and get back to work.</>,
    visLabel: "Payment Received",
    vis: <VisCelebrate />
  }
];

function VisInvoiceImport() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10 }}>
        {[["Invoices Added","14 green","Ready to track"],["Total Value","$82k","Across 6 clients"]].map(([label, val, sub]) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 8, padding: 14, flex: 1 }}>
            <div style={{ fontSize: 9, color: "#222", fontFamily: "var(--mono)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.8px", color: val.includes("green") ? "var(--green)" : "var(--white)" }}>{val.replace(" green","")}</div>
            <div style={{ fontSize: 9.5, color: "#2a2a2a", marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>
      {[["Buildco Systems · INV-0051","$6,400"],["Apex Design Co. · INV-0047","$3,200"],["NovaTech Ltd. · INV-0052","$11,750"]].map(([name, amt]) => (
        <div key={name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#444" }}>{name}</div>
          <div style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }}>Imported</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", fontFamily: "var(--mono)" }}>{amt}</div>
        </div>
      ))}
    </div>
  );
}

function VisSchedule() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 15 }}>⚡</span>
        <div>
          <div style={{ fontSize: 11, color: "rgba(74,222,128,0.8)", lineHeight: 1.5 }}>Automation active — 3 rules running across 12 invoices</div>
          <div style={{ fontSize: 9.5, color: "rgba(74,222,128,0.3)", fontFamily: "var(--mono)", marginTop: 3 }}>Updated now</div>
        </div>
      </div>
      {[["Day 3 — Friendly nudge","Warm reminder, assumes oversight","#22c55e"],["Day 7 — Firmer tone","Direct, professional, no fluff","#f59e0b"],["Day 14 — Final notice","Last chance before escalation","#ef4444"]].map(([title, sub, dot], i) => (
        <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot, marginTop: 4 }} />
            {i < 2 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.06)", marginTop: 4, minHeight: 18 }} />}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#858585" }}>{title}</div>
            <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "var(--mono)", marginTop: 2 }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VisTrack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10 }}>
        {[["Collected","$124k","↑ 18% this month",true],["Overdue","$9.8k","Being chased now",false]].map(([label,val,sub,green]) => (
          <div key={label} style={{ background: green ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${green ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.055)"}`, borderRadius: 8, padding: 14, flex: 1 }}>
            <div style={{ fontSize: 9, color: "#222", fontFamily: "var(--mono)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: green ? "var(--green)" : "var(--white)" }}>{val}</div>
            <div style={{ fontSize: 9.5, color: "#2a2a2a", marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>
      {[["Buildco Systems","#22c55e","Paid","badge-paid","$6,400"],["Apex Design Co.","#ef4444","Overdue · Day 7","badge-late","$3,200"],["NovaTech Ltd.","#f59e0b","Reminder sent","badge-due","$11,750"]].map(([name,dot,badge,cls,amt]) => (
        <div key={name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#444" }}>{name}</div>
          <div style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999, ...(cls==="badge-paid"?{background:"rgba(34,197,94,0.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,0.2)"}:cls==="badge-late"?{background:"rgba(239,68,68,0.1)",color:"#f87171",border:"1px solid rgba(239,68,68,0.2)"}:{background:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)"}) }}>{badge}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", fontFamily: "var(--mono)" }}>{amt}</div>
        </div>
      ))}
    </div>
  );
}

function VisCelebrate() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 20 }}>
        <div style={{ fontSize: 40 }}>🎉</div>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--white)" }}>Michael Williams just paid</div>
        <div style={{ fontSize: 12, color: "#444", textAlign: "center", lineHeight: 1.6 }}>$1,750 received · Reminders stopped automatically</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--green-dim)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "var(--green)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} /> All reminders cancelled
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[["Collected Today","$1,750","1 invoice closed",true],["Collection Rate","98%","All time average",false]].map(([label,val,sub,green]) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 8, padding: 14, flex: 1 }}>
            <div style={{ fontSize: 9, color: "#222", fontFamily: "var(--mono)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: green ? "var(--green)" : "var(--white)" }}>{val}</div>
            <div style={{ fontSize: 9.5, color: "#2a2a2a", marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PaychaserPage = ({ setPage }) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (n) => {
    setVisible(false);
    setTimeout(() => { setStep(n); setVisible(true); }, 180);
  };

  const dashRef = useRef(null);
  const dtRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  useEffect(() => {
    const el = dashRef.current;
    if (!el) return;
    const onMove = e => { const r = el.getBoundingClientRect(); dtRef.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * 5; dtRef.current.ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * -5; };
    const onLeave = () => { dtRef.current.tx = 0; dtRef.current.ty = 0; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    let raf;
    const loop = () => {
      dtRef.current.cx += (dtRef.current.ty - dtRef.current.cx) * 0.1;
      dtRef.current.cy += (dtRef.current.tx - dtRef.current.cy) * 0.1;
      if (el) el.style.transform = `perspective(900px) rotateX(${dtRef.current.cx.toFixed(3)}deg) rotateY(${dtRef.current.cy.toFixed(3)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, []);

  const s = STEPS[step];

  return (
    <div style={{ paddingTop: 62 }}>
      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(40,40,40,0.45) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "96px 48px 72px", textAlign: "center", animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--green-dim)", border: "1px solid rgba(34,197,94,0.28)", borderRadius: 999, padding: "5px 14px 5px 10px", fontSize: 12, fontWeight: 600, color: "var(--green)", marginBottom: 32, fontFamily: "var(--mono)" }}>
            <span className="badge-dot" /> Live Now
          </div>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.02, color: "var(--white)", marginBottom: 22 }}>
            Chase money.<br />Not clients.
          </h1>
          <p style={{ fontSize: 16, color: "#858585", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px" }}>
            Almondy sends your overdue invoice reminders automatically. <strong style={{ color: "#888" }}>Friendly at first. Firm when needed.</strong> You focus on the work — we chase the money.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("auth")} style={{ background: "var(--white)", color: "var(--black)", padding: "13px 28px", fontSize: 14, fontWeight: 700, borderRadius: 8, letterSpacing: "-0.3px", border: "none", cursor: "pointer", fontFamily: "var(--font)" }}>Get Started →</button>
            <a href="#how" style={{ background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.12)", padding: "13px 28px", fontSize: 14, fontWeight: 600, borderRadius: 8, letterSpacing: "-0.3px" }}>See How It Works</a>
          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        <div ref={dashRef} style={{ willChange: "transform", cursor: "default" }}>
          <div style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>
            <div style={{ background: "#090909", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 7 }}>
              {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c]) => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
              <div style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 600, color: "#333", fontFamily: "var(--mono)", marginLeft: -55 }}>Almondy — Dashboard</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 420 }}>
              <div style={{ background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "20px 0", display: "flex", flexDirection: "column", gap: 2 }}>
                {["Overview","","","","Reports","","","Settings",""].map((sec, i) => {
                  const items = [null,"◈ Dashboard","📄 Invoices","🔔 Reminders","","📊 Analytics","💳 Payments","","⚙️ Settings"];
                  const labels = ["Overview",null,null,null,"Reports",null,null,"Settings",null];
                  if (labels[i]) return <div key={i} style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#222", padding: "14px 18px 6px", fontFamily: "var(--mono)" }}>{labels[i]}</div>;
                  if (!items[i]) return null;
                  return <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", fontSize: 12, fontWeight: 500, color: i === 1 ? "#aaa" : "#333", background: i === 1 ? "rgba(255,255,255,0.04)" : "transparent" }}>{items[i]}</div>;
                })}
              </div>
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#ccc", letterSpacing: "-0.5px" }}>November Overview</div>
                  <div style={{ fontSize: 11, color: "#2a2a2a", fontFamily: "var(--mono)" }}>Last updated just now</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                  {[["Collected","$124k","↑ 18% vs last month",true],["Outstanding","$48k","12 invoices pending",false],["Overdue","$9.8k","3 clients flagged",false]].map(([label,val,sub,green]) => (
                    <div key={label} style={{ background: green ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)", border: `1px solid ${green ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.055)"}`, borderRadius: 10, padding: "16px 14px" }}>
                      <div style={{ fontSize: 9.5, color: "#2e2e2e", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 8 }}>{label}</div>
                      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1.2px", color: green ? "var(--green)" : "var(--white)" }}>{val}</div>
                      <div style={{ fontSize: 10, color: green ? "rgba(34,197,94,0.6)" : "#2a2a2a", marginTop: 5 }}>{sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: 18 }}>
                  <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "var(--mono)", marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" }}>Collections — Last 8 months</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
                    {[38,52,44,68,55,72,83,100].map((h,i) => (
                      <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", height: `${h}%`, background: i === 7 ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.06)" }} />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[["paid","Jarred Brown","Paid","$6,400"],["late","Stacey Smith","Overdue","$1,900"],["due","Jarred Brown.","1st Reminder sent","$1,100"]].map(([status,name,badge,amt]) => (
                    <div key={name+amt} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 7, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: status==="paid"?"var(--green)":status==="late"?"#ef4444":"#f59e0b" }} />
                      <div style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: "#858585" }}>{name}</div>
                      <div style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999, fontFamily: "var(--mono)", ...(status==="paid"?{background:"rgba(34,197,94,0.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,0.2)"}:status==="late"?{background:"rgba(239,68,68,0.1)",color:"#f87171",border:"1px solid rgba(239,68,68,0.2)"}:{background:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)"}) }}>{badge}</div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: "#444", fontFamily: "var(--mono)" }}>{amt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 120, maxWidth: 1100, margin: "-120px auto 0", padding: "0 48px", background: "linear-gradient(to bottom, transparent, var(--black))", pointerEvents: "none", position: "relative", zIndex: 1 }} />

      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

      {/* HOW IT WORKS */}
      <div id="how" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 48px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14, fontFamily: "var(--mono)" }}>How It Works</p>
          <h2 style={{ fontSize: "clamp(30px, 3.5vw, 48px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, color: "var(--white)" }}>
            Up and running in minutes.
          </h2>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 56 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ display: "contents" }}>
              <button onClick={() => goTo(i)} style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${i < step ? "rgba(34,197,94,0.4)" : i === step ? "var(--green)" : "rgba(255,255,255,0.1)"}`,
                background: i < step ? "rgba(34,197,94,0.15)" : i === step ? "var(--green)" : "var(--black)",
                color: i < step ? "var(--green)" : i === step ? "var(--black)" : "#333",
                fontSize: 11, fontWeight: 800, boxShadow: i === step ? "0 0 0 4px rgba(34,197,94,0.15)" : "none",
                flexShrink: 0, zIndex: 1, transition: "all 0.35s"
              }}>{i + 1}</button>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: step > i ? "100%" : "0%", background: "var(--green)", transition: "width 0.5s" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", minHeight: 340 }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--green)", fontFamily: "var(--mono)", marginBottom: 16 }}>{s.num}</div>
            <div style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.08, color: "var(--white)", marginBottom: 16 }}>{s.heading}</div>
            <div style={{ fontSize: 14.5, color: "#858585", lineHeight: 1.8 }}>{s.body}</div>
          </div>
          <div style={{ background: "#0c0c0c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: "all 0.45s 0.1s" }}>
            <div style={{ background: "#090909", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 6 }}>
              {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c]) => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
              <div style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 600, color: "#2a2a2a", fontFamily: "var(--mono)", marginLeft: -50 }}>{s.visLabel}</div>
            </div>
            <div style={{ padding: 22 }}>{s.vis}</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => goTo(step - 1)} disabled={step === 0} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", fontSize: 13, fontWeight: 600, borderRadius: 8, background: "transparent", color: "#858585", border: "1px solid rgba(255,255,255,0.08)", opacity: step === 0 ? 0.2 : 1, cursor: step === 0 ? "default" : "pointer" }}>← Previous</button>
          <span style={{ fontSize: 12, color: "#333", fontFamily: "var(--mono)" }}>Step <span style={{ color: "#666" }}>{step + 1}</span> of 4</span>
          <button onClick={() => step < STEPS.length - 1 ? goTo(step + 1) : setPage("auth")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", fontSize: 13, fontWeight: 600, borderRadius: 8, background: step === STEPS.length - 1 ? "var(--green)" : "var(--white)", color: "var(--black)", border: "none" }}>
            {step === STEPS.length - 1 ? "Get Started →" : "Next →"}
          </button>
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "#0a0a0a", padding: "72px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--white)", marginBottom: 16 }}>Ready to stop worrying?</h2>
        <p style={{ fontSize: 15, color: "#444", marginBottom: 36 }}>Join businesses already using Almondy to collect what they're owed.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => setPage("auth")} style={{ background: "var(--white)", color: "var(--black)", padding: "13px 28px", fontSize: 14, fontWeight: 700, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "var(--font)" }}>Get Started Free →</button>
          <button onClick={() => setPage("systems")} style={{ background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.12)", padding: "13px 28px", fontSize: 14, fontWeight: 600, borderRadius: 8 }}>Back to Systems</button>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: PRICING
════════════════════════════════════════════ */

/* PlanCard — top-level component so hooks are legal */
const PlanCard = ({ name, price, period, desc, cta, ctaStyle, features, featured = false, badge = null }) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width * 100).toFixed(1), y: ((e.clientY - r.top) / r.height * 100).toFixed(1) });
      }}
      style={{
        position: "relative", border: `1px solid ${featured ? "rgba(255,255,255,0.15)" : "var(--border)"}`,
        borderRadius: 16, padding: "32px 28px 28px", display: "flex", flexDirection: "column",
        background: featured ? "#0f0f0f" : "#0c0c0c",
        transform: featured ? "scale(1.03)" : "none",
        boxShadow: featured ? "0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.5)" : "none",
        overflow: "hidden"
      }}>
      {/* Mouse-tracking spotlight */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.025) 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Badge (e.g. "Most Popular", "Enterprise") */}
        {badge && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: featured ? "var(--green)" : "var(--white)", background: featured ? "var(--green-dim)" : "rgba(255,255,255,0.07)", border: `1px solid ${featured ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.12)"}`, borderRadius: 999, padding: "4px 12px", marginBottom: 22, width: "fit-content" }}>
            {badge}
          </div>
        )}

        {/* Plan name label */}
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--mono)", marginBottom: 12 }}>{name}</div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginBottom: 4, lineHeight: 1 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 8 }}>$</span>
          <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-3px", color: "var(--white)", lineHeight: 1 }}>{price}</span>
          {price !== "0" && <span style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>/mo</span>}
        </div>

        {/* Billing period (e.g. "per month" or "Free forever") */}
        <div style={{ fontSize: 12, color: "#3a3a3a", marginBottom: 20, minHeight: 18 }}>{period}</div>

        {/* Description */}
        <p style={{ fontSize: 13, color: "#858585", lineHeight: 1.75, marginBottom: 28 }}>{desc}</p>

        {/* CTA button */}
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "13px 24px", fontSize: 13.5, fontWeight: 700, borderRadius: 9, border: ctaStyle === "solid" ? "none" : "1px solid rgba(255,255,255,0.1)", background: ctaStyle === "solid" ? "var(--white)" : "transparent", color: ctaStyle === "solid" ? "var(--black)" : "#666", marginBottom: 28, letterSpacing: "-0.3px" }}>
          {cta}
        </button>

        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)", marginBottom: 22 }} />

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {features.map(([on, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, lineHeight: 1.5, color: on ? "#8a8a8a" : "#383838" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: 8, fontWeight: 900, background: on ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.03)", color: on ? "var(--green)" : "#2e2e2e", border: `1px solid ${on ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)"}` }}>
                {on ? "✓" : "—"}
              </div>
              <span dangerouslySetInnerHTML={{ __html: label }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const PRICES = {
  monthly: { basic: "0", pro: "30", max: "60", basicP: "Free forever", proP: "per month", maxP: "per month" },
  annual:  { basic: "0", pro: "24", max: "48", basicP: "Free forever", proP: "per month, billed annually", maxP: "per month, billed annually" }
};

const FAQS = [
  ["Can I switch plans at any time?", "Yes — upgrade or downgrade whenever you like. Upgrades are prorated immediately. Downgrades kick in at the start of your next billing period."],
  ["What counts as an \"active invoice\"?", "An active invoice is any invoice Almondy is currently tracking or chasing. Once marked as paid or archived, it no longer counts toward your limit."],
  ["Is there really a free trial on Pro?", "Absolutely. 14 days, full Pro features, no credit card required. If it's not for you, walk away — no awkward cancellation flow, no hidden fees."],
  ["How does automated chasing work?", "Almondy sends a series of reminders on a schedule you control. It starts polite, escalates over time, and stops automatically the moment the invoice is paid."],
  ["Do my clients see Almondy branding?", "On Basic and Pro, reminders come from your name and email — clients won't see \"Almondy\" anywhere. Max adds full white-label support including custom domains."],
];

const PricingPage = ({ setPage }) => {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const p = PRICES[billing];

  return (
    <div style={{ paddingTop: 62 }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "88px 48px 64px", animation: "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--green-dim)", border: "1px solid rgba(34,197,94,0.28)", borderRadius: 999, padding: "5px 14px 5px 10px", fontSize: 12, fontWeight: 600, color: "var(--green)", marginBottom: 28, fontFamily: "var(--mono)" }}>
            <span className="badge-dot" /> PayChaser Pricing
          </div>
          <h1 style={{ fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.03, color: "var(--white)", marginBottom: 18 }}>
            Simple pricing.<br />No surprises.
          </h1>
          <p style={{ fontSize: 15.5, color: "#858585", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 40px" }}>Start free, scale when you're ready. Cancel any time — no questions asked.</p>
          <div style={{ display: "inline-flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: "4px 5px" }}>
            {["monthly","annual"].map(m => (
              <button key={m} onClick={() => setBilling(m)} style={{ padding: "7px 20px", borderRadius: 999, border: "none", fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, background: billing === m ? "var(--white)" : "transparent", color: billing === m ? "var(--black)" : "var(--muted)", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
                {m === "annual" && <span style={{ fontSize: 10, fontWeight: 700, color: "var(--green)", background: "var(--green-dim)", border: "1px solid rgba(34,197,94,0.2)", padding: "2px 8px", borderRadius: 999 }}>Save 20%</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px 80px", animation: "fadeUp 0.55s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, alignItems: "start" }}>
          <PlanCard name="Basic" price={p.basic} period={p.basicP} desc="For freelancers and solo operators just getting started with chasing invoices." cta="Get Started Free" ctaStyle="ghost" features={[[true,"Up to <strong>5 active invoices</strong>"],[true,"Manual reminders"],[true,"Email reminders"],[true,"Basic dashboard"],[false,"Automated sequences"],[false,"SMS reminders"],[false,"Priority support"]]} />
          <PlanCard name="Pro" price={p.pro} period={p.proP} desc="For growing businesses that need automated chasing without the awkward follow-ups." cta="Start 14-Day Free Trial →" ctaStyle="solid" features={[[true,"<strong>Unlimited</strong> invoices"],[true,"<strong>Automated</strong> reminder sequences"],[true,"Email + SMS reminders"],[true,"Smart escalation logic"],[true,"Advanced analytics"],[true,"Priority email support"],[false,"White-label branding"]]} featured badge="⚡ Most Popular" />
          <PlanCard name="Max" price={p.max} period={p.maxP} desc="For agencies managing invoices at scale with full white-label and team control." cta="Talk to Sales →" ctaStyle="ghost" features={[[true,"Everything in Pro"],[true,"<strong>White-label</strong> branding"],[true,"Custom reminder templates"],[true,"Team member access"],[true,"API access"],[true,"Dedicated account manager"],[true,"SLA guarantee"]]} badge="Enterprise" />
        </div>
      </div>

      {/* Compare Table */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px 80px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, textAlign: "center", fontFamily: "var(--mono)" }}>Full Comparison</p>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <thead>
            <tr>
              {["Feature","Basic","Pro","Max"].map((h,i) => (
                <th key={h} style={{ padding: "15px 20px", textAlign: i === 0 ? "left" : "center", fontSize: 11.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted)", background: "#0a0a0a", borderBottom: "1px solid var(--border)", fontFamily: "var(--mono)", width: i === 0 ? "40%" : undefined }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[["Active invoices","5","Unlimited","Unlimited"],["Email reminders","✓","✓","✓"],["SMS reminders","—","✓","✓"],["Automated sequences","—","✓","✓"],["Smart escalation","—","✓","✓"],["White-label branding","—","—","✓"],["API access","—","—","✓"],["Support","Community","Priority email","Dedicated manager"]].map(([feat,...vals]) => (
              <tr key={feat} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "13px 20px", fontSize: 13, color: "#666", textAlign: "left" }}>{feat}</td>
                {vals.map((v,i) => (
                  <td key={i} style={{ padding: "13px 20px", textAlign: "center", fontSize: v === "✓" ? 15 : v === "—" ? 15 : 12.5, color: v === "✓" ? "var(--green)" : v === "—" ? "#222" : "#777", fontWeight: v !== "✓" && v !== "—" ? 600 : undefined }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 48px 100px" }}>
        <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--white)", textAlign: "center", marginBottom: 44 }}>
          Questions? Answered.
        </h2>
        {FAQS.map(([q, a], i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "none", border: "none", fontFamily: "var(--font)", fontSize: 14, fontWeight: 600, color: openFaq === i ? "var(--white)" : "#aaa", textAlign: "left", gap: 16 }}>
              {q}
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#444", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>+</div>
            </button>
            <div style={{ maxHeight: openFaq === i ? 220 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)", fontSize: 13.5, color: "#858585", lineHeight: 1.85, paddingBottom: openFaq === i ? 22 : 0 }}>{a}</div>
          </div>
        ))}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

/* ════════════════════════════════════════════
   APP: MAGIC LINK AUTH
   - Two steps: enter email → check inbox screen
════════════════════════════════════════════ */
const AuthPage = ({ setPage, setUser }) => {
  const [step, setStep] = useState("email"); // "email" | "sent"
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.includes("@")) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setStep("sent");
    } catch (err) {
      console.error(err);
      setStep("sent"); // still show sent — don't leak errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40,40,40,0.5) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Logo */}
      <button onClick={() => setPage("home")} style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 9, background: "none", border: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height: 20, width: "auto", fill: "var(--white)" }}>
        <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
        <g>
          <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
          <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
        </g>
      </svg>
      </button>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        {step === "email" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 52, height: 52, background: "#111", border: "1px solid #2a2a2a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22 }}>✉️</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", color: "var(--white)", marginBottom: 8 }}>Sign in to Almondy</h1>
              <p style={{ fontSize: 14, color: "#858585", lineHeight: 1.6 }}>Enter your email and we'll send you a link to sign in. No password needed.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: "0.5px", display: "block", marginBottom: 8 }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="you@yourbusiness.com"
                  autoFocus
                  style={{ width: "100%", padding: "13px 16px", background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 15, color: "var(--white)", outline: "none", fontFamily: "var(--font)", transition: "border-color 0.15s" }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!email.includes("@") || loading}
                style={{ width: "100%", padding: "14px", background: loading ? "rgba(255,255,255,0.5)" : "var(--white)", color: "var(--black)", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", opacity: !email.includes("@") ? 0.4 : 1, transition: "opacity 0.15s" }}>
                {loading ? "Sending..." : "Send magic link →"}
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "#444", marginTop: 20, lineHeight: 1.6 }}>
              By continuing you agree to our{" "}
              <span style={{ color: "#666", cursor: "pointer" }}>Terms</span> and{" "}
              <span style={{ color: "#666", cursor: "pointer" }}>Privacy Policy</span>.
            </p>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 52, height: 52, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22 }}>📬</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", color: "var(--white)", marginBottom: 8 }}>Check your inbox</h1>
              <p style={{ fontSize: 14, color: "#858585", lineHeight: 1.7 }}>
                We sent a sign-in link to<br />
                <strong style={{ color: "var(--white)" }}>{email}</strong>
              </p>
            </div>

            <div style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "20px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ fontSize: 20, marginTop: 2 }}>📧</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#aaa", marginBottom: 4 }}>Magic link sent to <span style={{ color: "var(--white)" }}>{email}</span></div>
                <div style={{ fontSize: 12, color: "#444", lineHeight: 1.7 }}>Check your inbox and click the link to sign in. It expires in 15 minutes. If you don't see it, check your spam folder.</div>
              </div>
            </div>

            <button onClick={() => setStep("email")} style={{ width: "100%", padding: "12px", background: "transparent", color: "#555", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
              ← Use a different email
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   APP: ONBOARDING
   - Single step: business name
   - Feels fast, low-friction
════════════════════════════════════════════ */
const OnboardingPage = ({ setPage, user, setUser }) => {
  const [bizName, setBizName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!bizName.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setUser(u => ({ ...u, bizName: bizName.trim(), plan: "free" }));
      setPage("dashboard");
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40,40,40,0.5) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div style={{ width: "100%", height: "100%", background: "var(--green)", borderRadius: "0 2px 2px 0", transition: "width 0.5s" }} />
      </div>

      <button onClick={() => setPage("home")} style={{ position: "absolute", top: 28, left: 32, display: "flex", alignItems: "center", gap: 9, background: "none", border: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height: 20, width: "auto", fill: "var(--white)" }}>
        <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
        <g>
          <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
          <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
        </g>
      </svg>
      </button>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 16 }}>Welcome aboard</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1.2px", color: "var(--white)", marginBottom: 10 }}>What's your business called?</h1>
          <p style={{ fontSize: 14, color: "#858585", lineHeight: 1.6 }}>This is how Almondy will sign off your reminder emails to clients.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            value={bizName}
            onChange={e => setBizName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleContinue()}
            placeholder="e.g. Smith Electrical"
            autoFocus
            style={{ width: "100%", padding: "15px 18px", background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 17, color: "var(--white)", outline: "none", fontFamily: "var(--font)", letterSpacing: "-0.3px" }}
          />

          <button
            onClick={handleContinue}
            disabled={!bizName.trim() || loading}
            style={{ width: "100%", padding: "15px", background: bizName.trim() ? "var(--white)" : "rgba(255,255,255,0.08)", color: bizName.trim() ? "var(--black)" : "#333", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", transition: "all 0.2s" }}>
            {loading ? "Setting up your account..." : "Take me to my dashboard →"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#383838", marginTop: 20 }}>You can change this any time in Settings</p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   APP: DASHBOARD
   - Shows placeholder invoice data
   - Free plan capped at 5 invoices
   - Upgrade prompt baked in
════════════════════════════════════════════ */

// Placeholder invoice data
const MOCK_INVOICES = [
  { id: "INV-001", client: "Buildco Pty Ltd",     amount: 4200,  due: "2 days ago",   status: "overdue" },
  { id: "INV-002", client: "Riverside Constructions", amount: 1850, due: "Today",      status: "due" },
  { id: "INV-003", client: "Peak Plumbing Co.",   amount: 680,   due: "In 3 days",    status: "sent" },
  { id: "INV-004", client: "Jayco Developments",  amount: 9300,  due: "Paid 4 days ago", status: "paid" },
  { id: "INV-005", client: "M. Henderson",        amount: 320,   due: "Paid today",   status: "paid" },
];

const STATUS_CONFIG = {
  overdue: { label: "Overdue",       bg: "rgba(239,68,68,0.1)",   color: "#f87171", border: "rgba(239,68,68,0.2)",   dot: "#ef4444" },
  due:     { label: "Due Today",     bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", border: "rgba(245,158,11,0.2)",  dot: "#f59e0b" },
  sent:    { label: "Reminder Sent", bg: "rgba(99,102,241,0.1)",  color: "#818cf8", border: "rgba(99,102,241,0.2)",  dot: "#6366f1" },
  paid:    { label: "Paid",          bg: "rgba(34,197,94,0.1)",   color: "#22c55e", border: "rgba(34,197,94,0.2)",   dot: "#22c55e" },
};

const AppNav = ({ user, setPage }) => (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 58, background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height: 22, width: "auto", fill: "var(--white)" }}>
        <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
        <g>
          <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
          <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
        </g>
      </svg>
      {/* Free plan badge */}
      {user?.plan === "free" && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 10.5, fontWeight: 700, color: "#f59e0b", letterSpacing: "0.5px" }}>
          FREE PLAN
        </div>
      )}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {user?.plan === "free" && (
        <button onClick={() => setPage("paywall")} style={{ padding: "7px 16px", background: "var(--green)", color: "var(--black)", border: "none", borderRadius: 7, fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.2px" }}>
          Upgrade to Pro
        </button>
      )}
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
        {user?.bizName?.[0] ?? user?.email?.[0]?.toUpperCase() ?? "?"}
      </div>
    </div>
  </div>
);

const AppSidebar = ({ activeTab, setTab }) => {
  const items = [
    { id: "invoices",   icon: "📄", label: "Invoices" },
    { id: "reminders",  icon: "🔔", label: "Reminders" },
    { id: "clients",    icon: "👥", label: "Clients" },
    { id: "analytics",  icon: "📊", label: "Analytics" },
    { id: "settings",   icon: "⚙️", label: "Settings" },
  ];
  return (
    <div style={{ width: 200, flexShrink: 0, background: "#080808", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", paddingTop: 16 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", background: activeTab === item.id ? "rgba(255,255,255,0.05)" : "transparent", border: "none", borderLeft: `2px solid ${activeTab === item.id ? "var(--green)" : "transparent"}`, color: activeTab === item.id ? "var(--white)" : "#444", fontSize: 13, fontWeight: 500, textAlign: "left", transition: "all 0.15s", cursor: "pointer" }}>
          <span style={{ fontSize: 14 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

const DashboardPage = ({ setPage, user }) => {
  const [tab, setTab] = useState("invoices");
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  const collected = MOCK_INVOICES.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = MOCK_INVOICES.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0);
  const overdue = MOCK_INVOICES.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#060606", display: "flex", flexDirection: "column" }}>
      <AppNav user={user} setPage={setPage} />

      <div style={{ display: "flex", flex: 1, paddingTop: 58 }}>
        <AppSidebar activeTab={tab} setTab={setTab} />

        {/* Main content */}
        <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>

          {/* Free plan upgrade banner */}
          {user?.plan === "free" && showUpgradeBanner && (
            <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 28, animation: "fadeUp 0.4s both" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚡</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 2 }}>You're on the Free plan — 5 invoice limit</div>
                <div style={{ fontSize: 12, color: "#858585" }}>Upgrade to Pro for unlimited invoices, automated reminders, and SMS chasing.</div>
              </div>
              <button onClick={() => setPage("paywall")} style={{ padding: "8px 16px", background: "#f59e0b", color: "#000", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Upgrade →</button>
              <button onClick={() => setShowUpgradeBanner(false)} style={{ background: "none", border: "none", color: "#555", fontSize: 16, lineHeight: 1, flexShrink: 0, padding: 4 }}>✕</button>
            </div>
          )}

          {/* Page heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--white)", marginBottom: 4 }}>
                {user?.bizName ?? "My Dashboard"}
              </h1>
              <p style={{ fontSize: 13, color: "#858585" }}>Here's what's happening with your invoices.</p>
            </div>
            <button onClick={() => setPage("paywall")} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", borderRadius: 9, fontSize: 13, fontWeight: 600 }}>
              + Add Invoice
              {user?.plan === "free" && <span style={{ fontSize: 10, background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "1px 7px", fontWeight: 700 }}>PRO</span>}
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Collected", value: `$${collected.toLocaleString()}`, sub: "This month", green: true },
              { label: "Outstanding", value: `$${outstanding.toLocaleString()}`, sub: `${MOCK_INVOICES.filter(i => i.status !== "paid").length} invoices pending`, green: false },
              { label: "Overdue", value: `$${overdue.toLocaleString()}`, sub: `${MOCK_INVOICES.filter(i => i.status === "overdue").length} client${MOCK_INVOICES.filter(i => i.status === "overdue").length !== 1 ? "s" : ""} flagged`, green: false },
            ].map(({ label, value, sub, green }) => (
              <div key={label} style={{ background: green ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)", border: `1px solid ${green ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "20px 18px" }}>
                <div style={{ fontSize: 10, color: "#383838", fontFamily: "var(--mono)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", color: green ? "var(--green)" : "var(--white)", lineHeight: 1, marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 11, color: green ? "rgba(34,197,94,0.5)" : "#383838" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Invoice table */}
          <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 100px 44px", gap: 0, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#080808" }}>
              {["Client", "Invoice", "Amount", "Status", ""].map(h => (
                <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: "#333", letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "var(--mono)" }}>{h}</div>
              ))}
            </div>

            {MOCK_INVOICES.map((inv, i) => {
              const st = STATUS_CONFIG[inv.status];
              return (
                <div key={inv.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 100px 44px", gap: 0, padding: "16px 20px", borderBottom: i < MOCK_INVOICES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "center", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.015)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#ccc", marginBottom: 2 }}>{inv.client}</div>
                    <div style={{ fontSize: 11, color: "#383838", fontFamily: "var(--mono)" }}>{inv.due}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#444", fontFamily: "var(--mono)" }}>{inv.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: inv.status === "paid" ? "var(--green)" : "var(--white)", fontFamily: "var(--mono)" }}>${inv.amount.toLocaleString()}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 999, padding: "4px 10px", width: "fit-content" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: st.color, letterSpacing: "0.3px" }}>{st.label}</span>
                  </div>
                  <button onClick={() => setPage("paywall")} style={{ background: "none", border: "none", color: "#2a2a2a", fontSize: 16, cursor: "pointer", padding: 4, transition: "color 0.15s" }}
                    onMouseEnter={e => e.target.style.color = "#666"}
                    onMouseLeave={e => e.target.style.color = "#2a2a2a"}>
                    ···
                  </button>
                </div>
              );
            })}

            {/* Free plan limit row */}
            {user?.plan === "free" && (
              <div style={{ padding: "18px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(245,158,11,0.03)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13 }}>🔒</span>
                  <span style={{ fontSize: 13, color: "#858585" }}>You've used <strong style={{ color: "#f59e0b" }}>5 of 5</strong> free invoices. Upgrade for unlimited.</span>
                </div>
                <button onClick={() => setPage("paywall")} style={{ padding: "7px 14px", background: "transparent", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 7, fontSize: 12, fontWeight: 700 }}>Upgrade →</button>
              </div>
            )}
          </div>

          {/* Locked features row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            {[
              { icon: "🔔", title: "Automated Reminders", desc: "Set it and forget it. PayChaser chases for you.", locked: user?.plan === "free" },
              { icon: "📊", title: "Analytics & Reports", desc: "See your collection rate, avg days to pay, and more.", locked: user?.plan === "free" },
            ].map(({ icon, title, desc, locked }) => (
              <div key={title} onClick={() => locked && setPage("paywall")} style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px", position: "relative", overflow: "hidden", cursor: locked ? "pointer" : "default", transition: "border-color 0.2s" }}>
                {locked && <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,6,0.6)", backdropFilter: "blur(2px)", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: 36, height: 36, background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", padding: 7 }}><LockSVG /></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", letterSpacing: "1px" }}>PRO FEATURE</span>
                </div>}
                <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--white)", marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#858585", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   APP: PAYWALL
   - Side-by-side plan cards (like Claude's pricing)
   - Fixed selection highlight bug
   - Stripe-ready: swap STRIPE_PRICE_IDs and call redirectToCheckout
════════════════════════════════════════════ */

// ── Stripe price IDs — replace these with your real ones from the Stripe dashboard ──
const STRIPE_PRICES = {
  pro:  { monthly: "price_PRO_MONTHLY_ID",  annual: "price_PRO_ANNUAL_ID"  },
  max:  { monthly: "price_MAX_MONTHLY_ID",  annual: "price_MAX_ANNUAL_ID"  },
};

const PaywallPage = ({ setPage, user, setUser }) => {
  const [billing, setBilling] = useState("monthly");
  const [loadingPlan, setLoadingPlan] = useState(null); // which plan CTA is loading

  const plans = {
    monthly: { pro: "29.99", max: "59.99" },
    annual:  { pro: "23.91", max: "47.91" },
  };

  // ── Stripe price IDs ─────────────────────────────────────────
  const STRIPE_PRICES = {
    pro:  { monthly: "price_1TTGeLKVRE4IsC8TVpFheHv1", annual: "price_1TTGgZKVRE4IsC8TePFiDm3A" },
    max:  { monthly: "price_1TTGezKVRE4IsC8TkKNoISYG", annual: "price_1TTGh5KVRE4IsC8TDlCvwreJ" },
  };
  const STRIPE_PK = "pk_live_51Ri79DKVRE4IsC8TLJjKXSlE2IFHaTSKiMlxlmksW6rvCAs7WlBIzhaFa1dZmThNK7t2fNyLim01KdeUlgPjRUDE00vldMnDN5";

const handleUpgrade = async (planId) => {
  setLoadingPlan(planId);
  try {
    const priceId = STRIPE_PRICES[planId][billing];
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        email: user?.email,
        trial: planId === "pro",
      }),
    });
    const { url } = await res.json();
    window.location.href = url;
  } catch (err) {
    console.error("Checkout error:", err);
    setLoadingPlan(null);
  }
};

  const PLAN_DATA = [
    {
      id: "pro",
      name: "Pro",
      badge: "⚡ Most Popular",
      desc: "For growing businesses that need automated chasing without the awkward follow-ups.",
      features: [
        "Unlimited invoices",
        "Automated reminder sequences",
        "Email + SMS reminders",
        "Smart escalation logic",
        "Advanced analytics",
        "Priority email support",
      ],
      featured: true,
    },
    {
      id: "max",
      name: "Max",
      badge: "Enterprise",
      desc: "For agencies managing invoices at scale with full white-label and team control.",
      features: [
        "Everything in Pro",
        "White-label branding",
        "Custom reminder templates",
        "Team member access",
        "API access",
        "Dedicated account manager",
      ],
      featured: false,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
      {/* Backgrounds */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,197,94,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Back button */}
      <button onClick={() => setPage("dashboard")} style={{ position: "absolute", top: 24, left: 28, display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", color: "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        ← Back to dashboard
      </button>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 860, animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "var(--green)", marginBottom: 20, fontFamily: "var(--mono)" }}>
            <span className="badge-dot" style={{ width: 6, height: 6 }} /> Upgrade PayChaser
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--white)", marginBottom: 10 }}>
            You've hit the free limit
          </h1>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
            You're on 5 of 5 free invoices. Upgrade to keep chasing — and let Almondy do the hard work.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999, padding: "3px 4px" }}>
            {["monthly", "annual"].map(m => (
              <button key={m} onClick={() => setBilling(m)} style={{
                padding: "7px 20px", borderRadius: 999, border: "none", fontSize: 13, fontWeight: 600,
                background: billing === m ? "var(--white)" : "transparent",
                color: billing === m ? "var(--black)" : "#555",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.2s", cursor: "pointer", fontFamily: "var(--font)"
              }}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
                {m === "annual" && (
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--green)", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 999, padding: "1px 7px" }}>Save 20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Side-by-side plan cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {PLAN_DATA.map(plan => {
            const price = plans[billing][plan.id];
            const isLoading = loadingPlan === plan.id;
            return (
              <div key={plan.id} style={{
                position: "relative",
                background: plan.featured ? "#0f0f0f" : "#0c0c0c",
                border: `1px solid ${plan.featured ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18,
                padding: "28px 26px 26px",
                display: "flex", flexDirection: "column",
                boxShadow: plan.featured ? "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.5)" : "none",
                overflow: "hidden",
              }}>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: plan.featured ? "var(--green)" : "#555", background: plan.featured ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${plan.featured ? "rgba(34,197,94,0.22)" : "rgba(255,255,255,0.09)"}`, borderRadius: 999, padding: "4px 11px", marginBottom: 18, width: "fit-content" }}>
                  {plan.badge}
                </div>

                {/* Plan name */}
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--white)", marginBottom: 6 }}>{plan.name}</div>

                {/* Description */}
                <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.65, marginBottom: 22, minHeight: 40 }}>{plan.desc}</p>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#444", marginBottom: 6 }}>$</span>
                  <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-3px", color: "var(--white)", lineHeight: 1 }}>{price}</span>
                  <span style={{ fontSize: 13, color: "#444", marginBottom: 8, marginLeft: 3 }}>/mo</span>
                </div>
                <div style={{ fontSize: 11, color: "#333", marginBottom: 22, fontFamily: "var(--mono)" }}>
                  {billing === "annual" ? `AUD · billed as $${plan.id === "pro" ? "286.99" : "574.99"}/yr` : "AUD · billed monthly"}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={!!loadingPlan}
                  style={{
                    width: "100%", padding: "13px 20px",
                    background: plan.id === "pro" ? "var(--white)" : "rgba(255,255,255,0.08)",
                    color: plan.id === "pro" ? "var(--black)" : "var(--white)",
                    border: plan.id === "pro" ? "none" : "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 10, fontSize: 14, fontWeight: 700,
                    letterSpacing: "-0.3px", marginBottom: 22,
                    cursor: loadingPlan ? "not-allowed" : "pointer",
                    opacity: loadingPlan && !isLoading ? 0.4 : 1,
                    transition: "all 0.2s", fontFamily: "var(--font)",
                  }}>
                  {isLoading ? "Redirecting..." : plan.id === "pro" ? "Start 3-day free trial →" : "Get started →"}
                </button>

                {/* Divider */}
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)", marginBottom: 20 }} />

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#777" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, background: "rgba(34,197,94,0.1)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.18)" }}>✓</div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
          {["No credit card required", "Cancel any time", "Instant access"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#383838" }}>
              <span style={{ color: "var(--green)", fontSize: 10 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);  // 👈 add this line
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Handle Supabase auth session on load (magic link callback)
    const handleSession = async (session) => {
      if (!session) { setAuthLoading(false); return; }

      const email = session.user.email;

      // Check if profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

    if (!profile) {
      await supabase.from("profiles").insert({
        id: session.user.id,
        email,
        plan: "free",
      });
      setUser({ id: session.user.id, email, plan: "free" });
      setPage("paywall"); // 👈 was "onboarding"
    } else {
      setUser({ id: session.user.id, email, plan: profile.plan || "free", bizName: profile.biz_name });
      const hasActivePlan = profile.plan === "pro" || profile.plan === "max";
      if (!hasActivePlan) {
        setPage("paywall"); // 👈 skip onboarding/dashboard checks entirely
      } else {
        setPage("dashboard");
      }
    }

      // Clean URL after magic link redirect
      window.history.replaceState({}, "", window.location.pathname);
      setAuthLoading(false);
    };

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleSession(session);
      } else {
        setAuthLoading(false);
      }
    });

    // Listen for auth changes (magic link click)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check for Stripe success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session") === "success" && user) {
      // Refresh profile to get updated plan from webhook
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
        if (data) setUser(u => ({ ...u, plan: data.plan || "pro" }));
      });
      setPage("dashboard");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [user]);

  const handleSetPage = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const isAppPage = ["auth", "onboarding", "dashboard", "paywall"].includes(page);

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  return (
    <>
      <GlobalStyle />
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}  {/* 👈 add this line */}
      {!isAppPage && <Nav page={page} setPage={handleSetPage} />}

      {/* ── Marketing ── */}
      {page === "home"       && <HomePage    setPage={handleSetPage} />}
      {page === "systems"    && <SystemsPage setPage={handleSetPage} />}
      {page === "paychaser"  && <PaychaserPage setPage={handleSetPage} />}
      {page === "pricing"    && <PricingPage  setPage={handleSetPage} />}

      {/* ── App ── */}
      {page === "auth"       && <AuthPage       setPage={handleSetPage} setUser={setUser} />}
      {page === "onboarding" && <OnboardingPage setPage={handleSetPage} user={user} setUser={setUser} />}
      {page === "dashboard"  && <DashboardPage  setPage={handleSetPage} user={user} />}
      {page === "paywall"    && <PaywallPage    setPage={handleSetPage} user={user} setUser={setUser} />}
    </>
  );
}
