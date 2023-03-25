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
            <h4>FrontEnd Developer (February 2023 - Present)</h4>
            <p>
              ● Worked on mapping technologies and live tracking systems using
              Leaflet library.
            </p>
            <p>
              ● Optimized code in 6 different components, resulting in a
              reduction of a 984-line HTML file to only 25 lines.
            </p>
            <p>
              ● Implemented access rights and user permission security features
              on 720 buttons across all modules, improving overall system
              security and usability.
            </p>
            <p>
              ● Successfully completed over 30 Angular tasks, delivering
              high-quality results on time.
            </p>
            <p>
              ● Produced clear and concise documentation for 20+ HTML and
              TypeScript files to improve maintainability and support future
              development efforts.
            </p>
            <div className="resume__info">
              <h1>CyberRATSS Ltd. (Swindon, United Kingdom)</h1>
              <h4>Full Stack Developer (May 2022 – February 2023)</h4>
              <p>
                ● Worked in a team of diverse multicultural software programmers
                in an agile environment to enable inputs and ideas from all
                aspects of creative thinking towards an all-inclusive
                environment.
              </p>
              <p>
                ● Engineered the Curriculum Vitae into a modular form technology
                to generate a uniformity and non-bias way of seeing CV data on
                mass.
              </p>
              <p>
                ● Simplified the application completion process for the UK Human
                Resources form applications by developing a dynamic modular
                arrangement and visual mapping representation of information.
              </p>
              <p>
                ● Developed front-end and back-end code constantly for the past
                10 months for 5 different modules in the company
                server/portfolio.
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
              <h4>Web Developer (May 2022 – February 2023)</h4>
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
              <div className="resume__info">
                <h1>BMB Electrics (Beirut, Lebanon)</h1>
                <h4>
                  Electronics and Communication Engineer (January 2019 – May
                  2022)
                </h4>
                <p>
                  ● Led a team of 5 at BMB Electrics, accelerating the delivery
                  time by 15%.
                </p>
                <p>
                  ● Built strong relationships with clients, securing
                  maintenance contracts with more than 20 companies.
                </p>
                <p>
                  ● Liaised with big suppliers, reducing monthly costs by 2000$.
                </p>
                <p>
                  ● Identified the potential within the territory and determined
                  new opportunities for growth.
                </p>
                <p>
                  ● Engaged in business development to significantly increase
                  revenue by 30% within assigned territory.
                </p>
              </div>
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
                <p>HTML5</p>
                <p>CSS3</p>
                <p>SCSS</p>
                <p>JavaScript</p>
                <p>TypeScript</p>
                <p>Bootstrap</p>
              </div>

              <div className="resume__infoSkills">
                <FaDatabase className="resume__icon" />
                <h1>Backend</h1>
                <p>Python</p>
                <p>NodeJS</p>
                <p>NPM</p>
                <p>PostgreSQL</p>
                <p>MongoDB</p>
                <p>Firebase</p>
                <p>Django</p>
                <p>Rest API</p>
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
