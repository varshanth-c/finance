// import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
// import Navbar from "./Navbar";
// import { FiArrowRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="home-container">
//       <Navbar />
      
//       <div className="home-banner">
//         <div className="home-content">
//           <div className="heading-container">
//             <h1 className="heading">
//               Welcome to <span className="brand-name">Trackme</span>
//             </h1>
//             <p className="subtext">Prioritize and save your money for purpose.</p>
//           </div>
          
//           <Link to="/ExpenseTracker" className="start-button">
//             Start Now <FiArrowRight className="arrow-icon" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BannerBackground from "../Assets/home-banner-background.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import BannerImage from "../Assets/home-banner-image.png";
import BannerImage from "../Assets/44.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
//import { Link } from "react-router-dom"; 
const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="home-container1">
      <Navbar />
      <div className="home-banner-container1">
        <div className="home-bannerImage-container1">
          <img src={BannerBackground} alt="" loading="lazy" />
        </div>
        <div className="home-text-section1">
          <h1 className="primary-heading1">
            Welcome to <br></br>Trackme
          </h1>
          <p className="primary-text1">
            Prioritize and save your money for purpose.
          </p><br></br>
          <Link to="/ExpenseTracker">
          <button 
        className="secondary-button1"
        onClick={() => navigate(isAuthenticated ? '/ExpenseTracker' : '/login')}
      >
        Start Now
      </button>
          </Link>
        </div>
        <div className="home-image-section1">
          <img src={BannerImage} alt="" loading="lazy"/>
        </div>
      </div>
     
      

    </div>
  );
};

export default Home;