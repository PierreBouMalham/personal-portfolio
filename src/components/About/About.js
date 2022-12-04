import React from "react";
import "./About.css";
import ProfilePic from "../../images/ProfilePic.jpg";
import { FaDownload } from "react-icons/fa";

const About = () => {
  return (
    <div id="aboutId" className="about">
      <div className="about__left">
        <img className="about__image" src={ProfilePic} alt="profile" />
      </div>

      <div className="about__content">
        <div className="about__paragraph">
          <h1>About Me</h1>
          <p>
            Hi There ! I am a Meta Certified Front-End Developer. I've got 3
            years experience working as a Electronics and Communication
            Engineer, and 1 year working remotely with a UK based company as a
            Full-Stack Developer. I am a passionate about coding and full stack
            development. Certified and experienced Angular, React.js, Python and
            Django Developer. Curious lifelong learner that loves the work and
            has an appetite for challenging problems.
          </p>
        </div>

        <div className="about__lower">
          <div className="about__details">
            <h1>Contact Details</h1>
            <p>Pierre Bou-Malham</p>
            <p>Chiah, Beirut</p>
            <p>+961 71 637 891</p>
            <p>pierreboumalham3@gmail.com</p>
          </div>

          <div className="about__resume">
            <a
              href="https://drive.google.com/file/d/10eRpfYNAq3drwT5O-zVvQhbPBSjyB3pe/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <button className="about__button">
                <FaDownload /> Download Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
