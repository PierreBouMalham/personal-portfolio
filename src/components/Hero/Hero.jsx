import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { fadeUp, stagger } from "../../motion.js";
import { profile, stats } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import profilePic from "../../assets/profile.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__badge" variants={fadeUp}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {profile.availability}
          </motion.p>

          <h1 className="hero__title">
            <MaskLine delay={0.2}>
              <span className="gradient-text">Pierre Bou&#8209;Malham</span>
            </MaskLine>
            <span className="hero__role">
              <MaskLine delay={0.32}>{profile.title}</MaskLine>
            </span>
          </h1>

          <motion.p className="hero__headline" variants={fadeUp}>
            {profile.headline}
          </motion.p>

          <motion.p className="hero__summary" variants={fadeUp}>
            {profile.summary}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <a href="#projects" className="btn btn--primary">
              See what I&apos;ve built <FiArrowDown aria-hidden="true" />
            </a>
            <div className="hero__socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)">
                <FaGithub aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <FaLinkedin aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__portrait-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__portrait-ring" aria-hidden="true" />
          <img
            src={profilePic}
            alt="Portrait of Pierre Bou-Malham"
            className="hero__portrait"
            width="340"
            height="340"
            fetchpriority="high"
          />
        </motion.div>
      </div>

      <motion.dl
        className="container hero__stats"
        variants={stagger(0.08, 0.7)}
        initial="hidden"
        animate="visible"
      >
        {stats.map((s) => (
          <motion.div className="hero__stat" key={s.label} variants={fadeUp}>
            <dt className="hero__stat-label">{s.label}</dt>
            <dd className="hero__stat-value">{s.value}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
