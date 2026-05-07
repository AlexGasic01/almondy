import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://qmaqmbimnhzyspvnioeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtYXFtYmltbmh6eXNwdm5pb2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MzU2MjAsImV4cCI6MjA5MzQxMTYyMH0.wicztn4rC4a46UFJRmS1w5jw3tgM4uLj376HpEFlvs4"
);

/* ─── RESPONSIVE HOOK ─── */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

/* ─── SHARED ASSETS ─── */
const AlmondLogo = ({ size = 24, fill = "#fff" }) => (
  <svg viewBox="0 0 214 410" xmlns="http://www.w3.org/2000/svg" style={{ height: size, width: "auto", fill }}>
    <path d="M.95,217.78c2.4,18.11,9.13,33.98,19.75,46.86.13-6.65.66-13.44,1.61-20.36,7.4-53.46,38.56-106.25,85.49-144.84,27.01-22.2,55.67-38.66,83.49-49.08-40.13-22.13-108,3.65-155,60.07C9.13,143.06-3.76,182.19.95,217.78Z"/>
    <path d="M109.47,294c34.95-7.73,67.2-33.26,88.48-70.03,31.29-54.09,36.64-114.84,16.34-150.41-3.1,19.29-9.45,38.76-18.95,57.49-16.8,33.11-39.36,60.41-63.61,79.41-2.92,2.29-6.27-2.77-3.55-5.35,20.58-19.54,39.51-44.84,54.33-74.32,10.74-21.37,17.81-43.51,21.1-65.29-10.25,12.43-21.31,23.27-32.75,32.23-2.9,2.27-6.23-2.75-3.52-5.31,10.32-9.8,20.22-21.07,29.38-33.58-25.4,11.43-51.22,27.45-75.81,47.81-51.6,42.74-85.71,100.34-93.6,158.04-.29,2.13-.54,4.24-.76,6.34,3.49,3.45,7.3,6.64,11.43,9.54,20.72,14.55,45.44,19.18,71.49,13.43Z"/>
  </svg>
);

