import React, { useState, useEffect } from 'react';

const STARS = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.3,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const METEORS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 60}%`,
  left: `${Math.random() * 100}%`,
  width: Math.random() * 120 + 60,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 12,
  rotate: Math.random() * 20 + 20,
}));

// ── Tiny Astronaut SVG ────────────────────────────────────────────────────────
function TinyAstronaut({ size = 30 }) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="13" rx="11" ry="12" fill={`url(#hb${uid})`} />
      <ellipse cx="20" cy="14" rx="7" ry="7" fill={`url(#vs${uid})`} opacity="0.93" />
      <ellipse cx="17" cy="11" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.28)" />
      <ellipse cx="22" cy="15" rx="1" ry="0.7" fill="rgba(255,255,255,0.18)" />
      <ellipse cx="20" cy="24" rx="10" ry="2.5" fill={`url(#rg${uid})`} />
      <rect x="10" y="24" width="20" height="15" rx="6" fill={`url(#st${uid})`} />
      <rect x="15" y="28" width="10" height="6" rx="2" fill="rgba(30,60,120,0.5)" stroke="rgba(99,179,237,0.4)" strokeWidth="0.6" />
      <circle cx="18" cy="30.5" r="0.9" fill="#4ade80" opacity="0.9" />
      <circle cx="20.5" cy="30.5" r="0.9" fill="#facc15" opacity="0.9" />
      <circle cx="23" cy="30.5" r="0.9" fill="#f87171" opacity="0.9" />
      <rect x="3" y="24" width="8" height="13" rx="4" fill={`url(#st${uid})`} />
      <ellipse cx="7" cy="38" rx="3.5" ry="2.5" fill={`url(#gl${uid})`} />
      <rect x="29" y="24" width="8" height="13" rx="4" fill={`url(#st${uid})`} />
      <ellipse cx="33" cy="38" rx="3.5" ry="2.5" fill={`url(#gl${uid})`} />
      <rect x="12" y="38" width="7" height="9" rx="3.5" fill={`url(#st${uid})`} />
      <rect x="21" y="38" width="7" height="9" rx="3.5" fill={`url(#st${uid})`} />
      <ellipse cx="15.5" cy="47" rx="4.5" ry="2" fill={`url(#bt${uid})`} />
      <ellipse cx="24.5" cy="47" rx="4.5" ry="2" fill={`url(#bt${uid})`} />
      <rect x="28" y="25" width="7" height="10" rx="3" fill={`url(#jp${uid})`} />
      <ellipse cx="31.5" cy="35.5" rx="3" ry="1.5" fill="rgba(255,140,0,0.85)" />
      <ellipse cx="31.5" cy="36.3" rx="1.8" ry="1" fill="rgba(255,220,80,0.9)" />
      <ellipse cx="31.5" cy="36.8" rx="0.9" ry="0.5" fill="white" />
      <line x1="20" y1="2" x2="20" y2="0" stroke="rgba(99,179,237,0.8)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="20" cy="0" r="1.2" fill="rgba(99,179,237,0.9)" />
      <defs>
        <linearGradient id={`hb${uid}`} x1="9" y1="1" x2="31" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" /><stop offset="60%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <radialGradient id={`vs${uid}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" /><stop offset="60%" stopColor="#0369a1" /><stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <linearGradient id={`rg${uid}`} x1="10" y1="24" x2="30" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id={`st${uid}`} x1="10" y1="24" x2="30" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f1f5f9" /><stop offset="50%" stopColor="#e2e8f0" /><stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <radialGradient id={`gl${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#475569" />
        </radialGradient>
        <linearGradient id={`bt${uid}`} x1="11" y1="45" x2="20" y2="49" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={`jp${uid}`} x1="28" y1="25" x2="35" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#475569" /><stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Black Hole ────────────────────────────────────────────────────────────────
function BlackHole({ visible }) {
  return (
    <div style={{
      position: 'fixed', right: -60, top: '50%', transform: 'translateY(-50%)',
      width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 999,
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      <div style={{ position:'absolute', width:260, height:80, borderRadius:'50%', border:'1.5px solid rgba(255,160,0,0.15)', animation:'bhDistort 2s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:160, height:160, borderRadius:'50%', background:'transparent', boxShadow:'0 0 0 2px rgba(255,180,0,0.8), 0 0 0 6px rgba(255,100,0,0.5), 0 0 0 14px rgba(200,0,255,0.3), 0 0 0 28px rgba(80,0,200,0.15), 0 0 60px 30px rgba(0,0,0,1)', animation:'bhSpin 1.2s linear infinite' }} />
      <div style={{ position:'absolute', width:96, height:96, borderRadius:'50%', background:'transparent', boxShadow:'0 0 0 2px rgba(255,220,80,1), 0 0 0 8px rgba(255,120,0,0.6), 0 0 24px 10px rgba(255,60,0,0.4)', animation:'bhSpin 0.5s linear infinite reverse' }} />
      <div style={{ position:'absolute', width:64, height:64, borderRadius:'50%', background:'radial-gradient(circle, #000 50%, rgba(60,0,160,0.8) 80%, transparent 100%)', boxShadow:'0 0 40px 20px rgba(0,0,0,1)', animation:'bhVoidPulse 0.8s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', width:5, height:80, top:'50%', left:'50%', transform:'translate(-50%, -100%)', background:'linear-gradient(to top, rgba(180,80,255,0.9), transparent)', animation:'bhJet 0.5s ease-in-out infinite alternate', borderRadius:3 }} />
      <div style={{ position:'absolute', width:5, height:80, top:'50%', left:'50%', transform:'translate(-50%, 0%)', background:'linear-gradient(to bottom, rgba(180,80,255,0.9), transparent)', animation:'bhJet 0.5s ease-in-out infinite alternate-reverse', borderRadius:3 }} />
      {[20,40,60,80].map((pct,i) => (
        <div key={i} style={{ position:'absolute', right:'50%', top:`${pct}%`, width:80+i*20, height:1, background:`linear-gradient(to right, transparent, rgba(255,${120+i*20},0,${0.2+i*0.08}))`, animation:`bhPull ${1.2+i*0.3}s ease-in-out ${i*0.15}s infinite alternate` }} />
      ))}
    </div>
  );
}

// ── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmModal({ todo, onConfirm, onCancel }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:10000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)', animation:'modalFadeIn 0.25s ease' }}>
      <div style={{ background:'rgba(8,12,40,0.98)', border:'1px solid rgba(239,68,68,0.45)', borderRadius:18, padding:'36px 40px', maxWidth:420, width:'90%', boxShadow:'0 0 60px rgba(239,68,68,0.2), 0 0 120px rgba(80,0,200,0.15)', textAlign:'center', animation:'modalSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.35)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'1.6rem' }}>🕳️</div>
        <div style={{ fontFamily:'Orbitron, monospace', fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.15em', color:'#fca5a5', textTransform:'uppercase', marginBottom:12 }}>Terminate Mission?</div>
        <div style={{ fontFamily:'Orbitron, monospace', fontSize:'0.75rem', color:'rgba(148,163,184,0.6)', marginBottom:6, letterSpacing:'0.05em' }}>Mission to be terminated:</div>
        <div style={{ fontFamily:'Orbitron, monospace', fontSize:'1rem', fontWeight:600, color:'#e2e8f0', marginBottom:8, padding:'8px 16px', background:'rgba(239,68,68,0.08)', borderRadius:8, border:'1px solid rgba(239,68,68,0.2)' }}>{todo.title}</div>
        <div style={{ fontFamily:'Rajdhani, sans-serif', fontSize:'0.85rem', color:'rgba(148,163,184,0.5)', marginBottom:28 }}>This mission will be sucked into the black hole.<br/>This action cannot be undone.</div>
        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button onClick={onCancel} style={{ fontFamily:'Orbitron, monospace', fontSize:'0.65rem', letterSpacing:'0.12em', padding:'10px 24px', borderRadius:10, border:'1px solid rgba(148,163,184,0.3)', cursor:'pointer', background:'rgba(30,41,59,0.6)', color:'#94a3b8', textTransform:'uppercase' }}
            onMouseEnter={e=>{e.target.style.background='rgba(30,41,59,0.9)';}} onMouseLeave={e=>{e.target.style.background='rgba(30,41,59,0.6)';}}>✕ Abort</button>
          <button onClick={onConfirm} style={{ fontFamily:'Orbitron, monospace', fontSize:'0.65rem', letterSpacing:'0.12em', padding:'10px 24px', borderRadius:10, border:'1px solid rgba(239,68,68,0.5)', cursor:'pointer', background:'linear-gradient(135deg, rgba(185,28,28,0.6), rgba(127,29,29,0.8))', color:'#fca5a5', textTransform:'uppercase' }}
            onMouseEnter={e=>{e.target.style.boxShadow='0 0 20px rgba(239,68,68,0.4)';}} onMouseLeave={e=>{e.target.style.boxShadow='none';}}>🕳️ Send to Black Hole</button>
        </div>
      </div>
    </div>
  );
}

// ── Shared black-hole ghost animation ────────────────────────────────────────
function fireBlackHoleGhost({ sourceEl, title, description, idx, onComplete, showBlackHole }) {
  const rect = sourceEl.getBoundingClientRect();
  const textStartX = rect.left + 20;
  const textStartY = rect.top + rect.height / 2 - 10;
  const targetX = window.innerWidth + 80;
  const targetY = window.innerHeight / 2;

  showBlackHole && showBlackHole();

  const ghost = document.createElement('div');
  ghost.style.cssText = `position:fixed;top:${textStartY}px;left:${textStartX}px;z-index:9999;pointer-events:none;will-change:left,top,opacity,filter;`;

  if (idx !== undefined) {
    const n = document.createElement('div');
    n.style.cssText = 'font-family:Orbitron,monospace;font-size:0.65rem;color:rgba(99,179,237,0.8);letter-spacing:0.1em;white-space:nowrap;line-height:1.4;';
    n.textContent = '#' + String(idx + 1).padStart(3, '0');
    ghost.appendChild(n);
  }
  const t = document.createElement('div');
  t.style.cssText = 'font-family:Orbitron,monospace;font-size:0.95rem;font-weight:600;color:#e2e8f0;letter-spacing:0.05em;white-space:nowrap;line-height:1.4;';
  t.textContent = title;
  ghost.appendChild(t);
  if (description) {
    const d = document.createElement('div');
    d.style.cssText = 'font-family:Rajdhani,sans-serif;font-size:0.95rem;color:rgba(148,163,184,0.8);white-space:nowrap;line-height:1.4;';
    d.textContent = description;
    ghost.appendChild(d);
  }
  document.body.appendChild(ghost);

  const dx = targetX - textStartX;
  const dy = targetY - textStartY;
  const duration = 3800;
  const startTime = performance.now();
  const wp = [
    [0.00,textStartX,textStartY,1.0,0],[0.08,textStartX+dx*0.04,textStartY-18,1.0,0.1],[0.16,textStartX+dx*0.10,textStartY+40,0.98,0.2],[0.24,textStartX+dx*0.18,textStartY-55,0.96,0.3],[0.32,textStartX+dx*0.27,textStartY+65,0.93,0.4],[0.40,textStartX+dx*0.37,textStartY+dy*0.2-45,0.89,0.5],[0.48,textStartX+dx*0.47,textStartY+dy*0.3+35,0.84,0.6],[0.56,textStartX+dx*0.57,textStartY+dy*0.4-28,0.78,0.7],[0.64,textStartX+dx*0.66,textStartY+dy*0.52+18,0.70,0.8],[0.72,textStartX+dx*0.75,textStartY+dy*0.63-12,0.58,0.9],[0.80,textStartX+dx*0.83,textStartY+dy*0.73+8,0.44,1.2],[0.88,textStartX+dx*0.91,textStartY+dy*0.84-5,0.28,1.6],[0.94,textStartX+dx*0.96,textStartY+dy*0.93+2,0.14,2.2],[1.00,targetX,targetY,0.0,3.0],
  ];
  const lerp=(a,b,t)=>a+(b-a)*t;
  function getV(p){
    let i=0; while(i<wp.length-2&&wp[i+1][0]<=p)i++;
    const w0=wp[i],w1=wp[i+1],loc=w1[0]===w0[0]?1:(p-w0[0])/(w1[0]-w0[0]),e=loc*loc*(3-2*loc);
    return{x:lerp(w0[1],w1[1],e),y:lerp(w0[2],w1[2],e),op:lerp(w0[3],w1[3],e),glow:lerp(w0[4],w1[4],e)};
  }
  let raf;
  function animate(now){
    const raw=Math.min((now-startTime)/duration,1),p=raw*raw*raw,v=getV(p);
    ghost.style.left=v.x+'px';ghost.style.top=v.y+'px';ghost.style.opacity=v.op;
    ghost.style.filter=`drop-shadow(0 0 ${v.glow*6}px rgba(255,160,60,${v.glow*0.8})) brightness(${1+v.glow*0.4})`;
    if(raw<1){raf=requestAnimationFrame(animate);}else{ghost.remove();onComplete&&onComplete();}
  }
  raf=requestAnimationFrame(animate);
  return ()=>{cancelAnimationFrame(raf);ghost.remove();};
}

// ── Active Todo Card ──────────────────────────────────────────────────────────
function TodoCard({ todo, idx, onDelete, onDeleteStart, onEdit, onToggleDone }) {
  const [phase, setPhase] = useState('idle');
  const [showConfirm, setShowConfirm] = useState(false);
  const cardRef = React.useRef(null);
  const stopRef = React.useRef(null);

  function confirmDelete() {
    setShowConfirm(false);
    if (phase !== 'idle') return;
    setPhase('deleting');
    stopRef.current = fireBlackHoleGhost({
      sourceEl: cardRef.current,
      title: todo.title, description: todo.description, idx,
      showBlackHole: () => onDeleteStart(todo.id),
      onComplete: () => onDelete(todo.id),
    });
  }

  React.useEffect(() => () => stopRef.current && stopRef.current(), []);

  return (
    <>
      {showConfirm && <ConfirmModal todo={todo} onConfirm={confirmDelete} onCancel={()=>setShowConfirm(false)} />}
      <div ref={cardRef} style={{ animationDelay:`${idx*0.07}s` }}>
        <div className="todo-card">
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, flex:1 }}>
              {/* Checkbox */}
              <div
                onClick={() => { if (phase==='idle') { setPhase('marking'); onToggleDone(todo); } }}
                title="Mark as done"
                style={{
                  flexShrink:0, marginTop:5, width:22, height:22, borderRadius:6,
                  border:'1.5px solid rgba(99,179,237,0.5)', background:'rgba(15,23,60,0.6)',
                  cursor: phase==='idle' ? 'pointer' : 'default',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.2s', boxShadow:'0 0 6px rgba(99,179,237,0.15)',
                }}
                onMouseEnter={e=>{ if(phase==='idle'){e.currentTarget.style.borderColor='rgba(99,179,237,0.9)';e.currentTarget.style.boxShadow='0 0 12px rgba(99,179,237,0.4)';}}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(99,179,237,0.5)';e.currentTarget.style.boxShadow='0 0 6px rgba(99,179,237,0.15)';}}
              />
              <div style={{ flex:1, opacity: phase==='deleting'?0:1, transition: phase==='deleting'?'opacity 0.3s':'none' }}>
                <div className="todo-number">#{String(idx+1).padStart(3,'0')}</div>
                <div className="todo-title-text">{todo.title}</div>
                {todo.description && <div className="todo-desc-text">{todo.description}</div>}
              </div>
            </div>
            <div style={{ display:'flex', gap:6, flexShrink:0, marginTop:2 }}>
              <button className="btn-edit" onClick={()=>onEdit(todo)} disabled={phase!=='idle'}>Edit</button>
              <button className="btn-delete" onClick={()=>{ if(phase==='idle') setShowConfirm(true); }} disabled={phase!=='idle'}>{phase!=='idle'?'◌':'Delete'}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Done Card — astronaut walks and draws strikethrough, remove = black hole ──
function DoneCard({ todo, idx, onRemoveStart, onRemoveDone, onUndo }) {
  const cardRef = React.useRef(null);
  const astronautRef = React.useRef(null);
  const [lineWidth, setLineWidth] = useState(0);   // 0–100 %
  const [phase, setPhase] = useState('walking');    // walking | done | removing
  const [showConfirm, setShowConfirm] = useState(false);
  const animRef = React.useRef(null);
  const stopRef = React.useRef(null);

  // Animate astronaut drawing strikethrough on mount
  useEffect(() => {
    const delay = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();

      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
        setLineWidth(ease * 100);
        if (t < 1) { animRef.current = requestAnimationFrame(step); }
        else { setPhase('done'); }
      }
      animRef.current = requestAnimationFrame(step);
    }, idx * 120 + 80);

    return () => { clearTimeout(delay); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  function confirmRemove() {
    setShowConfirm(false);
    if (phase === 'removing') return;
    setPhase('removing');
    stopRef.current = fireBlackHoleGhost({
      sourceEl: cardRef.current,
      title: todo.title, description: todo.description,
      showBlackHole: () => onRemoveStart && onRemoveStart(),
      onComplete: () => onRemoveDone(todo.id),
    });
  }

  React.useEffect(() => () => stopRef.current && stopRef.current(), []);

  // astronaut x position tracks line width (0% → 100%)
  const astroLeft = `calc(${lineWidth}% - 14px)`;

  return (
    <>
      {showConfirm && <ConfirmModal todo={todo} onConfirm={confirmRemove} onCancel={()=>setShowConfirm(false)} />}
      <div
        ref={cardRef}
        style={{
          background:'rgba(6,20,10,0.55)',
          border:'1px solid rgba(74,222,128,0.2)',
          borderRadius:14, padding:'14px 18px',
          animation:'slideInCard 0.4s ease-out both',
          animationDelay:`${idx*0.07}s`,
          opacity: phase==='removing' ? 0 : 1,
          transition: phase==='removing' ? 'opacity 0.35s ease' : 'border-color 0.3s',
        }}
      >
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>

          {/* Green checked box — click to undo */}
          <div
            onClick={() => { if (phase !== 'removing') onUndo(todo); }}
            title="Undo — move back to active"
            style={{
              flexShrink:0, marginTop:5, width:22, height:22, borderRadius:6,
              border:'1.5px solid rgba(74,222,128,0.7)', background:'rgba(74,222,128,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 10px rgba(74,222,128,0.3)',
              cursor: phase !== 'removing' ? 'pointer' : 'default',
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{ if(phase!=='removing'){e.currentTarget.style.background='rgba(239,68,68,0.15)';e.currentTarget.style.borderColor='rgba(239,68,68,0.6)';e.currentTarget.style.boxShadow='0 0 10px rgba(239,68,68,0.3)';}}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(74,222,128,0.15)';e.currentTarget.style.borderColor='rgba(74,222,128,0.7)';e.currentTarget.style.boxShadow='0 0 10px rgba(74,222,128,0.3)';}}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Text + astronaut strikethrough */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'Orbitron, monospace', fontSize:'0.6rem', color:'rgba(74,222,128,0.45)', letterSpacing:'0.12em', marginBottom:3 }}>COMPLETED</div>

            {/* Title row */}
            <div style={{ position:'relative', display:'block' }}>
              {/* Faded title text */}
              <div className="todo-title-text" style={{ color:'rgba(148,163,184,0.45)', display:'block' }}>
                {todo.title}
              </div>

              {/* Growing strikethrough line */}
              <div style={{
                position:'absolute',
                top:'52%', left:0,
                height:'2px',
                width:`${lineWidth}%`,
                background:'linear-gradient(90deg, rgba(74,222,128,1) 0%, rgba(74,222,128,0.6) 100%)',
                boxShadow:'0 0 8px rgba(74,222,128,0.7), 0 0 16px rgba(74,222,128,0.3)',
                borderRadius:2,
                pointerEvents:'none',
                zIndex:2,
                transition:'none',
              }} />

              {/* Astronaut riding the tip of the line */}
              <div
                ref={astronautRef}
                style={{
                  position:'absolute',
                  top:'50%',
                  left: astroLeft,
                  transform:'translateY(-58%)',
                  pointerEvents:'none',
                  zIndex:3,
                  opacity: lineWidth > 2 ? 1 : 0,
                  transition:'opacity 0.2s',
                  // subtle bobbing while walking
                  animation: phase === 'walking' ? 'astronautBob 0.4s ease-in-out infinite alternate' : 'none',
                }}
              >
                <TinyAstronaut size={26} />
              </div>
            </div>

            {/* Description */}
            {todo.description && (
              <div className="todo-desc-text" style={{ color:'rgba(100,116,139,0.45)', marginTop:2, textDecoration: phase==='done'?'line-through':'none', textDecorationColor:'rgba(74,222,128,0.35)' }}>
                {todo.description}
              </div>
            )}
          </div>

          {/* Delete button — same style as active delete, same black hole animation */}
          <button
            className="btn-delete"
            onClick={()=>{ if(phase!=='removing') setShowConfirm(true); }}
            disabled={phase==='removing'}
            style={{ flexShrink:0, marginTop:2 }}
          >{phase==='removing'?'◌':'Delete'}</button>
        </div>
      </div>
    </>
  );
}

// ── Main TodoList ─────────────────────────────────────────────────────────────
function TodoList() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lists, setLists] = useState([]);
  const [doneLists, setDoneLists] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [adding, setAdding] = useState(false);
  const [blackHoleVisible, setBlackHoleVisible] = useState(false);
  const blackHoleTimer = React.useRef(null);

  async function getData() {
    try {
      const res = await fetch('http://localhost:8000/todolists/', { method:'GET' });
      const data = await res.json();
      setLists(data.lists.filter(t => !t.status));
      setDoneLists(data.lists.filter(t => t.status));
    } catch(e){ console.error(e); }
  }

  async function sendData(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      await fetch('http://localhost:8000/addTodo/', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title, description, status:false}),
      });
      setTitle(''); setDescription(''); getData();
    } catch(e){ console.error(e); } finally { setAdding(false); }
  }

  async function deleteTodo(id) {
    try { await fetch(`http://localhost:8000/todolists/${id}/`, {method:'DELETE'}); getData(); }
    catch(e){ console.error(e); } finally {
      clearTimeout(blackHoleTimer.current);
      blackHoleTimer.current = setTimeout(()=>setBlackHoleVisible(false), 800);
    }
  }

  function handleDeleteStart() {
    clearTimeout(blackHoleTimer.current);
    setBlackHoleVisible(true);
  }

  async function markDone(todo) {
    try {
      await fetch(`http://localhost:8000/todolists/${todo.id}/`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title:todo.title, description:todo.description, status:true}),
      });
      getData();
    } catch(e){ console.error(e); }
  }

  async function markUndone(todo) {
    try {
      await fetch(`http://localhost:8000/todolist/${todo.id}/`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title:todo.title, description:todo.description, status:false}),
      });
      getData();
    } catch(e){ console.error(e); }
  }

  async function deleteDoneTodo(id) {
    try { await fetch(`http://localhost:8000/todolists/${id}/`, {method:'DELETE'}); getData(); }
    catch(e){ console.error(e); } finally {
      clearTimeout(blackHoleTimer.current);
      blackHoleTimer.current = setTimeout(()=>setBlackHoleVisible(false), 800);
    }
  }

  function startEdit(t){ setEditingId(t.id); setEditingTitle(t.title); setEditingDescription(t.description); }
  function cancelEdit(){ setEditingId(null); setEditingTitle(''); setEditingDescription(''); }

  async function updateTodo(id){
    try {
      await fetch(`http://localhost:8000/todolists/${id}/`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title:editingTitle, description:editingDescription, status:false}),
      });
      cancelEdit(); getData();
    } catch(e){ console.error(e); }
  }

  useEffect(()=>{ getData(); },[]);

  return (
    <>
      <style>{`
        @keyframes modalFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes modalSlideUp{from{transform:translateY(30px) scale(0.92);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
        @keyframes bhSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes bhVoidPulse{0%{transform:scale(0.9);box-shadow:0 0 40px 20px rgba(0,0,0,1)}100%{transform:scale(1.1);box-shadow:0 0 60px 30px rgba(0,0,0,1)}}
        @keyframes bhDistort{0%{transform:scaleX(1) scaleY(1);opacity:0.25}50%{transform:scaleX(1.4) scaleY(0.55);opacity:0.7}100%{transform:scaleX(1) scaleY(1);opacity:0.25}}
        @keyframes bhJet{0%{opacity:0.3;transform:translate(-50%,-100%) scaleY(0.5)}100%{opacity:1;transform:translate(-50%,-100%) scaleY(1.3)}}
        @keyframes bhPull{0%{transform:scaleX(0.6);opacity:0.15}100%{transform:scaleX(1.2);opacity:0.5}}
        @keyframes astronautBob{0%{transform:translateY(-52%)}100%{transform:translateY(-64%)}}
      `}</style>

      <BlackHole visible={blackHoleVisible} />

      {STARS.map(s=>(
        <div key={s.id} className="star" style={{top:s.top,left:s.left,width:s.size,height:s.size,opacity:s.opacity,animation:`twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`}} />
      ))}
      {METEORS.map(m=>(
        <div key={m.id} className="meteor" style={{top:m.top,left:m.left,width:m.width,transform:`rotate(${m.rotate}deg)`,animation:`meteor ${m.duration}s linear ${m.delay}s infinite`,'--rot':`${m.rotate}deg`}} />
      ))}

      <div style={{position:'relative',zIndex:10,width:'100%',maxWidth:960,padding:'48px 20px',display:'flex',flexDirection:'column',alignItems:'center'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:40,width:'100%'}}>
          <div style={{display:'inline-block',background:'rgba(99,179,237,0.1)',border:'1px solid rgba(99,179,237,0.3)',borderRadius:30,padding:'4px 18px',marginBottom:16,fontFamily:'Orbitron, monospace',fontSize:'0.6rem',letterSpacing:'0.2em',color:'rgba(99,179,237,0.8)',textTransform:'uppercase'}}>✦ Ilista mo na iyan yah ✦</div>
          <div className="app-title">TO-DO-LIST</div>
          <div style={{fontFamily:'Rajdhani, sans-serif',color:'rgba(148,163,184,0.5)',fontSize:'0.9rem',marginTop:8,letterSpacing:'0.1em'}}>List your goals across your dreams</div>
        </div>

        <div className="main-card" style={{padding:'32px 28px',width:'100%'}}>

          {/* Form */}
          <div className="form-section">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'rgba(99,179,237,0.9)',boxShadow:'0 0 8px rgba(99,179,237,0.8)'}} />
              <span style={{fontFamily:'Orbitron, monospace',fontSize:'0.7rem',letterSpacing:'0.15em',color:'rgba(148,163,184,0.7)',textTransform:'uppercase'}}>Listahan</span>
            </div>
            <form onSubmit={sendData}>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div><div className="tag-label">Mission Title</div><input className="todo-input" type="text" placeholder="Enter mission title..." value={title} onChange={e=>setTitle(e.target.value)} /></div>
                <div><div className="tag-label">Mission Brief</div><input className="todo-input" type="text" placeholder="Enter mission details..." value={description} onChange={e=>setDescription(e.target.value)} /></div>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:4}}>
                  <button type="submit" className="btn-primary" disabled={adding}>{adding?'◌ Launching...':'⟶ Launch Mission'}</button>
                </div>
              </div>
            </form>
          </div>

          <div className="divider" />

          {/* Active */}
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'rgba(167,139,250,0.9)',boxShadow:'0 0 8px rgba(167,139,250,0.8)'}} />
                <span style={{fontFamily:'Orbitron, monospace',fontSize:'0.7rem',letterSpacing:'0.15em',color:'rgba(148,163,184,0.7)',textTransform:'uppercase'}}>Active Missions</span>
              </div>
              {lists.length>0&&<span style={{fontFamily:'Orbitron, monospace',fontSize:'0.65rem',color:'rgba(99,179,237,0.6)',background:'rgba(99,179,237,0.1)',border:'1px solid rgba(99,179,237,0.2)',padding:'2px 10px',borderRadius:20}}>{lists.length}</span>}
            </div>
            {lists.length===0
              ? <div className="empty-state"><div style={{fontSize:'2rem',marginBottom:12,opacity:0.3}}>✦</div>Wala pang laman</div>
              : <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {lists.map((todo,idx)=>
                    editingId===todo.id
                      ? <div key={todo.id} className="todo-card" style={{animationDelay:`${idx*0.07}s`}}>
                          <div style={{display:'flex',flexDirection:'column',gap:10}}>
                            <div><div className="tag-label">Mission Title</div><input className="todo-input" type="text" value={editingTitle} onChange={e=>setEditingTitle(e.target.value)} /></div>
                            <div><div className="tag-label">Mission Brief</div><input className="todo-input" type="text" value={editingDescription} onChange={e=>setEditingDescription(e.target.value)} /></div>
                            <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:4}}>
                              <button className="btn-cancel" onClick={cancelEdit}>✕ Cancel</button>
                              <button className="btn-save" onClick={()=>updateTodo(todo.id)}>✓ Save</button>
                            </div>
                          </div>
                        </div>
                      : <TodoCard key={todo.id} todo={todo} idx={idx} onDelete={deleteTodo} onDeleteStart={handleDeleteStart} onEdit={startEdit} onToggleDone={markDone} />
                  )}
                </div>
            }
          </div>

          {/* Completed */}
          {doneLists.length>0&&(
            <>
              <div className="divider" style={{marginTop:28}} />
              <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:'rgba(74,222,128,0.9)',boxShadow:'0 0 8px rgba(74,222,128,0.8)'}} />
                    <span style={{fontFamily:'Orbitron, monospace',fontSize:'0.7rem',letterSpacing:'0.15em',color:'rgba(74,222,128,0.6)',textTransform:'uppercase'}}>Completed Missions</span>
                  </div>
                  <span style={{fontFamily:'Orbitron, monospace',fontSize:'0.65rem',color:'rgba(74,222,128,0.6)',background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.2)',padding:'2px 10px',borderRadius:20}}>{doneLists.length}</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {doneLists.map((todo,idx)=>(
                    <DoneCard key={todo.id} todo={todo} idx={idx} onRemoveStart={handleDeleteStart} onRemoveDone={deleteDoneTodo} onUndo={markUndone} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{textAlign:'center',marginTop:24,fontFamily:'Orbitron, monospace',fontSize:'0.55rem',letterSpacing:'0.2em',color:'rgba(99,179,237,0.25)'}}>
          ✦ TO-DO-LIST ✦
        </div>
      </div>
    </>
  );
}

export default TodoList;