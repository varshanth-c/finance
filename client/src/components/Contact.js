import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper1">
      <h1 className="primary-heading1">Have Question In Mind?</h1>
      <h1 className="primary-heading1">Let Us Help You</h1>
      <div className="contact-form-container1">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button1">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
/*
import React from "react";
import styles from "../App2.module.css";

const Contact = () => {
  return (
    <div className={styles.contactPageWrapper}>
      <h1 className={styles.primaryHeading}>Have a Question in Mind?</h1>
      <h1 className={styles.primaryHeading}>Let Us Help You</h1>
      <div className={styles.contactFormContainer}>
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className={styles.secondaryButton}>Submit</button>
      </div>
    </div>
  );
};

export default Contact;
*/