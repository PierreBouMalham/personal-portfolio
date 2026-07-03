import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { FiFolder, FiStar } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce, cardReveal } from "../../motion.js";
import { projects } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import "./Projects.css";

function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 18 });

  // Cursor spotlight + 3D tilt: track pointer position over the card
  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      if (!reduceMotion) {
        rotateX.set(-py * 7);
        rotateY.set(px * 7);
      }
    },
    [reduceMotion, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.article
      className={`project card ${project.featured ? "project--featured" : ""}`}
      style={{
        "--project-accent": project.accent,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
      variants={cardReveal}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project__spotlight" aria-hidden="true" />
      <div className="project__top">
        <span className="project__icon" aria-hidden="true">
          <FiFolder />
        </span>
        {project.featured && (
          <span className="project__badge">
            <FiStar aria-hidden="true" /> Featured
          </span>
        )}
      </div>
      <h3 className="project__title">{project.title}</h3>
      <p className="project__description">{project.description}</p>
      <div className="project__tech">
        {project.tech.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section className="section projects" id="projects">
      <div className="glow projects__glow" />
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            projects
          </motion.p>
          <h2 className="section__title">
            <MaskLine>
              Things I&apos;ve <span className="gradient-text">built &amp; shipped.</span>
            </MaskLine>
          </h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            Production systems serving real users — from an AI publishing
            platform generating revenue to nationwide telecom tooling.
          </motion.p>
        </motion.div>

        <motion.div
          className="projects__grid projects__grid--featured"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {featured.map((p) => (
            <ProjectCard project={p} key={p.title} />
          ))}
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {others.map((p) => (
            <ProjectCard project={p} key={p.title} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
