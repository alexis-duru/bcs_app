import React from 'react';
import { Link } from 'react-router-dom';

const Navbar  = (props) => {

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
              <li><Link to="spots">Spots</Link></li>
              <li><Link to="spots/create">Upload spot</Link></li>
              <li>
              <Link to="profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
    );
}
 
export default Navbar ;