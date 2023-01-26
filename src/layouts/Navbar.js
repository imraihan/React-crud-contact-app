import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="">
    <div className="container"><br></br>
      <div className="nav_content" >
        <div className="item"><Link to="/" className="nav-link">Home</Link></div>
        <p>|</p>
        <div className="item"><Link to="/add" className="nav-link">Add Contact</Link></div>
      </div>
    </div>
    </nav>
   );
};

export default Navbar;
