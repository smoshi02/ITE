import React, { useState, useEffect } from 'react';

// Stars generated once
const STARS = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.3,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

// Meteors generated once
const METEORS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 60}%`,
  left: `${Math.random() * 100}%`,
  width: Math.random() * 120 + 60,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 12,
  rotate: Math.random() * 20 + 20,
}));

// ── Black Hole — fixed on the RIGHT side of the screen ───────────────────────
function BlackHole({ visible }) {
  return (
    <div style={{
      position: 'fixed',
      right: -60,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 200,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 999,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease',
    }}>
      {/* Wide gravitational lensing distortion */}
      <div style={{
        position: 'absolute',
        width: 260, height: 80,
        borderRadius: '50%',
        border: '1.5px solid rgba(255,160,0,0.15)',
        animation: 'bhDistort 2s ease-in-out infinite',
      }} />
      {/* Outer accretion glow */}
      <div style={{
        position: 'absolute',
        width: 160, height: 160,
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: [
          '0 0 0 2px rgba(255,180,0,0.8)',
          '0 0 0 6px rgba(255,100,0,0.5)',
          '0 0 0 14px rgba(200,0,255,0.3)',
          '0 0 0 28px rgba(80,0,200,0.15)',
          '0 0 60px 30px rgba(0,0,0,1)',
        ].join(', '),
        animation: 'bhSpin 1.2s linear infinite',
      }} />
      {/* Inner hot ring */}
      <div style={{
        position: 'absolute',
        width: 96, height: 96,
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: [
          '0 0 0 2px rgba(255,220,80,1)',
          '0 0 0 8px rgba(255,120,0,0.6)',
          '0 0 24px 10px rgba(255,60,0,0.4)',
        ].join(', '),
        animation: 'bhSpin 0.5s linear infinite reverse',
      }} />
      {/* Event horizon void */}
      <div style={{
        position: 'absolute',
        width: 64, height: 64,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #000 50%, rgba(60,0,160,0.8) 80%, transparent 100%)',
        boxShadow: '0 0 40px 20px rgba(0,0,0,1)',
        animation: 'bhVoidPulse 0.8s ease-in-out infinite alternate',
      }} />
      {/* Relativistic jets — top & bottom */}
      <div style={{
        position: 'absolute',
        width: 5, height: 80,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -100%)',
        background: 'linear-gradient(to top, rgba(180,80,255,0.9), transparent)',
        animation: 'bhJet 0.5s ease-in-out infinite alternate',
        borderRadius: 3,
      }} />
      <div style={{
        position: 'absolute',
        width: 5, height: 80,
        top: '50%', left: '50%',
        transform: 'translate(-50%, 0%)',
        background: 'linear-gradient(to bottom, rgba(180,80,255,0.9), transparent)',
        animation: 'bhJet 0.5s ease-in-out infinite alternate-reverse',
        borderRadius: 3,
      }} />
      {/* Gravitational pull streaks coming from the left */}
      {[20, 40, 60, 80].map((pct, i) => (
        <div key={i} style={{
          position: 'absolute',
          right: '50%',
          top: `${pct}%`,
          width: 80 + i * 20,
          height: 1,
          background: `linear-gradient(to right, transparent, rgba(255,${120 + i*20},0,${0.2 + i*0.08}))`,
          animation: `bhPull ${1.2 + i * 0.3}s ease-in-out ${i * 0.15}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmModal({ todo, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(6px)',
      animation: 'modalFadeIn 0.25s ease',
    }}>
      <div style={{
        background: 'rgba(8,12,40,0.98)',
        border: '1px solid rgba(239,68,68,0.45)',
        borderRadius: 18,
        padding: '36px 40px',
        maxWidth: 420,
        width: '90%',
        boxShadow: '0 0 60px rgba(239,68,68,0.2), 0 0 120px rgba(80,0,200,0.15)',
        textAlign: 'center',
        animation: 'modalSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '1.6rem',
          boxShadow: '0 0 20px rgba(239,68,68,0.2)',
        }}>🕳️</div>

        {/* Title */}
        <div style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#fca5a5',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>Terminate Mission?</div>

        {/* Mission name */}
        <div style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '0.75rem',
          color: 'rgba(148,163,184,0.6)',
          marginBottom: 6,
          letterSpacing: '0.05em',
        }}>Mission to be terminated:</div>
        <div style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#e2e8f0',
          marginBottom: 8,
          padding: '8px 16px',
          background: 'rgba(239,68,68,0.08)',
          borderRadius: 8,
          border: '1px solid rgba(239,68,68,0.2)',
        }}>{todo.title}</div>

        {/* Warning */}
        <div style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(148,163,184,0.5)',
          marginBottom: 28,
          letterSpacing: '0.05em',
        }}>This mission will be sucked into the black hole.<br/>This action cannot be undone.</div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              padding: '10px 24px',
              borderRadius: 10,
              border: '1px solid rgba(148,163,184,0.3)',
              cursor: 'pointer',
              background: 'rgba(30,41,59,0.6)',
              color: '#94a3b8',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(30,41,59,0.9)'; e.target.style.color = '#cbd5e1'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(30,41,59,0.6)'; e.target.style.color = '#94a3b8'; }}
          >✕ Abort</button>
          <button
            onClick={onConfirm}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              padding: '10px 24px',
              borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.5)',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(185,28,28,0.6), rgba(127,29,29,0.8))',
              color: '#fca5a5',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'linear-gradient(135deg,rgba(220,38,38,0.8),rgba(153,27,27,0.9))'; e.target.style.boxShadow = '0 0 20px rgba(239,68,68,0.4)'; }}
            onMouseLeave={e => { e.target.style.background = 'linear-gradient(135deg,rgba(185,28,28,0.6),rgba(127,29,29,0.8))'; e.target.style.boxShadow = 'none'; }}
          >🕳️ Send to Black Hole</button>
        </div>
      </div>
    </div>
  );
}

