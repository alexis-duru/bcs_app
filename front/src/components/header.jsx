import React from 'react';
import { Link } from 'react-router-dom';
import authAPI from '../services/authAPI';

const Header = () => {

    const handleLogout = () => {
        authAPI.logout();
    }
    return ( 
        <header>
            <div className="logo_header">
                <Link to="/">BORDEAUX CITY SKATEBOARD</Link>
            </div>
            <div className="container_connexion">
                <Link to="/">Inscription</Link>
                <Link to="login">Login</Link>
                <button onClick={handleLogout} className="logoutButton">Deconnexion</button>
            </div>
        </header>
     );
}
 
export default Header;