import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from '../services/authAPI';
import logo from "../assets/img/logo-header.png";
import avatarImage from "../assets/img/defaultAvatar.png";
import { toast } from 'react-toastify';
import usersAPI from '../services/usersAPI';
import jwtDecode from 'jwt-decode';

const Header = ({isAuthenticated, onLogout}) => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const [currentUser, setCurrentUser] = useState([]);

    const findCurrentUser = () => {
        if(isAuthenticated) {
            const users =  usersAPI.findAllUsers()
            return users.then(users => {
                users.forEach(identity => {
                    if(user.email === identity.email)  
                    setCurrentUser(identity)
                })
            })
        }
    }

    const handleLogout = () => {
        authAPI.logout();
        onLogout(false);
        toast.success("You have been successfully disconnected")
        navigate('/login', {replace: true});
    };

    useEffect( () => {
        if(isAuthenticated) {
        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(currentUser) {
            findCurrentUser();
            // console.log(currentUser)
        }
        // eslint-disable-next-line
    }, [user])


    
    return ( 
        <header>
            <div className="logo_header">
                <Link to="/">
                    <img src={logo} alt="logo" />
                    <p>SPOTED</p>
                </Link>
            </div>
            <div className="container_connexion">
                {
                    (!isAuthenticated && (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>)) || (isAuthenticated && (
                        <>
                        <div id="default_avatar">
                            {currentUser.image ? <Link id="profile" to="profile"><img key={Date.now()} src={`http://localhost:8000${currentUser.image.contentUrl}`} alt="profil_image" /> </Link> : <Link to="profile"><img src={avatarImage} alt="default avatar" /> </Link> }
                        </div>
                        <button onClick={handleLogout} className="logoutButton">Logout</button>
                        </>
                    ))
                }
            </div>
        </header>
     );
}
 
export default Header;