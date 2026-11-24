import { FiMail, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../../data/content.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <a href="#top" className="footer__logo" aria-label="Pierre Bou-Malham, back to top">
            PB<span>.</span>
          </a>
          <p className="footer__copy">
            © {new Date().getFullYear()} Pierre Bou-Malham. Designed &amp; built
            with React and Framer Motion.
          </p>
        </div>

        <div className="footer__right">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)">
            <FaGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)">
            <FaLinkedin />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail />
          </a>
          <a href="#top" aria-label="Back to top" className="footer__top">
            <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
