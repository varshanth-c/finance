import React, { useState, useEffect } from "react";
import Logo from "../Assets/TrackMe.png";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { clearCredentials } from '../store/authSlice';
import { clearTransactions } from '../store/transactionSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const currentUser = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    try {
      dispatch(clearTransactions());
      dispatch(clearCredentials());
      navigate("/home");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 500);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <nav className={`navbar ${showNavbar ? "visible" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="nav-logo-container1">
        <img src={Logo} style={{ width: "125px", height: "35px" }} alt="Logo" />
      </div>
      <div className="navbar-links-container1">
        {isAuthenticated ? (
          <>
            <Link to="/ExpenseTracker">
              <button className="primary-button1">Tracker</button>
            </Link>
            {currentUser && <span className="text-gray-600 mr-4">{currentUser.email || currentUser.name}</span>}
            <button className="primary-button1" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="primary-button1" onClick={handleLogin}>Login</button>
            </Link>
            <Link to="/signup">
              <button className="primary-button1">Sign Up</button>
            </Link>
          </>
        )}
      </div>
      <div className="navbar-menu-container1">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
          <Divider />
          <div className="drawer-links">
            {isAuthenticated ? (
              <>
                <Link to="/ExpenseTracker">Tracker</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button onClick={handleLogin}>Login</button>
                </Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
