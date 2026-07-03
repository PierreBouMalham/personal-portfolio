import { useEffect, useState } from "react";
import { profile } from "../../data/content.js";
import "./Navbar.css";

/* ============================================================
   Cortex-style nav: 2×2 logo mark + name on the left with the
   primary links, secondary links + "Get in touch" on the right.
   Collapses to a hamburger + glass panel below 1024px.
   Items enter from above once the preloader lifts (body.is-play).
   ============================================================ */

const PRIMARY = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const SECONDARY = [
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <a href="#top" className="cnav__logo" aria-label="Back to top">
      <span className="cnav__mark" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="cnav__name">Pierre</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`cnav ${scrolled ? "cnav--scrolled" : ""}`}>
      {/* ---- desktop (≥1024px) ---- */}
      <div className="cnav__desktop">
        <div className="cnav__left">
          <span className="a a-nav" style={{ "--dur": "700ms", "--d": "100ms" }}>
            <Logo />
          </span>
          <nav aria-label="Primary" className="cnav__links">
            {PRIMARY.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="cnav__link a a-nav"
                style={{ "--dur": "700ms", "--d": `${180 + i * 80}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <nav aria-label="Secondary" className="cnav__right">
          {SECONDARY.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="cnav__link a a-nav"
              style={{ "--dur": "700ms", "--d": `${180 + i * 60}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="cnav__touch a a-nav"
            style={{ "--dur": "700ms", "--d": "360ms" }}
          >
            Get in touch
          </a>
        </nav>
      </div>

      {/* ---- mobile / tablet (<1024px) ---- */}
      <div className="cnav__mobile">
        <span className="a a-nav" style={{ "--dur": "700ms", "--d": "100ms" }}>
          <Logo />
        </span>
        <button
          className="cnav__burger a a-nav"
          style={{ "--dur": "700ms", "--d": "180ms" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="cnav-menu"
          onClick={() => setOpen(!open)}
        >
          <i /><i /><i />
        </button>
      </div>

      <nav
        id="cnav-menu"
        className={`cnav__menu ${open ? "cnav__menu--open" : ""}`}
        aria-label="Menu"
      >
        {[...PRIMARY, ...SECONDARY].map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="cnav__link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href={profile.cvUrl} download className="cnav__link" onClick={() => setOpen(false)}>
          Download CV
        </a>
        <a href="#contact" className="cnav__touch" onClick={() => setOpen(false)}>
          Get in touch
        </a>
      </nav>
    </header>
  );
}
