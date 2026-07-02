import { motion } from "framer-motion";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { experience } from "../../data/content.js";
import "./Experience.css";

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
          <motion.h2 className="section__title" variants={fadeUp}>
            Four years, four countries,
            <br />
            <span className="gradient-text">production systems that ship.</span>
          </motion.h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            From telecom-scale visualization in Paris to real-time fleet
            platforms in Beirut — a track record of owning features end to end.
          </motion.p>
        </motion.div>

        <div className="timeline">
          {experience.map((job) => (
            <motion.article
              className="timeline__item"
              key={job.company + job.period}
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div className="timeline__marker" variants={fadeUp} aria-hidden="true">
                <span className="timeline__dot" />
              </motion.div>

              <motion.div className="timeline__card card" variants={fadeUp}>
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

                <ul className="timeline__highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="timeline__tech">
                  {job.tech.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
