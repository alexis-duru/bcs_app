import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
// import profil_image from '../../../assets/img/profil_image.png';
import { toast } from 'react-toastify';
import avatarImage from "../../../assets/img/defaultAvatar.png";



const Profile  = (props) => {

    const navigate = useNavigate();
    
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

    // console.log(currentUser)

    const handleDelete = () => {
        const currentUser = jwtDecode(localStorage.getItem("token"));
        console.log(currentUser)
        try {
            // usersAPI.deleteUser()
            toast.success("Votre compte a bien été supprimé")
            // navigate("/login")
            console.log("proute")
        } catch (error) {
            console.log(error.response)
            toast.error("Votre compte 'n'a pas pu être supprimé")
        }
    }

    // const handleDelete = async (user) => {
    //     const deleteUser = currentUser;
    //     try {
    //         await usersAPI.deleteUser(deleteUser)
    //         // await usersAPI.deleteUser(user)
    //         // toast.success("User was successfully deleted")
    //         // console.log("User was successfully deleted")
    //         console.log("proute")
    //     // const deleteCurrentUser = user.id;
    //     } catch (error) {
    //         toast.error("Sorry, the user could not be deleted, please retry")
    //         console.log(error.response + " Sorry, the user could not be deleted");
    //     }
    // }


    /* GESTION DE LA SUPPRESSION D'UN SPOT */

    useEffect( () => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded);
        // console.log(decoded)
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
        <>
        <div className='profilePage'>
            <div className="leftSideBar">

            </div>
            <div className="pageWrapper">
                    <div className="pageHeader">
                        {/* <div className="pageWrapperHeader">
                            <Link to='/spots/create'>Share a spot with community</Link>
                        </div> */}
                        {/* <div className="searchBar">
                           
                        </div> */}
                    </div>
                    <div className="pageWrapperContainer">
                        <div className="usersInfos">
                            <div className="profile_image">
                                {currentUser.image ? <img src={`http://localhost:8000${currentUser.image.contentUrl}`} alt="profil_image" /> : <img src={avatarImage} alt="default avatar" /> }
                                <button className="profile_upload">UPLOAD AVATAR</button>
                            </div>
                            <h2> Hello, {currentUser.email}</h2>
                            <div className="btnContainer">
                                <button 
                                    onClick={() => handleDelete(user.id)} 
                                    className="deleteButton">Delete
                                </button> 
                                                                        
                                <Link to={''}>
                                    <button className="btn-green">UPDATE</button>
                                </Link>
                            </div>
                            <div className="container">
                                <div className="button-container">
                                    <span className="mask">MY SPOTS</span>
                                    <Link to='/profile/spots'>
                                    <button type="button" name="Hover">MY SPOTS</button>
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