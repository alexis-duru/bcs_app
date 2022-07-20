import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
import profil_image from '../../../assets/img/profil_image.png';
import { toast } from 'react-toastify';


const Profile  = (props) => {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    const findCurrentUser = () => {

        // Récupération de l'user en cours grâce à l'email unique
        const users =  usersAPI.findAllUsers()

        return users.then(users => {
            users.forEach(identity => {
                if(user.email === identity.email)  
                setCurrentUser(identity)
            })
        })
    }

    /* GESTION DE LA SUPPRESSION D'UN SPOT */

   

    useEffect( () => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        // console.log(decoded)
        setUser(decoded);
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        findCurrentUser();
        // eslint-disable-next-line
    }, [user])

    return (
        <>
        <div className='profilePage'>
            <div className="leftSideBar">

            </div>
            <div className="pageWrapper">
                    <div className="pageHeader">
                        <div className="pageWrapperHeader">
                            <Link to='/spots/create'>Share a spot with community</Link>
                        </div>
                        <div className="searchBar">
                           
                        </div>
                    </div>
                    <div className="pageWrapperContainer">
                        <div className="usersInfos">
                            <div className="profile_image">
                                <img src={profil_image} alt="avatar of the user" />
                                <button className="profile_upload">UPLOAD AVATAR</button>
                            </div>
                            <h2> Hello, {currentUser.email}</h2>
                            <h3>Email : {currentUser.email}</h3>
                            <h3>ID : {currentUser.id}</h3>
                            <div className="btnContainer">
                                <button 
                                    // onClick={() => handleDelete(user.id)} 
                                    className="deleteButton">Delete
                                </button> 
                                                                        
                                <Link to={''}>
                                    <button className="btn-green">UPDATE</button>
                                </Link>
                            </div>
                            <div className="container">
                                <div className="button-container">
                                    <span className="mask">YOUR SPOTS</span>
                                    <Link to='/profile/spots'>
                                    <button type="button" name="Hover">YOUR SPOTS</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pageBottomContainer">
                      
                    </div>
                </div>
          </div>
        </>
    )
}

export default Profile;