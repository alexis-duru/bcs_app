import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import usersAPI from '../../../services/usersAPI';

const Profile  = (props) => {

    const [user, setUser] = useState([]);

    const { id } = useParams();

    useEffect( () => {
        fetchUser(id);
        // eslint-disable-next-line
    }, []);


    const fetchUser = async (user) => {
        try {
            const user = await usersAPI.findOneUser(id)
            setUser(user)
            console.log(user)

        } catch (error) {
            console.log(error + "failed")
        }
    }

    return (
        <>
        <div className='spotDetails'>
          <h1> User Details</h1>
          <h2>{user.email}</h2>
              {/* <p>{user.email}</p> */}
              <Link to='/'>
                  All Spots
              </Link>
          </div>
        </>
    )
}

export default Profile;