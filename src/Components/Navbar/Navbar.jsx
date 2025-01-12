import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="logo" className="navbar__logo" />
      <img src={navProfile} alt="profile" className="navbar__profile" />
    </div>
  );
};

export default Navbar;
