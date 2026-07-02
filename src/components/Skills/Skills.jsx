import { motion } from "framer-motion";
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiIonic,
  SiSpringboot,
  SiLaravel,
  SiDotnet,
  SiDjango,
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiCplusplus,
  SiGithubactions,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandReactNative } from "react-icons/tb";
import { FiGitBranch, FiCode } from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { skillGroups } from "../../data/content.js";
import "./Skills.css";

const icons = {
  React: SiReact,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "React Native": TbBrandReactNative,
  Ionic: SiIonic,
  "Java Spring Boot": SiSpringboot,
  "PHP Laravel": SiLaravel,
  "ASP.NET Core": SiDotnet,
  Django: SiDjango,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Git: SiGit,
  "C++": SiCplusplus,
  "C#": TbBrandCSharp,
  "GitHub Actions": SiGithubactions,
  "CI/CD": FiGitBranch,
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            skills
          </motion.p>
          <motion.h2 className="section__title" variants={fadeUp}>
            A full-stack <span className="gradient-text">toolbox.</span>
          </motion.h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            Frameworks and tools I use daily to take products from idea to
            production.
          </motion.p>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {skillGroups.map((group) => (
            <motion.div className="skills__group card" key={group.label} variants={fadeUp}>
              <h3 className="skills__group-title">{group.label}</h3>
              <ul className="skills__list">
                {group.skills.map((skill) => {
                  const Icon = icons[skill] || FiCode;
                  return (
                    <li className="skills__item" key={skill}>
                      <Icon aria-hidden="true" />
                      <span>{skill}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
