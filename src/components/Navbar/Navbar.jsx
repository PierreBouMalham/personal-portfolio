import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { EASE } from "../../motion.js";
import { profile } from "../../data/content.js";
import "./Navbar.css";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the upper-middle of the viewport
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    // Above the first section (hero) nothing is active
    const onScroll = () => {
      if (sections[0] && window.scrollY < sections[0].offsetTop - window.innerHeight * 0.4) {
        setActive("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mobile menu: Escape and outside taps close it; page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <motion.header
      ref={headerRef}
      className={`nav ${scrolled || open ? "nav--scrolled" : ""}`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <nav className="nav__inner container" aria-label="Primary">
        <a href="#top" className="nav__logo" aria-label="Pierre Bou-Malham, back to top">
          PB<span className="nav__logo-dot">.</span>
        </a>

        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav__link ${active === l.href ? "nav__link--active" : ""}`}
                aria-current={active === l.href ? "location" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={profile.cvUrl} download className="btn btn--ghost nav__cv">
          <FiDownload aria-hidden="true" /> CV
        </a>

        <button
          ref={burgerRef}
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={active === l.href ? "nav__link--active" : ""}
                    aria-current={active === l.href ? "location" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cvUrl} download onClick={() => setOpen(false)}>
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
