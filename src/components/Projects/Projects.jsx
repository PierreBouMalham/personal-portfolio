import { useCallback } from "react";
import { motion } from "framer-motion";
import { FiFolder, FiStar } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { projects } from "../../data/content.js";
import "./Projects.css";

function ProjectCard({ project }) {
  // Cursor spotlight: track pointer position as CSS vars on the card
  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.article
      className={`project card ${project.featured ? "project--featured" : ""}`}
      style={{ "--project-accent": project.accent }}
      variants={fadeUp}
      onMouseMove={onMouseMove}
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
          <motion.h2 className="section__title" variants={fadeUp}>
            Things I&apos;ve <span className="gradient-text">built &amp; shipped.</span>
          </motion.h2>
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
