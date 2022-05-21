import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <header>
            <div className="logo_header">
                <Link to="/">BORDEAUX CITY SKATEBOARD</Link>
            </div>
            <div className="container_connexion">
                <Link to="/">Inscription</Link>
                <Link to="/">Connexion</Link>
                <Link to="/">Deconnexion</Link>
            </div>
        </header>
     );
}
 
export default Header;