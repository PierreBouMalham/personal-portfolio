import React from "react";
import "./Projects.css";
import Icon1 from "../../images/Recipe.jpg";
import Icon2 from "../../images/chat.svg";
import Icon3 from "../../images/restaurant.jpg";
import Icon4 from "../../images/netflix.svg";
import { VscGithub } from "react-icons/vsc";

const Projects = () => {
  return (
    <div id="projectsId" className="projects">
      <h2>Check out some of my projects.</h2>

      <div className="projects__container">
        <div className="projects__card">
          <img src={Icon1} alt="illustration" />
          <h2>Recipe API:</h2>
          <p>
            Techs used: <br />
            Django, Django REST framework, Docker, Travis-CI, PostgreSQL.
          </p>
          <div className="projects__icons">
            <a
              href="https://github.com/PierreBouMalham/Recipe-API"
              target="_blank"
              rel="noreferrer"
            >
              <VscGithub className="projects__icon" />
            </a>
          </div>
        </div>

        <div className="projects__card">
          <img src={Icon2} alt="illustration" />
          <h2>Blog Clone:</h2>
          <p>
            Techs used: <br />
            HTML, CSS, JavaScript, Bootstrap, Python, Django{" "}
          </p>
          <div className="projects__icons">
            <a
              href="https://github.com/PierreBouMalham/Blog-Clone-Project"
              target="_blank"
              rel="noreferrer"
            >
              <VscGithub className="projects__icon" />
            </a>
          </div>
        </div>

        <div className="projects__card">
          <img src={Icon3} alt="illustration" />
          <h2>Virtual Restaurant:</h2>
          <p>
            Techs used:
            <br />
            Angular,NgRx, HTML, CSS, JavaScript, TypeScript,Google Firebase.
          </p>
          <div className="projects__icons">
            <a
              href="https://github.com/PierreBouMalham/Virtual-Restaurant"
              target="_blank"
              rel="noreferrer"
            >
              <VscGithub className="projects__icon" />
            </a>
          </div>
        </div>

        <div className="projects__card">
          <img src={Icon4} alt="illustration" />
          <h2>Social Media Clone:</h2>
          <p>
            Techs used: <br />
            HTML, CSS, JavaScript, Bootstrap, Python, Django{" "}
          </p>
          <div className="projects__icons">
            <a
              href="https://github.com/PierreBouMalham/Social-Clone"
              target="_blank"
              rel="noreferrer"
            >
              <VscGithub className="projects__icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
