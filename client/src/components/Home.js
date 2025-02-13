import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import BannerImage from "../Assets/home-banner-image.png";
import BannerImage from "../Assets/44.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

import Work from './Work';

import {Link} from "react-router-dom";
//import { Link } from "react-router-dom"; 
const Home = () => {
  return (
    <div className="home-container1">
      <Navbar />
      <div className="home-banner-container1">
        <div className="home-bannerImage-container1">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section1">
          <h1 className="primary-heading1">
            Welcome to <br></br>Trackme
          </h1>
          <p className="primary-text1">
            Prioritize and save your money for purpose.
          </p><br></br>
          <Link to="/ExpenseTracker">
          <button className="secondary-button1">
            Start Now <FiArrowRight />{" "}
          </button>
          </Link>
        </div>
        <div className="home-image-section1">
          <img src={BannerImage} alt="" />
        </div>
      </div>
     
     

    </div>
  );
};

export default Home;
/*
import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/rupee1.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import styles from "../App2.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <div className={styles.homeBannerContainer}>
        <div className={styles.homeBannerImageContainer}>
          <img src={BannerBackground} alt="" />
        </div>
        <div className={styles.homeTextSection}>
          <h1 className={styles.primaryHeading}>Welcome to Trackme</h1>
          <p className={styles.primaryText}>
            Prioritize and save your money for purpose.
          </p>
          <button className={styles.secondaryButton}>
            Start Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className={styles.homeImageSection}>
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
*/
/*
import React, { useState } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/44.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkModeStyles = {
    backgroundColor: "#121212",
    color: "#ffffff"
  };

  const lightModeStyles = {
    backgroundColor: "#ffffff",
    color: "#000000"
  };

  return (
    <div
      className="home-container1"
      style={isDarkMode ? darkModeStyles : lightModeStyles}
    >
      <Navbar />
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="home-banner-container1">
        <div className="home-bannerImage-container1">
          <img src={BannerBackground} alt="Banner Background" />
        </div>
        <div className="home-text-section1">
          <h1 className="primary-heading1">
            Welcome to <br /> Trackme
          </h1>
          <p className="primary-text1">
            Prioritize and save your money for purpose.
          </p>
          <br />
          <Link to="/ExpenseTracker">
            <button className="secondary-button1">
              Start Now <FiArrowRight />
            </button>
          </Link>
        </div>
        <div className="home-image-section1">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default Home;
*/
