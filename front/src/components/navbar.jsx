import React from 'react';
import { Link } from 'react-router-dom';

const Navbar  = (props) => {
    return (  
        <div id="nav-container">
          <div className="bg"></div>
          <div className="button" tabindex="0">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>  
          </div>
          <div id="nav-content" tabindex="0">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="spot">Spot</Link></li>
              <li><Link to="profil">Profil</Link></li>
            </ul>
          </div>
        </div>
    );
}
 
export default Navbar ;