/*import React, { useState, useEffect } from "react";
import Logo from "../Assets/TrackMe.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import {Link} from 'react-router-dom';
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };
  const toggle =() =>{

  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      href: "/#home",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      href: "/#about",
    },
    {
      text: "Work",
      icon: <InfoIcon />,
      href: "#work",
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
      href: "#testimonial",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      href: "#contact",
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      href: "#expense-tracker",
    },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "visible" : ""}`}>
      <div className="nav-logo-container1">
        <img src={Logo} style={{ width: "125px", height: "35px" }} alt="" />
      </div>
      <div className="navbar-links-container1">
      <Link to="/home"> <a href="/home">Home</a></Link>
      <Link to="/work">  <a href="/ExpenseTracker">How it works</a></Link>
       <Link to="/ExpenseTracker"> <button className="primary-button1">Tracker</button></Link>
        {/*
        <a href="#testimonial">Testimonials</a>
        <a href="#contact">Contact</a>
        <a href="#expense-tracker">
          <BsCart2 className="navbar-cart-icon1" />
        </a>
        <button className="primary-button1">Bookings Now</button>
        *//*}
      </div>
      <div className="navbar-menu-container1">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
*/
import React, { useState, useEffect } from "react";
import Logo from "../Assets/TrackMe.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      href: "/#home",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      href: "/#about",
    },
    {
      text: "Work",
      icon: <InfoIcon />,
      href: "#work",
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
      href: "#testimonial",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      href: "#contact",
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      href: "#expense-tracker",
    },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "visible" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="nav-logo-container1" onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
        <img src={Logo} style={{ width: "125px", height: "35px" }} alt="Logo" />
      </div>
      <div className="navbar-links-container1">
        <Link to="/home">Home</Link>
        <Link to="/work">How it works</Link>
        <Link to="/ExpenseTracker">
          <button className="primary-button1">Tracker</button>
        </Link>
      </div>
      <div className="navbar-menu-container1">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
