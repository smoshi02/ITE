import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.3,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Access codes do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/addUserWithHash", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (response.ok || response.redirected) {
        navigate("/");
      } else {
        setError("Registration failed. Username may already exist.");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&family=Rajdhani:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Rajdhani', sans-serif; background: #000; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.05); }
        }
        @keyframes glowPulseGreen {
          0%, 100% { box-shadow: 0 0 20px rgba(74,222,128,0.2), 0 0 40px rgba(99,179,237,0.12), inset 0 0 20px rgba(74,222,128,0.04); }
          50% { box-shadow: 0 0 35px rgba(74,222,128,0.35), 0 0 60px rgba(99,179,237,0.2), inset 0 0 30px rgba(74,222,128,0.08); }
        }
        @keyframes titleGlowGreen {
          0%, 100% { text-shadow: 0 0 20px rgba(74,222,128,0.7), 0 0 40px rgba(99,179,237,0.4); }
          50% { text-shadow: 0 0 30px rgba(74,222,128,1), 0 0 60px rgba(99,179,237,0.7), 0 0 80px rgba(74,222,128,0.3); }
        }
        @keyframes floatUp {
          0% { transform: translateY(24px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @keyframes meteor {
          0% { transform: translateX(-200px) translateY(-80px) rotate(var(--rot)); opacity: 0; }
          5% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(110vw) translateY(60vh) rotate(var(--rot)); opacity: 0; }
        }

        .space-bg {
          width: 100%; min-height: 100vh;
          background: radial-gradient(ellipse at 80% 20%, #001a0d 0%, #000010 40%, #000005 100%);
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .nebula-1 {
          position: fixed; width: 600px; height: 400px; top: -100px; right: -150px;
          background: radial-gradient(ellipse, rgba(6,78,59,0.5) 0%, rgba(4,50,36,0.3) 40%, transparent 70%);
          animation: nebulaPulse 8s ease-in-out infinite; pointer-events: none; z-index: 0;
        }
        .nebula-2 {
          position: fixed; width: 500px; height: 500px; bottom: -100px; left: -100px;
          background: radial-gradient(ellipse, rgba(12,74,110,0.4) 0%, rgba(7,45,100,0.25) 40%, transparent 70%);
          animation: nebulaPulse 10s ease-in-out 3s infinite; pointer-events: none; z-index: 0;
        }
        .star { position: fixed; border-radius: 50%; background: white; pointer-events: none; z-index: 0; }
        .meteor {
          position: fixed; border-radius: 9999px; pointer-events: none; z-index: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(200,220,255,1) 100%);
          box-shadow: 0 0 6px 1px rgba(180,210,255,0.6); height: 1.5px;
        }
        .main-card {
          border: 1px solid rgba(74,222,128,0.2);
          background: rgba(3, 12, 8, 0.88);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px 36px;
          width: 100%; max-width: 420px;
          animation: floatUp 0.7s ease-out both, glowPulseGreen 4s ease-in-out 0.7s infinite;
          position: relative; z-index: 10;
        }
        .scanline {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.06), transparent);
          animation: scanline 6s linear infinite; pointer-events: none; z-index: 1;
        }
        .app-title {
          font-family: 'Orbitron', monospace; font-weight: 800; font-size: 1.6rem;
          letter-spacing: 0.12em; color: #e2e8f0;
          animation: titleGlowGreen 3s ease-in-out infinite; text-transform: uppercase;
          text-align: center; margin-bottom: 6px;
        }
        .todo-input {
          background: rgba(3, 20, 10, 0.7); border: 1px solid rgba(74,222,128,0.25);
          border-radius: 10px; color: #e2e8f0; padding: 13px 16px;
          width: 100%; font-family: 'Rajdhani', sans-serif; font-size: 1rem;
          transition: all 0.3s; outline: none;
        }
        .todo-input:focus {
          border-color: rgba(74,222,128,0.7);
          box-shadow: 0 0 15px rgba(74,222,128,0.2);
          background: rgba(6, 30, 14, 0.8);
        }
        .todo-input::placeholder { color: rgba(148,163,184,0.45); }
        .btn-primary {
          font-family: 'Orbitron', monospace; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; padding: 13px 28px; border-radius: 10px; border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #065f46, #1d4ed8);
          color: white; transition: all 0.3s; text-transform: uppercase; width: 100%;
        }
        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669, #2563eb);
          box-shadow: 0 0 20px rgba(74,222,128,0.3), 0 0 40px rgba(99,179,237,0.15);
          transform: translateY(-1px);
        }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .tag-label {
          font-family: 'Orbitron', monospace; font-size: 0.55rem; letter-spacing: 0.15em;
          color: rgba(74,222,128,0.6); text-transform: uppercase; margin-bottom: 6px;
        }
        .error-box {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.35);
          border-radius: 8px; padding: 10px 14px;
          font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.08em;
          color: #fca5a5; text-align: center;
          animation: errorShake 0.4s ease;
        }
        .link-text {
          font-family: 'Rajdhani', sans-serif; font-size: 0.9rem;
          color: rgba(148,163,184,0.5); text-align: center; letter-spacing: 0.05em;
        }
        .link-text a {
          color: rgba(74,222,128,0.8); text-decoration: none; transition: color 0.2s;
        }
        .link-text a:hover { color: rgba(74,222,128,1); text-shadow: 0 0 8px rgba(74,222,128,0.5); }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent);
          margin: 24px 0;
        }
        .badge {
          display: inline-block; background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.3); border-radius: 30px;
          padding: 4px 18px; margin-bottom: 16px;
          font-family: 'Orbitron', monospace; font-size: 0.6rem;
          letter-spacing: 0.2em; color: rgba(74,222,128,0.8); text-transform: uppercase;
        }
        .strength-bar-track {
          height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.06);
          margin-top: 8px; overflow: hidden;
        }
        .strength-bar-fill {
          height: 100%; border-radius: 2px; transition: width 0.4s ease, background 0.4s ease;
        }
      `}</style>

      <div className="space-bg">
        <div className="nebula-1" />
        <div className="nebula-2" />
        <div className="scanline" />

        {STARS.map(s => (
          <div key={s.id} className="star" style={{
            top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`
          }} />
        ))}

        {[{ top:'15%', left:'70%', w:100, dur:6, del:2, rot:22 },
          { top:'70%', left:'20%', w:80, dur:5, del:5, rot:28 },
          { top:'45%', left:'90%', w:60, dur:4, del:9, rot:18 }].map((m, i) => (
          <div key={i} className="meteor" style={{
            top: m.top, left: m.left, width: m.w,
            transform: `rotate(${m.rot}deg)`,
            animation: `meteor ${m.dur}s linear ${m.del}s infinite`,
            '--rot': `${m.rot}deg`
          }} />
        ))}

        <div className="main-card">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div className="badge">✦ New Recruit ✦</div>
            <div className="app-title">Enlist Now</div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(148,163,184,0.5)', fontSize: '0.85rem', marginTop: 6, letterSpacing: '0.08em' }}>
              Create your profile
            </div>
          </div>

          <div className="divider" />

          {/* Form */}
          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="tag-label">Username</div>
                <input
                  className="todo-input"
                  type="text"
                  placeholder="Choose a username..."
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(""); }}
                  required
                />
              </div>

              <div>
                <div className="tag-label">Password</div>
                <input
                  className="todo-input"
                  type="password"
                  placeholder="Create a password..."
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  required
                />
                {/* Password strength indicator */}
                {password.length > 0 && (() => {
                  const strength = password.length < 6 ? 1 : password.length < 10 ? 2 : /[^a-zA-Z0-9]/.test(password) ? 4 : 3;
                  const colors = ['', '#ef4444', '#f97316', '#facc15', '#4ade80'];
                  const labels = ['', 'WEAK', 'FAIR', 'STRONG', 'MAXIMUM'];
                  return (
                    <div style={{ marginTop: 8 }}>
                      <div className="strength-bar-track">
                        <div className="strength-bar-fill" style={{ width: `${strength * 25}%`, background: colors[strength] }} />
                      </div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: colors[strength], marginTop: 4 }}>
                        STRENGTH: {labels[strength]}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div>
                <div className="tag-label">Confirm Password</div>
                <input
                  className="todo-input"
                  type="password"
                  placeholder="Repeat your password..."
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError(""); }}
                  required
                  style={{
                    borderColor: confirm.length > 0
                      ? confirm === password ? 'rgba(74,222,128,0.6)' : 'rgba(239,68,68,0.5)'
                      : undefined
                  }}
                />
              </div>

              {error && <div className="error-box" key={error}>⚠ {error}</div>}

              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 4 }}>
                {loading ? '◌ Registering...' : '⟶ Create Profile'}
              </button>
            </div>
          </form>

          <div className="divider" />

          <div className="link-text">
            Already have an account?{" "}
            <a href="/">Login here</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24, fontFamily: 'Orbitron, monospace', fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(74,222,128,0.18)' }}>
            ✦ SECURE CHANNEL ✦
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;