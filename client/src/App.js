import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App2.css";
import 'normalize.css';

import Home from "./components/Home";




import ExpenseTracker from "./components/ExpenseTracker";
import Login from "./components/Login";
import ResizeObserver from 'resize-observer-polyfill';
import Signup from "./components/Signup";
// Replace all instances of ResizeObserver with the polyfill
window.ResizeObserver = ResizeObserver;
 // import your new component

function App() {
  return (
    <Router>
      <div className="App1">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          
          <Route path="/login" element={<Login />} />
          <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
          
        </Routes>
        
      </div>
    </Router>
  );
}
// Global error handling for ResizeObserver
window.addEventListener('error', (event) => {
  if (/ResizeObserver loop limit exceeded/.test(event.message)) {
    event.stopImmediatePropagation();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (/ResizeObserver loop limit exceeded/.test(event.reason?.message)) {
    event.stopImmediatePropagation();
  }
});


export default App;