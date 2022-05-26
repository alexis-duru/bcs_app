import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from '../services/authAPI';

const Header = ({isAuthenticated, onLogout}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        authAPI.logout();
        onLogout(false);
        navigate('/login', {replace: true});
    };
     
    return ( 
        <header>
            <div className="logo_header">
                <Link to="/">BORDEAUX CITY SKATEBOARD</Link>
            </div>
            <div className="container_connexion">
                {
                    (!isAuthenticated && (
                    <>
                        <Link to="/register">Inscription</Link>
                        <Link to="/login">Login</Link>
                    </>)) || (
                        <button onClick={handleLogout} className="logoutButton">Deconnexion</button>
                    )
                }
            </div>
        </header>
     );
}
 
export default Header;