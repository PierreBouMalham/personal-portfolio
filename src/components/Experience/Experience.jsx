import { useId, useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiChevronDown } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { experience, contractWork } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import RichText from "../shared/RichText.jsx";
import "./Experience.css";

const VISIBLE_BULLETS = 2;

function Job({ job }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hidden = job.highlights.length - VISIBLE_BULLETS;
  const shown = expanded ? job.highlights : job.highlights.slice(0, VISIBLE_BULLETS);

  return (
    <motion.article
      className="timeline__item"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="timeline__marker" aria-hidden="true">
        <span className="timeline__dot" />
      </div>

      <div className="timeline__card card">
        <div className="timeline__head">
          <div>
            <h3 className="timeline__role">{job.role}</h3>
            <p className="timeline__company">{job.company}</p>
          </div>
          <span className="timeline__type">{job.type}</span>
        </div>

        <div className="timeline__meta">
          <span>
            <FiCalendar aria-hidden="true" /> {job.period}
          </span>
          <span>
            <FiMapPin aria-hidden="true" /> {job.location}
          </span>
        </div>

        <ul className="timeline__highlights" id={listId}>
          {shown.map((h) => (
            <li key={h}>
              <RichText text={h} />
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            type="button"
            className="timeline__more"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
            <FiChevronDown
              aria-hidden="true"
              className={expanded ? "timeline__chevron--up" : ""}
            />
          </button>
        )}

        <div className="timeline__tech">
          {job.tech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            experience
          </motion.p>
          <h2 className="section__title">
            <MaskLine>Four years, five countries,</MaskLine>
            <MaskLine delay={0.12}>
              <span className="gradient-text">production systems that ship.</span>
            </MaskLine>
          </h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            From hotel guest messaging and telecom-scale visualization to AI
            publishing and real-time fleet platforms: owning features end to
            end, from the database to the pixel.
          </motion.p>
        </motion.div>

        <h3 className="timeline__group" id="employment">Employment</h3>
        <div className="timeline">
          {experience.map((job) => (
            <Job job={job} key={job.company + job.period} />
          ))}
        </div>

        {contractWork.length > 0 && (
          <>
            <h3 className="timeline__group">Freelance &amp; contract</h3>
            <p className="timeline__group-note">
              Client engagements I took on alongside full-time roles.
            </p>
            <div className="timeline timeline--contract">
              {contractWork.map((job) => (
                <Job job={job} key={job.company + job.period} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