// ── Todo Card ────────────────────────────────────────────────────────────────
function TodoCard({ todo, idx, onDelete, onDeleteStart, onEdit }) {
  const [phase, setPhase] = useState('idle');
  const [showConfirm, setShowConfirm] = useState(false);
  const cardRef = React.useRef(null);
  const ghostRef = React.useRef(null);
  const animRef = React.useRef(null);

  function handleDelete() {
    if (phase !== 'idle') return;
    setShowConfirm(true);
  }

  function confirmDelete() {
    setShowConfirm(false);
    if (phase !== 'idle') return;
    onDeleteStart(todo.id);

    // Get the text elements' positions inside the card
    const rect = cardRef.current.getBoundingClientRect();
    const textStartX = rect.left + 20;   // padding offset
    const textStartY = rect.top + rect.height / 2 - 10;

    // Target: black hole center on right edge, vertically centered
    const targetX = window.innerWidth + 80;
    const targetY = window.innerHeight / 2;

    // Card stays visible but text ghost floats away
    setPhase('textgone');

    // ── Ghost: TEXT ONLY, no background, no border ──
    const ghost = document.createElement('div');
    ghost.style.position = 'fixed';
    ghost.style.top = textStartY + 'px';
    ghost.style.left = textStartX + 'px';
    ghost.style.zIndex = '9999';
    ghost.style.pointerEvents = 'none';
    ghost.style.background = 'none';
    ghost.style.border = 'none';
    ghost.style.padding = '0';
    ghost.style.margin = '0';
    ghost.style.overflow = 'visible';
    ghost.style.willChange = 'left, top, opacity, filter';

    const numDiv = document.createElement('div');
    numDiv.style.cssText = 'font-family:Orbitron,monospace;font-size:0.65rem;color:rgba(99,179,237,0.8);letter-spacing:0.1em;white-space:nowrap;line-height:1.4;';
    numDiv.textContent = '#' + String(idx + 1).padStart(3, '0');

    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'font-family:Orbitron,monospace;font-size:0.95rem;font-weight:600;color:#e2e8f0;letter-spacing:0.05em;white-space:nowrap;line-height:1.4;';
    titleDiv.textContent = todo.title;

    ghost.appendChild(numDiv);
    ghost.appendChild(titleDiv);

    if (todo.description) {
      const descDiv = document.createElement('div');
      descDiv.style.cssText = 'font-family:Rajdhani,sans-serif;font-size:0.95rem;color:rgba(148,163,184,0.8);white-space:nowrap;line-height:1.4;';
      descDiv.textContent = todo.description;
      ghost.appendChild(descDiv);
    }

    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    const dx = targetX - textStartX;
    const dy = targetY - textStartY;

    // Slow smooth snake: 3.8 seconds, gentle S-curve wiggles
    // Waypoints: [t(0-1), x, y, opacity, glowAmount]
    // x/y are ABSOLUTE screen coords
    // wiggle amplitude shrinks as it gets closer (gravity straightens it)
    const duration = 3800;
    const startTime = performance.now();

    const waypoints = [
      [0.00, textStartX,            textStartY,             1.0,  0   ],
      [0.08, textStartX + dx*0.04,  textStartY - 18,        1.0,  0.1 ],
      [0.16, textStartX + dx*0.10,  textStartY + 40,        0.98, 0.2 ],
      [0.24, textStartX + dx*0.18,  textStartY - 55,        0.96, 0.3 ],
      [0.32, textStartX + dx*0.27,  textStartY + 65,        0.93, 0.4 ],
      [0.40, textStartX + dx*0.37,  textStartY + dy*0.2-45, 0.89, 0.5 ],
      [0.48, textStartX + dx*0.47,  textStartY + dy*0.3+35, 0.84, 0.6 ],
      [0.56, textStartX + dx*0.57,  textStartY + dy*0.4-28, 0.78, 0.7 ],
      [0.64, textStartX + dx*0.66,  textStartY + dy*0.52+18,0.70, 0.8 ],
      [0.72, textStartX + dx*0.75,  textStartY + dy*0.63-12,0.58, 0.9 ],
      [0.80, textStartX + dx*0.83,  textStartY + dy*0.73+8, 0.44, 1.2 ],
      [0.88, textStartX + dx*0.91,  textStartY + dy*0.84-5, 0.28, 1.6 ],
      [0.94, textStartX + dx*0.96,  textStartY + dy*0.93+2, 0.14, 2.2 ],
      [1.00, targetX,               targetY,                0.0,  3.0 ],
    ];

    function lerp(a, b, t) { return a + (b - a) * t; }

    function getVals(progress) {
      let i = 0;
      while (i < waypoints.length - 2 && waypoints[i+1][0] <= progress) i++;
      const w0 = waypoints[i];
      const w1 = waypoints[i + 1];
      const local = w1[0] === w0[0] ? 1 : (progress - w0[0]) / (w1[0] - w0[0]);
      // smooth-step easing per segment
      const e = local * local * (3 - 2 * local);
      return {
        x:    lerp(w0[1], w1[1], e),
        y:    lerp(w0[2], w1[2], e),
        op:   lerp(w0[3], w1[3], e),
        glow: lerp(w0[4], w1[4], e),
      };
    }

    function animate(now) {
      const elapsed = now - startTime;
      // Ease-in: slow start, gentle acceleration — no sudden burst
      const raw = Math.min(elapsed / duration, 1);
      // cubic ease-in for gradual gravity pull
      const progress = raw * raw * raw;

      const v = getVals(progress);

      ghost.style.left   = v.x + 'px';
      ghost.style.top    = v.y + 'px';
      ghost.style.opacity = v.op;
      // Subtle glow as text heats up near black hole
      ghost.style.filter = 'drop-shadow(0 0 ' + (v.glow * 6) + 'px rgba(255,160,60,' + v.glow * 0.8 + ')) brightness(' + (1 + v.glow * 0.4) + ')';

      if (raw < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ghost.remove();
        ghostRef.current = null;
        onDelete(todo.id);
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (ghostRef.current) ghostRef.current.remove();
    };
  }, []);

  const textGone = phase === 'textgone';

  return (
    <>
      {showConfirm && (
        <ConfirmModal
          todo={todo}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          animationDelay: `${idx * 0.07}s`,
        }}
      >
        <div className="todo-card">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            {/* Text area — fades out instantly once ghost takes over */}
            <div style={{
              flex: 1,
              opacity: textGone ? 0 : 1,
              transition: textGone ? 'opacity 0.3s ease' : 'none',
            }}>
              <div className="todo-number">#{String(idx + 1).padStart(3, '0')}</div>
              <div className="todo-title-text">{todo.title}</div>
              {todo.description && (
                <div className="todo-desc-text">{todo.description}</div>
              )}
            </div>
            {/* Buttons */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
              <button className="btn-edit" onClick={() => onEdit(todo)} disabled={phase !== 'idle'}>Edit</button>
              <button className="btn-delete" onClick={handleDelete} disabled={phase !== 'idle'}>
                {phase !== 'idle' ? '◌' : 'Delete'}
              </button>
            </div>
          </div>
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
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [adding, setAdding] = useState(false);
  const [blackHoleVisible, setBlackHoleVisible] = useState(false);
  const blackHoleTimer = React.useRef(null);

  async function getData() {
    try {
      const response = await fetch('http://localhost:8000/getTodo/', { method: 'GET' });
      const result = await response.json();
      setLists(result.lists);
    } catch (error) { console.error(error); }
  }

  async function sendData(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      await fetch('http://localhost:8000/addTodo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status: false }),
      });
      setTitle(''); setDescription('');
      getData();
    } catch (error) { console.error(error); }
    finally { setAdding(false); }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:8000/deleteTodo/${id}/`, { method: 'POST' });
      getData();
    } catch (error) { console.error(error); }
    finally {
      // Hide black hole shortly after card is gone
      clearTimeout(blackHoleTimer.current);
      blackHoleTimer.current = setTimeout(() => setBlackHoleVisible(false), 800);
    }
  }

  function handleDeleteStart(id) {
    // Show black hole immediately when delete is clicked
    clearTimeout(blackHoleTimer.current);
    setBlackHoleVisible(true);
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setEditingDescription(todo.description);
  }

  function cancelEdit() {
    setEditingId(null); setEditingTitle(''); setEditingDescription('');
  }

  async function updateTodo(id) {
    try {
      await fetch(`http://localhost:8000/updateTodo/${id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle, description: editingDescription, status: false }),
      });
      cancelEdit(); getData();
    } catch (error) { console.error(error); }
  }

  useEffect(() => { getData(); }, []);

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(30px) scale(0.92); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes bhSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bhVoidPulse {
          0%   { transform: scale(0.9);  box-shadow: 0 0 40px 20px rgba(0,0,0,1); }
          100% { transform: scale(1.1);  box-shadow: 0 0 60px 30px rgba(0,0,0,1); }
        }
        @keyframes bhDistort {
          0%   { transform: scaleX(1)   scaleY(1);   opacity: 0.25; }
          50%  { transform: scaleX(1.4) scaleY(0.55); opacity: 0.7; }
          100% { transform: scaleX(1)   scaleY(1);   opacity: 0.25; }
        }
        @keyframes bhJet {
          0%   { opacity: 0.3; transform: translate(-50%, -100%) scaleY(0.5); }
          100% { opacity: 1;   transform: translate(-50%, -100%) scaleY(1.3); }
        }
        @keyframes bhPull {
          0%   { transform: scaleX(0.6); opacity: 0.15; }
          100% { transform: scaleX(1.2); opacity: 0.5;  }
        }
      `}</style>

      {/* Black hole — always mounted, visibility controlled */}
      <BlackHole visible={blackHoleVisible} />

      {/* Stars */}
      {STARS.map((s) => (
        <div key={s.id} className="star" style={{
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}

      {/* Meteors */}
      {METEORS.map((m) => (
        <div key={m.id} className="meteor" style={{
          top: m.top, left: m.left, width: m.width,
          transform: `rotate(${m.rotate}deg)`,
          animation: `meteor ${m.duration}s linear ${m.delay}s infinite`,
          '--rot': `${m.rotate}deg`,
        }} />
      ))}

      {/* Main Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 960,
        padding: '48px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40, width: '100%' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(99,179,237,0.1)',
            border: '1px solid rgba(99,179,237,0.3)',
            borderRadius: 30, padding: '4px 18px', marginBottom: 16,
            fontFamily: 'Orbitron, monospace', fontSize: '0.6rem',
            letterSpacing: '0.2em', color: 'rgba(99,179,237,0.8)', textTransform: 'uppercase',
          }}>✦ Ilista mo na iyan yah ✦</div>
          <div className="app-title">TO-DO-LIST</div>
          <div style={{
            fontFamily: 'Rajdhani, sans-serif', color: 'rgba(148,163,184,0.5)',
            fontSize: '0.9rem', marginTop: 8, letterSpacing: '0.1em',
          }}>List your goals across your dreams</div>
        </div>

        {/* Card */}
        <div className="main-card" style={{ padding: '32px 28px', width: '100%' }}>

          {/* Form */}
          <div className="form-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(99,179,237,0.9)', boxShadow:'0 0 8px rgba(99,179,237,0.8)' }} />
              <span style={{ fontFamily:'Orbitron, monospace', fontSize:'0.7rem', letterSpacing:'0.15em', color:'rgba(148,163,184,0.7)', textTransform:'uppercase' }}>Listahan</span>
            </div>
            <form onSubmit={sendData}>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div>
                  <div className="tag-label">Mission Title</div>
                  <input className="todo-input" type="text" placeholder="Enter mission title..." value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                  <div className="tag-label">Mission Brief</div>
                  <input className="todo-input" type="text" placeholder="Enter mission details..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div style={{ display:'flex', justifyContent:'flex-end', marginTop:4 }}>
                  <button type="submit" className="btn-primary" disabled={adding}>
                    {adding ? '◌ Launching...' : '⟶ Launch Mission'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="divider" />

          {/* List */}
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(167,139,250,0.9)', boxShadow:'0 0 8px rgba(167,139,250,0.8)' }} />
                <span style={{ fontFamily:'Orbitron, monospace', fontSize:'0.7rem', letterSpacing:'0.15em', color:'rgba(148,163,184,0.7)', textTransform:'uppercase' }}>Active Missions</span>
              </div>
              {lists.length > 0 && (
                <span style={{ fontFamily:'Orbitron, monospace', fontSize:'0.65rem', color:'rgba(99,179,237,0.6)', background:'rgba(99,179,237,0.1)', border:'1px solid rgba(99,179,237,0.2)', padding:'2px 10px', borderRadius:20 }}>
                  {lists.length}
                </span>
              )}
            </div>

            {lists.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize:'2rem', marginBottom:12, opacity:0.3 }}>✦</div>
                Wala pang laman
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {lists.map((todo, idx) =>
                  editingId === todo.id ? (
                    <div key={todo.id} className="todo-card" style={{ animationDelay:`${idx*0.07}s` }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                        <div>
                          <div className="tag-label">Mission Title</div>
                          <input className="todo-input" type="text" value={editingTitle} onChange={e => setEditingTitle(e.target.value)} />
                        </div>
                        <div>
                          <div className="tag-label">Mission Brief</div>
                          <input className="todo-input" type="text" value={editingDescription} onChange={e => setEditingDescription(e.target.value)} />
                        </div>
                        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:4 }}>
                          <button className="btn-cancel" onClick={cancelEdit}>✕ Cancel</button>
                          <button className="btn-save" onClick={() => updateTodo(todo.id)}>✓ Save</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      idx={idx}
                      onDelete={deleteTodo}
                      onDeleteStart={handleDeleteStart}
                      onEdit={startEdit}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign:'center', marginTop:24, fontFamily:'Orbitron, monospace', fontSize:'0.55rem', letterSpacing:'0.2em', color:'rgba(99,179,237,0.25)' }}>
          ✦ TO-DO-LIST ✦
        </div>
      </div>
    </>
  );
}

export default TodoList;