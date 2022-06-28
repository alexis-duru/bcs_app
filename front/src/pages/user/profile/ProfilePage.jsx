import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
// import authAPI from '../../../services/authAPI';

const Profile  = () => {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    // const [expJwt, setexpJwt] = useState([]);

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


    useEffect( () => {
        
        const decoded = jwtDecode(localStorage.getItem('token'));
        console.log(decoded)
        // const { email } = decoded.email;
        setUser(decoded);

        findCurrentUser();

        

        // console.log(response)
        // const expJwt = new Date(0);
        // expJwt.setUTCSeconds(decoded.exp);
        // setexpJwt();

        // eslint-disable-next-line
    }, []);

    // async function fetchUsers()  {
    //     const response = await findAllUsers();
    //     setUser(response)
    // }

    return (
        <>
        <div className='spotDetails'>
          <h1> User Details</h1>
          <h2>
            {currentUser.id}</h2>
            <h2>{currentUser.email}</h2>
          {/* <h3>{user.roles[1]}</h3> */}
          {/* <h4>ton token s'autodétruira dans : {expJwt}</h4> */}
              <Link to='/spots'>
                  All Spots
              </Link>
          </div>
        </>
    )
}

export default Profile;