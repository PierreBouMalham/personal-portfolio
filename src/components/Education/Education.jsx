import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiGlobe } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { education, certifications, languages } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import "./Education.css";

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            education &amp; certifications
          </motion.p>
          <h2 className="section__title">
            <MaskLine>
              Always <span className="gradient-text">learning.</span>
            </MaskLine>
          </h2>
        </motion.div>

        <motion.div
          className="education__grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="education__card card" variants={fadeUp}>
            <span className="education__icon" aria-hidden="true">
              <FiBookOpen />
            </span>
            <h3 className="education__card-title">Education</h3>
            <p className="education__degree">{education.degree}</p>
            <p className="education__school">{education.school}</p>
            <span className="education__period">{education.period}</span>
          </motion.div>

          <motion.div className="education__card card" variants={fadeUp}>
            <span className="education__icon" aria-hidden="true">
              <FiAward />
            </span>
            <h3 className="education__card-title">Certifications</h3>
            <ul className="education__certs">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <span className="education__cert-year">{c.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="education__card card" variants={fadeUp}>
            <span className="education__icon" aria-hidden="true">
              <FiGlobe />
            </span>
            <h3 className="education__card-title">Languages</h3>
            <ul className="education__langs">
              {languages.map((l) => (
                <li className="chip" key={l}>
                  {l}
                </li>
              ))}
            </ul>
            <p className="education__langs-note">
              Working fluently across French, English and Arabic-speaking
              teams and clients.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
