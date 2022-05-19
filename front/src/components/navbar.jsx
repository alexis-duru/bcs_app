import React from 'react';

const Navbar  = (props) => {
    return (  
        // <header tabindex="0">BORDEAUX CITY SKATEBOARD
        // <div tabindex="0">Bordeaux City Skateboard</div>
        <div id="nav-container">
          <div className="bg"></div>
          <div className="button" tabindex="0">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>  
          </div>
          <div id="nav-content" tabindex="0">
            <ul>
              <li><a href="/">Homepage</a></li>
              <li><a href="/">Spots</a></li>
              <li><a href="/">Profil</a></li>
            </ul>
          </div>
        </div>
    );
}
 
export default Navbar ;