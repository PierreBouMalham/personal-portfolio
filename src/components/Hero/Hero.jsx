import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import { EASE, fadeUp, stagger } from "../../motion.js";
import { profile, stats } from "../../data/content.js";
import profilePic from "../../assets/profile.jpg";
import "./Hero.css";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      3200
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="hero" id="top">
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
      <div className="hero__grid-overlay" aria-hidden="true" />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__badge" variants={fadeUp}>
            <span className="hero__badge-dot" />
            {profile.tagline} · {profile.location}
          </motion.p>

          <motion.h1 className="hero__title" variants={fadeUp}>
            Hi, I&apos;m{" "}
            <span className="gradient-text">Pierre Bou&#8209;Malham</span>
          </motion.h1>

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
            <a href="#projects" className="btn btn--primary">
              View my work <FiArrowDown aria-hidden="true" />
            </a>
            <a href={profile.cvUrl} download className="btn btn--ghost">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
          </motion.div>

          <motion.div className="hero__socials" variants={fadeUp}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FiMail />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__portrait-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
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
