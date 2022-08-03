import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authAPI from '../services/authAPI';
import image from "../assets/img/logo-header.png";
import avatarImage from "../assets/img/default_avatar.png";
import { toast } from 'react-toastify';
import userAPI from '../services/usersAPI';

const Header = ({isAuthenticated, onLogout}) => {


    const navigate = useNavigate();

    const handleLogout = () => {
        authAPI.logout();
        onLogout(false);
        toast.success("You have been successfully disconnected")
        navigate('/login', {replace: true});
    };
    
    return ( 
        <header>
            <div className="logo_header">
                <Link to="/">
                    <img src={image} alt="logo" />
                    <p>SPOTED</p>
                </Link>
            </div>
            <div className="container_connexion">
                {
                    (!isAuthenticated && (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>)) || (
                        <>
                        <div id="default_avatar">
                            {/* { user.image ? <img src={`http://localhost:8000${user.image.contentUrl}`} alt="avatar from user profil" /> : <img src={avatarImage} alt="default avatar" /> } */}
                            <img src={avatarImage} alt="default avatar" /> 
                        </div>
                        <button onClick={handleLogout} className="logoutButton">Logout</button>
                        </>
                    )
                }
            </div>
        </header>
     );
}
 
export default Header;