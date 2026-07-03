import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import { EASE, fadeUp, stagger } from "../../motion.js";
import { profile, stats } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import Magnetic from "../shared/Magnetic.jsx";
import profilePic from "../../assets/profile.jpg";
import "./Hero.css";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  // Parallax: layers drift apart as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 55]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      3200
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Ambient light */}
      <motion.div
        className="glow hero__glow--blue"
        animate={reduceMotion ? {} : { x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow hero__glow--violet"
        animate={reduceMotion ? {} : { x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero__grid-overlay"
        aria-hidden="true"
        style={{ opacity: gridOpacity }}
      />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="visible"
          style={{ y: contentY }}
        >
          <motion.p className="hero__badge" variants={fadeUp}>
            <span className="hero__badge-dot" />
            {profile.tagline} · {profile.location}
          </motion.p>

          <h1 className="hero__title">
            <MaskLine delay={0.25}>Hi, I&apos;m</MaskLine>
            <MaskLine delay={0.38}>
              <span className="gradient-text">Pierre Bou&#8209;Malham</span>
            </MaskLine>
          </h1>

          <motion.div className="hero__role" variants={fadeUp} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.roles[roleIndex]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p className="hero__summary" variants={fadeUp}>
            {profile.summary}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <Magnetic>
              <a href="#projects" className="btn btn--primary">
                View my work <FiArrowDown aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.cvUrl} download className="btn btn--ghost">
                <FiDownload aria-hidden="true" /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero__socials" variants={fadeUp}>
            <Magnetic strength={0.45}>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
            </Magnetic>
            <Magnetic strength={0.45}>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </Magnetic>
            <Magnetic strength={0.45}>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FiMail />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__portrait-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{ y: portraitY }}
        >
          <div className="hero__portrait-ring" aria-hidden="true" />
          <img
            src={profilePic}
            alt="Portrait of Pierre Bou-Malham"
            className="hero__portrait"
            width="380"
            height="380"
          />
        </motion.div>
      </div>

      <motion.div
        className="container hero__stats"
        variants={stagger(0.1, 0.9)}
        initial="hidden"
        animate="visible"
      >
        {stats.map((s) => (
          <motion.div className="hero__stat card" key={s.label} variants={fadeUp}>
            <span className="hero__stat-value gradient-text">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
