import React, { useState } from "react";
import "../css/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [toggleNav, setToggleNav] = useState([null, "active"]);

  const handleToggle = (nav) => {
    setToggleNav(nav === toggleNav ? null : nav);
  };

  return (
    <div>
      <nav id="navbar" className={`${toggleNav === 'active'? "active" : ""}`} onClick={()=> handleToggle("active")}>
        <div className="top-row">
          <a href="#" id="toggleMenuBar">
            <i className="fas fa-bars"></i>
          </a>
          <NavLink to={""}>
            <i className="fas fa-grid-2"></i>
            <h4>Dashboard</h4>
          </NavLink>
          <NavLink to={"/Asset1"}>
            <i className="fal fa-laptop"></i>
            <h4>Laptop</h4>
          </NavLink>
          <NavLink to={"/Asset2"}>
            <i className="fal fa-mobile-screen"></i>
            <h4>Phone</h4>
          </NavLink>
          <NavLink to={"/Asset3"}>
            <i className="fal fa-desktop"></i>
            <h4>Monitors</h4>
          </NavLink>
          <NavLink to={"/Asset4"}>
            <i className="fal fa-router"></i>
            <h4>Routers</h4>
          </NavLink>
          <NavLink to={"/Asset5"}>
            <i className="fal fa-print"></i>
            <h4>Printers</h4>
          </NavLink>
          <NavLink to={"/Asset6"}>
            <i className="fal fa-stars"></i>
            <h4>Miscellaneous</h4>
          </NavLink>
          <NavLink to={"/Users"}>
            <i className="fal fa-users"></i>
            <h4>Users</h4>
          </NavLink>
        </div>

        <div className="bottom-row">
          <a href="" id="theme">
            <i className="fal fa-moon"></i>
            <h4>Theme</h4>
          </a>
          <NavLink to="/settings">
            <i className="fal fa-gear"></i>
            <h4>Settings</h4>
          </NavLink>
          <div className="nav-profile">
            <img
              src="./profiles/profile.jpeg"
              id="profilePicture"
              alt="profile-picture"
            />
            <h4 id="userName"></h4>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
