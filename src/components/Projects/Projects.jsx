import { Fragment } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { caseStudies, sideProjects } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import "./Projects.css";

// How the system works, as a chain of steps. An ordered list so screen
// readers get the sequence; the arrows are decoration.
function Flow({ steps, title }) {
  return (
    <figure className="flow">
      <figcaption className="flow__caption">How it works</figcaption>
      <ol className="flow__steps" aria-label={`${title}: how it works`}>
        {steps.map((step, i) => (
          <Fragment key={step}>
            <li className={`flow__step ${i === steps.length - 1 ? "flow__step--end" : ""}`}>
              <span className="flow__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
            {i < steps.length - 1 && (
              <li className="flow__arrow" aria-hidden="true">
                <FiArrowDown />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}

function CaseStudy({ study }) {
  return (
    <motion.article
      className="case card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-labelledby={`case-${study.slug}`}
    >
      <div className="case__body">
        <p className="case__kicker">{study.kicker}</p>
        <h3 className="case__title" id={`case-${study.slug}`}>
          {study.title}
        </h3>

        <dl className="case__story">
          <div>
            <dt>The problem</dt>
            <dd>{study.problem}</dd>
          </div>
          <div>
            <dt>What I built</dt>
            <dd>{study.build}</dd>
          </div>
        </dl>

        <div className="case__tech">
          {study.tech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="case__side">
        <div className="case__result">
          <span className="case__result-label">Result</span>
          <span className="case__result-value gradient-text">{study.result.value}</span>
          <span className="case__result-text">{study.result.label}</span>
        </div>
        <Flow steps={study.flow} title={study.title} />
      </div>
    </motion.article>
  );
}

function SideProject({ project }) {
  return (
    <motion.article
      className={`side card ${project.url ? "side--linked" : ""}`}
      variants={fadeUp}
    >
      <h3 className="side__title">{project.title}</h3>
      <p className="side__description">{project.description}</p>
      <div className="side__footer">
        <div className="side__tech">
          {project.tech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            className="side__link"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            {project.urlLabel}
            <FiArrowUpRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            selected work
          </motion.p>
          <h2 className="section__title">
            <MaskLine>
              Things I&apos;ve <span className="gradient-text">built &amp; shipped.</span>
            </MaskLine>
          </h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            Three production systems, told as what was broken, what I built
            and what changed.
          </motion.p>
        </motion.div>

        <div className="projects__cases">
          {caseStudies.map((s) => (
            <CaseStudy study={s} key={s.slug} />
          ))}
        </div>

        <h3 className="projects__side-heading">Side projects</h3>
        <motion.div
          className="projects__side"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {sideProjects.map((p) => (
            <SideProject project={p} key={p.title} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