const WordmarkSVG = ({ height = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 1650 380" style={{ height, width: "auto", fill: "var(--white)" }}>
    <text style={{ fontFamily: "Inter, sans-serif", fontSize: "306.1px", fontWeight: 600 }} transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
    <g>
      <path d="M.87,192.5c2.19,16.56,8.35,31.07,18.06,42.85.12-6.08.6-12.29,1.48-18.62,6.76-48.89,35.26-97.16,78.18-132.45,24.7-20.3,50.91-35.36,76.35-44.88-36.7-20.24-98.77,3.34-141.74,54.93C8.35,124.18-3.43,159.96.87,192.5Z"/>
      <path d="M100.11,262.21c31.96-7.07,61.45-30.41,80.91-64.04,28.62-49.46,33.51-105.02,14.94-137.54-2.84,17.64-8.64,35.45-17.33,52.57-15.36,30.27-35.99,55.25-58.17,72.61-2.67,2.09-5.74-2.53-3.25-4.89,18.82-17.86,36.13-41,49.68-67.97,9.82-19.54,16.28-39.79,19.3-59.7-9.37,11.37-19.49,21.28-29.95,29.48-2.65,2.08-5.69-2.51-3.22-4.86,9.44-8.96,18.49-19.26,26.87-30.71-23.22,10.45-46.83,25.1-69.32,43.73-47.19,39.08-78.38,91.76-85.59,144.52-.27,1.95-.49,3.88-.69,5.8,3.19,3.16,6.67,6.07,10.45,8.72,18.94,13.3,41.55,17.54,65.37,12.28Z"/>
    </g>
  </svg>
);

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("hidden");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("icon"), 150);
    const t2 = setTimeout(() => setPhase("text"), 950);
    const t3 = setTimeout(() => setPhase("out"), 2300);
    const t4 = setTimeout(() => onDone(), 2850);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);
  const H = 52;
  const W = Math.round(H * 1525.07 / 365.74);
  return (
    <div style={{ position:"fixed",inset:0,zIndex:9999,background:"#080808",display:"flex",alignItems:"center",justifyContent:"center",opacity:phase==="out"?0:1,transition:phase==="out"?"opacity 0.6s cubic-bezier(0.4,0,0.2,1)":"none",pointerEvents:"none",overflow:"hidden" }}>
      <div style={{ position:"relative",width:W,height:H,clipPath:phase==="text"||phase==="out"?"inset(0 0 0 0)":`inset(0 ${Math.round(W*(1-210/1525.07))}px 0 0)`,transition:phase==="text"?"clip-path 0.65s cubic-bezier(0.22,1,0.36,1)":"none",opacity:phase==="hidden"?0:1,transform:phase==="hidden"?"scale(0.9)":"scale(1)",transformOrigin:`${Math.round(W*210/1525.07/2)}px 50%` }}>
        <svg viewBox="0 0 1525.07 365.74" xmlns="http://www.w3.org/2000/svg" style={{ height:H,width:W,display:"block" }}>
          <text fill="white" fontFamily="Inter18pt-SemiBold,'Inter 18pt',Inter,sans-serif" fontWeight="600" fontSize="306.1" transform="translate(221.25 264.4)"><tspan x="0" y="0">Almondy</tspan></text>
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
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%",height:"100%" }}>
    <rect x="3" y="11" width="18" height="12" rx="2" fill="#1e1e1e" stroke="#444" strokeWidth="1.5"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="#444"/>
    <line x1="12" y1="17.5" x2="12" y2="20" stroke="#444" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ─── MOBILE WARNING POPUP ─── */
const MobileWarningPopup = ({ onDismiss }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 350);
  };
  return (
    <>
      <div onClick={handleDismiss} style={{ position:"fixed",inset:0,zIndex:8000,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",opacity:visible?1:0,transition:"opacity 0.35s ease",pointerEvents:visible?"auto":"none" }} />
      <div style={{ position:"fixed",top:"50%",left:"50%",transform:visible?"translate(-50%, -50%) scale(1)":"translate(-50%, -50%) scale(0.94)",zIndex:8001,width:"calc(100% - 40px)",maxWidth:360,opacity:visible?1:0,transition:"opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)",pointerEvents:visible?"auto":"none" }}>
        <div style={{ background:"#111",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"32px 28px 28px",boxShadow:"0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:160,height:2,background:"linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)",borderRadius:999 }} />
          <button onClick={handleDismiss} style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:14,cursor:"pointer" }}>✕</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.22)",borderRadius:999,padding:"3px 10px",fontSize:10,fontWeight:700,color:"#f59e0b",letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"var(--mono)",marginBottom:14 }}>⚠ Warning</div>
          <h2 style={{ fontSize:21,fontWeight:800,letterSpacing:"-0.8px",color:"var(--white)",lineHeight:1.15,marginBottom:10 }}>Best viewed on desktop</h2>
          <p style={{ fontSize:13.5,color:"#666",lineHeight:1.75,marginBottom:26 }}>For the best experience, use a <strong style={{ color:"#999" }}>desktop device</strong>. Some features may appear limited on mobile.</p>
          <button onClick={handleDismiss} style={{ width:"100%",padding:"13px 20px",background:"var(--white)",color:"var(--black)",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>Got it, continue anyway</button>
        </div>
      </div>
    </>
  );
};

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
    html { scroll-behavior: smooth; scrollbar-gutter: stable; }
    body { background: var(--black); color: var(--white); font-family: var(--font); line-height: 1.6; overflow-x: hidden; }
    * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.12) transparent; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
    a { text-decoration: none; }
    button { cursor: pointer; font-family: var(--font); -webkit-tap-highlight-color: transparent; touch-action: manipulation; user-select: none; -webkit-user-select: none; }
    button:active { opacity: 0.7; transform: scale(0.97); transition: opacity 0.1s, transform 0.1s; }
    * { -webkit-touch-callout: none; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.06); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeRight { from { opacity: 0; transform: translateX(32px) scale(0.97); } to { opacity: 1; transform: translateX(0) scale(1); } }
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
    .mobile-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 199; backdrop-filter: blur(4px);
    }
    .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  `}</style>
);

/* ─── NAV ─── */
const Nav = ({ page, setPage }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rcSession, setRcSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setRcSession(session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setRcSession(session ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleAuthBtn = () => {
    if (rcSession) {
      supabase.auth.signOut().then(() => { setRcSession(null); setPage("reviewchaser"); });
    } else {
      setPage("reviewchaser");
    }
  };

  const links = [
    { id: "home",         label: "Home" },
    { id: "systems",      label: "Systems" },
    { id: "webdev",       label: "Web Development" },
    { id: "reviewchaser", label: "ReviewChaser" },
    { id: "testimonials", label: "Testimonials" },
  ];

  const go = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"space-between",padding:isMobile?"0 18px":"0 48px",height:62,background:"rgba(8,8,8,0.92)",backdropFilter:"blur(20px) saturate(1.4)",borderBottom:"1px solid var(--border)" }}>
        <button onClick={() => go("home")} style={{ display:"flex",alignItems:"center",gap:10,background:"none",border:"none" }}>
          <WordmarkSVG height={isMobile ? 20 : 24} />
        </button>

        {isMobile ? (
          <button onClick={() => setMenuOpen(v => !v)} style={{ background:"none",border:"none",display:"flex",flexDirection:"column",gap:5,padding:6 }}>
            <span style={{ display:"block",width:22,height:2,background:menuOpen?"transparent":"var(--white)",transition:"all 0.2s",transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }} />
            <span style={{ display:"block",width:22,height:2,background:"var(--white)",transition:"all 0.2s",transform:menuOpen?"rotate(-45deg)":"none" }} />
          </button>
        ) : (
          <>
            <ul style={{ display:"flex",gap:28,listStyle:"none" }}>
              {links.map(l => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} style={{ background:"none",border:"none",color:page===l.id?"var(--white)":"var(--gray)",fontSize:13,fontWeight:500,letterSpacing:"-0.1px",transition:"color 0.15s" }}>{l.label}</button>
                </li>
              ))}
            </ul>
            <button onClick={handleAuthBtn} style={{ background:"var(--white)",color:"var(--black)",border:"none",padding:"8px 20px",fontSize:13,fontWeight:700,borderRadius:7,letterSpacing:"-0.2px" }}>{rcSession ? "Log Out" : "Log In →"}</button>
          </>
        )}
      </nav>

      {isMobile && menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
          <div style={{ position:"fixed",top:62,right:0,bottom:0,width:"75vw",maxWidth:300,background:"#0d0d0d",borderLeft:"1px solid var(--border)",zIndex:200,display:"flex",flexDirection:"column",padding:"24px 0",animation:"fadeRight 0.25s both" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{ background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"18px 24px",fontSize:16,fontWeight:600,color:page===l.id?"var(--white)":"var(--gray)",textAlign:"left",transition:"color 0.15s" }}>
                {l.label}
              </button>
            ))}
            <div style={{ padding:"20px 24px" }}>
              <button onClick={handleAuthBtn} style={{ width:"100%",background:"var(--white)",color:"var(--black)",border:"none",padding:"12px 20px",fontSize:14,fontWeight:700,borderRadius:8 }}>{rcSession ? "Log Out" : "Log In →"}</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* ─── FOOTER ─── */
const Footer = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div style={{ width:"100%",height:1,background:"rgba(255,255,255,0.055)" }} />
      <footer style={{ borderTop:"1px solid var(--border)",padding:isMobile?"24px 20px":"32px 48px",display:"flex",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,flexDirection:isMobile?"column":"row" }}>
        <button onClick={() => setPage("home")} style={{ display:"flex",alignItems:"center",gap:8,background:"none",border:"none" }}>
          <WordmarkSVG height={20} />
        </button>
        <span style={{ fontSize:12,color:"var(--muted)",fontFamily:"var(--mono)" }}>© 2026 Almondy. All rights reserved.</span>
        <ul style={{ display:"flex",gap:16,listStyle:"none",flexWrap:"wrap" }}>
          {[
            ["Privacy", null],
            ["Terms", null],
            ["Systems", "systems"],
            ["ReviewChaser", "reviewchaser"], // ← ADDED
            ["Contact", "contact"],
          ].map(([label, pageId]) => (
            <li key={label}>
              <button
                onClick={() => pageId && setPage(pageId)}
                style={{ background:"none",border:"none",fontSize:12,color:"var(--muted)",cursor:pageId?"pointer":"default" }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
};

/* ─── LOCKED CARD ─── */
const LockedCard = ({ style }) => {
  const [shaking, setShaking] = useState(false);
  const shake = () => { if(shaking) return; setShaking(true); setTimeout(()=>setShaking(false),600); };
  return (
    <div onClick={shake} style={{ position:"relative",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",minHeight:220,background:"#0a0a0a",cursor:"pointer",...style }}>
      <div style={{ padding:28,display:"flex",flexDirection:"column",gap:10,filter:"blur(5px)",opacity:0.25,userSelect:"none" }}>
        <div style={{ fontSize:10.5,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)" }}>In Progress</div>
        <div style={{ fontSize:32,fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)" }}>Coming Soon</div>
      </div>
      <div style={{ position:"absolute",inset:0,background:"rgba(8,8,8,0.82)" }} />
      <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10 }}>
        <div className={shaking?"shaking":""} style={{ width:44,height:44,background:"#111",border:"1px solid #2e2e2e",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",padding:8,boxShadow:"0 4px 20px rgba(0,0,0,0.6)" }}>
          <LockSVG />
        </div>
        <p style={{ fontSize:10,fontWeight:700,letterSpacing:"2.5px",color:"#383838",textTransform:"uppercase" }}>In Progress</p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: HOME
════════════════════════════════════════════ */
const HomePage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const mockupRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x:0,y:0 });
  const currentRef = useRef({ x:0,y:0 });

  const userCount = (() => {
    const start = new Date("2026-05-03T00:00:00");
    const days = Math.floor((new Date() - start) / 86400000);
    return 40 + Math.max(0, days*2);
  })();

  useEffect(() => {
    if (isMobile) return;
    const el = mockupRef.current;
    if (!el) return;
    const onMove = e => { const r=el.getBoundingClientRect(); targetRef.current.y=((e.clientX-r.left)/r.width-0.5)*2*8; targetRef.current.x=((e.clientY-r.top)/r.height-0.5)*2*-8; };
    const onLeave = () => { targetRef.current={x:0,y:0}; };
    el.addEventListener("mousemove",onMove);
    el.addEventListener("mouseleave",onLeave);
    const loop = () => { currentRef.current.x+=(targetRef.current.x-currentRef.current.x)*0.12; currentRef.current.y+=(targetRef.current.y-currentRef.current.y)*0.12; if(el) el.style.transform=`perspective(800px) rotateX(${currentRef.current.x.toFixed(3)}deg) rotateY(${currentRef.current.y.toFixed(3)}deg)`; rafRef.current=requestAnimationFrame(loop); };
    loop();
    return () => { el.removeEventListener("mousemove",onMove); el.removeEventListener("mouseleave",onLeave); cancelAnimationFrame(rafRef.current); };
  }, [isMobile]);

  return (
    <div style={{ paddingTop:62, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* HERO */}
      <div style={{ position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 60% at 50% 45%, rgba(50,50,50,0.5) 0%, transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:1,minHeight:isMobile?"auto":"100vh",display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",alignItems:"center",maxWidth:1280,margin:"0 auto",padding:isMobile?"40px 20px 48px":"40px 48px 0 64px" }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-start",paddingRight:isMobile?0:48,textAlign:isMobile?"left":"left" }}>
            <button onClick={() => setPage("systems")} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.28)",borderRadius:999,padding:"5px 14px 5px 10px",fontSize:12.5,fontWeight:600,color:"var(--green)",marginBottom:28,animation:"fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both",fontFamily:"var(--mono)" }}>
              <span className="badge-dot" /> ReviewChaser Just Released
            </button>
            <h1 style={{ fontSize:isMobile?"clamp(36px,10vw,52px)":"clamp(40px,4.5vw,68px)",fontWeight:800,letterSpacing:"-2.5px",lineHeight:1.05,color:"var(--white)",marginBottom:20,animation:"fadeUp 0.55s 0.08s cubic-bezier(0.22,1,0.36,1) both" }}>
              More Google reviews.<br />Zero awkwardness.
            </h1>
            <p style={{ fontSize:isMobile?15:15.5,color:"#666",maxWidth:420,lineHeight:1.75,marginBottom:36,animation:"fadeUp 0.55s 0.16s cubic-bezier(0.22,1,0.36,1) both" }}>
              Send a mobile number. Hit send. Your customer gets a friendly SMS with your Google Review link. <strong style={{ color:"#999" }}>Takes 5 seconds. Works every time.</strong>
            </p>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap",animation:"fadeUp 0.55s 0.24s cubic-bezier(0.22,1,0.36,1) both",width:isMobile?"100%":"auto" }}>
              <button onClick={() => setPage("reviewchaser")} style={{ background:"var(--white)",color:"var(--black)",border:"none",padding:"13px 24px",fontSize:14,fontWeight:700,borderRadius:8,letterSpacing:"-0.3px",flex:isMobile?"1":"none" }}>
                Learn More →
              </button>
              <button onClick={() => setPage("systems")} style={{ background:"transparent",color:"#888",border:"1px solid rgba(255,255,255,0.12)",padding:"13px 24px",fontSize:14,fontWeight:600,borderRadius:8,letterSpacing:"-0.3px",flex:isMobile?"1":"none" }}>
                Our Products
              </button>
            </div>
            <div style={{ marginTop:40,display:"flex",alignItems:"center",gap:14,animation:"fadeUp 0.55s 0.32s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div style={{ display:"flex" }}>
                {[["JK","#6366f1,#8b5cf6"],["ML","#ec4899,#f43f5e"],["SP","#f59e0b,#ef4444"],["TR","#10b981,#059669"]].map(([init,grad],i) => (
                  <div key={i} style={{ width:28,height:28,borderRadius:"50%",border:"2px solid var(--black)",background:`linear-gradient(135deg,${grad})`,marginLeft:i===0?0:-8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff" }}>{init}</div>
                ))}
              </div>
              <div style={{ fontSize:12,color:"#858585",lineHeight:1.45 }}>
                <div style={{ color:"#f59e0b",fontSize:11,letterSpacing:1 }}>★★★★★</div>
                <div><strong style={{ color:"#888" }}>Trusted by businesses</strong> with avg 4.8/5</div>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",position:"relative",animation:"fadeRight 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div ref={mockupRef} style={{ position:"relative",zIndex:1,width:"100%",maxWidth:560,cursor:"pointer",willChange:"transform" }}>
                <HeroProductMockup />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ height:isMobile?0:48 }} />
      <div style={{ width:"100%",height:1,background:"rgba(255,255,255,0.055)" }} />

      {/* PRODUCTS — now includes ReviewChaser */}
      <div style={{ maxWidth:1180,margin:"0 auto",padding:isMobile?"60px 20px":"100px 48px" }}>
        <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:14,fontFamily:"var(--mono)" }}>Our Systems</p>
        <h2 style={{ fontSize:isMobile?"clamp(28px,8vw,40px)":"clamp(32px,3.5vw,52px)",fontWeight:800,letterSpacing:"-2px",lineHeight:1.05,color:"var(--white)",marginBottom:36 }}>
          Tools that get things done.
        </h2>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:10 }}>
  {/* PayChaser */}
  <button onClick={() => setPage("paychaser")} style={{ border:"1px solid var(--border)",borderRadius:12,padding:isMobile?"24px":"36px",display:"flex",flexDirection:"column",alignItems:"flex-start",position:"relative",overflow:"hidden",background:"#0c0c0c",cursor:"pointer",textAlign:"left" }}>
    <div style={{ fontSize:10.5,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",display:"flex",alignItems:"center",gap:7,marginBottom:8 }}>
      <span className="badge-dot" style={{ width:6,height:6 }} /> In Development
    </div>
    <div style={{ fontSize:isMobile?36:48,fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",marginBottom:8 }}>PayChaser</div>
    <p style={{ fontSize:13.5,color:"var(--muted)",lineHeight:1.75,marginBottom:8 }}>Track invoices, chase payments, and collect faster — all in one place.</p>
    <span style={{ fontSize:20,color:"var(--muted)" }}>↗</span>
  </button>

  {/* ReviewChaser */}
  <button onClick={() => setPage("reviewchaser")} style={{ border:"1px solid var(--border)",borderRadius:12,padding:isMobile?"24px":"36px",display:"flex",flexDirection:"column",alignItems:"flex-start",position:"relative",overflow:"hidden",background:"#0c0c0c",cursor:"pointer",textAlign:"left" }}>
    <div style={{ fontSize:10.5,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--green)",display:"flex",alignItems:"center",gap:7,marginBottom:8 }}>
      <span className="badge-dot" style={{ width:6,height:6 }} /> Live Now
    </div>
    <div style={{ fontSize:isMobile?36:48,fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",marginBottom:8 }}>ReviewChaser</div>
    <p style={{ fontSize:13.5,color:"var(--muted)",lineHeight:1.75,marginBottom:8 }}>Send SMS review requests in seconds. Get more Google reviews without the awkwardness.</p>
    <span style={{ fontSize:20,color:"var(--muted)" }}>↗</span>
  </button>

  {!isMobile && <LockedCard />}

      
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

const HeroProductMockup = () => {
  const [demoMobile, setDemoMobile] = useState("");
  const [demoSent, setDemoSent] = useState(false);
  const [demoSending, setDemoSending] = useState(false);

  const handleDemoSend = () => {
    if (demoMobile.replace(/\s/g,"").length < 10) return;
    setDemoSending(true);
    setTimeout(() => { setDemoSending(false); setDemoSent(true); }, 1200);
    setTimeout(() => { setDemoSent(false); setDemoMobile(""); }, 4000);
  };

  return (
    <div style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,0.09)", borderRadius:16, overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.7)", width:"100%", maxWidth:480 }}>
      {/* Title bar */}
      <div style={{ background:"#090909", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"12px 16px", display:"flex", alignItems:"center", gap:6 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
        <div style={{ flex:1, textAlign:"center", fontSize:11, fontWeight:600, color:"#2a2a2a", fontFamily:"var(--mono)" }}>ReviewChaser</div>
      </div>

      <div style={{ padding:24 }}>
        {/* Sends counter */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:11, color:"#383838", fontFamily:"var(--mono)", letterSpacing:1, textTransform:"uppercase" }}>Sends this month</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#22c55e", fontFamily:"var(--mono)" }}>23 / 140</span>
            <div style={{ width:72, height:5, background:"rgba(255,255,255,0.06)", borderRadius:999 }}>
              <div style={{ width:"16%", height:"100%", background:"#22c55e", borderRadius:999 }} />
            </div>
          </div>
        </div>

        {!demoSent ? (
          <>
            <label style={{ fontSize:11.5, fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Customer mobile</label>
            <input
              value={demoMobile}
              onChange={e => setDemoMobile(e.target.value)}
              placeholder="04XX XXX XXX"
              maxLength={12}
              style={{ width:"100%", padding:"13px 16px", background:"#0f0f0f", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, fontSize:16, color:"#fff", outline:"none", fontFamily:"var(--font)", letterSpacing:"0.5px", boxSizing:"border-box", marginBottom:12 }}
              onKeyDown={e => e.key === "Enter" && handleDemoSend()}
            />
            {/* SMS preview */}
            <div style={{ background:"#080808", border:"1px solid rgba(255,255,255,0.05)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
              <div style={{ fontSize:10, color:"#2a2a2a", fontFamily:"var(--mono)", letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>SMS preview</div>
              <div style={{ fontSize:12.5, color:"#555", lineHeight:1.75 }}>
                Hi! Thanks for choosing <span style={{ color:"#777" }}>Your Business</span>. If you have a moment, we'd love a Google review! <span style={{ color:"#22c55e" }}>g.co/r/yourbusiness</span>
              </div>
              <div style={{ fontSize:10, color:"#2a2a2a", marginTop:6, fontFamily:"var(--mono)" }}>152 / 160 chars ✓</div>
            </div>
            <button
              onClick={handleDemoSend}
              disabled={demoMobile.replace(/\s/g,"").length < 10 || demoSending}
              style={{ width:"100%", padding:"13px 20px", background:demoMobile.replace(/\s/g,"").length >= 10 ? "#22c55e" : "rgba(34,197,94,0.1)", color:demoMobile.replace(/\s/g,"").length >= 10 ? "#000" : "#1a4a2e", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:demoMobile.replace(/\s/g,"").length >= 10 ? "pointer" : "default", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {demoSending
                ? <><div style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTop:"2px solid #000", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> Sending…</>
                : "Send Review Request ✦"}
            </button>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>Demo sent!</div>
            <div style={{ fontSize:12.5, color:"#555" }}>Sign up to send real review requests.</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: SYSTEMS
════════════════════════════════════════════ */
const SystemsPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop:62, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:isMobile?"80px 20px 48px":"140px 64px 72px",animation:"fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
        <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
        <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:14,fontFamily:"var(--mono)" }}>Our Systems</p>
        <h1 style={{ fontSize:isMobile?"clamp(32px,10vw,52px)":"clamp(40px,5vw,72px)",fontWeight:800,letterSpacing:"-2.5px",lineHeight:1.05,color:"var(--white)",marginBottom:16 }}>
          Tools that get things done.
        </h1>
        <p style={{ fontSize:15.5,color:"#858585",maxWidth:480,lineHeight:1.75 }}>Software built for the real world. Each system solves one problem, and solves it well.</p>
      </div>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:isMobile?"0 20px 48px":"0 64px 72px", flex:1 }}>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:10 }}>
            <SysCard onClick={() => setPage("reviewchaser")} live name="ReviewChaser" desc="Send SMS review requests in seconds. More Google reviews, zero awkwardness." />
          {/* ReviewChaser — ADDED */}
            <SysCard onClick={null} live={false} name="PayChaser" desc="Automated invoice reminders and payment tracking. Coming soon." />
          <LockedCard />
          {!isMobile && <LockedCard />}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

const SysCard = ({ onClick, live, name, desc }) => {
  const [pos, setPos] = useState({ x:50,y:50 });
  return (
    <button onClick={onClick} onMouseMove={e=>{ const r=e.currentTarget.getBoundingClientRect(); setPos({ x:((e.clientX-r.left)/r.width*100).toFixed(1),y:((e.clientY-r.top)/r.height*100).toFixed(1) }); }} style={{ position:"relative",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",background:"#0c0c0c",minHeight:220,display:"flex",flexDirection:"column",cursor:"pointer",textAlign:"left",padding:28,gap:10 }}>
      <div style={{ position:"absolute",inset:0,background:`radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.03) 0%, transparent 60%)`,pointerEvents:"none" }} />
      <div style={{ display:"flex",alignItems:"center",gap:7,fontSize:10.5,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:live?"var(--green)":"var(--muted)" }}>
        {live&&<span className="badge-dot" style={{ width:6,height:6 }} />} {live?"Live Now":"Coming Soon"}
      </div>
      <div style={{ fontSize:32,fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",lineHeight:1,marginTop:4 }}>{name}</div>
      <p style={{ fontSize:13,color:"#858585",lineHeight:1.7 }}>{desc}</p>
      <span style={{ fontSize:18,color:"var(--muted)",marginTop:"auto" }}>↗</span>
    </button>
  );
};

/* ════════════════════════════════════════════
   WEB DEV ONBOARDING PAGE
════════════════════════════════════════════ */

const PALETTE_OPTIONS = [
  { id:"dark",    label:"Dark & minimal",   colors:["#080808","#ffffff","#22c55e"] },
  { id:"light",   label:"Light & clean",    colors:["#ffffff","#111111","#6366f1"] },
  { id:"warm",    label:"Warm & earthy",    colors:["#f5f0e8","#2c1a0e","#c2693e"] },
  { id:"bold",    label:"Bold & vibrant",   colors:["#0f0a1e","#f4f4f4","#a855f7"] },
  { id:"navy",    label:"Navy & gold",      colors:["#0a1628","#f8f4e8","#c9a84c"] },
  { id:"forest",  label:"Forest & sage",    colors:["#1a2e1a","#f0f4f0","#6b9e6b"] },
  { id:"sunset",  label:"Sunset & coral",   colors:["#1a0a0a","#fff8f0","#e8634a"] },
  { id:"slate",   label:"Slate & silver",   colors:["#1a1f2e","#f0f2f5","#8899bb"] },
  { id:"cream",   label:"Cream & charcoal", colors:["#faf8f3","#2a2a2a","#c4a882"] },
  { id:"ocean",   label:"Ocean & teal",     colors:["#0a1628","#f0fafa","#2ab5b5"] },
  { id:"rose",    label:"Rose & blush",     colors:["#1a0a0e","#fff5f7","#e87b9a"] },
  { id:"custom",  label:"Custom colours",   colors:[] },
];

const FONT_OPTIONS = [
  { id:"inter",    label:"Inter",      style:"400 15px Inter, sans-serif",        desc:"Clean, modern, versatile" },
  { id:"serif",    label:"Playfair",   style:"400 15px Georgia, serif",           desc:"Elegant, premium, editorial" },
  { id:"mono",     label:"Mono",       style:"400 14px monospace",                desc:"Technical, minimal, sharp" },
  { id:"rounded",  label:"Rounded",    style:"400 15px system-ui, sans-serif",    desc:"Friendly, approachable" },
  { id:"custom",   label:"Custom",     style:"400 15px sans-serif",               desc:"I have a specific font in mind" },
];

const HEADER_STYLES = [
  {
    id:"centered",
    label:"Centered hero",
    desc:"Big headline centre of screen, CTA below",
    preview: (
      <div style={{background:"#0c0c0c",borderRadius:8,padding:"20px 16px",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#22c55e",letterSpacing:2,marginBottom:6}}>YOUR TAGLINE</div>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",letterSpacing:"-0.8px",lineHeight:1.1,marginBottom:10}}>Big Bold<br/>Headline Here</div>
        <div style={{display:"inline-block",background:"#fff",color:"#000",borderRadius:6,padding:"6px 14px",fontSize:10,fontWeight:700}}>Get Started</div>
      </div>
    )
  },
  {
    id:"split",
    label:"Split layout",
    desc:"Text left, image or visual right",
    preview: (
      <div style={{background:"#0c0c0c",borderRadius:8,padding:"16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"center"}}>
        <div>
          <div style={{fontSize:14,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",lineHeight:1.15,marginBottom:6}}>Your<br/>Headline</div>
          <div style={{fontSize:9,color:"#666",marginBottom:8}}>Short description of what you do and why it matters.</div>
          <div style={{display:"inline-block",background:"#fff",color:"#000",borderRadius:5,padding:"4px 10px",fontSize:9,fontWeight:700}}>CTA →</div>
        </div>
        <div style={{background:"#1a1a1a",borderRadius:6,height:70,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"#2a2a2a",border:"1px solid #656565"}} />
        </div>
      </div>
    )
  },
  {
    id:"fullscreen",
    label:"Full-screen image",
    desc:"Edge-to-edge background image with overlay text",
    preview: (
      <div style={{background:"#1a1a1a",borderRadius:8,padding:"20px 16px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}} />
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:14,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",lineHeight:1.1,marginBottom:8}}>Full Screen<br/>Impact</div>
          <div style={{display:"inline-block",border:"1px solid rgba(255,255,255,0.4)",color:"#fff",borderRadius:5,padding:"4px 12px",fontSize:9,fontWeight:600}}>Explore →</div>
        </div>
      </div>
    )
  },
  {
    id:"minimal",
    label:"Minimal / text only",
    desc:"Clean, no-frills typography-first hero",
    preview: (
      <div style={{background:"#fff",borderRadius:8,padding:"16px 14px"}}>
        <div style={{fontSize:9,color:"#999",marginBottom:4}}>Est. 2024</div>
        <div style={{fontSize:15,fontWeight:800,color:"#111",letterSpacing:"-0.8px",lineHeight:1.1,marginBottom:6}}>We Build<br/>Things.</div>
        <div style={{fontSize:9,color:"#666",marginBottom:8}}>A short punchy line about what makes you different.</div>
        <div style={{fontSize:9,color:"#111",borderBottom:"1px solid #111",display:"inline",paddingBottom:1}}>Learn more →</div>
      </div>
    )
  },
];

const PAGE_OPTIONS = [
  { id:"home",       label:"Home / Landing" },
  { id:"about",      label:"About" },
  { id:"services",   label:"Services" },
  { id:"portfolio",  label:"Portfolio / Work" },
  { id:"pricing",    label:"Pricing" },
  { id:"contact",    label:"Contact" },
  { id:"blog",       label:"Blog" },
  { id:"faq",        label:"FAQ" },
  { id:"testimonials",label:"Testimonials" },
];

const EXTRA_OPTIONS = [
  { id:"contact_form",  label:"Contact form" },
  { id:"booking",       label:"Booking / scheduling" },
  { id:"chat_widget",   label:"Live chat widget" },
  { id:"analytics",     label:"Analytics (GA / Plausible)" },
  { id:"seo",           label:"SEO setup" },
  { id:"newsletter",    label:"Newsletter signup" },
  { id:"ecommerce",     label:"E-commerce / payments" },
  { id:"cms",           label:"CMS (edit content yourself)" },
];

const STEPS_ONBOARDING = [
  "Business","Colours","Typography","Header","Hero","Pages","Extras","Review",
];

const WebDevOnboardingPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [animDir, setAnimDir] = useState(1);
  const [visible, setVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);

const [data, setData] = useState({
  bizName:"",bizDesc:"",palette:"",paletteCustom:"",font:"",fontCustom:"",
  headerStyle:"",headerUpload:null,headerUploadName:"",headerUrl:"",heroHeadline:"",
  heroSubline:"",heroCta:"",pages:[],extras:[],otherNotes:"",email:"",
});

  const go = (dir) => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => { setStep(s => s + dir); setVisible(true); }, 200);
  };

  const set = (key, val) => setData(d => ({ ...d, [key]: val }));
  const toggle = (key, val) => setData(d => ({
    ...d,
    [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val]
  }));

  const canNext = () => {
    if (step === 0) return data.bizName.trim().length > 0;
    if (step === 1) return data.palette !== "";
    if (step === 2) return data.font !== "";
    if (step === 3) return data.headerStyle !== "";
    if (step === 4) return data.heroHeadline.trim().length > 0;
    if (step === 5) return data.pages.length > 0;
    if (step === 7) return data.email.trim().includes("@");
    return true;
  };

  const inputStyle = {
    width:"100%",padding:"12px 16px",background:"#0f0f0f",
    border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,
    fontSize:15,color:"#fff",outline:"none",fontFamily:"var(--font)",boxSizing:"border-box",
  };
  const textareaStyle = { ...inputStyle, resize:"vertical", minHeight:90 };

  const stepContent = () => {
    switch(step) {
      case 0: return (
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Business / project name</label>
            <input autoFocus style={inputStyle} placeholder="e.g. Smith Electrical" value={data.bizName} onChange={e=>set("bizName",e.target.value)} onKeyDown={e=>e.key==="Enter"&&canNext()&&go(1)} />
          </div>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>What do you do? <span style={{color:"#383838",fontWeight:400}}>(brief)</span></label>
            <textarea style={textareaStyle} placeholder="e.g. We install solar panels for residential homes in Brisbane." value={data.bizDesc} onChange={e=>set("bizDesc",e.target.value)} />
          </div>
        </div>
      );
      case 1: return (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {PALETTE_OPTIONS.map(p => (
              <button key={p.id} onClick={()=>set("palette",p.id)} style={{ background:data.palette===p.id?"rgba(34,197,94,0.07)":"#0c0c0c",border:`1px solid ${data.palette===p.id?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left" }}>
                <div style={{ display:"flex",gap:5,marginBottom:8 }}>
                  {p.colors.length>0?p.colors.map(c=>(<div key={c} style={{ width:16,height:16,borderRadius:"50%",background:c,border:"1px solid rgba(255,255,255,0.1)" }} />)):(<div style={{ width:16,height:16,borderRadius:"50%",background:"conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)",flexShrink:0 }} />)}
                </div>
                <div style={{ fontSize:12,fontWeight:600,color:data.palette===p.id?"#22c55e":"#888" }}>{p.label}</div>
              </button>
            ))}
          </div>
          {data.palette==="custom"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:16,background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:20 }}>
              <p style={{ fontSize:12,color:"#555",margin:0 }}>Pick your two brand colours:</p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:"#555",display:"block",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>Primary</label>
                  <div style={{ width:86,height:86,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.12)",cursor:"pointer" }}>
                    <input type="color" value={data.paletteCustom?.split("|")[0]||"#6366f1"} onChange={e=>{const s=data.paletteCustom?.split("|")[1]||"#ffffff";set("paletteCustom",e.target.value+"|"+s);}} style={{ width:"150%",height:"150%",marginTop:"-25%",marginLeft:"-25%",border:"none",padding:0,cursor:"pointer" }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:"#555",display:"block",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>Secondary</label>
                  <div style={{ width:86,height:86,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.12)",cursor:"pointer" }}>
                    <input type="color" value={data.paletteCustom?.split("|")[1]||"#ffffff"} onChange={e=>{const p=data.paletteCustom?.split("|")[0]||"#6366f1";set("paletteCustom",p+"|"+e.target.value);}} style={{ width:"150%",height:"150%",marginTop:"-25%",marginLeft:"-25%",border:"none",padding:0,cursor:"pointer" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      case 2: return (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {FONT_OPTIONS.map(f=>(
            <button key={f.id} onClick={()=>set("font",f.id)} style={{ background:data.font===f.id?"rgba(34,197,94,0.07)":"#0c0c0c",border:`1px solid ${data.font===f.id?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
              <span style={{ font:f.style,color:data.font===f.id?"#22c55e":"#ccc",fontSize:16 }}>Aa — {f.label}</span>
              <span style={{ fontSize:12,color:"#444" }}>{f.desc}</span>
            </button>
          ))}
          {data.font==="custom"&&<input autoFocus style={inputStyle} placeholder="Font name e.g. 'Raleway'" value={data.fontCustom} onChange={e=>set("fontCustom",e.target.value)} />}
        </div>
      );
      case 3: return (
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {HEADER_STYLES.map(h=>(
              <button key={h.id} onClick={()=>set("headerStyle",h.id)} style={{ background:"transparent",border:`2px solid ${data.headerStyle===h.id?"rgba(34,197,94,0.5)":"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:0,cursor:"pointer",textAlign:"left",overflow:"hidden" }}>
                <div style={{ pointerEvents:"none" }}>{h.preview}</div>
                <div style={{ padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize:12,fontWeight:700,color:data.headerStyle===h.id?"#22c55e":"#888",marginBottom:3 }}>{h.label}</div>
                  <div style={{ fontSize:11,color:"#444",lineHeight:1.5 }}>{h.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:14 }}>
            <p style={{ fontSize:12,color:"#555",marginBottom:10 }}>Have a site you love? Upload a screenshot or paste a URL.</p>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
              <label style={{ flex:1,minWidth:140,background:"#0c0c0c",border:"1px dashed rgba(255,255,255,0.12)",borderRadius:10,padding:"13px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:data.headerUploadName?"#22c55e":"#555" }}>
                <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f){set("headerUpload",f);set("headerUploadName",f.name);}}} />
                {data.headerUploadName?`✓ ${data.headerUploadName}`:"Upload image reference"}
              </label>
              <input style={{ ...inputStyle,flex:1,minWidth:140 }} placeholder="or paste a URL" value={data.headerUrl||""} onChange={e=>set("headerUrl",e.target.value)} />
            </div>
          </div>
        </div>
      );
      case 4: return (
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Main headline</label>
            <input autoFocus style={inputStyle} placeholder='"Solar done right. Every time."' value={data.heroHeadline} onChange={e=>set("heroHeadline",e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Subheadline <span style={{color:"#383838",fontWeight:400}}>(optional)</span></label>
            <textarea style={textareaStyle} placeholder="A short supporting line." value={data.heroSubline} onChange={e=>set("heroSubline",e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>CTA button text</label>
            <input style={inputStyle} placeholder='"Get a free quote"' value={data.heroCta} onChange={e=>set("heroCta",e.target.value)} />
          </div>
          {data.heroHeadline&&(
            <div style={{ background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:20,marginTop:4 }}>
              <div style={{ fontSize:9,color:"#383838",fontFamily:"var(--mono)",letterSpacing:2,marginBottom:10 }}>PREVIEW</div>
              <div style={{ fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-0.8px",lineHeight:1.1,marginBottom:6 }}>{data.heroHeadline}</div>
              {data.heroSubline&&<div style={{ fontSize:13,color:"#666",lineHeight:1.7,marginBottom:12 }}>{data.heroSubline}</div>}
              {data.heroCta&&<div style={{ display:"inline-block",background:"#fff",color:"#000",borderRadius:7,padding:"8px 16px",fontSize:12,fontWeight:700 }}>{data.heroCta} →</div>}
            </div>
          )}
        </div>
      );
      case 5: return (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <p style={{ fontSize:13,color:"#666",marginBottom:4 }}>Select all pages you need:</p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
            {PAGE_OPTIONS.map(p=>{const on=data.pages.includes(p.id);return(
              <button key={p.id} onClick={()=>toggle("pages",p.id)} style={{ background:on?"rgba(34,197,94,0.07)":"#0c0c0c",border:`1px solid ${on?"rgba(34,197,94,0.35)":"rgba(255,255,255,0.07)"}`,borderRadius:9,padding:"11px 14px",display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:13,fontWeight:600,color:on?"#22c55e":"#666",textAlign:"left" }}>
                <div style={{ width:14,height:14,borderRadius:"50%",border:`1px solid ${on?"rgba(34,197,94,0.5)":"#656565"}`,background:on?"#22c55e":"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#000",fontWeight:900 }}>{on?"✓":""}</div>
                {p.label}
              </button>
            );})}
          </div>
        </div>
      );
      case 6: return (
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <p style={{ fontSize:13,color:"#666",marginBottom:4 }}>Extra features? <span style={{color:"#383838"}}>(optional)</span></p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
            {EXTRA_OPTIONS.map(e=>{const on=data.extras.includes(e.id);return(
              <button key={e.id} onClick={()=>toggle("extras",e.id)} style={{ background:on?"rgba(34,197,94,0.07)":"#0c0c0c",border:`1px solid ${on?"rgba(34,197,94,0.35)":"rgba(255,255,255,0.07)"}`,borderRadius:9,padding:"11px 14px",display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:13,fontWeight:600,color:on?"#22c55e":"#666",textAlign:"left" }}>
                <div style={{ width:14,height:14,borderRadius:"50%",border:`1px solid ${on?"rgba(34,197,94,0.5)":"#656565"}`,background:on?"#22c55e":"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#000",fontWeight:900 }}>{on?"✓":""}</div>
                {e.label}
              </button>
            );})}
          </div>
          <div style={{ marginTop:4 }}>
            <label style={{ fontSize:12,fontWeight:600,color:"#555",display:"block",marginBottom:8 }}>Anything else?</label>
            <textarea style={textareaStyle} placeholder="Competitors, inspirations, must-haves..." value={data.otherNotes} onChange={e=>set("otherNotes",e.target.value)} />
          </div>
        </div>
      );
      case 7: return (
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div style={{ background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:20,display:"flex",flexDirection:"column",gap:10 }}>
            {[
              ["Business",data.bizName],
              ["Colours",PALETTE_OPTIONS.find(p=>p.id===data.palette)?.label??"—"],
              ["Font",FONT_OPTIONS.find(f=>f.id===data.font)?.label??"—"],
              ["Hero style",HEADER_STYLES.find(h=>h.id===data.headerStyle)?.label??"—"],
              ["Headline",data.heroHeadline||"—"],
              ["CTA",data.heroCta||"—"],
              ["Pages",data.pages.map(p=>PAGE_OPTIONS.find(x=>x.id===p)?.label).join(", ")||"—"],
              ["Extras",data.extras.length?data.extras.map(e=>EXTRA_OPTIONS.find(x=>x.id===e)?.label).join(", "):"None"],
            ].map(([k,v])=>(
              <div key={k} style={{ display:"flex",gap:12,alignItems:"flex-start",borderBottom:"1px solid rgba(255,255,255,0.04)",paddingBottom:8 }}>
                <div style={{ fontSize:11,color:"#444",fontFamily:"var(--mono)",minWidth:100,paddingTop:2 }}>{k}</div>
                <div style={{ fontSize:13,color:"#aaa",lineHeight:1.5,flex:1 }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Your email <span style={{color:"#22c55e"}}>*</span></label>
            <input autoFocus style={inputStyle} type="email" placeholder="yourname@domain.com" value={data.email} onChange={e=>set("email",e.target.value)} />
            <p style={{ fontSize:11.5,color:"#383838",marginTop:8 }}>We'll get back to you within 24 hours with a quote.</p>
          </div>
        </div>
      );
      default: return null;
    }
  };

  const headings=[["1/8","What's your business called?"],["2/8","Pick a colour palette"],["3/8","Choose your typography style"],["4/8","What kind of header do you want?"],["5/8","What content goes on the hero?"],["6/8","What pages do you need?"],["7/8","Any extra features?"],["8/8","Review & submit"]];
  const [h1,h2]=headings[step];

  return (
    <div style={{ paddingTop:62,minHeight:"100vh" }}>
      <div style={{ position:"fixed",top:62,left:0,right:0,height:2,background:"rgba(255,255,255,0.05)",zIndex:100 }}>
        <div style={{ height:"100%",width:`${((step+1)/STEPS_ONBOARDING.length)*100}%`,background:"var(--green)",transition:"width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>

      {submitted&&(
        <div style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
          <div style={{ background:"#111",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"40px 32px 32px",maxWidth:400,width:"100%",textAlign:"center",boxShadow:"0 32px 80px rgba(0,0,0,0.8)",position:"relative" }}>
            <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:120,height:2,background:"linear-gradient(90deg, transparent, rgba(34,197,94,0.7), transparent)",borderRadius:999 }} />
            <div style={{ width:56,height:56,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 18px" }}>✓</div>
            <h2 style={{ fontSize:22,fontWeight:800,letterSpacing:"-0.8px",color:"#fff",marginBottom:10 }}>You're all set, {data.bizName}!</h2>
            <p style={{ fontSize:14,color:"#666",lineHeight:1.75,marginBottom:28 }}>We'll review your details and get back to you at <strong style={{ color:"#999" }}>{data.email}</strong> within 24 hours.</p>
            <button onClick={()=>{setSubmitted(false);setPage("home");}} style={{ width:"100%",padding:"13px 20px",background:"var(--white)",color:"var(--black)",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)" }}>Back to Home →</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth:640,margin:"0 auto",padding:isMobile?"40px 20px 80px":"80px 48px 100px" }}>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:32 }}>
          {STEPS_ONBOARDING.map((s,i)=>(
            <div key={s} style={{ fontSize:10,fontWeight:700,letterSpacing:"0.5px",padding:"3px 10px",borderRadius:999,background:i<step?"rgba(34,197,94,0.1)":i===step?"var(--green)":"rgba(255,255,255,0.04)",color:i<step?"#22c55e":i===step?"#000":"#656565",border:`1px solid ${i<step?"rgba(34,197,94,0.25)":i===step?"transparent":"rgba(255,255,255,0.06)"}`,transition:"all 0.3s" }}>{s}</div>
          ))}
        </div>
        <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":`translateY(${animDir>0?14:-14}px)`,transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",marginBottom:28 }}>
          <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"var(--muted)",fontFamily:"var(--mono)",marginBottom:8 }}>{h1}</p>
          <h1 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(26px,4vw,40px)",fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",lineHeight:1.05,marginBottom:0 }}>{h2}</h1>
        </div>
        <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":`translateY(${animDir>0?14:-14}px)`,transition:"all 0.25s 0.04s cubic-bezier(0.22,1,0.36,1)" }}>
          {stepContent()}
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:36,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={()=>step===0?setPage("webdev"):go(-1)} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 20px",fontSize:13,fontWeight:600,borderRadius:8,background:"transparent",color:"#555",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer" }}>← {step===0?"Back":"Previous"}</button>
          <span style={{ fontSize:11,color:"#656565",fontFamily:"var(--mono)" }}>{step+1} / {STEPS_ONBOARDING.length}</span>
          {step<STEPS_ONBOARDING.length-1?(
            <button onClick={()=>canNext()&&go(1)} disabled={!canNext()} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",fontSize:13,fontWeight:700,borderRadius:8,background:canNext()?"var(--white)":"rgba(255,255,255,0.08)",color:canNext()?"var(--black)":"#656565",border:"none",cursor:canNext()?"pointer":"default",transition:"all 0.2s" }}>Next →</button>
          ):(
            <button onClick={async()=>{if(!canNext())return;try{await fetch("https://formspree.io/f/mlgzbpng",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"🏢 Business Name":data.bizName,"📧 Client Email":data.email,"📝 Description":data.bizDesc||"—","🎨 Colour Palette":data.palette==="custom"?`Custom — Primary: ${data.paletteCustom?.split("|")[0]||"—"}, Secondary: ${data.paletteCustom?.split("|")[1]||"—"}`:PALETTE_OPTIONS.find(p=>p.id===data.palette)?.label||"—","✏️ Font Style":FONT_OPTIONS.find(f=>f.id===data.font)?.label+(data.fontCustom?` — ${data.fontCustom}`:""),"🖼️ Header Style":HEADER_STYLES.find(h=>h.id===data.headerStyle)?.label||"—","🔗 Reference URL":data.headerUrl||"—","💬 Headline":data.heroHeadline,"💬 Subheadline":data.heroSubline||"—","🎯 CTA Button":data.heroCta||"—","📄 Pages":data.pages.map(p=>PAGE_OPTIONS.find(x=>x.id===p)?.label).join(", ")||"—","⚙️ Extras":data.extras.map(e=>EXTRA_OPTIONS.find(x=>x.id===e)?.label).join(", ")||"None","📌 Notes":data.otherNotes||"—"})});}catch(e){console.error(e);}setSubmitted(true);}} disabled={!canNext()} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",fontSize:13,fontWeight:700,borderRadius:8,background:canNext()?"var(--green)":"rgba(34,197,94,0.15)",color:canNext()?"#000":"#1a4a2e",border:"none",cursor:canNext()?"pointer":"default" }}>Submit →</button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: PAYCHASER
════════════════════════════════════════════ */
const STEPS = [
  { num:"Step 01 — Connect", heading:"Add your invoices in seconds.", body:<>Connect your existing tools or add invoices manually. <strong style={{ color:"#888" }}>No complex setup, no training required.</strong></>, visLabel:"Invoice Import", vis:<VisInvoiceImport /> },
  { num:"Step 02 — Automate", heading:"Set your reminder rules. Once.", body:<>Tell Almondy how you want to chase. <strong style={{ color:"#888" }}>It handles the timing, the wording, and the sending.</strong></>, visLabel:"Reminder Schedule", vis:<VisSchedule /> },
  { num:"Step 03 — Track", heading:"Know exactly where every invoice stands.", body:<>Your dashboard shows every invoice, every reminder sent, and every payment received. <strong style={{ color:"#888" }}>No more chasing spreadsheets.</strong></>, visLabel:"Live Dashboard", vis:<VisTrack /> },
  { num:"Step 04 — Collect", heading:"Get paid. Move on.", body:<>When a client pays, Almondy marks it done and stops all reminders. <strong style={{ color:"#888" }}>Automated end to end.</strong></>, visLabel:"Payment Received", vis:<VisCelebrate /> },
];

function VisInvoiceImport() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      <div style={{ display:"flex",gap:8 }}>
        {[["Invoices Added","14","Ready to track"],["Total Value","$82k","Across 6 clients"]].map(([label,val,sub])=>(
          <div key={label} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.055)",borderRadius:8,padding:12,flex:1 }}>
            <div style={{ fontSize:9,color:"#222",fontFamily:"var(--mono)",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:18,fontWeight:800,letterSpacing:"-0.8px",color:"var(--green)" }}>{val}</div>
            <div style={{ fontSize:9.5,color:"#2a2a2a",marginTop:3 }}>{sub}</div>
          </div>
        ))}
      </div>
      {[["Buildco Systems","INV-0051","$6,400"],["Apex Design Co.","INV-0047","$3,200"],["NovaTech Ltd.","INV-0052","$11,750"]].map(([name,inv,amt])=>(
        <div key={name} style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"9px 12px",display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0 }} />
          <div style={{ flex:1,fontSize:11,fontWeight:600,color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{name}</div>
          <div style={{ fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:999,background:"rgba(34,197,94,0.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,0.2)",flexShrink:0 }}>Imported</div>
          <div style={{ fontSize:11,fontWeight:700,color:"#383838",fontFamily:"var(--mono)",flexShrink:0 }}>{amt}</div>
        </div>
      ))}
    </div>
  );
}

function VisSchedule() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      <div style={{ background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.15)",borderRadius:8,padding:"10px 12px",display:"flex",alignItems:"flex-start",gap:8 }}>
        <span style={{ fontSize:14 }}>⚡</span>
        <div>
          <div style={{ fontSize:11,color:"rgba(74,222,128,0.8)",lineHeight:1.5 }}>Automation active — 3 rules running</div>
          <div style={{ fontSize:9.5,color:"rgba(74,222,128,0.3)",fontFamily:"var(--mono)",marginTop:2 }}>Updated now</div>
        </div>
      </div>
      {[["Day 3 — Friendly nudge","Warm reminder","#22c55e"],["Day 7 — Firmer tone","Direct, professional","#f59e0b"],["Day 14 — Final notice","Last chance","#ef4444"]].map(([title,sub,dot],i)=>(
        <div key={i} style={{ display:"flex",gap:12,padding:"8px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.04)":"none",alignItems:"flex-start" }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:28 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:dot,marginTop:3 }} />
            {i<2&&<div style={{ width:1,flex:1,background:"rgba(255,255,255,0.06)",marginTop:3,minHeight:16 }} />}
          </div>
          <div>
            <div style={{ fontSize:11,fontWeight:600,color:"#858585" }}>{title}</div>
            <div style={{ fontSize:10,color:"#2a2a2a",fontFamily:"var(--mono)",marginTop:1 }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VisTrack() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      <div style={{ display:"flex",gap:8 }}>
        {[["Collected","$124k",true],["Overdue","$9.8k",false]].map(([label,val,green])=>(
          <div key={label} style={{ background:green?"rgba(34,197,94,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${green?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.055)"}`,borderRadius:8,padding:12,flex:1 }}>
            <div style={{ fontSize:9,color:"#222",fontFamily:"var(--mono)",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:18,fontWeight:800,color:green?"var(--green)":"var(--white)" }}>{val}</div>
          </div>
        ))}
      </div>
      {[["Buildco Systems","#22c55e","Paid","paid","$6,400"],["Apex Design Co.","#ef4444","Overdue","late","$3,200"],["NovaTech Ltd.","#f59e0b","Reminder sent","due","$11,750"]].map(([name,dot,badge,cls,amt])=>(
        <div key={name} style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"9px 12px",display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:dot,flexShrink:0 }} />
          <div style={{ flex:1,fontSize:11,fontWeight:600,color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{name}</div>
          <div style={{ fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:999,flexShrink:0,...(cls==="paid"?{background:"rgba(34,197,94,0.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,0.2)"}:cls==="late"?{background:"rgba(239,68,68,0.1)",color:"#f87171",border:"1px solid rgba(239,68,68,0.2)"}:{background:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)"}) }}>{badge}</div>
          <div style={{ fontSize:11,fontWeight:700,color:"#383838",fontFamily:"var(--mono)",flexShrink:0 }}>{amt}</div>
        </div>
      ))}
    </div>
  );
}

function VisCelebrate() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:16 }}>
        <div style={{ fontSize:36 }}>🎉</div>
        <div style={{ fontSize:15,fontWeight:800,letterSpacing:"-0.5px",color:"var(--white)",textAlign:"center" }}>Michael Williams just paid</div>
        <div style={{ fontSize:12,color:"#444",textAlign:"center" }}>$1,750 received · Reminders stopped</div>
        <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:999,padding:"3px 10px",fontSize:11,fontWeight:600,color:"var(--green)" }}>
          <span style={{ width:5,height:5,borderRadius:"50%",background:"var(--green)",display:"inline-block" }} /> All reminders cancelled
        </div>
      </div>
      <div style={{ display:"flex",gap:8 }}>
        {[["Collected Today","$1,750",true],["Collection Rate","98%",false]].map(([label,val,green])=>(
          <div key={label} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.055)",borderRadius:8,padding:12,flex:1 }}>
            <div style={{ fontSize:9,color:"#222",fontFamily:"var(--mono)",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:18,fontWeight:800,color:green?"var(--green)":"var(--white)" }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PaychaserPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [step,setStep] = useState(0);
  const [visible,setVisible] = useState(true);
  const dashRef = useRef(null);
  const dtRef = useRef({ tx:0,ty:0,cx:0,cy:0 });

  const goTo = (n) => { setVisible(false); setTimeout(()=>{ setStep(n); setVisible(true); },180); };

  useEffect(() => {
    if (isMobile) return;
    const el = dashRef.current;
    if (!el) return;
    const onMove=e=>{const r=el.getBoundingClientRect();dtRef.current.tx=((e.clientX-r.left)/r.width-0.5)*2*5;dtRef.current.ty=((e.clientY-r.top)/r.height-0.5)*2*-5;};
    const onLeave=()=>{dtRef.current.tx=0;dtRef.current.ty=0;};
    el.addEventListener("mousemove",onMove);el.addEventListener("mouseleave",onLeave);
    let raf;
    const loop=()=>{dtRef.current.cx+=(dtRef.current.ty-dtRef.current.cx)*0.1;dtRef.current.cy+=(dtRef.current.tx-dtRef.current.cy)*0.1;if(el)el.style.transform=`perspective(900px) rotateX(${dtRef.current.cx.toFixed(3)}deg) rotateY(${dtRef.current.cy.toFixed(3)}deg)`;raf=requestAnimationFrame(loop);};
    loop();
    return ()=>{el.removeEventListener("mousemove",onMove);el.removeEventListener("mouseleave",onLeave);cancelAnimationFrame(raf);};
  }, [isMobile]);

  const s = STEPS[step];

  return (
    <div style={{ paddingTop:62,minHeight:"100vh",display:"flex",flexDirection:"column" }}>
      <div style={{ position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:1,maxWidth:900,margin:"0 auto",padding:isMobile?"64px 20px 48px":"96px 48px 72px",textAlign:"center",animation:"fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
          <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.28)",borderRadius:999,padding:"5px 14px 5px 10px",fontSize:12,fontWeight:600,color:"var(--green)",marginBottom:24,fontFamily:"var(--mono)" }}>
            <span className="badge-dot" /> Live Now
          </div>
          <h1 style={{ fontSize:isMobile?"clamp(36px,11vw,56px)":"clamp(42px,6vw,80px)",fontWeight:800,letterSpacing:"-3px",lineHeight:1.02,color:"var(--white)",marginBottom:18 }}>Chase money<br />Not clients.</h1>
          <p style={{ fontSize:isMobile?14.5:16,color:"#858585",lineHeight:1.8,maxWidth:520,margin:"0 auto 32px" }}>Almondy sends your overdue invoice reminders automatically. <strong style={{ color:"#888" }}>Friendly at first. Firm when needed.</strong></p>
          <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={()=>setPage("auth")} style={{ background:"var(--white)",color:"var(--black)",padding:"13px 24px",fontSize:14,fontWeight:700,borderRadius:8,border:"none",cursor:"pointer",fontFamily:"var(--font)" }}>Get Started →</button>
            <a href="#how" style={{ background:"transparent",color:"#888",border:"1px solid rgba(255,255,255,0.12)",padding:"13px 24px",fontSize:14,fontWeight:600,borderRadius:8,display:"inline-flex",alignItems:"center" }}>See How It Works</a>
          </div>
        </div>
      </div>

      {!isMobile&&(
        <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 48px" }}>
          <div ref={dashRef} style={{ willChange:"transform",cursor:"default" }}>
            <div style={{ background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.09)",borderRadius:16,overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,0.8)" }}>
              <div style={{ background:"#090909",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"14px 18px",display:"flex",alignItems:"center",gap:7 }}>
                {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c])=><div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }} />)}
                <div style={{ flex:1,textAlign:"center",fontSize:12,fontWeight:600,color:"#656565",fontFamily:"var(--mono)",marginLeft:-55 }}>Almondy — Dashboard</div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"200px 1fr",minHeight:420 }}>
                <div style={{ background:"#0a0a0a",borderRight:"1px solid rgba(255,255,255,0.05)",padding:"20px 0",display:"flex",flexDirection:"column",gap:2 }}>
                  {["Overview",null,null,null,"Reports",null,null,"Settings",null].map((sec,i)=>{
                    const items=[null,"◈ Dashboard","📄 Invoices","🔔 Reminders","","📊 Analytics","💳 Payments","","⚙️ Settings"];
                    if(sec)return<div key={i} style={{ fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#222",padding:"14px 18px 6px",fontFamily:"var(--mono)" }}>{sec}</div>;
                    if(!items[i])return null;
                    return<div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 18px",fontSize:12,fontWeight:500,color:i===1?"#aaa":"#656565",background:i===1?"rgba(255,255,255,0.04)":"transparent" }}>{items[i]}</div>;
                  })}
                </div>
                <div style={{ padding:28,display:"flex",flexDirection:"column",gap:20 }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <div style={{ fontSize:15,fontWeight:700,color:"#ccc",letterSpacing:"-0.5px" }}>November Overview</div>
                    <div style={{ fontSize:11,color:"#2a2a2a",fontFamily:"var(--mono)" }}>Last updated just now</div>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10 }}>
                    {[["Collected","$124k","↑ 18% vs last month",true],["Outstanding","$48k","12 invoices pending",false],["Overdue","$9.8k","3 clients flagged",false]].map(([label,val,sub,green])=>(
                      <div key={label} style={{ background:green?"rgba(34,197,94,0.04)":"rgba(255,255,255,0.025)",border:`1px solid ${green?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.055)"}`,borderRadius:10,padding:"16px 14px" }}>
                        <div style={{ fontSize:9.5,color:"#2e2e2e",fontWeight:600,letterSpacing:"1.2px",textTransform:"uppercase",fontFamily:"var(--mono)",marginBottom:8 }}>{label}</div>
                        <div style={{ fontSize:26,fontWeight:800,letterSpacing:"-1.2px",color:green?"var(--green)":"var(--white)" }}>{val}</div>
                        <div style={{ fontSize:10,color:green?"rgba(34,197,94,0.6)":"#2a2a2a",marginTop:5 }}>{sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,padding:18 }}>
                    <div style={{ fontSize:10,color:"#2a2a2a",fontFamily:"var(--mono)",marginBottom:14,letterSpacing:1,textTransform:"uppercase" }}>Collections — Last 8 months</div>
                    <div style={{ display:"flex",alignItems:"flex-end",gap:6,height:80 }}>
                      {[38,52,44,68,55,72,83,100].map((h,i)=>(
                        <div key={i} style={{ flex:1,borderRadius:"3px 3px 0 0",height:`${h}%`,background:i===7?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.06)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile&&(
        <div style={{ maxWidth:600,margin:"0 auto",padding:"0 20px" }}>
          <div style={{ background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.09)",borderRadius:14,overflow:"hidden" }}>
            <div style={{ background:"#090909",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"12px 16px",display:"flex",alignItems:"center",gap:6 }}>
              {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c])=><div key={c} style={{ width:9,height:9,borderRadius:"50%",background:c }} />)}
              <div style={{ flex:1,textAlign:"center",fontSize:11,fontWeight:600,color:"#656565",fontFamily:"var(--mono)" }}>Dashboard</div>
            </div>
            <div style={{ padding:16,display:"flex",flexDirection:"column",gap:12 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                {[["Collected","$124k",true],["Outstanding","$48k",false]].map(([label,val,green])=>(
                  <div key={label} style={{ background:green?"rgba(34,197,94,0.04)":"rgba(255,255,255,0.025)",border:`1px solid ${green?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.055)"}`,borderRadius:10,padding:"14px 12px" }}>
                    <div style={{ fontSize:9,color:"#2e2e2e",fontWeight:600,letterSpacing:"1.2px",textTransform:"uppercase",fontFamily:"var(--mono)",marginBottom:6 }}>{label}</div>
                    <div style={{ fontSize:22,fontWeight:800,letterSpacing:"-1px",color:green?"var(--green)":"var(--white)" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ width:"100%",height:1,background:"rgba(255,255,255,0.055)",marginTop:isMobile?40:0 }} />

      <div id="how" style={{ maxWidth:1100,margin:"0 auto",padding:isMobile?"60px 20px 80px":"100px 48px 120px" }}>
        <div style={{ textAlign:"center",marginBottom:isMobile?40:72 }}>
          <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:12,fontFamily:"var(--mono)" }}>How It Works</p>
          <h2 style={{ fontSize:isMobile?"clamp(26px,8vw,38px)":"clamp(30px,3.5vw,48px)",fontWeight:800,letterSpacing:"-2px",lineHeight:1.05,color:"var(--white)" }}>Up and running in minutes.</h2>
        </div>
        <div style={{ display:"flex",alignItems:"center",marginBottom:isMobile?36:56 }}>
          {STEPS.map((_,i)=>(
            <div key={i} style={{ display:"contents" }}>
              <button onClick={()=>goTo(i)} style={{ width:isMobile?28:32,height:isMobile?28:32,borderRadius:"50%",border:`1px solid ${i<step?"rgba(34,197,94,0.4)":i===step?"var(--green)":"rgba(255,255,255,0.1)"}`,background:i<step?"rgba(34,197,94,0.15)":i===step?"var(--green)":"var(--black)",color:i<step?"var(--green)":i===step?"var(--black)":"#656565",fontSize:isMobile?10:11,fontWeight:800,boxShadow:i===step?"0 0 0 4px rgba(34,197,94,0.15)":"none",flexShrink:0,zIndex:1,transition:"all 0.35s" }}>{i+1}</button>
              {i<STEPS.length-1&&<div style={{ flex:1,height:1,background:"rgba(255,255,255,0.07)",position:"relative" }}><div style={{ position:"absolute",top:0,left:0,height:"100%",width:step>i?"100%":"0%",background:"var(--green)",transition:"width 0.5s" }} /></div>}
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?28:64,alignItems:"center",minHeight:isMobile?"auto":340 }}>
          <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(14px)",transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--green)",fontFamily:"var(--mono)",marginBottom:12 }}>{s.num}</div>
            <div style={{ fontSize:isMobile?"clamp(22px,6vw,32px)":"clamp(26px,3vw,38px)",fontWeight:800,letterSpacing:"-1.5px",lineHeight:1.08,color:"var(--white)",marginBottom:12 }}>{s.heading}</div>
            <div style={{ fontSize:isMobile?14:14.5,color:"#858585",lineHeight:1.8 }}>{s.body}</div>
          </div>
          <div style={{ background:"#0c0c0c",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,overflow:"hidden",opacity:visible?1:0,transform:visible?"translateX(0)":"translateX(20px)",transition:"all 0.45s 0.1s" }}>
            <div style={{ background:"#090909",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"10px 14px",display:"flex",alignItems:"center",gap:5 }}>
              {[["#ff5f57"],["#febc2e"],["#28c840"]].map(([c])=><div key={c} style={{ width:8,height:8,borderRadius:"50%",background:c }} />)}
              <div style={{ flex:1,textAlign:"center",fontSize:10,fontWeight:600,color:"#2a2a2a",fontFamily:"var(--mono)" }}>{s.visLabel}</div>
            </div>
            <div style={{ padding:isMobile?16:22 }}>{s.vis}</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:40,paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={()=>goTo(step-1)} disabled={step===0} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:isMobile?"10px 16px":"11px 22px",fontSize:13,fontWeight:600,borderRadius:8,background:"transparent",color:"#858585",border:"1px solid rgba(255,255,255,0.08)",opacity:step===0?0.2:1,cursor:step===0?"default":"pointer" }}>← {isMobile?"":"Previous"}</button>
          <span style={{ fontSize:12,color:"#656565",fontFamily:"var(--mono)" }}>{step+1}/4</span>
          <button onClick={()=>step<STEPS.length-1?goTo(step+1):setPage("auth")} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:isMobile?"10px 16px":"11px 22px",fontSize:13,fontWeight:600,borderRadius:8,background:step===STEPS.length-1?"var(--green)":"var(--white)",color:"var(--black)",border:"none" }}>
            {step===STEPS.length-1?"Get Started →":"Next →"}
          </button>
        </div>
      </div>

      <div style={{ borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"#0a0a0a",padding:isMobile?"48px 20px":"72px 48px",textAlign:"center" }}>
        <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,38px)":"clamp(28px,3.5vw,46px)",fontWeight:800,letterSpacing:"-2px",color:"var(--white)",marginBottom:14 }}>Ready to stop worrying?</h2>
        <p style={{ fontSize:isMobile?14:15,color:"#444",marginBottom:28 }}>Join businesses already using Almondy to collect what they're owed.</p>
        <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
          <button onClick={()=>setPage("auth")} style={{ background:"var(--white)",color:"var(--black)",padding:"13px 24px",fontSize:14,fontWeight:700,borderRadius:8,border:"none",cursor:"pointer",fontFamily:"var(--font)" }}>Get Started Free →</button>
          <button onClick={()=>setPage("systems")} style={{ background:"transparent",color:"#888",border:"1px solid rgba(255,255,255,0.12)",padding:"13px 24px",fontSize:14,fontWeight:600,borderRadius:8 }}>Back to Systems</button>
        </div>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

/* ════════════════════════════════════════════
   PAGE: PRICING
════════════════════════════════════════════ */
const PlanCard = ({ name,price,period,desc,cta,ctaStyle,features,featured=false,badge=null,onClick }) => {
  const [pos,setPos] = useState({ x:50,y:50 });
  return (
    <div onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setPos({x:((e.clientX-r.left)/r.width*100).toFixed(1),y:((e.clientY-r.top)/r.height*100).toFixed(1)});}} style={{ position:"relative",border:`1px solid ${featured?"rgba(255,255,255,0.15)":"var(--border)"}`,borderRadius:16,padding:"28px 24px 24px",display:"flex",flexDirection:"column",background:featured?"#0f0f0f":"#0c0c0c",boxShadow:featured?"0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px rgba(0,0,0,0.5)":"none",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,background:`radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.025) 0%, transparent 65%)`,pointerEvents:"none" }} />
      <div style={{ position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%" }}>
        {badge&&<div style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:10.5,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:featured?"var(--green)":"var(--white)",background:featured?"var(--green-dim)":"rgba(255,255,255,0.07)",border:`1px solid ${featured?"rgba(34,197,94,0.25)":"rgba(255,255,255,0.12)"}`,borderRadius:999,padding:"4px 12px",marginBottom:18,width:"fit-content" }}>{badge}</div>}
        <div style={{ fontSize:12,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",fontFamily:"var(--mono)",marginBottom:10 }}>{name}</div>
        <div style={{ display:"flex",alignItems:"flex-end",gap:3,marginBottom:4,lineHeight:1 }}>
          <span style={{ fontSize:18,fontWeight:700,color:"#444",marginBottom:7 }}>$</span>
          <span style={{ fontSize:50,fontWeight:800,letterSpacing:"-3px",color:"var(--white)",lineHeight:1 }}>{price}</span>
          {price!=="0"&&<span style={{ fontSize:13,color:"var(--muted)",marginBottom:7 }}>/mo</span>}
        </div>
        <div style={{ fontSize:12,color:"#3a3a3a",marginBottom:18 }}>{period}</div>
        <p style={{ fontSize:13,color:"#858585",lineHeight:1.75,marginBottom:22 }}>{desc}</p>
        <button onClick={onClick} style={{ display:"flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"12px 20px",fontSize:13,fontWeight:700,borderRadius:9,border:ctaStyle==="solid"?"none":"1px solid rgba(255,255,255,0.1)",background:ctaStyle==="solid"?"var(--white)":"transparent",color:ctaStyle==="solid"?"var(--black)":"#666",marginBottom:22,letterSpacing:"-0.3px" }}>{cta}</button>
        <div style={{ width:"100%",height:1,background:"rgba(255,255,255,0.055)",marginBottom:18 }} />
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {features.map(([on,label])=>(
            <div key={label} style={{ display:"flex",alignItems:"flex-start",gap:9,fontSize:13,lineHeight:1.5,color:on?"#8a8a8a":"#383838" }}>
              <div style={{ width:15,height:15,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,fontSize:8,fontWeight:900,background:on?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.03)",color:on?"var(--green)":"#2e2e2e",border:`1px solid ${on?"rgba(34,197,94,0.18)":"rgba(255,255,255,0.06)"}` }}>{on?"✓":"—"}</div>
              <span dangerouslySetInnerHTML={{ __html:label }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PRICES = {
  monthly:{ basic:"0",pro:"30",max:"60",basicP:"Free forever",proP:"per month",maxP:"per month" },
  annual: { basic:"0",pro:"24",max:"48",basicP:"Free forever",proP:"per month, billed annually",maxP:"per month, billed annually" },
};
const FAQS_PRICING = [
  ["Can I switch plans at any time?","Yes — upgrade or downgrade whenever you like. Upgrades are prorated immediately. Downgrades kick in at the start of your next billing period."],
  ["What counts as an \"active invoice\"?","An active invoice is any invoice Almondy is currently tracking or chasing. Once marked as paid or archived, it no longer counts toward your limit."],
  ["Is there really a free trial on Pro?","Absolutely. 14 days, full Pro features, no credit card required. If it's not for you, walk away — no awkward cancellation flow, no hidden fees."],
  ["How does automated chasing work?","Almondy sends a series of reminders on a schedule you control. It starts polite, escalates over time, and stops automatically the moment the invoice is paid."],
  ["Do my clients see Almondy branding?","On Basic and Pro, reminders come from your name and email — clients won't see \"Almondy\" anywhere. Max adds full white-label support."],
];

const PricingPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [billing,setBilling] = useState("monthly");
  const [openFaq,setOpenFaq] = useState(null);
  const p = PRICES[billing];

  return (
    <div style={{ paddingTop:62 }}>
      <div style={{ position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:1,textAlign:"center",padding:isMobile?"64px 20px 48px":"88px 48px 64px",animation:"fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" }}>
          <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.28)",borderRadius:999,padding:"5px 14px 5px 10px",fontSize:12,fontWeight:600,color:"var(--green)",marginBottom:22,fontFamily:"var(--mono)" }}>
            <span className="badge-dot" /> PayChaser Pricing
          </div>
          <h1 style={{ fontSize:isMobile?"clamp(32px,9vw,52px)":"clamp(38px,5.5vw,72px)",fontWeight:800,letterSpacing:"-2.5px",lineHeight:1.03,color:"var(--white)",marginBottom:14 }}>Simple pricing.<br />No surprises.</h1>
          <p style={{ fontSize:isMobile?14:15.5,color:"#858585",lineHeight:1.8,maxWidth:440,margin:"0 auto 28px" }}>Start free, scale when you're ready. Cancel any time.</p>
          <div style={{ display:"inline-flex",alignItems:"center",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:999,padding:"4px 5px" }}>
            {["monthly","annual"].map(m=>(
              <button key={m} onClick={()=>setBilling(m)} style={{ padding:"7px 18px",borderRadius:999,border:"none",fontFamily:"var(--font)",fontSize:13,fontWeight:600,background:billing===m?"var(--white)":"transparent",color:billing===m?"var(--black)":"var(--muted)",display:"inline-flex",alignItems:"center",gap:7,transition:"all 0.2s" }}>
                {m.charAt(0).toUpperCase()+m.slice(1)}
                {m==="annual"&&<span style={{ fontSize:9.5,fontWeight:700,color:"var(--green)",background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.2)",padding:"2px 7px",borderRadius:999 }}>-20%</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100,margin:"0 auto",padding:isMobile?"0 20px 60px":"0 48px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)",gap:10 }}>
          <PlanCard name="Basic" price={p.basic} period={p.basicP} desc="For freelancers and solo operators just getting started." cta="Get Started Free" ctaStyle="ghost" features={[[true,"Up to <strong>5 active invoices</strong>"],[true,"Manual reminders"],[true,"Email reminders"],[true,"Basic dashboard"],[false,"Automated sequences"],[false,"SMS reminders"],[false,"Priority support"]]} />
          <PlanCard name="Pro" price={p.pro} period={p.proP} desc="For growing businesses that need automated chasing." cta="Start 14-Day Free Trial →" ctaStyle="solid" features={[[true,"<strong>Unlimited</strong> invoices"],[true,"<strong>Automated</strong> sequences"],[true,"Email + SMS reminders"],[true,"Smart escalation logic"],[true,"Advanced analytics"],[true,"Priority email support"],[false,"White-label branding"]]} featured badge="⚡ Most Popular" />
          <PlanCard name="Max" price={p.max} period={p.maxP} desc="For agencies managing invoices at scale." cta="Talk to Sales →" ctaStyle="ghost" features={[[true,"Everything in Pro"],[true,"<strong>White-label</strong> branding"],[true,"Custom reminder templates"],[true,"Team member access"],[true,"API access"],[true,"Dedicated account manager"],[true,"SLA guarantee"]]} badge="Enterprise" />
        </div>
      </div>

      <div style={{ maxWidth:660,margin:"0 auto",padding:isMobile?"0 20px 80px":"0 48px 100px" }}>
        <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(28px,3vw,44px)",fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",textAlign:"center",marginBottom:36 }}>Questions? Answered.</h2>
        {FAQS_PRICING.map(([q,a],i)=>(
          <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
            <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",background:"none",border:"none",fontFamily:"var(--font)",fontSize:isMobile?13.5:14,fontWeight:600,color:openFaq===i?"var(--white)":"#aaa",textAlign:"left",gap:16 }}>
              {q}
              <div style={{ width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#444",flexShrink:0,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.25s" }}>+</div>
            </button>
            <div style={{ maxHeight:openFaq===i?300:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)",fontSize:13.5,color:"#858585",lineHeight:1.85,paddingBottom:openFaq===i?20:0 }}>{a}</div>
          </div>
        ))}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

/* ════════════════════════════════════════════
   AUTH PAGE
════════════════════════════════════════════ */
const AuthPage = ({ setPage, setUser }) => {
  const [step,setStep] = useState("email");
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [authErr,setAuthErr] = useState("");

const handleSend = async () => {
  if (!email.includes("@")) return;
  setLoading(true); setErr("");
  try {
    const { error } = await supabase.auth.signInWithOtp({ 
      email, 
      options: { 
        shouldCreateUser: true,
        emailRedirectTo: undefined  // don't redirect anywhere
      } 
    });
    if (error) throw error;
    setSent(true);
    // Start polling the existing tab for session
    const poll = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        clearInterval(poll);
        // onAuthStateChange in ReviewChaserPage will handle the rest
      }
    }, 2000);
    // Stop polling after 10 mins
    setTimeout(() => clearInterval(poll), 600000);
  } catch(e) { setErr("Something went wrong. Try again."); }
  finally { setLoading(false); }
};

  return (
    <div style={{ minHeight:"100vh",background:"var(--black)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
      <button onClick={()=>setPage("home")} style={{ position:"absolute",top:24,left:20,display:"flex",alignItems:"center",gap:9,background:"none",border:"none" }}>
        <WordmarkSVG height={18} />
      </button>
      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:400,animation:"fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        {step==="email"?(
          <>
            <div style={{ textAlign:"center",marginBottom:32 }}>
              <div style={{ width:52,height:52,background:"#111",border:"1px solid #2a2a2a",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:22 }}>✉️</div>
              <h1 style={{ fontSize:24,fontWeight:800,letterSpacing:"-1px",color:"var(--white)",marginBottom:8 }}>Sign in to Almondy</h1>
              <p style={{ fontSize:14,color:"#858585",lineHeight:1.6 }}>Enter your email and we'll send you a magic link. No password needed.</p>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              <input type="email" value={email} onChange={e=>{ setEmail(e.target.value); setAuthErr(""); }} onKeyDown={e=>e.key==="Enter"&&handleSend()} placeholder="yourname@domain.com" autoFocus style={{ width:"100%",padding:"13px 16px",background:"#0f0f0f",border:`1px solid ${authErr?"rgba(239,68,68,0.5)":"rgba(255,255,255,0.1)"}`,borderRadius:10,fontSize:15,color:"var(--white)",outline:"none",fontFamily:"var(--font)" }} />
              {authErr && <p style={{ fontSize:13,color:"#f87171",margin:0 }}>{authErr}</p>}
              <button onClick={handleSend} disabled={!email.includes("@")||loading} style={{ width:"100%",padding:14,background:loading?"rgba(255,255,255,0.5)":"var(--white)",color:"var(--black)",border:"none",borderRadius:10,fontSize:15,fontWeight:700,opacity:!email.includes("@")?0.4:1 }}>
                {loading?"Sending...":"Send magic link →"}
              </button>
            </div>
            <p style={{ textAlign:"center",fontSize:12,color:"#444",marginTop:18,lineHeight:1.6 }}>By continuing you agree to our <span style={{ color:"#666" }}>Terms</span> and <span style={{ color:"#666" }}>Privacy Policy</span>.</p>
          </>
        ):(
          <>
            <div style={{ textAlign:"center",marginBottom:28 }}>
              <div style={{ width:52,height:52,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:22 }}>📬</div>
              <h1 style={{ fontSize:24,fontWeight:800,letterSpacing:"-1px",color:"var(--white)",marginBottom:8 }}>Check your inbox</h1>
              <p style={{ fontSize:14,color:"#858585",lineHeight:1.7 }}>We sent a sign-in link to<br /><strong style={{ color:"var(--white)" }}>{email}</strong></p>
            </div>
            <div style={{ background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:18,marginBottom:18 }}>
              <div style={{ fontSize:12,color:"#444",lineHeight:1.7 }}>Check your inbox and click the link. It expires in 15 minutes. Check spam if you don't see it.</div>
            </div>
            <button onClick={()=>setStep("email")} style={{ width:"100%",padding:12,background:"transparent",color:"#555",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,fontSize:13,fontWeight:600 }}>← Use a different email</button>
          </>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   ONBOARDING
════════════════════════════════════════════ */
const OnboardingPage = ({ setPage, user, setUser }) => {
  const [bizName,setBizName] = useState("");
  const [loading,setLoading] = useState(false);
  const handleContinue = () => {
    if (!bizName.trim()) return;
    setLoading(true);
    setTimeout(()=>{ setUser(u=>({ ...u,bizName:bizName.trim(),plan:"free" })); setPage("dashboard"); },800);
  };
  return (
    <div style={{ minHeight:"100vh",background:"var(--black)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"rgba(255,255,255,0.05)" }}>
        <div style={{ width:"100%",height:"100%",background:"var(--green)",borderRadius:"0 2px 2px 0" }} />
      </div>
      <button onClick={()=>setPage("home")} style={{ position:"absolute",top:24,left:20,display:"flex",alignItems:"center",background:"none",border:"none" }}>
        <WordmarkSVG height={18} />
      </button>
      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:480,animation:"fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ fontSize:13,fontWeight:600,color:"var(--green)",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"var(--mono)",marginBottom:14 }}>Welcome aboard</div>
          <h1 style={{ fontSize:28,fontWeight:800,letterSpacing:"-1.2px",color:"var(--white)",marginBottom:10 }}>What's your business called?</h1>
          <p style={{ fontSize:14,color:"#858585",lineHeight:1.6 }}>This is how Almondy will sign off your reminder emails to clients.</p>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <input type="text" value={bizName} onChange={e=>setBizName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleContinue()} placeholder="e.g. Smith Electrical" autoFocus style={{ width:"100%",padding:"15px 18px",background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,fontSize:17,color:"var(--white)",outline:"none",fontFamily:"var(--font)" }} />
          <button onClick={handleContinue} disabled={!bizName.trim()||loading} style={{ width:"100%",padding:15,background:bizName.trim()?"var(--white)":"rgba(255,255,255,0.08)",color:bizName.trim()?"var(--black)":"#656565",border:"none",borderRadius:12,fontSize:16,fontWeight:700,transition:"all 0.2s" }}>
            {loading?"Setting up your account...":"Take me to my dashboard →"}
          </button>
        </div>
        <p style={{ textAlign:"center",fontSize:12,color:"#383838",marginTop:18 }}>You can change this any time in Settings</p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════════ */
const MOCK_INVOICES = [
  { id:"INV-001",client:"Buildco Pty Ltd",amount:4200,due:"2 days ago",status:"overdue" },
  { id:"INV-002",client:"Riverside Constructions",amount:1850,due:"Today",status:"due" },
  { id:"INV-003",client:"Peak Plumbing Co.",amount:680,due:"In 3 days",status:"sent" },
  { id:"INV-004",client:"Jayco Developments",amount:9300,due:"Paid 4d ago",status:"paid" },
  { id:"INV-005",client:"M. Henderson",amount:320,due:"Paid today",status:"paid" },
];
const STATUS_CONFIG = {
  overdue:{ label:"Overdue",bg:"rgba(239,68,68,0.1)",color:"#f87171",border:"rgba(239,68,68,0.2)",dot:"#ef4444" },
  due:{ label:"Due Today",bg:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"rgba(245,158,11,0.2)",dot:"#f59e0b" },
  sent:{ label:"Reminder Sent",bg:"rgba(99,102,241,0.1)",color:"#818cf8",border:"rgba(99,102,241,0.2)",dot:"#6366f1" },
  paid:{ label:"Paid",bg:"rgba(34,197,94,0.1)",color:"#22c55e",border:"rgba(34,197,94,0.2)",dot:"#22c55e" },
};

const AppNav = ({ user,setPage }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,height:58,background:"rgba(8,8,8,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:isMobile?"0 16px":"0 28px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
        <WordmarkSVG height={isMobile?16:22} />
        {user?.plan==="free"&&<div style={{ display:"inline-flex",alignItems:"center",background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:999,padding:"2px 8px",fontSize:9.5,fontWeight:700,color:"#f59e0b",letterSpacing:"0.5px" }}>FREE</div>}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        {user?.plan==="free"&&<button onClick={()=>setPage("paywall")} style={{ padding:isMobile?"6px 12px":"7px 16px",background:"var(--green)",color:"var(--black)",border:"none",borderRadius:7,fontSize:isMobile?11.5:12.5,fontWeight:700 }}>Upgrade</button>}
        <div style={{ width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg, #6366f1, #8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff" }}>
          {user?.bizName?.[0]??user?.email?.[0]?.toUpperCase()??"?"}
        </div>
      </div>
    </div>
  );
};

const MobileTabBar = ({ activeTab,setTab }) => {
  const items=[{id:"invoices",icon:"📄",label:"Invoices"},{id:"reminders",icon:"🔔",label:"Reminders"},{id:"analytics",icon:"📊",label:"Analytics"},{id:"settings",icon:"⚙️",label:"Settings"}];
  return (
    <div style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(8,8,8,0.97)",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"8px 0 calc(8px + env(safe-area-inset-bottom))" }}>
      {items.map(item=>(
        <button key={item.id} onClick={()=>setTab(item.id)} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:"none",border:"none",color:activeTab===item.id?"var(--white)":"#444",fontSize:9.5,fontWeight:600,padding:"4px 0" }}>
          <span style={{ fontSize:18,opacity:activeTab===item.id?1:0.5 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

const AppSidebar = ({ activeTab,setTab }) => {
  const items=[{id:"invoices",icon:"📄",label:"Invoices"},{id:"reminders",icon:"🔔",label:"Reminders"},{id:"clients",icon:"👥",label:"Clients"},{id:"analytics",icon:"📊",label:"Analytics"},{id:"settings",icon:"⚙️",label:"Settings"}];
  return (
    <div style={{ width:200,flexShrink:0,background:"#080808",borderRight:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection:"column",paddingTop:16 }}>
      {items.map(item=>(
        <button key={item.id} onClick={()=>setTab(item.id)} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 20px",background:activeTab===item.id?"rgba(255,255,255,0.05)":"transparent",border:"none",borderLeft:`2px solid ${activeTab===item.id?"var(--green)":"transparent"}`,color:activeTab===item.id?"var(--white)":"#444",fontSize:13,fontWeight:500,textAlign:"left",transition:"all 0.15s",cursor:"pointer" }}>
          <span style={{ fontSize:14 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

const DashboardPage = ({ setPage,user }) => {
  const isMobile = useIsMobile();
  const [tab,setTab] = useState("invoices");
  const [showBanner,setShowBanner] = useState(true);

  const collected = MOCK_INVOICES.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0);
  const outstanding = MOCK_INVOICES.filter(i=>i.status!=="paid").reduce((s,i)=>s+i.amount,0);
  const overdue = MOCK_INVOICES.filter(i=>i.status==="overdue").reduce((s,i)=>s+i.amount,0);

  return (
    <div style={{ minHeight:"100vh",background:"#060606",display:"flex",flexDirection:"column" }}>
      <AppNav user={user} setPage={setPage} />
      <div style={{ display:"flex",flex:1,paddingTop:58,paddingBottom:isMobile?64:0 }}>
        {!isMobile&&<AppSidebar activeTab={tab} setTab={setTab} />}
        <div style={{ flex:1,padding:isMobile?"20px 16px":"32px 36px",overflowY:"auto" }}>
          {user?.plan==="free"&&showBanner&&(
            <div style={{ background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:12,padding:isMobile?"12px 14px":"14px 20px",display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
              <span style={{ fontSize:16,flexShrink:0 }}>⚡</span>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:12.5,fontWeight:700,color:"#f59e0b",marginBottom:2 }}>Free plan — 5 invoice limit</div>
                <div style={{ fontSize:11.5,color:"#858585" }}>Upgrade for unlimited invoices & automation.</div>
              </div>
              <button onClick={()=>setPage("paywall")} style={{ padding:"7px 12px",background:"#f59e0b",color:"#000",border:"none",borderRadius:7,fontSize:11.5,fontWeight:700,flexShrink:0,whiteSpace:"nowrap" }}>Upgrade →</button>
              <button onClick={()=>setShowBanner(false)} style={{ background:"none",border:"none",color:"#555",fontSize:16,lineHeight:1,flexShrink:0,padding:2 }}>✕</button>
            </div>
          )}
          <div style={{ display:"flex",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",marginBottom:20,flexDirection:isMobile?"column":"row",gap:isMobile?12:0 }}>
            <div>
              <h1 style={{ fontSize:isMobile?20:22,fontWeight:800,letterSpacing:"-0.8px",color:"var(--white)",marginBottom:4 }}>{user?.bizName??"My Dashboard"}</h1>
              <p style={{ fontSize:13,color:"#858585" }}>Here's what's happening with your invoices.</p>
            </div>
            <button onClick={()=>setPage("paywall")} style={{ display:"flex",alignItems:"center",gap:7,padding:"10px 16px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#ccc",borderRadius:9,fontSize:13,fontWeight:600,flexShrink:0 }}>
              + Add Invoice
              {user?.plan==="free"&&<span style={{ fontSize:9.5,background:"rgba(245,158,11,0.15)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)",borderRadius:999,padding:"1px 6px",fontWeight:700 }}>PRO</span>}
            </button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3, 1fr)",gap:10,marginBottom:20 }}>
            {[
              { label:"Collected",value:`$${collected.toLocaleString()}`,sub:`${MOCK_INVOICES.filter(i=>i.status==="paid").length} paid`,green:true },
              { label:"Outstanding",value:`$${outstanding.toLocaleString()}`,sub:`${MOCK_INVOICES.filter(i=>i.status!=="paid").length} pending`,green:false },
              { label:"Overdue",value:`$${overdue.toLocaleString()}`,sub:`${MOCK_INVOICES.filter(i=>i.status==="overdue").length} flagged`,green:false },
            ].map(({ label,value,sub,green },idx)=>(
              <div key={label} style={{ background:green?"rgba(34,197,94,0.04)":"rgba(255,255,255,0.025)",border:`1px solid ${green?"rgba(34,197,94,0.18)":"rgba(255,255,255,0.06)"}`,borderRadius:12,padding:isMobile?"14px 12px":"20px 18px",gridColumn:isMobile&&idx===2?"1/-1":"auto" }}>
                <div style={{ fontSize:9.5,color:"#383838",fontFamily:"var(--mono)",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:8,fontWeight:600 }}>{label}</div>
                <div style={{ fontSize:isMobile?22:28,fontWeight:800,letterSpacing:"-1px",color:green?"var(--green)":"var(--white)",lineHeight:1,marginBottom:4 }}>{value}</div>
                <div style={{ fontSize:11,color:green?"rgba(34,197,94,0.5)":"#383838" }}>{sub}</div>
              </div>
            ))}
          </div>

          {isMobile?(
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {MOCK_INVOICES.map(inv=>{
                const st=STATUS_CONFIG[inv.status];
                return (
                  <div key={inv.id} style={{ background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"14px 16px" }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
                      <div style={{ fontSize:13.5,fontWeight:600,color:"#ccc",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{inv.client}</div>
                      <div style={{ fontSize:14,fontWeight:700,color:inv.status==="paid"?"var(--green)":"var(--white)",fontFamily:"var(--mono)",flexShrink:0 }}>${inv.amount.toLocaleString()}</div>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <span style={{ fontSize:10.5,color:"#444",fontFamily:"var(--mono)" }}>{inv.id} · {inv.due}</span>
                      <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:st.bg,border:`1px solid ${st.border}`,borderRadius:999,padding:"3px 8px" }}>
                        <div style={{ width:5,height:5,borderRadius:"50%",background:st.dot,flexShrink:0 }} />
                        <span style={{ fontSize:10,fontWeight:700,color:st.color }}>{st.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ):(
            <div style={{ background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,overflow:"hidden" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 120px 120px 110px 44px",padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,0.05)",background:"#080808" }}>
                {["Client","Invoice","Amount","Status",""].map(h=>(
                  <div key={h} style={{ fontSize:10.5,fontWeight:700,color:"#656565",letterSpacing:"1.2px",textTransform:"uppercase",fontFamily:"var(--mono)" }}>{h}</div>
                ))}
              </div>
              {MOCK_INVOICES.map((inv,i)=>{
                const st=STATUS_CONFIG[inv.status];
                return (
                  <div key={inv.id} style={{ display:"grid",gridTemplateColumns:"1fr 120px 120px 110px 44px",padding:"16px 20px",borderBottom:i<MOCK_INVOICES.length-1?"1px solid rgba(255,255,255,0.04)":"none",alignItems:"center",transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.015)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div>
                      <div style={{ fontSize:13.5,fontWeight:600,color:"#ccc",marginBottom:2 }}>{inv.client}</div>
                      <div style={{ fontSize:11,color:"#383838",fontFamily:"var(--mono)" }}>{inv.due}</div>
                    </div>
                    <div style={{ fontSize:12,color:"#444",fontFamily:"var(--mono)" }}>{inv.id}</div>
                    <div style={{ fontSize:14,fontWeight:700,color:inv.status==="paid"?"var(--green)":"var(--white)",fontFamily:"var(--mono)" }}>${inv.amount.toLocaleString()}</div>
                    <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:st.bg,border:`1px solid ${st.border}`,borderRadius:999,padding:"4px 9px",width:"fit-content" }}>
                      <div style={{ width:5,height:5,borderRadius:"50%",background:st.dot,flexShrink:0 }} />
                      <span style={{ fontSize:10,fontWeight:700,color:st.color }}>{st.label}</span>
                    </div>
                    <button onClick={()=>setPage("paywall")} style={{ background:"none",border:"none",color:"#2a2a2a",fontSize:16,cursor:"pointer",padding:4 }} onMouseEnter={e=>e.target.style.color="#666"} onMouseLeave={e=>e.target.style.color="#2a2a2a"}>···</button>
                  </div>
                );
              })}
              {user?.plan==="free"&&(
                <div style={{ padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,0.05)",background:"rgba(245,158,11,0.03)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <span style={{ fontSize:13,color:"#858585" }}>🔒 <strong style={{ color:"#f59e0b" }}>5 of 5</strong> free invoices used. Upgrade for unlimited.</span>
                  <button onClick={()=>setPage("paywall")} style={{ padding:"7px 14px",background:"transparent",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.3)",borderRadius:7,fontSize:12,fontWeight:700 }}>Upgrade →</button>
                </div>
              )}
            </div>
          )}

          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:10,marginTop:12 }}>
            {[{icon:"🔔",title:"Automated Reminders",desc:"Set it and forget it. PayChaser chases for you."},{icon:"📊",title:"Analytics & Reports",desc:"See your collection rate, avg days to pay, and more."}].map(({icon,title,desc})=>(
              <div key={title} onClick={()=>setPage("paywall")} style={{ background:"#0a0a0a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"18px",position:"relative",overflow:"hidden",cursor:"pointer" }}>
                {user?.plan==="free"&&<div style={{ position:"absolute",inset:0,background:"rgba(6,6,6,0.65)",backdropFilter:"blur(2px)",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:7 }}>
                  <div style={{ width:34,height:34,background:"#111",border:"1px solid #2a2a2a",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:7 }}><LockSVG /></div>
                  <span style={{ fontSize:10.5,fontWeight:700,color:"#f59e0b",letterSpacing:"1px" }}>PRO FEATURE</span>
                </div>}
                <div style={{ fontSize:20,marginBottom:8 }}>{icon}</div>
                <div style={{ fontSize:14,fontWeight:700,color:"var(--white)",marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:12,color:"#858585",lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMobile&&<MobileTabBar activeTab={tab} setTab={setTab} />}
    </div>
  );
};

/* ════════════════════════════════════════════
   PAYWALL
════════════════════════════════════════════ */
const PaywallPage = ({ setPage,user,setUser }) => {
  const isMobile = useIsMobile();
  const [billing,setBilling] = useState("monthly");
  const [loadingPlan,setLoadingPlan] = useState(null);

  const plans = { monthly:{ pro:"29.99",max:"59.99" }, annual:{ pro:"23.91",max:"47.91" } };
  const STRIPE_PRICES = {
    pro:{ monthly:"price_1TTGeLKVRE4IsC8TVpFheHv1",annual:"price_1TTGgZKVRE4IsC8TePFiDm3A" },
    max:{ monthly:"price_1TTGezKVRE4IsC8TkKNoISYG",annual:"price_1TTGh5KVRE4IsC8TDlCvwreJ" },
  };

  const handleUpgrade = async (planId) => {
    setLoadingPlan(planId);
    try {
      const priceId = STRIPE_PRICES[planId][billing];
      const res = await fetch("/api/create-checkout-session",{ method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ priceId,email:user?.email,trial:planId==="pro" }) });
      const { url } = await res.json();
      window.location.href = url;
    } catch(err) { console.error(err); setLoadingPlan(null); }
  };

  const PLAN_DATA = [
    { id:"pro",name:"Pro",badge:"⚡ Most Popular",desc:"For growing businesses that need automated chasing.",features:["Unlimited invoices","Automated reminder sequences","Email + SMS reminders","Smart escalation logic","Advanced analytics","Priority email support"],featured:true },
    { id:"max",name:"Max",badge:"Enterprise",desc:"For agencies managing invoices at scale.",features:["Everything in Pro","White-label branding","Custom reminder templates","Team member access","API access","Dedicated account manager"],featured:false },
  ];

  return (
    <div style={{ minHeight:"100vh",background:"var(--black)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:isMobile?"60px 16px 40px":"60px 24px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
      <button onClick={()=>setPage("dashboard")} style={{ position:"absolute",top:20,left:isMobile?16:28,display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer" }}>← Back</button>
      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:860,animation:"fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:999,padding:"4px 14px",fontSize:12,fontWeight:600,color:"var(--green)",marginBottom:16,fontFamily:"var(--mono)" }}>
            <span className="badge-dot" style={{ width:6,height:6 }} /> Upgrade PayChaser
          </div>
          <h1 style={{ fontSize:isMobile?"clamp(24px,7vw,34px)":"clamp(26px,4vw,36px)",fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",marginBottom:10 }}>You've hit the free limit</h1>
          <p style={{ fontSize:14,color:"#666",lineHeight:1.7,maxWidth:440,margin:"0 auto 22px" }}>Upgrade to keep chasing — and let Almondy do the hard work.</p>
          <div style={{ display:"inline-flex",background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.07)",borderRadius:999,padding:"3px 4px" }}>
            {["monthly","annual"].map(m=>(
              <button key={m} onClick={()=>setBilling(m)} style={{ padding:"7px 18px",borderRadius:999,border:"none",fontSize:13,fontWeight:600,background:billing===m?"var(--white)":"transparent",color:billing===m?"var(--black)":"#555",display:"inline-flex",alignItems:"center",gap:7,transition:"all 0.2s",cursor:"pointer",fontFamily:"var(--font)" }}>
                {m.charAt(0).toUpperCase()+m.slice(1)}
                {m==="annual"&&<span style={{ fontSize:9,fontWeight:700,color:"var(--green)",background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:999,padding:"1px 6px" }}>-20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12,marginBottom:22 }}>
          {PLAN_DATA.map(plan=>{
            const price=plans[billing][plan.id];
            const isLoading=loadingPlan===plan.id;
            return (
              <div key={plan.id} style={{ position:"relative",background:plan.featured?"#0f0f0f":"#0c0c0c",border:`1px solid ${plan.featured?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.07)"}`,borderRadius:18,padding:"24px 22px",display:"flex",flexDirection:"column",boxShadow:plan.featured?"0 24px 60px rgba(0,0,0,0.5)":"none",overflow:"hidden" }}>
                <div style={{ display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:plan.featured?"var(--green)":"#555",background:plan.featured?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${plan.featured?"rgba(34,197,94,0.22)":"rgba(255,255,255,0.09)"}`,borderRadius:999,padding:"4px 10px",marginBottom:14,width:"fit-content" }}>{plan.badge}</div>
                <div style={{ fontSize:20,fontWeight:800,letterSpacing:"-0.8px",color:"var(--white)",marginBottom:6 }}>{plan.name}</div>
                <p style={{ fontSize:12,color:"#555",lineHeight:1.65,marginBottom:18 }}>{plan.desc}</p>
                <div style={{ display:"flex",alignItems:"flex-end",gap:2,marginBottom:3 }}>
                  <span style={{ fontSize:15,fontWeight:700,color:"#444",marginBottom:6 }}>$</span>
                  <span style={{ fontSize:46,fontWeight:800,letterSpacing:"-3px",color:"var(--white)",lineHeight:1 }}>{price}</span>
                  <span style={{ fontSize:13,color:"#444",marginBottom:7,marginLeft:3 }}>/mo</span>
                </div>
                <div style={{ fontSize:11,color:"#656565",marginBottom:18,fontFamily:"var(--mono)" }}>{billing==="annual"?"AUD · billed yearly":"AUD · billed monthly"}</div>
                <button onClick={()=>handleUpgrade(plan.id)} disabled={!!loadingPlan} style={{ width:"100%",padding:"12px 18px",background:plan.id==="pro"?"var(--white)":"rgba(255,255,255,0.08)",color:plan.id==="pro"?"var(--black)":"var(--white)",border:plan.id==="pro"?"none":"1px solid rgba(255,255,255,0.18)",borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:"-0.3px",marginBottom:18,cursor:loadingPlan?"not-allowed":"pointer",opacity:loadingPlan&&!isLoading?0.4:1,fontFamily:"var(--font)" }}>
                  {isLoading?"Redirecting...":plan.id==="pro"?"Start 7-Day free trial →":"Get started →"}
                </button>
                <div style={{ width:"100%",height:1,background:"rgba(255,255,255,0.055)",marginBottom:16 }} />
                <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
                  {plan.features.map(f=>(
                    <div key={f} style={{ display:"flex",alignItems:"center",gap:9,fontSize:12.5,color:"#777" }}>
                      <div style={{ width:15,height:15,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:900,background:"rgba(34,197,94,0.1)",color:"var(--green)",border:"1px solid rgba(34,197,94,0.18)" }}>✓</div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display:"flex",justifyContent:"center",gap:isMobile?16:28,flexWrap:"wrap" }}>
          {["No credit card required","Cancel any time","Instant access"].map(t=>(
            <div key={t} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#383838" }}>
              <span style={{ color:"var(--green)",fontSize:10 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   WEB DEV PAGE
════════════════════════════════════════════ */
const WebDevPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [openFaq,setOpenFaq] = useState(null);
  const [activeStep,setActiveStep] = useState(0);

  const process = [
    { step:"01",title:"Onboarding Process",desc:"3 minutes. You fill out the onboarding form, get a reply back within 24hrs." },
    { step:"02",title:"Design & build",desc:"Our team design and develop simultaneously." },
    { step:"03",title:"Review & refine",desc:"Two rounds of revisions. Most clients only need one." },
    { step:"04",title:"Launch",desc:"Site goes live. We handle deployment, hosting, domain setup." },
  ];

  useEffect(() => {
    const interval = setInterval(()=>setActiveStep(s=>(s+1)%process.length),2500);
    return ()=>clearInterval(interval);
  }, []);

  const faqs = [
    ["How long does it take?","On average most sites are completed within 1-3 days"],
    ["What do you make the websites with?","Our websites are made using high-end programming languages for the best performance, including React, HTML, CSS."],
    ["Can I get changes done on the website?","Yes, simply contact us through email/sms with the detailed request of what you want changed."],
    ["Why do you charge monthly?","We charge monthly to make it as simple as possible for our clients to make changes and maintain the site rather then the client trying to figure it out themselves."],
    ["What do you need to get started?","Complete the onboarding by pressing Get Your Website, after this somebody from the team will be in contact within 24hrs."],
  ];

  return (
    <div style={{ paddingTop:62 }}>
      <div style={{ position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:1,maxWidth:900,margin:"0 auto",padding:isMobile?"64px 20px 48px":"96px 48px 80px",textAlign:"center",animation:"fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
          <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--green-dim)",border:"1px solid rgba(34,197,94,0.28)",borderRadius:999,padding:"5px 14px 5px 10px",fontSize:12,fontWeight:600,color:"var(--green)",marginBottom:24,fontFamily:"var(--mono)" }}>
            <span className="badge-dot" /> Taking on clients
          </div>
          <h1 style={{ fontSize:isMobile?"clamp(34px,10vw,52px)":"clamp(42px,6vw,78px)",fontWeight:800,letterSpacing:"-3px",lineHeight:1.02,color:"var(--white)",marginBottom:18 }}>Websites that work<br />as hard as you do.</h1>
          <p style={{ fontSize:isMobile?14.5:16,color:"#858585",lineHeight:1.8,maxWidth:500,margin:"0 auto 32px" }}>Clean, fast, and built to convert. <strong style={{ color:"#888" }}>No templates. No bloat.</strong></p>
          <div style={{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={()=>setPage("webdev-onboarding")} style={{ background:"var(--white)",color:"var(--black)",padding:"13px 24px",fontSize:14,fontWeight:700,borderRadius:8,border:"none",cursor:"pointer" }}>Get Your Website →</button>
            <button onClick={()=>setPage("contact")} style={{ background:"transparent",color:"#888",border:"1px solid rgba(255,255,255,0.12)",padding:"13px 24px",fontSize:14,fontWeight:600,borderRadius:8 }}>Contact Us</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100,margin:"0 auto",padding:isMobile?"0 20px 60px":"0 48px 80px" }}>
        <div style={{ textAlign:"center",marginBottom:isMobile?36:56 }}>
          <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:12,fontFamily:"var(--mono)" }}>The Process</p>
          <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(28px,3vw,44px)",fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",lineHeight:1.05 }}>Up and running fast.</h2>
        </div>
        <div style={{ display:"flex",alignItems:"center",marginBottom:isMobile?28:40 }}>
          {process.map((_,i)=>(
            <div key={i} style={{ display:"contents" }}>
              <button onClick={()=>setActiveStep(i)} style={{ width:isMobile?28:32,height:isMobile?28:32,borderRadius:"50%",border:`1px solid ${i<=activeStep?"var(--green)":"rgba(255,255,255,0.1)"}`,background:i===activeStep?"var(--green)":i<activeStep?"rgba(34,197,94,0.15)":"var(--black)",color:i===activeStep?"var(--black)":i<activeStep?"var(--green)":"#656565",fontSize:isMobile?10:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1,boxShadow:i===activeStep?"0 0 0 4px rgba(34,197,94,0.15)":"none",transition:"all 0.35s",cursor:"pointer" }}>{i+1}</button>
              {i<process.length-1&&<div style={{ flex:1,height:1,background:"rgba(255,255,255,0.07)",position:"relative" }}><div style={{ position:"absolute",top:0,left:0,height:"100%",width:activeStep>i?"100%":"0%",background:"var(--green)",transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)" }} /></div>}
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)",gap:10 }}>
          {process.map(({step,title,desc},i)=>(
            <div key={step} onClick={()=>setActiveStep(i)} style={{ background:i===activeStep?"rgba(34,197,94,0.07)":"#0c0c0c",border:`1px solid ${i===activeStep?"rgba(34,197,94,0.35)":"rgba(255,255,255,0.06)"}`,borderRadius:14,padding:"22px 18px",position:"relative",overflow:"hidden",cursor:"pointer",transition:"all 0.3s" }}>
              {i===activeStep&&<div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,rgba(34,197,94,0.6),transparent)" }} />}
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:"2px",color:i===activeStep?"var(--green)":"#656565",fontFamily:"var(--mono)",marginBottom:12 }}>{step}</div>
              <div style={{ fontSize:14,fontWeight:700,color:i===activeStep?"var(--white)":"#444",marginBottom:6,letterSpacing:"-0.3px" }}>{title}</div>
              <p style={{ fontSize:12.5,color:i===activeStep?"#858585":"#2e2e2e",lineHeight:1.7,margin:0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:660,margin:"0 auto",padding:isMobile?"60px 20px":"80px 48px" }}>
        <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(28px,3vw,44px)",fontWeight:800,letterSpacing:"-1.5px",color:"var(--white)",textAlign:"center",marginBottom:36 }}>Questions? Answered.</h2>
        {faqs.map(([q,a],i)=>(
          <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
            <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",background:"none",border:"none",fontFamily:"var(--font)",fontSize:isMobile?13.5:14,fontWeight:600,color:openFaq===i?"var(--white)":"#aaa",textAlign:"left",gap:16 }}>
              {q}
              <div style={{ width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#444",flexShrink:0,transform:openFaq===i?"rotate(45deg)":"none",transition:"transform 0.25s" }}>+</div>
            </button>
            <div style={{ maxHeight:openFaq===i?240:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)",fontSize:13.5,color:"#858585",lineHeight:1.85,paddingBottom:openFaq===i?20:0 }}>{a}</div>
          </div>
        ))}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

const ContactPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [submitted,setSubmitted] = useState(false);
  const [form,setForm] = useState({ name:"",email:"",message:"" });
  const set = (k,v) => setForm(f=>({ ...f,[k]:v }));
  const inputStyle = { width:"100%",padding:"12px 16px",background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,fontSize:15,color:"#fff",outline:"none",fontFamily:"var(--font)",boxSizing:"border-box" };

  const handleSubmit = async () => {
    if (!form.name.trim()||!form.email.includes("@")||!form.message.trim()) return;
    try {
      await fetch("https://formspree.io/f/mlgzbpng",{ method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"👤 Name":form.name,"📧 Email":form.email,"💬 Message":form.message}) });
    } catch(e) { console.error(e); }
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop:62,minHeight:"100vh",display:"flex",flexDirection:"column" }}>
      <div style={{ maxWidth:580,margin:"0 auto",padding:isMobile?"60px 20px 80px":"100px 48px",flex:1 }}>
        <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
        <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:14,fontFamily:"var(--mono)" }}>Get in Touch</p>
        <h1 style={{ fontSize:isMobile?"clamp(32px,9vw,48px)":"clamp(36px,4vw,56px)",fontWeight:800,letterSpacing:"-2.5px",color:"var(--white)",marginBottom:12,lineHeight:1.05 }}>Let's build something.</h1>
        <p style={{ fontSize:15,color:"#858585",lineHeight:1.75,marginBottom:40 }}>Tell us what you need. We'll get back to you within 24 hours.</p>
        {submitted?(
          <div style={{ background:"#0c0c0c",border:"1px solid rgba(34,197,94,0.2)",borderRadius:16,padding:"40px 32px",textAlign:"center" }}>
            <div style={{ width:56,height:56,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 18px" }}>✓</div>
            <h2 style={{ fontSize:22,fontWeight:800,letterSpacing:"-0.8px",color:"#fff",marginBottom:10 }}>Message sent!</h2>
            <p style={{ fontSize:14,color:"#666",lineHeight:1.75 }}>We'll get back to you at <strong style={{ color:"#999" }}>{form.email}</strong> within 24 hours.</p>
          </div>
        ):(
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div><label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Your name</label><input style={inputStyle} placeholder="Alex Smith" value={form.name} onChange={e=>set("name",e.target.value)} /></div>
            <div><label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Email address</label><input style={inputStyle} type="email" placeholder="alex@yourbusiness.com" value={form.email} onChange={e=>set("email",e.target.value)} /></div>
            <div><label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:8 }}>Message</label><textarea style={{ ...inputStyle,resize:"vertical",minHeight:130 }} placeholder="Tell us about your project..." value={form.message} onChange={e=>set("message",e.target.value)} /></div>
            <button onClick={handleSubmit} disabled={!form.name.trim()||!form.email.includes("@")||!form.message.trim()} style={{ padding:"13px 24px",background:"var(--white)",color:"var(--black)",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",opacity:(!form.name.trim()||!form.email.includes("@")||!form.message.trim())?0.4:1,transition:"opacity 0.2s" }}>Send message →</button>
          </div>
        )}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

const TestimonialsPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop:62,minHeight:"100vh",display:"flex",flexDirection:"column" }}>
      <div style={{ maxWidth:900,margin:"0 auto",padding:isMobile?"80px 20px":"140px 48px",textAlign:"center",animation:"fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both",flex:1 }}>
        <button onClick={() => setPage("home")} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28 }}>← Back</button>
        <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--muted)",marginBottom:14,fontFamily:"var(--mono)" }}>Testimonials</p>
        <h1 style={{ fontSize:isMobile?"clamp(32px,9vw,52px)":"clamp(40px,5vw,68px)",fontWeight:800,letterSpacing:"-2.5px",color:"var(--white)",marginBottom:16 }}>Coming soon.</h1>
        <p style={{ fontSize:15,color:"#858585" }}>Reviews are being collected. Check back shortly.</p>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

/* ════════════════════════════════════════════
   REVIEW CHASER
════════════════════════════════════════════ */

// ── Stripe Price IDs ─────────────────────────────────────────────
const STRIPE_PRICES = {
  starter: "price_1TULjZKVRE4IsC8Tg4eFyXgj", // $29/mo
  growth:  "price_1TTu1PKVRE4IsC8ThYKGACBz", // $39/mo Growth
  crew:    "price_1TTu1pKVRE4IsC8T19RkUMWr", // $59/mo Crew
};

// ── Plan config ──────────────────────────────────────────────────
const PLAN_CONFIG = {
  trial:   { label:"Free Trial",  sends: 20,  color:"#888" },
  expired: { label:"Trial Ended", sends: 0,   color:"#ef4444" },
  starter: { label:"Starter",     sends: 75,  color:"#60a5fa" },
  growth:  { label:"Growth",      sends: 220, color:"#22c55e" },
  crew:    { label:"Crew",        sends: 400, color:"#f59e0b" },
};

const Divider = () => (
  <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.055)" }} />
);

const Spinner = ({ size=16, dark=false }) => (
  <div style={{ width:size, height:size, border:`2px solid ${dark?"rgba(0,0,0,0.15)":"rgba(255,255,255,0.1)"}`, borderTop:`2px solid ${dark?"#000":"#fff"}`, borderRadius:"50%", animation:"rc-spin 0.7s linear infinite", flexShrink:0 }} />
);

// ── Supabase helpers ─────────────────────────────────────────────
async function getOrCreateRCProfile(userId, email, phone) {
  const { data } = await supabase.from("rc_profiles").select("*").eq("id", userId).maybeSingle();
  if (data) return data;

  // Check if this phone (or email) already burned a trial on a previous account
  const { data: prev } = phone
    ? await supabase.from("rc_profiles").select("id").eq("phone", phone).maybeSingle()
    : await supabase.from("rc_profiles").select("id").eq("email", email).maybeSingle();
  const trialUsed = !!prev;

  const fresh = {
    id: userId,
    email,
    phone: phone ?? null,
    plan: "expired",
    sends_used: 0,
    trial_started_at: trialUsed ? null : new Date().toISOString(),
    sends_reset_at: new Date().toISOString(),
  };
  await supabase.from("rc_profiles").insert(fresh);
  return fresh;
}

async function getRCSendsThisMonth(userId) {
  const start = new Date(); start.setDate(1); start.setHours(0,0,0,0);
  const { data } = await supabase.from("rc_sends").select("id").eq("user_id", userId).gte("sent_at", start.toISOString());
  return data?.length ?? 0;
}


async function getRCSendHistory(userId) {
  const { data } = await supabase.from("rc_sends").select("*").eq("user_id", userId).order("sent_at", { ascending:false }).limit(50);
  return data ?? [];
}

// ── ClickSend SMS ─────────────────────────────────────────────────


// ── Stripe Checkout ───────────────────────────────────────────────
async function startStripeCheckout(priceId, email, userId, trial = false) {
  const res = await fetch("/api/create-checkout-session", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ priceId, email, userId, trial, successUrl:`${window.location.origin}/?rc_session=success`, cancelUrl:`${window.location.origin}/?page=reviewchaser`, metadata:{ product:"reviewchaser" } }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

function isTrialExpired(profile) {
  if (profile?.plan === "expired") return true;
  if (profile?.plan !== "trial") return false;
  if (!profile?.trial_started_at) return false;
  return (new Date() - new Date(profile.trial_started_at)) / (1000*60*60*24) >= 7;
}

function getSendLimit(plan) { return PLAN_CONFIG[plan]?.sends ?? 20; }

// ── Styles ────────────────────────────────────────────────────────
const RCStyles = () => (
  <style>{`
    @keyframes rc-spin    { to { transform: rotate(360deg); } }
    @keyframes rc-fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes rc-fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes rc-pulse   { 0%,100% { box-shadow:0 0 0 3px rgba(34,197,94,0.2); } 50% { box-shadow:0 0 0 6px rgba(34,197,94,0.05); } }
    @keyframes rc-starPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.3) rotate(4deg);} 100%{transform:scale(1) rotate(0);opacity:1} }
    .rc-star { display:inline-block; animation: rc-starPop 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .rc-badge-dot { width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,0.2);animation:rc-pulse 2.2s ease infinite;flex-shrink:0;display:inline-block; }
    .rc-hover-row:hover { background:rgba(255,255,255,0.018) !important; }
    .rc-plan-card:hover { border-color:rgba(255,255,255,0.14) !important; }
    .rc-input:focus { border-color:rgba(255,255,255,0.25) !important; }
    .rc-btn-primary:hover { opacity:0.9; }
    .rc-btn-primary:active { transform:scale(0.97); }
  `}</style>
);

const RC_INPUT = {
  width:"100%", padding:"13px 16px", background:"#0f0f0f",
  border:"1px solid rgba(255,255,255,0.1)", borderRadius:10,
  fontSize:15, color:"#fff", outline:"none", fontFamily:"var(--font)",
  boxSizing:"border-box", transition:"border-color 0.2s",
};

// ── Plan data ─────────────────────────────────────────────────────
const PLANS_DATA = [
  { id:"trial",   name:"Free Trial", price:"0",  priceLabel:"Free", period:"7 days, then cancel or upgrade", sends:20,  desc:"Try ReviewChaser risk-free for 7 days with 20 sends included.", cta:"Start Free Trial →", solid:false, badge:null, features:[[true,"20 review requests"],[true,"Real Australian SMS number"],[true,"Your Google Review link"],[true,"Basic send dashboard"],[false,"Send history"],[false,"Custom SMS message"],[false,"Priority support"]] },
  { id:"starter", name:"Starter",    price:"29", priceLabel:"29",   period:"per month AUD",                  sends:75,  desc:"For sole operators just getting started with review collection.", cta:"Start 7-Day Free Trial →", solid:true, badge:null, features:[[true,"<strong>75 sends / month</strong>"],[true,"Real Australian SMS number"],[true,"Your Google Review link"],[true,"Full send history"],[true,"Analytics dashboard"],[true,"Custom SMS message"],[false,"Priority support"]] },
  { id:"growth",  name:"Growth",     price:"49", priceLabel:"49",   period:"per month AUD",                  sends:220, desc:"For small businesses building their reputation at scale.", cta:"Get Growth →", solid:false, badge:"⚡ Most Popular", features:[[true,"<strong>220 sends / month</strong>"],[true,"Real Australian SMS number"],[true,"Your Google Review link"],[true,"Full send history"],[true,"Analytics dashboard"],[true,"Custom SMS message"],[false,"Priority support"]] },
  { id:"crew",    name:"Crew",       price:"79", priceLabel:"79",   period:"per month AUD",                  sends:400, desc:"For multi-van operators, agencies, and businesses scaling fast.", cta:"Get Crew →", solid:false, badge:"Enterprise", features:[[true,"<strong>400 sends / month</strong>"],[true,"Real Australian SMS number"],[true,"Your Google Review link"],[true,"Full send history & exports"],[true,"Advanced analytics"],[true,"Custom SMS message"],[true,"Priority support"]] },
];

const RCPlanCard = ({ plan, onSelect, loading }) => {
  const featured = plan.id === "growth";
  return (
    <div className="rc-plan-card" style={{ position:"relative", border:`1px solid ${featured?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.07)"}`, borderRadius:16, padding:"28px 24px 24px", display:"flex", flexDirection:"column", background:featured?"#0f0f0f":"#0c0c0c", boxShadow:featured?"0 32px 64px rgba(0,0,0,0.5)":"none", overflow:"hidden", transition:"border-color 0.2s" }}>
      {featured && <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:2, background:"linear-gradient(90deg,transparent,rgba(34,197,94,0.6),transparent)", borderRadius:999 }} />}
      {plan.badge && <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:10.5, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", color:featured?"#22c55e":"#777", background:featured?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)", border:`1px solid ${featured?"rgba(34,197,94,0.25)":"rgba(255,255,255,0.1)"}`, borderRadius:999, padding:"4px 12px", marginBottom:18, width:"fit-content" }}>{plan.badge}</div>}
      {!plan.badge && <div style={{ height:34, marginBottom:18 }} />}
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:"#444", fontFamily:"var(--mono)", marginBottom:10 }}>{plan.name}</div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:2, lineHeight:1, marginBottom:4 }}>
        {plan.price !== "0" && <span style={{ fontSize:18, fontWeight:700, color:"#444", marginBottom:8 }}>$</span>}
        <span style={{ fontSize:50, fontWeight:800, letterSpacing:"-3px", color:"#fff", lineHeight:1 }}>{plan.priceLabel==="0"?"Free":plan.priceLabel}</span>
        {plan.price !== "0" && <span style={{ fontSize:13, color:"#444", marginBottom:8, marginLeft:2 }}>/mo</span>}
      </div>
      <div style={{ fontSize:12, color:"#656565", marginBottom:10 }}>{plan.period}</div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:999, padding:"3px 10px", fontSize:11, fontWeight:700, color:"rgba(34,197,94,0.7)", marginBottom:16, width:"fit-content", fontFamily:"var(--mono)" }}>{plan.sends} sends/mo</div>
      <p style={{ fontSize:13, color:"#858585", lineHeight:1.75, marginBottom:22, flex:1 }}>{plan.desc}</p>
      <button onClick={() => onSelect(plan.id)} disabled={!!loading} className="rc-btn-primary" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"12px 20px", fontSize:13, fontWeight:700, borderRadius:9, border:plan.solid?"none":"1px solid rgba(255,255,255,0.1)", background:plan.solid?"#fff":"transparent", color:plan.solid?"#000":"#666", marginBottom:22, opacity:loading&&loading!==plan.id?0.4:1, transition:"opacity 0.2s" }}>
        {loading===plan.id ? <><Spinner size={14} dark={plan.solid} /> Redirecting…</> : plan.cta}
      </button>
      <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.055)", marginBottom:18 }} />
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {plan.features.map(([on, label]) => (
          <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:9, fontSize:13, color:on?"#8a8a8a":"#383838" }}>
            <div style={{ width:15, height:15, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, fontSize:8, fontWeight:900, background:on?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.03)", color:on?"#22c55e":"#2e2e2e", border:`1px solid ${on?"rgba(34,197,94,0.18)":"rgba(255,255,255,0.06)"}` }}>{on?"✓":"—"}</div>
            <span dangerouslySetInnerHTML={{ __html:label }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Marketing Page ────────────────────────────────────────────────
const RCMarketingPage = ({ isMobile, onStartTrial, onSignIn, setPage }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [demoMobile, setDemoMobile] = useState("");
  const [demoSent, setDemoSent] = useState(false);
  const [demoSending, setDemoSending] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s+1)%3), 2800);
    return () => clearInterval(t);
  }, []);

  const handleDemoSend = () => {
    if (demoMobile.replace(/\s/g,"").length < 10) return;
    setDemoSending(true);
    setTimeout(() => { setDemoSending(false); setDemoSent(true); }, 1200);
    setTimeout(() => { setDemoSent(false); setDemoMobile(""); }, 4000);
  };

  const handlePlanSelect = async (planId) => {
    if (planId === "trial") { onStartTrial(); return; }
    setLoadingPlan(planId);
    try {
      const { data:{ session } } = await supabase.auth.getSession();
      if (!session) { onStartTrial(); return; }
      await startStripeCheckout(STRIPE_PRICES[planId], session.user.email, session.user.id);
    } catch(e) { console.error(e); setLoadingPlan(null); }
  };

  const steps = [
    { num:"01", title:"Enter mobile number", desc:"Type your customer's Australian mobile. No client list to build, no setup required." },
    { num:"02", title:"We send the SMS",      desc:"A professional review request lands on their phone from a real AU number within seconds." },
    { num:"03", title:"They leave a review",  desc:"One tap takes them straight to your Google Review page. More reviews, more jobs." },
  ];

  const faqs = [
    ["Will it look like spam?","No. Messages come from a real Australian mobile number, not a shortcode or overseas number. It looks like a normal text from a local business."],
    ["What does the SMS actually say?","Something like: 'Hi! Thanks for choosing [Your Business]. If you have a moment, we'd love a Google review — it really helps! [your link]' — under 160 characters, friendly, no pressure."],
    ["Can I customise the message?","On Growth and Crew plans you can edit the message template. The free trial uses the default."],
    ["What if I hit my send limit?","Sends stop until your next billing cycle. You're never charged overages. Upgrade any time to increase your cap."],
    ["Is this legal in Australia?","Yes. The Spam Act 2003 permits relationship/transactional messages to existing customers. Your customer just did business with you — this qualifies."],
    ["How is billing handled?","Via Stripe. Cancel any time from your account — no lock-in, no hidden fees."],
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 55% at 50% 40%, rgba(34,197,94,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:860, margin:"0 auto", padding:isMobile?"64px 20px 56px":"100px 48px 90px", textAlign:"center", animation:"rc-fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.28)", borderRadius:999, padding:"5px 14px 5px 10px", fontSize:12, fontWeight:600, color:"#22c55e", marginBottom:24, fontFamily:"var(--mono)" }}>
            <span className="rc-badge-dot" /> ReviewChaser — Now Live
          </div>
          <h1 style={{ fontSize:isMobile?"clamp(36px,11vw,56px)":"clamp(46px,6vw,84px)", fontWeight:800, letterSpacing:"-3.5px", lineHeight:1.01, color:"#fff", marginBottom:18 }}>
            More Google reviews.<br /><span style={{ color:"#22c55e" }}>Zero awkwardness.</span>
          </h1>
          <p style={{ fontSize:isMobile?14.5:16.5, color:"#858585", lineHeight:1.8, maxWidth:520, margin:"0 auto 32px" }}>
            Type a mobile number. Hit send. Your customer gets a friendly SMS with your Google Review link. <strong style={{ color:"#999" }}>Takes 5 seconds. Works every time.</strong>
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:5, marginBottom:32 }}>
            {[1,2,3,4,5].map(i => <span key={i} className="rc-star" style={{ fontSize:isMobile?28:38, color:"#f59e0b", animationDelay:`${i*0.09}s` }}>★</span>)}
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={onStartTrial} className="rc-btn-primary" style={{ background:"#fff", color:"#000", padding:"14px 28px", fontSize:15, fontWeight:700, borderRadius:9, border:"none" }}>Start Free Trial →</button>
            <button onClick={onSignIn} style={{ background:"transparent", color:"#666", border:"1px solid rgba(255,255,255,0.12)", padding:"14px 22px", fontSize:14, fontWeight:600, borderRadius:9 }}>Sign In</button>
          </div>
          <p style={{ fontSize:12, color:"#656565", marginTop:14 }}>7 days free · 20 sends included</p>
        </div>
      </div>
      <Divider />
      {/* STATS */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:isMobile?"32px 20px":"44px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?20:0 }}>
          {[["98%","SMS open rate"],["4.7×","vs email review requests"],["<160","chars — never double-billed"],["AU","Local sending number"]].map(([val,label],i) => (
            <div key={label} style={{ textAlign:"center", padding:isMobile?"0":"0 28px", borderRight:(!isMobile&&i<3)?"1px solid rgba(255,255,255,0.06)":"none" }}>
              <div style={{ fontSize:isMobile?28:38, fontWeight:800, letterSpacing:"-2px", color:"#fff", lineHeight:1, marginBottom:6 }}>{val}</div>
              <div style={{ fontSize:12.5, color:"#444", lineHeight:1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      {/* HOW IT WORKS */}
      <div id="rc-how" style={{ maxWidth:1100, margin:"0 auto", padding:isMobile?"60px 20px":"100px 48px" }}>
        <div style={{ textAlign:"center", marginBottom:isMobile?40:64 }}>
          <p style={{ fontSize:11.5, fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", color:"#444", marginBottom:12, fontFamily:"var(--mono)" }}>How It Works</p>
          <h2 style={{ fontSize:isMobile?"clamp(26px,8vw,40px)":"clamp(30px,3.5vw,52px)", fontWeight:800, letterSpacing:"-2px", color:"#fff" }}>Three steps. Thirty seconds.</h2>
        </div>
        <div style={{ display:"flex", alignItems:"center", marginBottom:isMobile?28:48 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ display:"contents" }}>
              <button onClick={() => setActiveStep(i)} style={{ width:isMobile?28:34, height:isMobile?28:34, borderRadius:"50%", border:`1px solid ${i<=activeStep?"#22c55e":"rgba(255,255,255,0.1)"}`, background:i===activeStep?"#22c55e":i<activeStep?"rgba(34,197,94,0.15)":"#080808", color:i===activeStep?"#000":i<activeStep?"#22c55e":"#656565", fontSize:11, fontWeight:800, flexShrink:0, zIndex:1, boxShadow:i===activeStep?"0 0 0 4px rgba(34,197,94,0.15)":"none", transition:"all 0.35s" }}>{i+1}</button>
              {i<2 && <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)", position:"relative" }}><div style={{ position:"absolute", top:0, left:0, height:"100%", width:activeStep>i?"100%":"0%", background:"#22c55e", transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)" }} /></div>}
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:10 }}>
          {steps.map(({ num, title, desc }, i) => (
            <div key={num} onClick={() => setActiveStep(i)} style={{ background:i===activeStep?"rgba(34,197,94,0.06)":"#0c0c0c", border:`1px solid ${i===activeStep?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.06)"}`, borderRadius:14, padding:"24px 22px", cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.3s" }}>
              {i===activeStep && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,rgba(34,197,94,0.7),transparent)" }} />}
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"2px", color:i===activeStep?"#22c55e":"#656565", fontFamily:"var(--mono)", marginBottom:14 }}>{num}</div>
              <div style={{ fontSize:16, fontWeight:700, color:i===activeStep?"#fff":"#555", letterSpacing:"-0.4px", marginBottom:8 }}>{title}</div>
              <p style={{ fontSize:13.5, color:i===activeStep?"#858585":"#2e2e2e", lineHeight:1.75, margin:0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      {/* LIVE DEMO */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:isMobile?"60px 20px":"100px 48px", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?40:80, alignItems:"center" }}>
        <div>
          <p style={{ fontSize:11.5, fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", color:"#444", marginBottom:14, fontFamily:"var(--mono)" }}>The Send Screen</p>
          <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(28px,3vw,46px)", fontWeight:800, letterSpacing:"-2px", color:"#fff", marginBottom:16 }}>Simpler than<br />sending a text.</h2>
          <p style={{ fontSize:isMobile?14:15, color:"#666", lineHeight:1.8, marginBottom:24 }}>Open ReviewChaser after every job. Type the mobile. Hit send. <strong style={{ color:"#888" }}>No setup. No client database. No nonsense.</strong></p>
          {["Works from your phone or desktop","Messages from a real Australian number","Customer taps link → straight to your Google page","Every send logged with timestamp"].map(f => (
            <div key={f} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#777", marginBottom:10 }}>
              <div style={{ width:16, height:16, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, color:"#22c55e", flexShrink:0 }}>✓</div>
              {f}
            </div>
          ))}
        </div>
        <div style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,0.09)", borderRadius:16, overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.7)" }}>
          <div style={{ background:"#090909", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"12px 16px", display:"flex", alignItems:"center", gap:6 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
            <div style={{ flex:1, textAlign:"center", fontSize:11, fontWeight:600, color:"#2a2a2a", fontFamily:"var(--mono)" }}>ReviewChaser — Demo</div>
          </div>
          <div style={{ padding:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <div style={{ fontSize:11, color:"#383838", fontFamily:"var(--mono)", letterSpacing:1, textTransform:"uppercase" }}>Sends this month</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#22c55e", fontFamily:"var(--mono)" }}>23 / 140</span>
                <div style={{ width:72, height:5, background:"rgba(255,255,255,0.06)", borderRadius:999 }}><div style={{ width:"16%", height:"100%", background:"#22c55e", borderRadius:999 }} /></div>
              </div>
            </div>
            {!demoSent ? (
              <>
                <label style={{ fontSize:11.5, fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Customer mobile</label>
                <input value={demoMobile} onChange={e=>setDemoMobile(e.target.value)} placeholder="04XX XXX XXX" maxLength={12} className="rc-input" style={{ ...RC_INPUT, fontSize:16, letterSpacing:"0.5px", marginBottom:12 }} />
                <div style={{ background:"#080808", border:"1px solid rgba(255,255,255,0.05)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:10, color:"#2a2a2a", fontFamily:"var(--mono)", letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>SMS preview</div>
                  <div style={{ fontSize:12.5, color:"#555", lineHeight:1.75 }}>Hi! Thanks for choosing <span style={{ color:"#777" }}>Your Business</span>. If you have a moment, we'd love a Google review! <span style={{ color:"#22c55e" }}>g.co/r/yourbusiness</span></div>
                  <div style={{ fontSize:10, color:"#2a2a2a", marginTop:6, fontFamily:"var(--mono)" }}>152 / 160 chars ✓</div>
                </div>
                <button onClick={handleDemoSend} disabled={demoMobile.replace(/\s/g,"").length<10||demoSending} style={{ width:"100%", padding:"13px 20px", background:demoMobile.replace(/\s/g,"").length>=10?"#22c55e":"rgba(34,197,94,0.1)", color:demoMobile.replace(/\s/g,"").length>=10?"#000":"#1a4a2e", border:"none", borderRadius:10, fontSize:14, fontWeight:700 }}>
                  {demoSending ? <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8 }}><Spinner size={14} dark /> Sending…</span> : "Send Review Request ✦"}
                </button>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0", animation:"rc-fadeIn 0.4s both" }}>
                <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>Demo sent!</div>
                <div style={{ fontSize:12.5, color:"#555" }}>Sign up to send real review requests.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Divider />
      {/* REVIEWS */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:isMobile?"60px 20px 80px":"100px 48px" }}>
        <div style={{ textAlign:"center", marginBottom:isMobile?40:64 }}>
          <p style={{ fontSize:11.5, fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", color:"#444", marginBottom:12, fontFamily:"var(--mono)" }}>Real Results</p>
          <h2 style={{ fontSize:isMobile?"clamp(26px,8vw,40px)":"clamp(30px,3.5vw,52px)", fontWeight:800, letterSpacing:"-2px", color:"#fff" }}>Tradies are getting reviews.<br /><span style={{ color:"#22c55e" }}>Every single week.</span></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":window.innerWidth<900?"1fr 1fr":"repeat(3,1fr)", gap:12, marginBottom:24 }}>
          {[
            { quote:"I went from 14 Google reviews to 61 in just over two months. Customers actually reply saying thanks for the message — it doesn't feel spammy at all.", name:"Jake M.", biz:"JM Electrical", location:"Brisbane, QLD", stars:5, stat:"61 reviews" },
            { quote:"Used to forget to ask every time. Now I just type the number in while I'm packing up the van. Takes 10 seconds. Reviews started coming in that same day.", name:"Tom H.", biz:"Tom's Plumbing Co.", location:"Melbourne, VIC", stars:5, stat:"3× more reviews" },
            { quote:"My Google rating went from 4.1 to 4.8. New customers mention they found me from my reviews. It's basically free marketing at this point.", name:"Sarah K.", biz:"SK Cleaning Services", location:"Sydney, NSW", stars:5, stat:"4.1 → 4.8 ★" },
            { quote:"Tried asking in person and handing out cards. Nothing worked like this. The SMS lands while they're still happy with the job — timing is everything.", name:"Dean P.", biz:"Precision Tiling", location:"Perth, WA", stars:5, stat:"40+ reviews" },
            { quote:"Dead simple. No logins for my customers, no app to download. They just get a text and tap the link. Half of them leave a review within the hour.", name:"Marcus T.", biz:"MT Landscaping", location:"Gold Coast, QLD", stars:5, stat:"48hr avg. response" },
            { quote:"I was skeptical but the 7-day trial sold me. Had 8 new reviews before the trial ended. Upgraded immediately. Worth every dollar.", name:"Priya S.", biz:"Sparkle Window Cleaning", location:"Adelaide, SA", stars:5, stat:"8 reviews in 7 days" },
          ].map((r, i) => (
            <div key={i} style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"24px 22px", display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ display:"flex", gap:2 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color:"#f59e0b", fontSize:13 }}>★</span>)}</div>
              <p style={{ fontSize:13.5, color:"#999", lineHeight:1.8, flex:1 }}>"{r.quote}"</p>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#22c55e", flexShrink:0 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:"#ccc" }}>{r.name}</div>
                    <div style={{ fontSize:11, color:"#444" }}>{r.biz} · {r.location}</div>
                  </div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:"#22c55e", background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:999, padding:"3px 10px", whiteSpace:"nowrap", fontFamily:"var(--mono)" }}>{r.stat}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={onStartTrial} className="rc-btn-primary" style={{ background:"#22c55e", color:"#000", padding:"14px 32px", fontSize:14, fontWeight:700, borderRadius:9, border:"none" }}>Start Free Trial — 7 Days →</button>
          <p style={{ fontSize:12, color:"#383838", marginTop:12 }}>20 sends included · Cancel any time</p>
        </div>
      </div>
      <Divider />
      {/* FAQ */}
      <div style={{ maxWidth:660, margin:"0 auto", padding:isMobile?"60px 20px 80px":"80px 48px 100px" }}>
        <h2 style={{ fontSize:isMobile?"clamp(24px,7vw,36px)":"clamp(28px,3vw,44px)", fontWeight:800, letterSpacing:"-1.5px", color:"#fff", textAlign:"center", marginBottom:36 }}>Questions? Answered.</h2>
        {faqs.map(([q,a],i) => (
          <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
            <button onClick={() => setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0", background:"none", border:"none", fontFamily:"var(--font)", fontSize:isMobile?13.5:14, fontWeight:600, color:openFaq===i?"#fff":"#aaa", textAlign:"left", gap:16 }}>
              {q}
              <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#444", flexShrink:0, transform:openFaq===i?"rotate(45deg)":"none", transition:"transform 0.25s" }}>+</div>
            </button>
            <div style={{ maxHeight:openFaq===i?300:0, overflow:"hidden", transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)", fontSize:13.5, color:"#858585", lineHeight:1.85, paddingBottom:openFaq===i?20:0 }}>{a}</div>
          </div>
        ))}
      </div>
      {/* BOTTOM CTA */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", background:"#0a0a0a", padding:isMobile?"48px 20px":"72px 48px", textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize:22, color:"#f59e0b" }}>★</span>)}
        </div>
        <h2 style={{ fontSize:isMobile?"clamp(22px,7vw,34px)":"clamp(26px,3.5vw,42px)", fontWeight:800, letterSpacing:"-2px", color:"#fff", marginBottom:12 }}>Start collecting reviews today.</h2>
        <p style={{ fontSize:isMobile?14:15, color:"#444", marginBottom:28 }}>7 days free · 20 sends · No card required</p>
        <button onClick={onStartTrial} className="rc-btn-primary" style={{ background:"#fff", color:"#000", padding:"14px 28px", fontSize:15, fontWeight:700, borderRadius:9, border:"none" }}>Start Free Trial →</button>
      </div>
     <Footer setPage={setPage} />
    </div>
  );
};

// ── Auth Screen ───────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+61", label: "🇦🇺  +61" },
  { code: "+64", label: "🇳🇿  +64" },
  { code: "+1",  label: "🇺🇸  +1"  },
  { code: "+44", label: "🇬🇧  +44" },
  { code: "+65", label: "🇸🇬  +65" },
];

function normalizeToE164(raw, countryCode) {
  const digits = raw.replace(/\D/g, "");
  const prefix = countryCode.replace("+", "");
  if (digits.startsWith(prefix)) return `+${digits}`;
  if (digits.startsWith("0")) return `${countryCode}${digits.slice(1)}`;
  return `${countryCode}${digits}`;
}

function isValidPhone(raw, countryCode) {
  const n = normalizeToE164(raw, countryCode);
  const digits = n.replace(/\D/g, "");
  return /^\+[1-9]/.test(n) && digits.length >= 9 && digits.length <= 15;
}

const RCPhoneAuthFlow = ({ isMobile, onBack }) => {
  const [step, setStep]           = useState("phone"); // "phone" | "otp"
  const [countryCode, setCountryCode] = useState("+61");
  const [rawPhone, setRawPhone]   = useState("");
  const [phoneErr, setPhoneErr]   = useState("");
  const [sending, setSending]     = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [digits, setDigits]       = useState("");
  const [verifying, setVerifying] = useState(false);
  const [otpErr, setOtpErr]       = useState("");
  const [locked, setLocked]       = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);

  // Countdown timer for resend button
  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(n => n - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendTimer]);

  const handleSendOTP = async (phoneOverride) => {
    const phone = phoneOverride ?? normalizeToE164(rawPhone, countryCode);
    if (!isValidPhone(rawPhone, countryCode) && !phoneOverride) {
      setPhoneErr("Please enter a valid mobile number.");
      return;
    }
    setSending(true); setPhoneErr(""); setOtpErr(""); setLocked(false);
    try {
      const res = await fetch("/api/send-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send code.");
      setVerifiedPhone(phone);
      setDigits("");
      setResendTimer(30);
      setStep("otp");
    } catch (e) {
      setPhoneErr(e.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOTP = async (codeOverride) => {
    const code = codeOverride ?? digits;
    if (code.length !== 6) return;
    setVerifying(true); setOtpErr("");
    try {
      const res = await fetch("/api/verify-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: verifiedPhone, code }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.code === "too_many_attempts") setLocked(true);
        setOtpErr(json.error || "Incorrect code.");
        setVerifying(false);
        return;
      }
      // Establish Supabase session — onAuthStateChange in ReviewChaserPage takes it from here
      const { error: verifyErr } = await supabase.auth.verifyOtp({
        token_hash: json.tokenHash,
        type: "magiclink",
      });
      if (verifyErr) throw verifyErr;
      // View will be changed by onAuthStateChange; no further action needed here
    } catch (e) {
      setOtpErr("Verification failed. Please try again.");
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resending) return;
    setResending(true);
    await handleSendOTP(verifiedPhone);
    setResending(false);
  };

  const BG = (
    <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />
  );

  if (step === "phone") return (
    <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      {BG}
      <button onClick={onBack} style={{ position:"absolute", top:24, left:20, background:"none", border:"none", color:"#555", fontSize:13, fontWeight:600, cursor:"pointer" }}>← Back</button>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:400, animation:"rc-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, background:"#111", border:"1px solid #2a2a2a", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", fontSize:22 }}>📱</div>
          <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:"-1px", color:"#fff", marginBottom:8 }}>Sign in to ReviewChaser</h1>
          <p style={{ fontSize:14, color:"#666", lineHeight:1.6 }}>Enter your mobile number — we'll text you a code.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", gap:8 }}>
            <select
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              style={{ background:"#0f0f0f", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"13px 10px", fontFamily:"var(--font)", flexShrink:0, outline:"none" }}
            >
              {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
            <input
              type="tel"
              value={rawPhone}
              onChange={e => { setRawPhone(e.target.value); setPhoneErr(""); }}
              onKeyDown={e => e.key === "Enter" && handleSendOTP()}
              placeholder="0412 345 678"
              autoFocus
              className="rc-input"
              style={{ ...RC_INPUT, padding:"13px 16px", flex:1 }}
            />
          </div>
          {phoneErr && <p style={{ fontSize:12, color:"#f87171", margin:0 }}>{phoneErr}</p>}
          <button
            onClick={() => handleSendOTP()}
            disabled={!rawPhone.trim() || sending}
            className="rc-btn-primary"
            style={{ width:"100%", padding:14, background:sending?"rgba(255,255,255,0.5)":"#fff", color:"#000", border:"none", borderRadius:10, fontSize:15, fontWeight:700, opacity:!rawPhone.trim()?0.4:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:sending||!rawPhone.trim()?"default":"pointer" }}
          >
            {sending ? <><Spinner size={14} dark />Sending code…</> : "Send code →"}
          </button>
        </div>
        <p style={{ textAlign:"center", fontSize:12, color:"#383838", marginTop:16 }}>By continuing you agree to our Terms &amp; Privacy Policy.</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      {BG}
      <button onClick={() => setStep("phone")} style={{ position:"absolute", top:24, left:20, background:"none", border:"none", color:"#555", fontSize:13, fontWeight:600, cursor:"pointer" }}>← Back</button>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:400, animation:"rc-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", fontSize:22 }}>💬</div>
          <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:"-1px", color:"#fff", marginBottom:8 }}>Enter your code</h1>
          <p style={{ fontSize:14, color:"#666", lineHeight:1.6 }}>We texted a 6-digit code to<br /><strong style={{ color:"#999" }}>{verifiedPhone}</strong></p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={digits}
            onChange={e => {
              if (locked) return;
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setDigits(val);
              setOtpErr("");
              if (val.length === 6) handleVerifyOTP(val);
            }}
            autoFocus
            maxLength={6}
            placeholder="000000"
            disabled={locked || verifying}
            className="rc-input"
            style={{ ...RC_INPUT, fontSize:30, letterSpacing:"0.5em", textAlign:"center", padding:"16px 12px", fontFamily:"monospace" }}
          />
          {otpErr && <p style={{ fontSize:12, color:"#f87171", margin:0, textAlign:"center" }}>{otpErr}</p>}
          {!locked && (
            <button
              onClick={() => handleVerifyOTP()}
              disabled={digits.length !== 6 || verifying}
              className="rc-btn-primary"
              style={{ width:"100%", padding:14, background:verifying?"rgba(255,255,255,0.5)":"#fff", color:"#000", border:"none", borderRadius:10, fontSize:15, fontWeight:700, opacity:digits.length!==6?0.4:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:digits.length!==6||verifying?"default":"pointer" }}
            >
              {verifying ? <><Spinner size={14} dark />Verifying…</> : "Verify code →"}
            </button>
          )}
          <div style={{ textAlign:"center", marginTop:4 }}>
            {locked ? (
              <button onClick={handleResend} style={{ fontSize:13, color:"#22c55e", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>
                Request a new code
              </button>
            ) : resendTimer > 0 ? (
              <span style={{ fontSize:12, color:"#383838" }}>Resend code in {resendTimer}s</span>
            ) : (
              <button onClick={handleResend} disabled={resending} style={{ fontSize:13, color:"#22c55e", background:"none", border:"none", cursor:resending?"default":"pointer", fontWeight:600 }}>
                {resending ? "Sending…" : "Resend code"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Email Collection (post-login, optional) ───────────────────────
const RCEmailCollectScreen = ({ isMobile, userId, onComplete }) => {
  const [email, setEmail]   = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState("");

  const valid = email.includes("@") && email.includes(".");

  const handleSave = async () => {
    if (!valid) return;
    setSaving(true); setErr("");
    try {
      await supabase.from("rc_profiles").update({ billing_email: email }).eq("id", userId);
    } catch (e) {
      console.error("billing email save error:", e);
      setErr("Couldn't save. You can update this later in Settings.");
    } finally {
      setSaving(false);
    }
    onComplete();
  };

  const BG = <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />;

  return (
    <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", overflow:"hidden" }}>
      {BG}
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:400, animation:"rc-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, background:"#111", border:"1px solid #2a2a2a", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", fontSize:22 }}>🧾</div>
          <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.8px", color:"#fff", marginBottom:10 }}>Where should we send your receipts and billing info?</h1>
          <p style={{ fontSize:14, color:"#666", lineHeight:1.6 }}>This is optional — you can skip and add it later in Settings.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && handleSave()}
            placeholder="your@email.com"
            autoFocus
            className="rc-input"
            style={{ ...RC_INPUT, padding:"13px 16px" }}
          />
          {err && <p style={{ fontSize:12, color:"#f87171", margin:0 }}>{err}</p>}
          <button
            onClick={handleSave}
            disabled={!valid || saving}
            className="rc-btn-primary"
            style={{ width:"100%", padding:14, background:saving?"rgba(255,255,255,0.5)":"#fff", color:"#000", border:"none", borderRadius:10, fontSize:15, fontWeight:700, opacity:!valid?0.5:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:!valid||saving?"default":"pointer" }}
          >
            {saving ? <><Spinner size={14} dark />Saving…</> : "Save email →"}
          </button>
          <button
            onClick={onComplete}
            style={{ width:"100%", padding:12, background:"transparent", color:"#555", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer" }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Onboarding Wizard ─────────────────────────────────────────────
const RCOnboardingWizard = ({ isMobile, userId, email, onComplete }) => {
  const savedKey = `rc_onboarding_${userId}`;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(savedKey) || "{}"); } catch { return {}; } })();

  const [step, setStep] = useState(() => {
    if (saved.bizName && saved.googleLink) return 2;
    if (saved.bizName) return 1;
    return 0;
  });
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ bizName: saved.bizName || "", googleLink: saved.googleLink || "" });
  const [searchQuery, setSearchQuery] = useState(saved.bizName || "");
  const [searchCountry, setSearchCountry] = useState("au");
  const [countryOpen, setCountryOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const searchTimer = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (countryRef.current && !countryRef.current.contains(e.target)) setCountryOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const COUNTRIES = [
    { code:"au", flag:"🇦🇺", label:"Australia" },
    { code:"nz", flag:"🇳🇿", label:"New Zealand" },
    { code:"us", flag:"🇺🇸", label:"United States" },
    { code:"gb", flag:"🇬🇧", label:"United Kingdom" },
    { code:"ca", flag:"🇨🇦", label:"Canada" },
    { code:"sg", flag:"🇸🇬", label:"Singapore" },
  ];

  const set = (k, v) => setData(d => {
    const next = { ...d, [k]: v };
    try { localStorage.setItem(savedKey, JSON.stringify({ bizName: next.bizName, googleLink: next.googleLink })); } catch {}
    return next;
  });

  const doSearch = (q, country) => {
    clearTimeout(searchTimer.current);
    if (q.trim().length < 2) { setSearchResults([]); setSearching(false); return; }
    setSearching(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search-places?q=${encodeURIComponent(q)}&country=${country}`);
        const json = await res.json();
        if (json.error) { setSearchError(json.error); setSearchResults([]); }
        else setSearchResults(json.results || []);
      } catch { setSearchError("Search unavailable."); setSearchResults([]); }
      setSearching(false);
    }, 400);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setSelectedBiz(null);
    setSearchError("");
    doSearch(q, searchCountry);
  };

  const handleCountryChange = (code) => {
    setSearchCountry(code);
    setSelectedBiz(null);
    setSearchError("");
    setSearchResults([]);
    if (searchQuery.trim().length >= 2) doSearch(searchQuery, code);
  };

  const handleSelectBiz = (biz) => {
    setSelectedBiz(biz);
    setSearchQuery(biz.name);
    setSearchResults([]);
    set("bizName", biz.name);
    set("googleLink", biz.reviewUrl);
  };

  const go = dir => {
    setVisible(false);
    setTimeout(() => {
      setStep(s => {
        let next = s + dir;
        // Skip the "confirm link" step when in manual mode (already entered)
        if (next === 1 && manualMode) next += dir;
        return next;
      });
      setVisible(true);
    }, 200);
  };
  const canNext = () => {
    if (step === 0) {
      if (manualMode) return data.bizName.trim().length > 0 && data.googleLink.trim().length > 10;
      return !!selectedBiz;
    }
    if (step === 1) return data.googleLink.trim().length > 10;
    return true;
  };

  const handleFinish = async () => {
    setSaving(true);
    await supabase.from("rc_profiles").upsert({ id:userId, email, biz_name:data.bizName.trim(), google_link:data.googleLink.trim(), plan:"trial", sends_used:0, trial_started_at:new Date().toISOString() });
    try { localStorage.removeItem(savedKey); } catch {}
    setSaving(false);
    onComplete({ bizName:data.bizName.trim(), googleLink:data.googleLink.trim(), plan:"trial", sends_used:0 }, true);
  };

  const stepLabels = ["Find Business", "Confirm Link", "Preview"];
  const headings   = ["Search for your business.", "Your Google Review link.", "Preview your SMS."];
  const subheadings = ["1/3", "2/3", "3/3"];

  const stepContent = () => {
    switch (step) {
      case 0: return (
        <div style={{ position:"relative" }}>
          {!manualMode ? (
            <>
              <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Search your business name</label>
              <div style={{ display:"flex", gap:8 }}>
                {/* Country picker */}
                <div ref={countryRef} style={{ position:"relative", flexShrink:0 }}>
                  <button
                    type="button"
                    onClick={() => setCountryOpen(v => !v)}
                    style={{ height:"100%", minHeight:50, padding:"0 12px", background:"#0f0f0f", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, fontFamily:"var(--font)", cursor:"pointer", display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap", transition:"border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor=countryOpen?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)"}
                  >
                    <span style={{ fontSize:18, lineHeight:1 }}>{COUNTRIES.find(c => c.code === searchCountry)?.flag}</span>
                    <span style={{ fontSize:12, color:"#888", fontWeight:600 }}>{COUNTRIES.find(c => c.code === searchCountry)?.code.toUpperCase()}</span>
                    <span style={{ fontSize:9, color:"#444", marginLeft:2 }}>▼</span>
                  </button>
                  {countryOpen && (
                    <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, background:"#111", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden", zIndex:50, minWidth:180, boxShadow:"0 8px 24px rgba(0,0,0,0.6)" }}>
                      {COUNTRIES.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => { handleCountryChange(c.code); setCountryOpen(false); }}
                          style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 14px", background:c.code===searchCountry?"rgba(255,255,255,0.05)":"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", color: c.code===searchCountry?"#fff":"#888", fontSize:13, fontFamily:"var(--font)", cursor:"pointer", textAlign:"left" }}
                          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                          onMouseLeave={e => e.currentTarget.style.background=c.code===searchCountry?"rgba(255,255,255,0.05)":"transparent"}
                        >
                          <span style={{ fontSize:18 }}>{c.flag}</span>
                          <span style={{ fontWeight: c.code===searchCountry ? 700 : 400 }}>{c.label}</span>
                          {c.code===searchCountry && <span style={{ marginLeft:"auto", color:"#22c55e", fontSize:12 }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Search input */}
                <div style={{ position:"relative", flex:1 }}>
                  <input
                    autoFocus
                    style={{ ...RC_INPUT, paddingRight: searching ? 36 : undefined, width:"100%" }}
                    className="rc-input"
                    placeholder="e.g. Smith Electrical"
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                  />
                  {searching && <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)" }}><Spinner size={14} /></div>}
                </div>
              </div>
              {searchResults.length > 0 && (
                <div style={{ marginTop:6, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden", background:"#0c0c0c" }}>
                  {searchResults.map((biz, i) => (
                    <button key={biz.placeId} onClick={() => handleSelectBiz(biz)} style={{ width:"100%", display:"flex", flexDirection:"column", gap:3, padding:"13px 14px", background:"transparent", border:"none", borderBottom: i < searchResults.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", textAlign:"left", cursor:"pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}
                    >
                      <span style={{ fontSize:13, fontWeight:600, color:"#ddd" }}>{biz.name}</span>
                      <span style={{ fontSize:11, color:"#444" }}>{biz.address}</span>
                    </button>
                  ))}
                </div>
              )}
              {selectedBiz && (
                <div style={{ marginTop:10, background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:9, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:"#22c55e", fontSize:14 }}>✓</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#ccc" }}>{selectedBiz.name}</div>
                      <div style={{ fontSize:11, color:"#555" }}>{selectedBiz.address}</div>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedBiz(null); setSearchQuery(""); setSearchResults([]); }} style={{ background:"none", border:"none", color:"#444", fontSize:12, cursor:"pointer" }}>Change</button>
                </div>
              )}
              {searchError && <p style={{ fontSize:12, color:"#f87171", marginTop:8 }}>{searchError}</p>}
              {!selectedBiz && !searching && !searchError && searchQuery.length > 2 && searchResults.length === 0 && (
                <p style={{ fontSize:12, color:"#555", marginTop:10 }}>No results — try adding your suburb or city.</p>
              )}
              <button onClick={() => setManualMode(true)} style={{ background:"none", border:"none", color:"#444", fontSize:12, cursor:"pointer", marginTop:14, textDecoration:"underline", padding:0 }}>
                Can't find your business? Enter details manually
              </button>
            </>
          ) : (
            <>
              <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Business name</label>
              <input autoFocus style={RC_INPUT} className="rc-input" placeholder="e.g. Smith Electrical" value={data.bizName} onChange={e => set("bizName", e.target.value)} />
              <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:8, marginTop:16 }}>Google Review URL</label>
              <input style={RC_INPUT} className="rc-input" placeholder="https://search.google.com/local/writereview?placeid=..." value={data.googleLink} onChange={e => set("googleLink", e.target.value)} />
              <p style={{ fontSize:12, color:"#383838", marginTop:8, lineHeight:1.6 }}>
                Find it: search your business on Google → click "Ask for reviews" → copy the link.
              </p>
              <button onClick={() => setManualMode(false)} style={{ background:"none", border:"none", color:"#444", fontSize:12, cursor:"pointer", marginTop:10, textDecoration:"underline", padding:0 }}>
                ← Back to search
              </button>
            </>
          )}
        </div>
      );
      case 1: return (
        <div>
          <label style={{ fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Google Review URL</label>
          <input style={RC_INPUT} className="rc-input" value={data.googleLink} onChange={e => set("googleLink", e.target.value)} placeholder="https://search.google.com/local/writereview?placeid=..." />
          {data.googleLink && (
            <div style={{ marginTop:10, background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:9, padding:"10px 14px", fontSize:12, color:"#555", lineHeight:1.6 }}>
              <span style={{ color:"#22c55e" }}>✓</span> Link auto-filled from your Google listing. Edit if needed.
            </div>
          )}
        </div>
      );
      case 2: return (
        <div>
          <div style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"20px 18px", marginBottom:16 }}>
            <div style={{ fontSize:10, color:"#383838", fontFamily:"var(--mono)", letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>SMS your customers will receive</div>
            <div style={{ background:"#080808", borderRadius:10, padding:"14px 16px", fontSize:14, color:"#bbb", lineHeight:1.8 }}>
              Hi! Thanks for choosing <strong style={{ color:"#fff" }}>{data.bizName||"Your Business"}</strong>. If you have a moment, we'd love a Google review — it really helps! <span style={{ color:"#22c55e" }}>{data.googleLink||"your-review-link"}</span>
            </div>
            <div style={{ fontSize:11, color:"#2a2a2a", marginTop:10, display:"flex", justifyContent:"space-between", fontFamily:"var(--mono)" }}>
              <span>From: AU mobile number</span>
              <span style={{ color:"rgba(34,197,94,0.4)" }}>✓ Under 160 chars</span>
            </div>
          </div>
          <p style={{ fontSize:13, color:"#555", lineHeight:1.75 }}>This is exactly what your customers receive. You can customise the message in Settings on Growth and Crew plans.</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{ minHeight:"100vh",background:"#080808",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"rgba(255,255,255,0.05)",zIndex:100 }}>
        <div style={{ height:"100%",width:`${((step+1)/3)*100}%`,background:"#22c55e",transition:"width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:520,animation:"rc-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ display:"flex",gap:6,marginBottom:28 }}>
          {stepLabels.map((l,i) => (
            <div key={l} style={{ fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:999,background:i<step?"rgba(34,197,94,0.1)":i===step?"#22c55e":"rgba(255,255,255,0.04)",color:i<step?"#22c55e":i===step?"#000":"#656565",border:`1px solid ${i<step?"rgba(34,197,94,0.25)":i===step?"transparent":"rgba(255,255,255,0.06)"}`,transition:"all 0.3s" }}>{l}</div>
          ))}
        </div>
        <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(14px)",transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",marginBottom:24 }}>
          <p style={{ fontSize:11.5,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"#444",fontFamily:"var(--mono)",marginBottom:8 }}>{subheadings[step]}</p>
          <h1 style={{ fontSize:isMobile?"clamp(22px,6vw,30px)":"clamp(24px,3vw,34px)",fontWeight:800,letterSpacing:"-1.2px",color:"#fff",marginBottom:20 }}>{headings[step]}</h1>
          {stepContent()}
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={()=>step===0?null:go(-1)} style={{ padding:"11px 20px",fontSize:13,fontWeight:600,borderRadius:8,background:"transparent",color:"#555",border:"1px solid rgba(255,255,255,0.08)",opacity:step===0?0.2:1,cursor:step===0?"default":"pointer" }}>← Back</button>
          <span style={{ fontSize:11,color:"#656565",fontFamily:"var(--mono)" }}>{step+1} / 3</span>
          {step<2 ? (
            <button onClick={()=>canNext()&&go(1)} disabled={!canNext()} style={{ padding:"11px 22px",fontSize:13,fontWeight:700,borderRadius:8,background:canNext()?"#fff":"rgba(255,255,255,0.08)",color:canNext()?"#000":"#656565",border:"none",cursor:canNext()?"pointer":"default" }}>Next →</button>
          ) : (
            <button onClick={handleFinish} disabled={saving} style={{ padding:"11px 22px",fontSize:13,fontWeight:700,borderRadius:8,background:"#22c55e",color:"#000",border:"none",display:"flex",alignItems:"center",gap:8 }}>
              {saving ? <><Spinner size={13} dark />Saving…</> : "Go to Dashboard →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Usage Toast ───────────────────────────────────────────────────
const TOAST_THRESHOLDS = [30, 50, 90, 100];

const TOAST_STYLES = {
  30:  { color: "#60a5fa", bg: "rgba(96,165,250,0.06)",  border: "rgba(96,165,250,0.2)"  },
  50:  { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)"  },
  90:  { color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)"  },
  100: { color: "#f87171", bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.2)"   },
};

const TOAST_COPY = {
  30:  { msg: "You've used 30% of your monthly sends." },
  50:  { msg: "You've used 50% of your monthly sends." },
  90:  { msg: "You've used 90% of your monthly sends.", btnText: "Upgrade Plan" },
  100: { msg: "You've hit your monthly limit. Upgrade to keep sending review requests and never miss a job.", btnText: "Upgrade Now — Don't Miss Out" },
};

const RCUsageToast = ({ threshold, onDismiss, onUpgrade }) => {
  const s = TOAST_STYLES[threshold];
  const c = TOAST_COPY[threshold];
  if (!s || !c) return null;
  return (
    <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 9999, maxWidth: 320, width: "calc(100vw - 40px)", background: "#111", border: `1px solid ${s.border}`, borderRadius: 12, padding: "14px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", animation: "rc-fadeIn 0.3s both", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, fontSize: 13, color: s.color, lineHeight: 1.6 }}>{c.msg}</div>
        <button onClick={onDismiss} style={{ background: "none", border: "none", color: "#555", fontSize: 16, cursor: "pointer", flexShrink: 0, lineHeight: 1, padding: 0, marginTop: 1 }}>✕</button>
      </div>
      {c.btnText && (
        <button onClick={onUpgrade} style={{ width: "100%", padding: "8px 14px", background: threshold === 100 ? "#ef4444" : s.bg, color: threshold === 100 ? "#fff" : s.color, border: `1px solid ${s.border}`, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          {c.btnText}
        </button>
      )}
    </div>
  );
};

// ── Upgrade Modal (for active subscribers) ────────────────────────
const RCUpgradeModal = ({ isMobile, profile, onClose, onPlanChanged }) => {
  const [switching, setSwitching] = useState(null);
  const [switchError, setSwitchError] = useState("");
  const currentPlan = profile?.plan;
  const paidPlans = PLANS_DATA.filter(p => p.id !== "trial");

  const handleSwitch = async (planId) => {
    if (planId === currentPlan || switching) return;
    setSwitching(planId);
    setSwitchError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not signed in");
      const res = await fetch("/api/switch-rc-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ newPlan: planId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to switch plan");
      onPlanChanged(planId);
      onClose();
    } catch (e) {
      setSwitchError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSwitching(null);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "center", padding: isMobile ? "72px 16px 24px" : 24, overflowY: "auto" }}>
      <div style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: isMobile ? "28px 20px" : "36px 32px", maxWidth: 820, width: "100%", position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.8)", animation: "rc-fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 2, background: "linear-gradient(90deg,transparent,rgba(34,197,94,0.6),transparent)", borderRadius: 999 }} />
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", width: 28, height: 28, color: "#555", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#444", fontFamily: "var(--mono)", marginBottom: 10 }}>Manage Plan</div>
          <h2 style={{ fontSize: isMobile ? "clamp(20px,5vw,26px)" : "28px", fontWeight: 800, letterSpacing: "-1.5px", color: "#fff", marginBottom: 8 }}>Your Plan</h2>
          <p style={{ fontSize: 13, color: "#555" }}>Switch plans instantly. Changes take effect immediately.</p>
        </div>
        {switchError && <p style={{ fontSize: 13, color: "#f87171", textAlign: "center", marginBottom: 16 }}>{switchError}</p>}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
          {paidPlans.map(p => {
            const isCurrent = p.id === currentPlan;
            const featured = p.id === "growth";
            return (
              <div key={p.id} style={{ position: "relative", border: `1px solid ${isCurrent ? "rgba(34,197,94,0.4)" : featured ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`, borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", background: isCurrent ? "rgba(34,197,94,0.04)" : featured ? "#0f0f0f" : "#0c0c0c", overflow: "hidden" }}>
                {featured && !isCurrent && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 2, background: "linear-gradient(90deg,transparent,rgba(34,197,94,0.5),transparent)", borderRadius: 999 }} />}
                {isCurrent ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap:6, fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "4px 12px", marginBottom: 16, width: "fit-content" }}>✓ Current Plan</div>
                ) : p.badge ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: featured ? "#22c55e" : "#777", background: featured ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${featured ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.1)"}`, borderRadius: 999, padding: "4px 12px", marginBottom: 16, width: "fit-content" }}>{p.badge}</div>
                ) : (
                  <div style={{ height: 30, marginBottom: 16 }} />
                )}
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#444", fontFamily: "var(--mono)", marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#444", marginBottom: 6 }}>$</span>
                  <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-2px", color: "#fff", lineHeight: 1 }}>{p.priceLabel}</span>
                  <span style={{ fontSize: 12, color: "#444", marginBottom: 6, marginLeft: 2 }}>/mo</span>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "rgba(34,197,94,0.7)", marginBottom: 14, width: "fit-content", fontFamily: "var(--mono)" }}>{p.sends} sends/mo</div>
                <p style={{ fontSize: 13, color: "#858585", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>{p.desc}</p>
                {isCurrent ? (
                  <div style={{ textAlign: "center", fontSize: 12, color: "#2a2a2a", padding: "10px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 9 }}>Your current plan</div>
                ) : (
                  <button onClick={() => handleSwitch(p.id)} disabled={!!switching} style={{ padding: "11px 16px", background: featured ? "#fff" : "transparent", color: featured ? "#000" : "#666", border: featured ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: switching ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: switching && switching !== p.id ? 0.4 : 1 }}>
                    {switching === p.id ? <><Spinner size={13} dark={featured} />Switching…</> : `Switch to ${p.name}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {["Pro-rated billing", "Instant access", "Cancel any time"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#656565" }}>
              <span style={{ color: "#22c55e", fontSize: 10 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Paywall Screen ────────────────────────────────────────────────
const RCPaywallScreen = ({ isMobile, profile, onClose, onBack }) => {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const trialExpired = isTrialExpired(profile);

  const handleUpgrade = async (planId) => {
    if (planId === "trial") return;
    setLoadingPlan(planId);
    try {
      const { data:{ session } } = await supabase.auth.getSession();
      await startStripeCheckout(STRIPE_PRICES[planId], session.user.email, session.user.id, planId === "starter");
    } catch(e) { console.error(e); setLoadingPlan(null); }
  };

  const paidPlans = PLANS_DATA.filter(p => p.id !== "trial");

  return (
    <div style={{ position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(10px)",display:"flex",alignItems:isMobile?"flex-start":"center",justifyContent:"center",padding:isMobile?"72px 16px 24px":24,overflowY:"auto" }}>
      <div style={{ background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:isMobile?"24px 20px":"36px 32px",maxWidth:980,width:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,0.8)",animation:"rc-fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:120,height:2,background:"linear-gradient(90deg,transparent,rgba(34,197,94,0.6),transparent)",borderRadius:999 }} />
        {onBack && <button onClick={onBack} style={{ position:"absolute",top:16,left:16,background:"none",border:"none",color:"#555",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>← Back</button>}
        <div style={{ textAlign:"center",marginBottom:28 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:999,padding:"4px 14px",fontSize:12,fontWeight:600,color:"#22c55e",marginBottom:16,fontFamily:"var(--mono)" }}>
            <span className="rc-badge-dot" style={{ width:6,height:6 }} /> {trialExpired?"Trial Expired":"Upgrade ReviewChaser"}
          </div>
          <h2 style={{ fontSize:isMobile?"clamp(22px,6vw,28px)":"clamp(24px,3vw,32px)",fontWeight:800,letterSpacing:"-1.5px",color:"#fff",marginBottom:10 }}>
            {trialExpired ? "Plans that grow with you." : "Plans that grow with your company"}
          </h2>
          <p style={{ fontSize:14,color:"#555",lineHeight:1.7 }}>
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:10,marginBottom:20 }}>
          {paidPlans.map(p => <RCPlanCard key={p.id} plan={p} onSelect={handleUpgrade} loading={loadingPlan} />)}
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap" }}>
          {["Cancel any time","Instant access","Billed via Stripe"].map(t => (
            <div key={t} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#656565" }}>
              <span style={{ color:"#22c55e",fontSize:10 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Dashboard App ─────────────────────────────────────────────────
const RC_MESSAGE_TEMPLATES = [
  {
    id: "friendly",
    label: "Friendly & warm",
    preview: (biz, link) => `Hi! Thanks for choosing ${biz}. If you have a moment, we'd love a Google review — it really helps! ${link}`,
  },
  {
    id: "brief",
    label: "Short & direct",
    preview: (biz, link) => `Hey! Thanks for using ${biz}. Mind leaving us a quick Google review? ${link} — takes 30 seconds!`,
  },
  {
    id: "tradies",
    label: "Tradie style",
    preview: (biz, link) => `G'day! Job's done — if you're happy with the work, a Google review would mean a lot. ${link} Cheers!`,
  },
  {
    id: "professional",
    label: "Professional",
    preview: (biz, link) => `Thank you for choosing ${biz}. We'd appreciate a Google review to help others find us. ${link}`,
  },
  {
    id: "custom",
    label: "Write my own",
    preview: () => "",
  },
];

const RCDashboardApp = ({ isMobile, profile: initialProfile, userId, onSignOut }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [tab, setTab] = useState("send");
  const [mobile, setMobile] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sendsUsed, setSendsUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeToast, setActiveToast] = useState(null);
  const [shownToasts, setShownToasts] = useState(() => {
    try {
      const key = `rc_toasts_${userId}_${new Date().toISOString().slice(0, 7)}`;
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch { return new Set(); }
  });
  const [settingsData, setSettingsData] = useState({
    bizName: initialProfile?.biz_name ?? "",
    googleLink: initialProfile?.google_link ?? "",
    templateId: initialProfile?.template_id ?? "friendly",
    customMsg: initialProfile?.custom_msg ?? "",
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [cancelStep, setCancelStep] = useState(null); // null | "confirm" | "done"
  const [cancelLoading, setCancelLoading] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactMsg, setContactMsg] = useState("");

  const plan = profile?.plan ?? "trial";
  const sendLimit = getSendLimit(plan);
  const trialExpired = isTrialExpired(profile);
  const pct = Math.min(100, Math.round((sendsUsed / sendLimit) * 100));
  const atLimit = sendsUsed >= sendLimit;

  const canCustomise = plan === "starter" || plan === "growth" || plan === "crew";

  const activeTemplate = RC_MESSAGE_TEMPLATES.find(t => t.id === settingsData.templateId) ?? RC_MESSAGE_TEMPLATES[0];
  const livePreview = activeTemplate.id === "custom"
    ? settingsData.customMsg
    : activeTemplate.preview(settingsData.bizName || "Your Business", settingsData.googleLink || "your-link");

  useEffect(() => { getRCSendsThisMonth(userId).then(setSendsUsed).catch(() => {}); }, [userId, sent]);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      setHistory(await getRCSendHistory(userId));
    } catch (e) {
      console.error("load history error:", e);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [userId]);

  useEffect(() => { if (tab === "history") loadHistory(); }, [tab, loadHistory]);
  useEffect(() => { if (trialExpired || atLimit) setShowPaywall(true); }, [trialExpired, atLimit]);

  // Usage threshold notifications
  useEffect(() => {
    const isPaid = plan === "starter" || plan === "growth" || plan === "crew";
    if (!isPaid || !sendLimit) return;
    const crossed = TOAST_THRESHOLDS.filter(t => pct >= t && !shownToasts.has(t));
    if (!crossed.length) return;
    const highest = crossed[crossed.length - 1];
    setActiveToast(highest);
    setShownToasts(prev => {
      const next = new Set([...prev, ...crossed]);
      try {
        const key = `rc_toasts_${userId}_${new Date().toISOString().slice(0, 7)}`;
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, [pct]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSwitchPlan = (newPlan) => {
    setProfile(p => ({ ...p, plan: newPlan }));
  };

  const handleSend = async () => {
    const clean = mobile.replace(/\s/g, "").replace(/^0/, "+61");
    if (clean.length < 10) return;
    if (!profile?.biz_name || !profile?.google_link) { setSendErr("Please complete your profile in Settings first."); return; }
    setSending(true); setSendErr("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setSendErr("Please sign in again."); setSending(false); return; }
      const res = await fetch("https://qmaqmbimnhzyspvnioeb.supabase.co/functions/v1/smooth-worker", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session.access_token}` },
        body: JSON.stringify({ mobile }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.error === "trial_expired") { setShowPaywall(true); setSending(false); return; }
        if (json.error === "limit_reached") { setShowPaywall(true); setSending(false); return; }
        throw new Error(json.error);
      }
      setSent(true); setMobile("");
      setTimeout(() => setSent(false), 4000);
    } catch (e) { setSendErr("Failed to send. Check the number and try again."); }
    finally { setSending(false); }
  };

  const handleSaveSettings = async () => {
    setSettingsSaving(true);
    try {
      await supabase.from("rc_profiles").update({
        biz_name: settingsData.bizName.trim(),
        google_link: settingsData.googleLink.trim(),
        template_id: settingsData.templateId,
        custom_msg: settingsData.customMsg.trim(),
      }).eq("id", userId);
      setProfile(p => ({ ...p, biz_name: settingsData.bizName.trim(), google_link: settingsData.googleLink.trim() }));
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    } catch (e) {
      console.error("save settings error:", e);
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleCancelPlan = async () => {
    setCancelLoading(true);
    try {
      if (plan === "trial") {
        await supabase.from("rc_profiles").update({ plan: "expired" }).eq("id", userId);
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Not signed in");
        const res = await fetch("/api/cancel-rc-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session.access_token}` },
        });
        if (!res.ok) throw new Error("Cancel failed");
      }
      setProfile(p => ({ ...p, plan: "expired" }));
      setCancelStep("done");
    } catch (e) { console.error(e); }
    finally { setCancelLoading(false); }
  };

  const handleContactSupport = async () => {
    if (!contactMsg.trim()) return;
    try {
      await fetch("https://formspree.io/f/mlgzbpng", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "💬 Support request": contactMsg, "📧 Email": profile?.email ?? "unknown", "📦 Plan": plan }),
      });
    } catch (e) { console.error(e); }
    setContactSent(true); setContactMsg("");
    setTimeout(() => setContactSent(false), 3500);
  };

  const formatDate = iso => {
    const d = new Date(iso); const now = new Date(); const diff = (now - d) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
  };

  const planConfig = PLAN_CONFIG[plan] ?? PLAN_CONFIG.trial;

  return (
    <>
      {(showPaywall || trialExpired) && <RCPaywallScreen isMobile={isMobile} profile={profile} onClose={() => !trialExpired && setShowPaywall(false)} />}
      {showUpgradeModal && <RCUpgradeModal isMobile={isMobile} profile={profile} onClose={() => setShowUpgradeModal(false)} onPlanChanged={handleSwitchPlan} />}
      {activeToast && <RCUsageToast threshold={activeToast} onDismiss={() => setActiveToast(null)} onUpgrade={() => { setActiveToast(null); setShowUpgradeModal(true); }} />}
      <div style={{ minHeight: "100vh", background: "#060606" }}>
        {/* ── TOPBAR ── */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 16px" : "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <WordmarkSVG height={isMobile ? 17 : 20} />
            <div style={{ fontSize: 10, fontWeight: 700, color: planConfig.color, background: `${planConfig.color}18`, border: `1px solid ${planConfig.color}38`, borderRadius: 999, padding: "2px 8px", fontFamily: "var(--mono)" }}>{planConfig.label.toUpperCase()}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {plan === "trial" && <button onClick={() => setShowPaywall(true)} style={{ padding: isMobile ? "6px 12px" : "7px 16px", background: "#22c55e", color: "#000", border: "none", borderRadius: 7, fontSize: isMobile ? 11 : 12.5, fontWeight: 700, cursor: "pointer" }}>Upgrade</button>}
            {(plan === "starter" || plan === "growth" || plan === "crew") && <button onClick={() => setShowUpgradeModal(true)} style={{ padding: isMobile ? "6px 12px" : "7px 16px", background: "transparent", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 7, fontSize: isMobile ? 11 : 12.5, fontWeight: 700, cursor: "pointer" }}>Upgrade Plan</button>}
            <div style={{ fontSize: 12, color: "#656565", fontFamily: "var(--mono)", display: isMobile ? "none" : "block" }}>{sendsUsed}/{sendLimit}</div>
            <button onClick={() => { setTab(t => t === "settings" ? "send" : "settings"); setCancelStep(null); }} style={{ width: 32, height: 32, borderRadius: "50%", background: tab === "settings" ? "rgba(34,197,94,0.15)" : "linear-gradient(135deg,#22c55e,#16a34a)", border: tab === "settings" ? "2px solid #22c55e" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: tab === "settings" ? "#22c55e" : "#000", cursor: "pointer" }}>
              {(profile?.biz_name || "R")[0].toUpperCase()}
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: `${isMobile ? 0 : 36}px ${isMobile ? 0 : 36}px`, paddingTop: isMobile ? 72 : 90 }}>
          <div style={{ padding: isMobile ? "0 16px" : 0 }}>

            {/* ── STATS ── */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr 1fr" : "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
              {[{ label: "Sent this month", val: sendsUsed, green: false }, { label: "Remaining", val: Math.max(0, sendLimit - sendsUsed), green: true }, { label: "Monthly cap", val: sendLimit, green: false }].map(({ label, val, green }) => (
                <div key={label} style={{ background: green ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)", border: `1px solid ${green ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: isMobile ? "12px 14px" : "18px 20px" }}>
                  <div style={{ fontSize: 9.5, color: "#383838", fontFamily: "var(--mono)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, letterSpacing: "-1px", color: green ? "#22c55e" : "#fff", lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#22c55e", borderRadius: 999, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontSize: 12, color: pct >= 90 ? "#f87171" : pct >= 75 ? "#f59e0b" : "#444", fontFamily: "var(--mono)", flexShrink: 0 }}>{pct}% used</div>
              {pct >= 80 && <button onClick={() => setShowPaywall(true)} style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "3px 9px", cursor: "pointer", flexShrink: 0 }}>Upgrade</button>}
            </div>

            {plan === "trial" && !trialExpired && (
              <div style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontSize: 13, color: "#858585" }}>⚡ <strong style={{ color: "#f59e0b" }}>Free trial</strong> — 7 days, 20 sends.</div>
                <button onClick={() => setShowPaywall(true)} style={{ padding: "7px 14px", background: "transparent", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>Upgrade →</button>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 4, marginBottom: 16, gap: 4 }}>
              {[["send", "Send"], ["history", "History"], ["settings", "Settings"]].map(([id, label]) => (
                <button key={id} onClick={() => { setTab(id); if (id !== "settings") setCancelStep(null); }} style={{ flex: 1, padding: isMobile ? "10px 6px" : "10px 16px", borderRadius: 8, background: tab === id ? "rgba(255,255,255,0.07)" : "transparent", color: tab === id ? "#fff" : "#444", fontSize: isMobile ? 12 : 13, fontWeight: 600, border: "none", transition: "all 0.2s", cursor: "pointer" }}>{label}</button>
              ))}
            </div>

            {/* ── SEND TAB ── */}
            {tab === "send" && (
              <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: isMobile ? 20 : 32, animation: "rc-fadeIn 0.3s both" }}>
                <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: "-1px", color: "#fff", marginBottom: 6 }}>Send a review request</h2>
                <p style={{ fontSize: 13.5, color: "#555", marginBottom: 24 }}>Enter your customer's mobile. They'll get a friendly SMS with your Google Review link.</p>
                {!sent ? (
                  <>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 10 }}>Customer mobile number</label>
                    <input value={mobile} onChange={e => { setMobile(e.target.value); setSendErr(""); }} placeholder="04XX XXX XXX" maxLength={13} className="rc-input" style={{ ...RC_INPUT, fontSize: 18, letterSpacing: "1px", marginBottom: 12 }} onKeyDown={e => e.key === "Enter" && handleSend()} disabled={atLimit || trialExpired} />
                    {mobile.length > 3 && (
                      <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "14px 16px", marginBottom: 14, animation: "rc-fadeIn 0.3s both" }}>
                        <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "var(--mono)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>What {mobile} will receive</div>
                        <div style={{ fontSize: 14, color: "#bbb", lineHeight: 1.8 }}>{livePreview || <span style={{ color: "#383838" }}>Complete your message template in Settings.</span>}</div>
                        <div style={{ fontSize: 11, color: "#2a2a2a", marginTop: 8, display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)" }}><span>From: AU mobile number</span><span style={{ color: "rgba(34,197,94,0.4)" }}>✓ Under 160 chars</span></div>
                      </div>
                    )}
                    {sendErr && <p style={{ fontSize: 13, color: "#f87171", marginBottom: 12 }}>{sendErr}</p>}
                    <button onClick={handleSend} disabled={mobile.replace(/\s/g, "").length < 10 || sending || atLimit || trialExpired} style={{ width: "100%", padding: "15px 20px", background: atLimit || trialExpired ? "rgba(255,255,255,0.04)" : mobile.replace(/\s/g, "").length >= 10 ? "#22c55e" : "rgba(34,197,94,0.08)", color: atLimit || trialExpired ? "#656565" : mobile.replace(/\s/g, "").length >= 10 ? "#000" : "#1a4a2e", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      {sending ? <><Spinner size={16} dark />Sending SMS…</> : atLimit || trialExpired ? "🔒 Upgrade to Send" : "Send Review Request ✦"}
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "32px 0", animation: "rc-fadeIn 0.4s both" }}>
                    <div style={{ fontSize: 52, marginBottom: 14 }}>🌟</div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "#fff", marginBottom: 8 }}>Request sent!</div>
                    <div style={{ fontSize: 14, color: "#555", marginBottom: 18 }}>Your customer will receive the SMS shortly.</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#22c55e" }}>
                      <span className="rc-badge-dot" style={{ width: 6, height: 6 }} /> Delivered to AU network
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── HISTORY TAB ── */}
            {tab === "history" && (
              <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", animation: "rc-fadeIn 0.3s both" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#777" }}>Send history</div>
                  {historyLoading ? <Spinner size={14} /> : <div style={{ fontSize: 12, color: "#656565", fontFamily: "var(--mono)" }}>{history.length} records</div>}
                </div>
                {historyLoading ? (
                  <div style={{ padding: "40px 24px", display: "flex", justifyContent: "center" }}><Spinner /></div>
                ) : history.length === 0 ? (
                  <div style={{ padding: "40px 24px", textAlign: "center", color: "#656565", fontSize: 14 }}>No sends yet. Send your first review request!</div>
                ) : history.map((row, i) => (
                  <div key={row.id} className="rc-hover-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "12px 16px" : "14px 24px", borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: "transparent", transition: "background 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#aaa", fontFamily: "var(--mono)" }}>{row.mobile}</div>
                        <div style={{ fontSize: 11, color: "#2a2a2a" }}>{formatDate(row.sent_at)}</div>
                      </div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 999, padding: "3px 9px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>Sent</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── SETTINGS TAB ── */}
            {tab === "settings" && (
              <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: isMobile ? 20 : 32, animation: "rc-fadeIn 0.3s both" }}>

                {cancelStep === null && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                    {/* Account */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 12 }}>Account</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Business name</label>
                          <input className="rc-input" style={RC_INPUT} value={settingsData.bizName} onChange={e => setSettingsData(d => ({ ...d, bizName: e.target.value }))} placeholder="Smith Electrical" />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Google Review link</label>
                          <input className="rc-input" style={RC_INPUT} value={settingsData.googleLink} onChange={e => setSettingsData(d => ({ ...d, googleLink: e.target.value }))} placeholder="https://g.page/r/..." />
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

                    {/* Message template */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 12 }}>
                        Message template {!canCustomise && <span style={{ color: "#f59e0b", fontSize: 10 }}>— Growth & Crew only</span>}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                        {RC_MESSAGE_TEMPLATES.map(t => {
                          const locked = t.id === "custom" && !canCustomise;
                          const active = settingsData.templateId === t.id;
                          return (
                            <button key={t.id} onClick={() => !locked && setSettingsData(d => ({ ...d, templateId: t.id }))} style={{ background: active ? "rgba(34,197,94,0.07)" : "#080808", border: `1px solid ${active ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "11px 14px", cursor: locked ? "default" : "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left", opacity: locked ? 0.4 : 1 }}>
                              <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1px solid ${active ? "rgba(34,197,94,0.5)" : "#383838"}`, background: active ? "#22c55e" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#000", fontWeight: 900 }}>{active ? "✓" : ""}</div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: active ? "#22c55e" : "#666" }}>{t.label}</span>
                              {locked && <span style={{ fontSize: 10, color: "#f59e0b", marginLeft: "auto" }}>🔒</span>}
                            </button>
                          );
                        })}
                      </div>
                      {settingsData.templateId === "custom" && canCustomise && (
                        <div>
                          <textarea className="rc-input" style={{ ...RC_INPUT, minHeight: 80, resize: "vertical" }} placeholder={`Hi! Thanks for choosing ${settingsData.bizName || "Your Business"}...`} value={settingsData.customMsg} onChange={e => setSettingsData(d => ({ ...d, customMsg: e.target.value }))} />
                          <p style={{ fontSize: 11, color: "#383838", marginTop: 6 }}>Keep under 160 chars to avoid double billing. {settingsData.customMsg.length}/160</p>
                        </div>
                      )}
                      {settingsData.templateId !== "custom" && (
                        <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 14px" }}>
                          <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "var(--mono)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Preview</div>
                          <div style={{ fontSize: 13, color: "#666", lineHeight: 1.75 }}>{livePreview}</div>
                        </div>
                      )}
                    </div>

                    {/* Save */}
                    <button onClick={handleSaveSettings} disabled={settingsSaving} style={{ width: "100%", padding: "12px 20px", background: settingsSaved ? "rgba(34,197,94,0.15)" : settingsSaving ? "rgba(255,255,255,0.5)" : "#fff", color: settingsSaved ? "#22c55e" : settingsSaving ? "#aaa" : "#000", border: settingsSaved ? "1px solid rgba(34,197,94,0.3)" : "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: settingsSaving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {settingsSaving ? <><Spinner size={13} dark />Saving…</> : settingsSaved ? "✓ Saved!" : "Save changes"}
                    </button>

                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

                    {/* Your Plan */}
                    {plan !== "trial" && plan !== "expired" && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 12 }}>Your Plan</div>
                        <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{planConfig.label}</span>
                              <span style={{ fontSize: 10, fontWeight: 700, color: planConfig.color, background: `${planConfig.color}18`, border: `1px solid ${planConfig.color}38`, borderRadius: 999, padding: "2px 8px", fontFamily: "var(--mono)" }}>{planConfig.label.toUpperCase()}</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#555", fontFamily: "var(--mono)" }}>{sendsUsed} / {sendLimit} sends used this month</div>
                          </div>
                          <button onClick={() => setShowUpgradeModal(true)} style={{ padding: "9px 16px", background: "#22c55e", color: "#000", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Upgrade Plan</button>
                        </div>
                      </div>
                    )}

                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

                    {/* Contact support */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 12 }}>Contact support</div>
                      {!contactSent ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <textarea className="rc-input" style={{ ...RC_INPUT, minHeight: 70, resize: "vertical" }} placeholder="Describe your issue or question…" value={contactMsg} onChange={e => setContactMsg(e.target.value)} />
                          <button onClick={handleContactSupport} disabled={!contactMsg.trim()} style={{ padding: "10px 18px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, fontSize: 13, fontWeight: 600, color: "#666", cursor: contactMsg.trim() ? "pointer" : "default", opacity: contactMsg.trim() ? 1 : 0.4 }}>Send to support →</button>
                        </div>
                      ) : (
                        <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 9, padding: "12px 14px", fontSize: 13, color: "#22c55e" }}>✓ Message sent — we'll get back to you within 24h.</div>
                      )}
                    </div>

                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.055)" }} />

                    {/* Account actions */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#383838", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--mono)", marginBottom: 12 }}>Account actions</div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button onClick={onSignOut} style={{ flex: 1, minWidth: 120, padding: "10px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#555", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Sign out</button>
                        {plan !== "expired" && (
                          <button onClick={() => setCancelStep("confirm")} style={{ flex: 1, minWidth: 120, padding: "10px 16px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{plan === "trial" ? "Cancel trial" : "Cancel plan"}</button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CANCEL CONFIRM ── */}
                {cancelStep === "confirm" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 12, padding: "18px 20px" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>{plan === "trial" ? "Cancel your trial?" : "Cancel your plan?"}</div>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{plan === "trial" ? "Cancelling your free trial will end it immediately and move your account to expired status." : <>You're on the <strong style={{ color: "#aaa" }}>{planConfig.label}</strong> plan. Cancelling will stop your sends immediately and your account will move to expired status.</>}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => setCancelStep(null)} style={{ flex: 1, padding: "11px 16px", background: "#fff", color: "#000", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Keep my plan</button>
                      <button onClick={handleCancelPlan} disabled={cancelLoading} style={{ flex: 1, padding: "11px 16px", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: cancelLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        {cancelLoading ? <><Spinner size={13} />Cancelling…</> : "Confirm cancel"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── CANCEL DONE ── */}
                {cancelStep === "done" && (
                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>👋</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Plan cancelled</div>
                    <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 18 }}>Your account has been downgraded. You can re-subscribe any time.</p>
                    <button onClick={() => { setTab("send"); setCancelStep(null); }} style={{ padding: "10px 20px", background: "#fff", color: "#000", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Done</button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

// ── ReviewChaserPage (root) ───────────────────────────────────────
function ReviewChaserPage({ setPage, user, setUser }) {
  const isMobile = useIsMobile();
  const [view, setView] = useState("loading");
  const [rcProfile, setRcProfile] = useState(null);
  const [rcUserId, setRcUserId] = useState(null);

  // Track current view in a ref so onAuthStateChange (defined once) can read it
  const viewRef = useRef("loading");
  const setViewAndRef = (v) => { viewRef.current = v; setView(v); };

  const routeAfterProfile = (profile) => {
    if (!profile.biz_name) return setViewAndRef("onboarding");
    if (profile.plan === "trial" || profile.plan === "expired") return setViewAndRef("paywall");
    setViewAndRef("dashboard");
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!session) { setViewAndRef("marketing"); return; }
        const uid = session.user.id;
        const phone = session.user.user_metadata?.phone ?? null;
        setRcUserId(uid);
        let profile = await getOrCreateRCProfile(uid, session.user.email, phone);

        // After a successful checkout Stripe's webhook may not have updated the plan yet.
        // Poll until the plan changes or we time out (10s).
        const isPostCheckout = sessionStorage.getItem("rc_post_checkout") === "1";
        if (isPostCheckout) sessionStorage.removeItem("rc_post_checkout");
        if (isPostCheckout && (profile.plan === "trial" || profile.plan === "expired")) {
          const { data: { session: sess } } = await supabase.auth.getSession();
          for (let i = 0; i < 10 && mounted; i++) {
            await new Promise(r => setTimeout(r, 1000));
            try {
              const r = await fetch("/api/sync-rc-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sess?.access_token}` },
              });
              const json = await r.json();
              if (json.plan && json.plan !== "trial" && json.plan !== "expired") {
                profile = { ...profile, plan: json.plan };
                break;
              }
            } catch {}
          }
        }

        if (!mounted) return;
        setRcProfile(profile);
        routeAfterProfile(profile);
      } catch (e) {
        console.error("RC init error:", e);
        if (mounted) setViewAndRef("marketing");
      }
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const uid = session.user.id;
          const phone = session.user.user_metadata?.phone ?? null;
          setRcUserId(uid);
          const profile = await getOrCreateRCProfile(uid, session.user.email, phone);
          setRcProfile(profile);
          window.history.replaceState({}, "", "/reviewchaser");

          // Show email-collect screen if user just came through the auth flow
          // and hasn't provided a billing email yet
          if (viewRef.current === "auth" && !profile.billing_email) {
            setViewAndRef("email-collect");
          } else {
            routeAfterProfile(profile);
          }
        } catch (e) {
          console.error("RC auth error:", e);
          setViewAndRef("marketing");
        }
      }
      if (event === "SIGNED_OUT") { setRcProfile(null); setRcUserId(null); setViewAndRef("marketing"); }
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get("rc_session") === "success") {
      sessionStorage.setItem("rc_post_checkout", "1");
      window.history.replaceState({}, "", "/reviewchaser");
    }

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartTrial = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const uid = session.user.id;
      const phone = session.user.user_metadata?.phone ?? null;
      const profile = rcProfile ?? await getOrCreateRCProfile(uid, session.user.email, phone);
      setRcUserId(uid);
      setRcProfile(profile);
      routeAfterProfile(profile);
    } else {
      setViewAndRef("auth");
    }
  };

  const handleSignOut = async () => {
    try { await supabase.auth.signOut(); } catch (e) {}
    setViewAndRef("marketing");
  };

  const handleEmailCollectDone = () => {
    routeAfterProfile(rcProfile);
  };

  if (view === "loading") return (
    <>
      <RCStyles />
      <div style={{ minHeight:"100vh", background:"#080808", display:"flex", alignItems:"center", justifyContent:"center" }}><Spinner size={28} /></div>
    </>
  );

  return (
    <>
      <RCStyles />
      {view==="marketing" && <div style={{ paddingTop:62 }}><RCMarketingPage isMobile={isMobile} onStartTrial={handleStartTrial} onSignIn={()=>setViewAndRef("auth")} setPage={setPage} /></div>}
      {view==="auth" && <RCPhoneAuthFlow isMobile={isMobile} onBack={()=>setViewAndRef("marketing")} />}
      {view==="email-collect" && rcUserId && <RCEmailCollectScreen isMobile={isMobile} userId={rcUserId} onComplete={handleEmailCollectDone} />}
      {view==="onboarding" && rcUserId && <RCOnboardingWizard isMobile={isMobile} userId={rcUserId} email={rcProfile?.email??""} onComplete={(profile)=>{ setRcProfile(p=>({...p,...profile})); setViewAndRef("paywall"); }} />}
      {view==="paywall" && rcUserId && rcProfile && <RCPaywallScreen isMobile={isMobile} profile={rcProfile} onClose={null} onBack={() => setViewAndRef("marketing")} />}
      {view==="dashboard" && rcUserId && rcProfile && <RCDashboardApp isMobile={isMobile} profile={rcProfile} userId={rcUserId} onSignOut={handleSignOut} />}
    </>
  );
}

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
export default function App() {
  const [showSplash,setShowSplash] = useState(() => !sessionStorage.getItem("splashSeen"));
  const [page,setPage] = useState("home");
  const [user,setUser] = useState(null);
  const [authLoading,setAuthLoading] = useState(true);
  const isMobile = useIsMobile();
  const [showMobileWarning,setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (isMobile) {
      const dismissed = sessionStorage.getItem("mobileWarningDismissed");
      if (!dismissed) {
        const t = setTimeout(()=>setShowMobileWarning(true),3200);
        return ()=>clearTimeout(t);
      }
    }
  }, [isMobile]);

  const handleDismissWarning = () => {
    setShowMobileWarning(false);
    sessionStorage.setItem("mobileWarningDismissed","1");
  };

  useEffect(() => {
    const publicPages = ["home","systems","webdev","webdev-onboarding","paychaser","reviewchaser","testimonials","pricing","contact"];

    const handleSession = async (session, redirect) => {
      try {
        const currentPath = window.location.pathname.replace("/","") || "home";
        const pageParam = new URLSearchParams(window.location.search).get("page");
        const effectivePage = (pageParam && publicPages.includes(pageParam)) ? pageParam : currentPath;
        if (publicPages.includes(effectivePage)) redirect = false;

        if (!session) { setAuthLoading(false); return; }
        const email = session.user.email;
        const { data: profile } = await supabase.from("profiles").select("*").eq("id",session.user.id).maybeSingle();
        if (!profile) {
          await supabase.from("profiles").upsert({ id:session.user.id,email,plan:"free" }, { onConflict:"id" });
          setUser({ id:session.user.id,email,plan:"free" });
        } else {
          setUser({ id:session.user.id,email,plan:profile.plan||"free",bizName:profile.biz_name });
        }
        if (redirect) {
          setPage("dashboard");
          window.history.replaceState({},"",window.location.pathname);
        }
        setAuthLoading(false);
      } catch (e) {
        console.error("auth error:", e);
        setAuthLoading(false);
      }
    };

    supabase.auth.getSession()
      .then(({ data:{ session } }) => handleSession(session, false))
      .catch(() => setAuthLoading(false));

    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_event,session) => {
      if (_event==="SIGNED_IN") handleSession(session,true);
      if (_event==="SIGNED_OUT") { setUser(null); setAuthLoading(false); }
    });

    return ()=>subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session")==="success"&&user) {
      supabase.from("profiles").select("*").eq("id",user.id).single().then(({ data })=>{ if(data) setUser(u=>({ ...u,plan:data.plan||"pro" })); });
      setPage("dashboard");
      window.history.replaceState({},"",window.location.pathname);
    }
  }, [user]);

  const handleSetPage = (p) => {
    setPage(p);
    window.scrollTo(0,0);
    const appPages = ["auth","onboarding","dashboard","paywall"];
    if (!appPages.includes(p)) {
      const slug = p==="home"?"/":"/"+p;
      window.history.pushState({ page:p },"",slug);
    }
  };

  useEffect(() => {
    const path = window.location.pathname.replace("/","") || "home";
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    const publicPages = ["home","systems","webdev","webdev-onboarding","paychaser","reviewchaser","testimonials","pricing","contact"];
    if (params.get("rc_session") === "success") {
      sessionStorage.setItem("rc_post_checkout", "1");
      setPage("reviewchaser");
      window.history.replaceState({ page:"reviewchaser" }, "", "/reviewchaser");
    } else if (pageParam && publicPages.includes(pageParam)) {
      setPage(pageParam);
      window.history.replaceState({ page:pageParam }, "", "/"+pageParam);
    } else if (publicPages.includes(path)) {
      setPage(path);
    }
  }, []);

  useEffect(() => {
    const onPop = (e) => { const p=e.state?.page||"home"; setPage(p); window.scrollTo(0,0); };
    window.addEventListener("popstate",onPop);
    return ()=>window.removeEventListener("popstate",onPop);
  }, []);

  // ReviewChaser handles its own nav entirely — exclude from isAppPage logic
  const isAppPage = ["auth","onboarding","dashboard","paywall"].includes(page);

  if (authLoading) return (
    <div style={{ minHeight:"100vh",background:"#080808",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ width:32,height:32,border:"2px solid rgba(255,255,255,0.1)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin 0.8s linear infinite" }} />
    </div>
  );

  return (
    <>
      <GlobalStyle />
      {showSplash && <SplashScreen onDone={()=>{ sessionStorage.setItem("splashSeen","1"); setShowSplash(false); }} />}
      {showMobileWarning && <MobileWarningPopup onDismiss={handleDismissWarning} />}

      {/* Only show global Nav when NOT in an app page AND NOT in ReviewChaser (it has its own nav) */}
      {!isAppPage && <Nav page={page} setPage={handleSetPage} />}

      {page==="home"              && <HomePage              setPage={handleSetPage} />}
      {page==="systems"           && <SystemsPage           setPage={handleSetPage} />}
      {page==="webdev"            && <WebDevPage            setPage={handleSetPage} />}
      {page==="webdev-onboarding" && <WebDevOnboardingPage  setPage={handleSetPage} />}
      {page==="paychaser"         && <PaychaserPage         setPage={handleSetPage} />}
      {page==="testimonials"      && <TestimonialsPage      setPage={handleSetPage} />}
      {page==="pricing"           && <PricingPage           setPage={handleSetPage} />}
      {page==="contact"           && <ContactPage           setPage={handleSetPage} />}
      {page==="reviewchaser"      && <ReviewChaserPage      setPage={handleSetPage} user={user} setUser={setUser} />}

      {page==="auth"              && <AuthPage              setPage={handleSetPage} setUser={setUser} />}
      {page==="onboarding"        && <OnboardingPage        setPage={handleSetPage} user={user} setUser={setUser} />}
      {page==="dashboard"         && <DashboardPage         setPage={handleSetPage} user={user} />}
      {page==="paywall"           && <PaywallPage           setPage={handleSetPage} user={user} setUser={setUser} />}
    </>
  );
}
