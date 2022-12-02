import React from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { HiMail } from "react-icons/hi";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4q31ace",
        "template_5gfar7y",
        e.target,
        "HWewsxYcGqVvTqdZ8"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="contact" id="contactId">
      <div className="contact__header">
        <div className="contact__icon">
          <HiMail />
        </div>
        <div className="contact__title">
          <h1>Get in touch with me.</h1>
        </div>
      </div>
      <div className="contact__container">
        <div className="contact__form">
          <form onSubmit={sendEmail}>
            <div className="contact__input">
              <p>
                Name <span className="contact__required">*</span>
              </p>
              <input type="text" placeholder="Name" name="name" required />
            </div>
            <div className="contact__input">
              <p>
                Email <span className="contact__required">*</span>
              </p>
              <input type="email" placeholder="Email" name="name" required />
            </div>
            <div className="contact__input">
              <p>Subject</p>
              <input type="text" placeholder="Subject" name="subject" />
            </div>
            <div className="contact__input">
              <p>
                Message <span className="contact__required">*</span>
              </p>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <input type="submit" value="SUBMIT" className="contact__button" />
          </form>
        </div>
        <div className="contact__address">
          <h2>Address On Phone</h2>
          <p>Pierre Bou-Malham</p>
          <p>pierreboumalham3@gmail.com</p>
          <p>Chiah, Beirut</p>
          <p>Mount Lebanon, Lebanon</p>
          <p>+961 71 637 891</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
