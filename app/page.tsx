import HeroVisual from "../components/HeroVisual";
import Header from "../components/Header";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: url(/images/Hero-bg.png) center/cover no-repeat;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* network dot grid overlay */
        .hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Hero body: two columns ── */
        .hero-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 0 60px 0 60px;
        }

        /* ── Left: text content ── */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 60px;
        }

        .hero-heading {
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          color: #ffffff;
          margin: 0;
          letter-spacing: -1px;
        }

        .hero-subtext {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          max-width: 480px;
          margin: 0;
        }

        .hero-cta {
          display: inline-block;
          width: fit-content;
          background: rgba(255,255,255,0.95);
          color: #0a1560;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .hero-cta:hover {
          background: #fff;
          transform: translateY(-2px);
        }

      {/* ── Responsive ── */}
        @media (max-width: 900px) {
          .hero-nav-links { display: none; }
          .hero-body {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }
          .hero-visual-col {
            min-height: 380px;
          }
        }
      `}</style>

      <Header />

      {/* Hero body */}
      <div className="hero-body">
        {/* Left column */}
        <div className="hero-text">
          <h1 className="hero-heading">
            Engineer Operational<br />Excellence
          </h1>
          <p className="hero-subtext">
            Databliz transforms complex business processes into high-performing
            operational systems through process intelligence, intelligent
            automation, and simulation-driven optimisation.
          </p>
          <button className="hero-cta">Book Free Consultation</button>
        </div>

        {/* Right column — the animated component */}
        <div className="hero-visual-col">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}