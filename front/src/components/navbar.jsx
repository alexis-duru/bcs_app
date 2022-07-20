import React from 'react';
import { Link } from 'react-router-dom';
// import authAPI from "../services/authAPI";
// import { useState } from 'react';

const Navbar  = ({isAuthenticated}) => {

 
    return (  
        <div id="nav-container">
          <div className="bg"></div>
          <div className="button" tabIndex="0">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>  
          </div>
          <div id="nav-content" tabIndex="0">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="spots">All spots</Link></li>
              { isAuthenticated  && <li>
                <Link to="spots/create">Upload</Link>
              </li>}
              { isAuthenticated  && <li>
              <Link to="profile">Profile</Link>
              </li>}
              { isAuthenticated  && <li>
                <Link to='/profile/spots'>My spots</Link>
              </li>}
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/About">About</Link></li>
              
            </ul>
          </div>
        </div>
    );
}
 
export default Navbar ;