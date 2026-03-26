import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function TodoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&family=Rajdhani:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Rajdhani', sans-serif;
          background: #000;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes meteor {
          0% { transform: translateX(-200px) translateY(-80px) rotate(var(--rot)); opacity: 0; }
          5% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(110vw) translateY(60vh) rotate(var(--rot)); opacity: 0; }
        }

        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.05); }
        }

        @keyframes floatUp {
          0% { transform: translateY(24px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,179,237,0.3), 0 0 40px rgba(159,122,234,0.15), inset 0 0 20px rgba(99,179,237,0.05); }
          50% { box-shadow: 0 0 35px rgba(99,179,237,0.5), 0 0 60px rgba(159,122,234,0.3), inset 0 0 30px rgba(99,179,237,0.1); }
        }

        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(99,179,237,0.8), 0 0 40px rgba(159,122,234,0.5); }
          50% { text-shadow: 0 0 30px rgba(99,179,237,1), 0 0 60px rgba(159,122,234,0.8), 0 0 80px rgba(99,179,237,0.4); }
        }

        @keyframes slideInCard {
          0% { transform: translateX(-20px) scale(0.97); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }

        @keyframes spaceshipFly {
          0%   { transform: translateX(-160px) translateY(0px) rotate(-10deg); opacity: 0; }
          5%   { opacity: 1; }
          40%  { transform: translateX(40vw) translateY(-60px) rotate(-8deg); opacity: 1; }
          60%  { transform: translateX(65vw) translateY(30px) rotate(-12deg); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(110vw) translateY(-20px) rotate(-10deg); opacity: 0; }
        }

        @keyframes spaceshipFly2 {
          0%   { transform: translateX(-160px) translateY(0px) rotate(-6deg); opacity: 0; }
          5%   { opacity: 1; }
          50%  { transform: translateX(50vw) translateY(40px) rotate(-10deg); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(110vw) translateY(-30px) rotate(-6deg); opacity: 0; }
        }

        @keyframes exhaustFlicker {
          0%, 100% { opacity: 0.9; transform: scaleX(1); }
          50%       { opacity: 0.5; transform: scaleX(0.7); }
        }

        .space-bg {
          width: 100%;
          min-height: 100vh;
          background: radial-gradient(ellipse at 20% 30%, #0d0a2e 0%, #000010 40%, #000005 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nebula-1 {
          position: fixed;
          width: 600px; height: 400px;
          top: -100px; left: -150px;
          background: radial-gradient(ellipse, rgba(88,28,135,0.5) 0%, rgba(59,7,100,0.3) 40%, transparent 70%);
          animation: nebulaPulse 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .nebula-2 {
          position: fixed;
          width: 500px; height: 500px;
          bottom: -100px; right: -100px;
          background: radial-gradient(ellipse, rgba(12,74,110,0.5) 0%, rgba(7,45,100,0.3) 40%, transparent 70%);
          animation: nebulaPulse 10s ease-in-out 3s infinite;
          pointer-events: none;
          z-index: 0;
        }

        .nebula-3 {
          position: fixed;
          width: 350px; height: 350px;
          top: 40%; left: 50%;
          background: radial-gradient(ellipse, rgba(30,58,138,0.25) 0%, transparent 70%);
          animation: nebulaPulse 12s ease-in-out 1.5s infinite;
          pointer-events: none;
          z-index: 0;
        }

        .spaceship {
          position: fixed;
          pointer-events: none;
          z-index: 2;
        }

        .main-card {
          animation: glowPulse 4s ease-in-out infinite;
          border: 1px solid rgba(99,179,237,0.25);
          background: rgba(5, 8, 30, 0.75);
          backdrop-filter: blur(20px);
          border-radius: 20px;
        }

        .app-title {
          font-family: 'Orbitron', monospace;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: 0.12em;
          color: #e2e8f0;
          animation: titleGlow 3s ease-in-out infinite;
          text-transform: uppercase;
        }

        .todo-input {
          background: rgba(15, 23, 60, 0.7);
          border: 1px solid rgba(99,179,237,0.3);
          border-radius: 10px;
          color: #e2e8f0;
          padding: 12px 16px;
          width: 100%;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          transition: all 0.3s;
          outline: none;
        }

        .todo-input:focus {
          border-color: rgba(99,179,237,0.8);
          box-shadow: 0 0 15px rgba(99,179,237,0.25);
          background: rgba(20, 30, 80, 0.8);
        }

        .todo-input::placeholder {
          color: rgba(148,163,184,0.5);
        }

        .btn-primary {
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          padding: 12px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          color: white;
          transition: all 0.3s;
          text-transform: uppercase;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #2563eb, #8b5cf6);
          box-shadow: 0 0 20px rgba(99,179,237,0.4), 0 0 40px rgba(139,92,246,0.2);
          transform: translateY(-1px);
        }

        .btn-edit {
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid rgba(99,179,237,0.4);
          cursor: pointer;
          background: rgba(30,58,138,0.4);
          color: #93c5fd;
          transition: all 0.25s;
          text-transform: uppercase;
        }

        .btn-edit:hover {
          background: rgba(30,58,138,0.8);
          box-shadow: 0 0 12px rgba(99,179,237,0.3);
          color: #bfdbfe;
        }

        .btn-delete {
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid rgba(239,68,68,0.35);
          cursor: pointer;
          background: rgba(127,29,29,0.3);
          color: #fca5a5;
          transition: all 0.25s;
          text-transform: uppercase;
        }

        .btn-delete:hover {
          background: rgba(127,29,29,0.6);
          box-shadow: 0 0 12px rgba(239,68,68,0.3);
        }

        .btn-save {
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid rgba(52,211,153,0.4);
          cursor: pointer;
          background: rgba(6,78,59,0.4);
          color: #6ee7b7;
          transition: all 0.25s;
          text-transform: uppercase;
        }

        .btn-save:hover {
          background: rgba(6,78,59,0.7);
          box-shadow: 0 0 12px rgba(52,211,153,0.3);
        }

        .btn-cancel {
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid rgba(148,163,184,0.3);
          cursor: pointer;
          background: rgba(30,41,59,0.4);
          color: #94a3b8;
          transition: all 0.25s;
          text-transform: uppercase;
        }

        .todo-card {
          background: rgba(10, 15, 50, 0.6);
          border: 1px solid rgba(99,179,237,0.18);
          border-radius: 14px;
          padding: 18px 20px;
          transition: all 0.3s;
          animation: slideInCard 0.4s ease-out both;
        }

        .todo-card:hover {
          border-color: rgba(99,179,237,0.4);
          background: rgba(15, 22, 65, 0.8);
          box-shadow: 0 4px 24px rgba(99,179,237,0.12);
          transform: translateX(3px);
        }

        .todo-number {
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          color: rgba(99,179,237,0.5);
          letter-spacing: 0.1em;
        }

        .todo-title-text {
          font-family: 'Orbitron', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          color: #e2e8f0;
          letter-spacing: 0.05em;
        }

        .todo-desc-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          color: rgba(148,163,184,0.8);
          font-weight: 300;
          margin-top: 4px;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.3), transparent);
          margin: 20px 0;
        }

        .form-section {
          animation: floatUp 0.6s ease-out both;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: rgba(148,163,184,0.4);
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
        }

        .tag-label {
          font-family: 'Orbitron', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: rgba(99,179,237,0.6);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .star {
          position: fixed;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          z-index: 0;
        }

        .meteor {
          position: fixed;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(200,220,255,1) 100%);
          box-shadow: 0 0 6px 1px rgba(180,210,255,0.6);
          height: 1.5px;
        }
      `}</style>

      <div className="space-bg">
        <div className="nebula-1" />
        <div className="nebula-2" />
        <div className="nebula-3" />

        {/* Spaceship 1 — blue, slow, top lane */}
        <div className="spaceship" style={{ top: '15%', animation: 'spaceshipFly 18s linear 2s infinite' }}>
          <svg width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g style={{ animation: 'exhaustFlicker 0.15s ease-in-out infinite' }}>
              <ellipse cx="6" cy="22" rx="10" ry="4" fill="rgba(255,140,0,0.9)" />
              <ellipse cx="3" cy="22" rx="6" ry="2.5" fill="rgba(255,220,80,1)" />
              <ellipse cx="1" cy="22" rx="3" ry="1.5" fill="white" />
            </g>
            <ellipse cx="52" cy="22" rx="34" ry="10" fill="url(#shipBody1)" />
            <ellipse cx="72" cy="19" rx="12" ry="7" fill="url(#cockpit1)" />
            <ellipse cx="74" cy="18" rx="7" ry="4" fill="rgba(120,200,255,0.5)" />
            <path d="M45 12 L58 8 L62 14 Z" fill="#1e40af" />
            <path d="M45 32 L58 36 L62 28 Z" fill="#1e40af" />
            <path d="M30 22 L50 14 L55 22 L50 30 Z" fill="url(#wing1)" />
            <circle cx="60" cy="19" r="3" fill="rgba(180,230,255,0.8)" />
            <circle cx="61" cy="18" r="1.2" fill="white" />
            <ellipse cx="20" cy="22" rx="5" ry="8" fill="none" stroke="rgba(99,179,237,0.7)" strokeWidth="1.5" />
            <ellipse cx="20" cy="22" rx="3" ry="5" fill="rgba(30,60,120,0.8)" />
            <defs>
              <linearGradient id="shipBody1" x1="18" y1="12" x2="86" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e3a6e" />
                <stop offset="50%" stopColor="#2d5aa0" />
                <stop offset="100%" stopColor="#1a2f5a" />
              </linearGradient>
              <linearGradient id="cockpit1" x1="60" y1="12" x2="84" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="wing1" x1="30" y1="14" x2="55" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a6e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Spaceship 2 — purple, faster, bottom lane */}
        <div className="spaceship" style={{ top: '75%', animation: 'spaceshipFly2 12s linear 8s infinite' }}>
          <svg width="58" height="26" viewBox="0 0 58 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g style={{ animation: 'exhaustFlicker 0.12s ease-in-out infinite' }}>
              <ellipse cx="4" cy="14" rx="7" ry="3" fill="rgba(180,80,255,0.9)" />
              <ellipse cx="2" cy="14" rx="4" ry="1.8" fill="rgba(220,150,255,1)" />
              <ellipse cx="0.5" cy="14" rx="2" ry="1" fill="white" />
            </g>
            <ellipse cx="34" cy="14" rx="22" ry="7" fill="url(#shipBody2)" />
            <ellipse cx="46" cy="12" rx="9" ry="5" fill="url(#cockpit2)" />
            <ellipse cx="47" cy="11" rx="5" ry="3" fill="rgba(200,150,255,0.5)" />
            <path d="M28 8 L37 5 L40 9 Z" fill="#4c1d95" />
            <path d="M28 20 L37 23 L40 19 Z" fill="#4c1d95" />
            <path d="M18 14 L30 9 L34 14 L30 19 Z" fill="url(#wing2)" />
            <circle cx="39" cy="12" r="2.2" fill="rgba(220,180,255,0.9)" />
            <circle cx="40" cy="11" r="0.9" fill="white" />
            <defs>
              <linearGradient id="shipBody2" x1="12" y1="7" x2="56" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="50%" stopColor="#5b21b6" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="cockpit2" x1="37" y1="7" x2="55" y2="17" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="wing2" x1="18" y1="9" x2="34" y2="19" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <TodoList />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos"    element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;