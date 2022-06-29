import React from 'react';
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
import spotsAPI from '../../../services/spotsAPI';
import { Link } from 'react-router-dom';

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

    // findCurrentUser();

    const fetchSpots = async () => {
        try {
            const data = await usersAPI.findSpotOfUser(currentUser.id);
            setSpots(data)
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }

    // fetchSpots();

    useEffect( () => {

        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded);   
        console.log(decoded) 
        
            // eslint-disable-next-line
    }, []); 

    useEffect(() => { 
        findCurrentUser();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => { 
        fetchSpots();
        // eslint-disable-next-line
    }, [currentUser]);

    const handleDelete = async id =>  {
        const originalSpots = [...spots];

        setSpots(spots.filter(spot => spot.id !== id));
        

        try {
            await spotsAPI.delete(id)
            console.log("The spot was successfully deleted")
        } catch (error) {
            setSpots(originalSpots);
            console.log(error.response + "Sorry, the spot could not be deleted");
        }
    };

    return (  
        <>
            <h1>
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
                SPOT OF THE USER
            </h1>
           

            {spots.map(spot => 
                            <div key={spot.id} className="spotsPageCards">
                                <div className='spotsPageCardsInfos'>
                                    <p className="spotNumber">{spot.id}</p>
                                    {/* <p className="spotType">{spot.type.name}</p> */}
                                    <div className="overlay">
                                        <h2>{spot.name}</h2>
                                        <p>{spot.address}</p>
                                        <p>{spot.city}</p>
                                        <p>{spot.postalCode}</p>
                                        <p>{spot.details}</p>
                                        <p>{spot.user.email}</p>
                                        <p>{spot.type.name}</p>
                                        <p>{spot.category.name}</p>
                                        <p>{spot.flat.name}</p>

                                        {/* { spot.user.email === "administrateur@test.com" ? */}
                                        {/* {isAuthenticated === spot.user.id ? */}
                                        {/* { spot.user.email === spot.id} */}
                                        
                                        <button 
                                            onClick={() => handleDelete(spot.id)} 
                                            className="deleteButton">Delete
                                        </button> 
                                                                                
                                        <Link to={'/spots/update/' + spot.id}>
                                            <button className="btn-green">UPDATE</button>
                                        </Link>

                                        <Link to={`/spots/${spot.id}`}>
                                                More informations
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
        </>

    );
}
 
export default UserSpots;