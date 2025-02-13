import React from "react";
import Logo from "../Assets/TrackMe.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper1">
      <div className="footer-section-one1">
        <div className="footer-logo-container1">
          <img src={Logo}  style = {{width : "175px",height  : "35px"}}alt="" />
        </div>
        <div className="footer-icons1" style = {{'display' : 'flex'}}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two1">
        <div className="footer-section-columns1">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns1">
          <span>244-5333-7783</span>
          <span>hello@food.com</span>
          <span>press@food.com</span>
          <span>contact@food.com</span>
        </div>
        <div className="footer-section-columns1">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
/*
import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import styles from "../App2.module.css";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerSectionOne}>
        <div className={styles.footerLogoContainer}>
          <img src={Logo} alt="Logo" />
        </div>
        <div className={styles.footerIcons}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className={styles.footerSectionTwo}>
        <div className={styles.footerSectionColumns}>
          <span>Quality</span>
          <span>Help</span>
          <span>Share</span>
          <span>Careers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className={styles.footerSectionColumns}>
          <span>244-5333-7783</span>
          <span>hello@food.com</span>
          <span>press@food.com</span>
          <span>contact@food.com</span>
        </div>
        <div className={styles.footerSectionColumns}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
*/