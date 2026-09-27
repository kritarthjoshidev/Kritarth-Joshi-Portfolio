import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:kritarthjoshi12@gmail.com" data-cursor="disable">
                kritarthjoshi12@gmail.com
              </a>
            </p>
            <h4>Location</h4>
            <p>
              Pune City, Maharashtra, India
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/kritarthjoshi"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://github.com/kritarthjoshidev"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaGithub /> GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/kritarth_joshi_73"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <FaInstagram /> Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Computer Engineering <br /> student <span>Kritarth Joshi</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
