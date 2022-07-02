import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';

const Profile  = (props) => {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    const findCurrentUser = () => {

        console.log('bfjhds')

        // Récupération de l'user en cours grâce à l'email unique
        const users =  usersAPI.findAllUsers()

        return users.then(users => {
            users.forEach(identity => {
                if(user.email === identity.email)  
                setCurrentUser(identity)
            })
        })
    }

    useEffect( () => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        console.log(decoded)
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
            {/* <div className="profilePageWrapper">
                <div className="profilePageTop">
                    <p>SETTINGS</p>
                </div>
                <div className="profilePageMiddle">
                    <h1> Hello, {currentUser.email}</h1>
                    <h2>Your id : {currentUser.id}</h2>
                        <h2>Email : {currentUser.email}</h2>
                        <Link to='/profile/spots'>
                            <p>My Spots</p>
                        </Link>
                </div>
                <div className="profilePageBottom">
                    <p>BOTTOM</p>
                </div>
            </div> */}
            <div className="pageWrapper">
                    <div className="pageHeader">
                        <div className="pageWrapperHeader">
                            <Link to='/spots/create'>Share a spot with community</Link>
                        </div>
                        <div className="searchBar">
                           
                        </div>
                    </div>
                    <div className="pageWrapperContainer">
                    <h1> Hello, {currentUser.email}</h1>
                    <h2>Your id : {currentUser.id}</h2>
                        <h2>Email : {currentUser.email}</h2>
                        <Link to='/profile/spots'>
                            <p>My Spots</p>
                        </Link>
                       
                    </div>
                    <div className="pageBottomContainer">
                      
                    </div>
                </div>
          </div>
        </>
    )
}

export default Profile;