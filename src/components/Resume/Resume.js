import React from "react";
import "./Resume.css";
import { FaDatabase } from "react-icons/fa";
import { GoStar } from "react-icons/go";
import { FiMonitor } from "react-icons/fi";

const Resume = () => {
  return (
    <div id="resumeId" className="resume">
      <div className="resume__option">
        <div className="resume__optionLeft">
          <h1 className="resume__title work">Work</h1>
        </div>
        <div className="resume__optionRight work">
          <div className="resume__info">
            <h1>Decentra Tech SAL (Beirut, Lebanon)</h1>
            <h4>Full Stack Developer (February 2023 - Present)</h4>
            <p>
              ● Enhanced the performance and security of a fleet management
              system which led to a new partnership with companies in Lebanon,
              UAE, Saudi Arabia and Africa.
            </p>
            <p>
              ● Developed 5 user-friendly and responsive modules from scratch
              writing high quality code in front-end using Angular framework and
              back-end using Java Spring Boot
            </p>
            <p>
              ● Implemented access rights and user permission features on 720
              buttons across all modules, securing the company's system
            </p>
            <p>
              ● Reconstructed 4 old modules with clear and concise
              documentation, to improve performance, maintainability and support
              future development efforts.
            </p>
            <p>
              ● Streamlined and unified codebase, resolving inconsistencies in
              naming conventions between frontend and backend. Which improved
              code clarity and enhanced project organization.
            </p>
            <div className="resume__info">
              <h1>CyberRATSS Ltd. (Swindon, United Kingdom)</h1>
              <h4>Full Stack Developer (May 2022 - February 2023)</h4>
              <p>
                ● Simplified the application completion process for the UK Human
                Resources form applications by developing a dynamic modular
                arrangement and visual mapping representation of information.
              </p>
              <p>
                ● Developed a modular form technology to standardize the
                Curriculum Vitae format, promoting data uniformity and
                eliminating bias in CV interpretation at scale.
              </p>
              <p>
                ● Developed high quality front-end and back-end code constantly
                for 5 different modules in the company server/portfolio.
              </p>
              <p>
                ● Built projects through a combination of Angular, HTML, SCSS,
                JavaScript/TypeScript for front-end, and Python, Django and
                PostgreSQL for backend, all are coordinated with Microsoft
                Azure.
              </p>
            </div>
            <div className="resume__info">
              <h1>Luxemburg-Slovenian Business Club (Ljubljana, Slovenia)</h1>
              <h4>Web Developer (May 2022 - February 2023)</h4>
              <p>
                ● Designed the test task required for a web developer intern
                position which covers company tech stack and contains 25
                specific questions.
              </p>
              <p>
                ● Mentored 3 Web Developer Interns in the period of 10 months.
              </p>
              <p>
                ● In Charge of onboarding the new web developer interns through
                regular coaching. Successfully onboarded 3 during 10 months.
              </p>
              <p>
                ● Conducted Technical Interviews for the selection of new web
                developer Interns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="resume__option">
        <div className="resume__optionLeft">
          <h1 className="resume__title education">Education</h1>
        </div>

        <div className="resume__optionRight education">
          <div className="resume__info">
            <h1>LU - Faculty of Engineer - Branch II</h1>
            <h4>Bachelor of Electronics and Communication Engineering</h4>
            <p>September 2019 - July 2022</p>
          </div>
        </div>
      </div>

      <div className="resume__option">
        <div className="resume__optionLeft">
          <h1 className="resume__title skills">Skills</h1>
        </div>

        <div className="resume__optionRight skills">
          <div className="resume__info">
            <div className="resume__wrapper">
              <div className="resume__infoSkills">
                <FiMonitor className="resume__icon" />
                <h1>Frontend</h1>
                <p>Angular</p>
                <p>ReactJS</p>
                <p>Vue.js</p>
                <p>JavaScript</p>
              </div>

              <div className="resume__infoSkills">
                <FaDatabase className="resume__icon" />
                <h1>Backend</h1>
                <p>Java</p>
                <p>Python</p>
                <p>NodeJS</p>
                <p>Django</p>
                <p>Laravel</p>
              </div>

              <div className="resume__infoSkills">
                <GoStar className="resume__icon" />
                <h1>Others</h1>
                <p>Azure</p>
                <p>DevOps</p>
                <p>GitHub</p>
                <p>Redux</p>
                <p>GraphQL</p>
                <p>.NET</p>
                <p>C++</p>
                <p>C#</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
