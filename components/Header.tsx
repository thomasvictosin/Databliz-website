export default function Header() {
  return (
    <>
      <style>{`
        /* ── Navbar ── */
        .hero-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 60px;
        }

        .hero-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-decoration: none;
        }

        .hero-logo-img {
          height: 32px;
          width: auto;
        }

        .hero-nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .hero-nav-links a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s;
        }
        .hero-nav-links a:hover { color: #fff; }

        .hero-nav-cta {
          background: #fff;
          color: #0a1560;
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .hero-nav-cta:hover {
          background: #e8f4ff;
          transform: translateY(-1px);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-nav { padding: 20px 24px; }
          .hero-nav-links { display: none; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="hero-nav">
        <a href="/" className="hero-logo">
          <img src="/images/Databliz-logo.png" alt="Databliz Logo" className="hero-logo-img" />
        </a>

        <ul className="hero-nav-links">
          {["Home","About","Services","Solutions","Contact Us"].map((item) => (
            <li key={item}><a href="#">{item}</a></li>
          ))}
        </ul>

        <button className="hero-nav-cta">Book Free Consultation</button>
      </nav>
    </>
  );
}
