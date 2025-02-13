import React, { useState } from "react";
import a from "../Assets/55.png";
import z from "../Assets/55.png"; // Static version of PickMeals image
import b from "../Assets/big-data.gif";
import y from "../Assets/database.png"; // Static version of ChooseMeals image
import c from "../Assets/document.gif";
import x from "../Assets/document.png"; // Static version of DeliveryMeals image
import ExpenseTracker from "./ExpenseTracker";
import d from "../Assets/pie-chart2.png";
import v from "../Assets/pie-chart1.gif"; 
import e from "../Assets/bin-file.gif";
import u from "../Assets/bin-file.png"; 
import Navbar from "./Navbar";

const Work = () => {
  const workInfoData = [
    {
      staticImage: z,
      gifImage: a,
      title: 'Form',
      text: "Fill the form of input like Transaction Title,Mode,Amount",
       // Route to navigate
    },
    {
      staticImage: y,
      gifImage: b,
      title: "Database update",
      text: "The information provided by the user is updated in database  and shown in history section with time",
       // Route to navigate
    },
    {
      staticImage: x,
      gifImage: c,
      title: "Labels",
      text: "The Total Transaction is Updated in the from of Investment,Expense,Savings  and is displayed in labels with percentage",
   // Route to navigate
    },
    {
      staticImage: v,
      gifImage: d,
      title: "Chart",
      text: "In the Doughnut chart the ratio is measured and displayed",
     // Route to navigate
    },
    {
      staticImage: u,
      gifImage: e,
      title: "Deletion",
      text: "History can be deleted in history section if wanted",
       // Route to navigate
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (component) => {
    window.location.href = component;
  };

  return (
   
    <div className="work-section-wrapper1">
      <div className="work-section-top1">
      < Navbar/>
        <h1 className="primary-subheading1"></h1>
        <h4 className="primary-heading1">How It Works</h4>
        <p className="primary-text1">
          Here are the following steps how our tracker help you to track your expense.
        </p>
      </div>
      <div className="work-section-bottom1">
        {workInfoData.map((data, index) => (
          <div 
            className="work-section-info1" 
            key={data.title} 
            onClick={() => handleClick(data.component)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="info-boxes-img-container1">
              <img 
                src={hoveredIndex === index ? data.gifImage : data.staticImage} 
                alt={data.title} 
              />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

/*import React, { useState } from "react";
import PickMeals from "../Assets/pie-chart1.gif";
import PickMealsStatic from "../Assets/pie-chart2.png"; 
import ChooseMeals from "../Assets/statistics.gif";
import ChooseMealsStatic from "../Assets/statistics2.png"; 
import DeliveryMeals from "../Assets/goals.gif";
import DeliveryMealsStatic from "../Assets/goals2.png"; 
import styles from "../App2.module.css";
import { ExpenseTracker } from ',';
import { ExpenseTracker } from ',';

const Work = () => {
  const workInfoData = [
    {
      staticImage: PickMealsStatic,
      gifImage: PickMeals,
      title: 'ExpenseTracker',
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
      component: '/ExpenseTracker',
    },
    {
      staticImage: ChooseMealsStatic,
      gifImage: ChooseMeals,
      title: "Budget Calculator",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
      component: '/budgetcalculator',
    },
    {
      staticImage: DeliveryMealsStatic,
      gifImage: DeliveryMeals,
      title: "Goals",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      component: '/goals',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (component) => {
    window.location.href = component;
  };

  return (
    <div className={styles.workSectionWrapper}>
      <div className={styles.workSectionTop}>
        <p className={styles.primarySubheading}>Work</p>
        <h1 className={styles.primaryHeading}>How It Works</h1>
        <p className={styles.primaryText}>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className={styles.workSectionBottom}>
        {workInfoData.map((data, index) => (
          <div 
            className={styles.workSectionInfo} 
            key={data.title} 
            onClick={() => handleClick(data.component)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.infoBoxesImgContainer}>
              <img 
                src={hoveredIndex === index ? data.gifImage : data.staticImage} 
                alt={data.title} 
              />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
*/