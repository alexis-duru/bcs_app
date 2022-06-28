import React from 'react';
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';

const UserSpots  = () => {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
     // eslint-disable-next-line
    const [spots, setSpots] = useState([]);

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

    findCurrentUser();

    const fetchSpots = async () => {
        try {
            const data = await usersAPI.findSpotOfUser(currentUser.id);
            setSpots(data)
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect( () => {
            const decoded = jwtDecode(localStorage.getItem('token'));
            setUser(decoded);    

            fetchSpots();
        
            // eslint-disable-next-line
    }, []); 




    return (  
        <>
            <h1>
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
            </h1>
            <p></p>
                {/* {spots.map(currentUser.spot => (
                    <div key={currentUser.spot.id}>
                        <h2>{spot.title}</h2>
                        <p>{spot.description}</p>
                    </div>
                ))}
                         */}

        </>

    );
}
 
export default UserSpots;