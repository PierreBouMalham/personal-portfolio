import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { fadeUp, stagger, viewportOnce } from "../../motion.js";
import { profile } from "../../data/content.js";
import { MaskLine } from "../shared/Reveal.jsx";
import "./Contact.css";

const EMAILJS_SERVICE = "service_4q31ace";
const EMAILJS_TEMPLATE = "template_5gfar7y";
const EMAILJS_PUBLIC_KEY = "HWewsxYcGqVvTqdZ8";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="glow contact__glow" />
      <div className="container">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="section__eyebrow" variants={fadeUp}>
            contact
          </motion.p>
          <h2 className="section__title">
            <MaskLine>
              Let&apos;s build something{" "}
              <span className="gradient-text">together.</span>
            </MaskLine>
          </h2>
          <motion.p className="section__subtitle" variants={fadeUp}>
            Open to full-time roles, contract work and interesting projects.
            Drop a message — I usually reply within a day.
          </motion.p>
        </motion.div>

        <div className="contact__layout">
          <motion.form
            ref={formRef}
            className="contact__form card"
            onSubmit={sendEmail}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="contact-name">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Tell me about your project…"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary contact__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span className="contact__spinner" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message <FiSend aria-hidden="true" />
                </>
              )}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="contact__feedback contact__feedback--success">
                  <FiCheckCircle aria-hidden="true" /> Message sent — thank you!
                  I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="contact__feedback contact__feedback--error">
                  <FiAlertCircle aria-hidden="true" /> Something went wrong.
                  Please retry or email me directly at {profile.email}.
                </p>
              )}
            </div>
          </motion.form>

          <motion.aside
            className="contact__info"
            variants={stagger(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.a
              className="contact__info-item card"
              href={`mailto:${profile.email}`}
              variants={fadeUp}
            >
              <FiMail aria-hidden="true" />
              <div>
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">{profile.email}</span>
              </div>
            </motion.a>
            <motion.a
              className="contact__info-item card"
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              variants={fadeUp}
            >
              <FiPhone aria-hidden="true" />
              <div>
                <span className="contact__info-label">Phone</span>
                <span className="contact__info-value">{profile.phone}</span>
              </div>
            </motion.a>
            <motion.div className="contact__info-item card" variants={fadeUp}>
              <FiMapPin aria-hidden="true" />
              <div>
                <span className="contact__info-label">Location</span>
                <span className="contact__info-value">{profile.location}</span>
              </div>
            </motion.div>
            <motion.div className="contact__info-socials" variants={fadeUp}>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin /> LinkedIn
              </a>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
