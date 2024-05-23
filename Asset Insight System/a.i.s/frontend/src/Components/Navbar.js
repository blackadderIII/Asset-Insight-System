import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <div>
      <nav id="navbar">
        <div className="top-row">
            <a href="" id="toggleMenuBar">
                <i className="fas fa-bars"></i>
            </a>
            <a href="dashboard.html" className="active">
                <i className="fas fa-grid-2"></i>
                <h4>Dashboard</h4>
            </a>
            <a href="laptops.html">
                <i className="fal fa-laptop"></i>
                <h4>Laptop</h4>
            </a>
            <a href="./phones.html">
                <i className="fal fa-mobile-screen"></i>
                <h4>Phone</h4>
            </a>
            <a href="./monitors.html">
                <i className="fal fa-desktop"></i>
                <h4>Monitors</h4>
            </a>
            <a href="network.html">
                <i className="fal fa-router"></i>
                <h4>Routers</h4>
            </a>
            <a href="./printers.html">
                <i className="fal fa-print"></i>
                <h4>Printers</h4>
            </a>
            <a href="./miscellaneous.html">
                <i className="fal fa-stars"></i>
                <h4>Miscellaneous</h4>
            </a>
            <a href="./users.html">
                <i className="fal fa-users"></i>
                <h4>Users</h4>
            </a>
        </div>

        <div className="bottom-row">
            <a href="" id="theme">
                <i className="fal fa-moon"></i>
                <h4>Theme</h4>
            </a>
            <a href="./settings.html"><i className="fal fa-gear"></i>
                <h4>Settings</h4>
            </a>
            <div className="nav-profile">
                <img src="./profiles/profile.jpeg" id="profilePicture" alt='profile-picture'/>
                <h4 id="userName"></h4>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
