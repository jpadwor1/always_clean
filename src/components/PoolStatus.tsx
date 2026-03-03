'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const PoolStatusPage = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const poolData = [{
    name: "RECREATIONAL POOL",
    location: "Recreational Pool",
    temp: "82.4",
    status: "OPTIMAL",
    lastCleaned: "2/19/2026 04:00 AM",
    phLevel: "7.4",
    chlorine: "2.5ppm"
  },
  {
    name: "RECREATIONAL SPA",
    location: "Recreational Spa",
    temp: "78.9",
    status: "OPTIMAL",
    lastCleaned: "2/18/2026 08:00 PM",
    phLevel: "7.3",
    chlorine: "2.8ppm"
  },
  {
    name: "LAP POOL",
    location: "Lap Pool",
    temp: "92.1",
    status: "OPTIMAL",
    lastCleaned: "2/18/2026 10:00 PM",
    phLevel: "7.2",
    chlorine: "3.0ppm"
  },
  {
    name: "LAP SPA",
    location: "Lap Spa",
    temp: "92.1",
    status: "OPTIMAL",
    lastCleaned: "2/18/2026 10:00 PM",
    phLevel: "7.2",
    chlorine: "3.0ppm"
  },];

  return (
    <div className="">
      <Head>
        <title>Status | Florence Gardens</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;800&family=JetBrains+Mono:wght@300;500&display=swap" rel="stylesheet" />
      </Head>

      {/* SVG CAUSTIC FILTER DEFINITION */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="submerged-caustic">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2">
            <animate attributeName="baseFrequency" dur="30s" values="0.015;0.025;0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>

      <style jsx global>{`
        :root {
          --deep-void: #000814;
          --water-dark: #001d3d;
          --water-mid: #003566;
          --electric-cyan: #00f5ff;
          --caustic-glow: rgba(0, 245, 255, 0.15);
        }


        .pool-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px;
          box-sizing: border-box;
          background: radial-gradient(circle at 50% -20%, var(--water-mid) 0%, var(--deep-void) 80%);
        }

        /* CAUSTIC BACKGROUND LAYER */
        .caustic-layer {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2070');
          background-size: cover;
          opacity: 0.12;
          filter: url(#submerged-caustic);
          pointer-events: none;
          z-index: 1;
        }

        .content-overlay {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* TYPOGRAPHY */
        .mono {
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          animation: fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .date-time {
          text-align: right;
        }

        .date-time h2 {
          font-size: 1.5rem;
          margin: 5px 0 0 0;
          font-weight: 300;
        }

        .hero-section {
          margin-top: -5vh;
        }

        .pool-title {
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 800;
          line-height: 0.9;
          margin: 0;
          letter-spacing: -0.04em;
          background: linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px var(--caustic-glow));
          animation: float 8s ease-in-out infinite;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          align-items: flex-end;
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .status-card {
          border-left: 1px solid rgba(255,255,255,0.1);
          padding-left: 20px;
          transition: all 0.4s ease;
        }

        .status-card:hover {
          border-left: 1px solid var(--electric-cyan);
          transform: translateX(10px);
        }

        .temp-display {
          font-size: 4rem;
          font-weight: 300;
          margin: 10px 0;
          display: flex;
          align-items: flex-start;
        }

        .temp-unit {
          font-size: 1.2rem;
          margin-top: 10px;
          margin-left: 5px;
        }

        .status-pill {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid var(--electric-cyan);
          color: var(--electric-cyan);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          margin-top: 15px;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .status-pill::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: sweep 3s infinite;
        }

        /* ANIMATIONS */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-0.5deg); }
        }

        @keyframes sweep {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .status-grid { grid-template-columns: 1fr 1fr; }
          .pool-container { padding: 30px; }
        }

        @media (max-width: 640px) {
          .status-grid { grid-template-columns: 1fr; }
          .pool-title { font-size: 4rem; }
        }
      `}</style>
      {
        poolData.map((poolData, index) => (
          <div className='pool-container' key={index}>
            <div className="caustic-layer" />

            <div className="content-overlay">
              <header>
                <div className="location">
                  <div className="mono">System Active</div>
                  <div style={{ fontSize: '1.2rem', marginTop: '8px', color: 'white' }}>{poolData.location}</div>
                </div>
                <div className="date-time">
                  <div className="mono">Current Environment</div>
                  <h2 className='text-white'>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</h2>
                  <div className="mono" style={{ fontSize: '0.6rem', color: 'white' }}>{time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </header>


              <div className="hero-section">
                <div className="mono" style={{ color: 'var(--electric-cyan)' }}>Aquatic Asset</div>
                <h1 className="pool-title">{poolData.name}</h1>
              </div>

              <div className="status-grid">
                <div className="status-card">
                  <div className="mono">Thermal Metrics</div>
                  <div className="temp-display text-white">
                    {poolData.temp}<span className="temp-unit text-white">°F</span>
                  </div>
                  <div className="mono" style={{ fontSize: '0.6rem', color: 'white' }}>Surface Stability: 99.4%</div>
                </div>

                <div className="status-card">
                  <div className="mono">Core Status</div>
                  <div className="status-pill">{poolData.status}</div>
                  <div className="mono" style={{ fontSize: '0.6rem', marginTop: '20px' }}>Filtration: Active</div>
                </div>

                <div className="status-card">
                  <div className="mono">Chemical Balance</div>
                  <div style={{ fontSize: '1.8rem', margin: '15px 0', fontWeight: '300', color: 'white' }}>{poolData.phLevel} <span className="mono" style={{ fontSize: '0.8rem', color: 'white' }}>pH</span></div>
                  <div className="mono" style={{ fontSize: '0.6rem' }}>Chlorine: {poolData.chlorine}</div>
                </div>

                <div className="status-card">
                  <div className="mono">Maintenance Log</div>
                  <div style={{ fontSize: '1rem', margin: '15px 0', fontWeight: '300', color: 'white' }}>Last Full Cleaning</div>
                  <div className="mono">{poolData.lastCleaned}</div>
                </div>
              </div>
            </div>
          </div>
        ))}


    </div>
  );
};

export default PoolStatusPage;