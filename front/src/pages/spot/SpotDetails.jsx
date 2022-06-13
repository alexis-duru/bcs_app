import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';

const SpotDetails  = (props) => {

    const [spot, setSpot] = useState([]);

    const { id } = useParams();

    useEffect( () => {
        fetchSpot(id);
        // eslint-disable-next-line
    }, []);


    const fetchSpot = async (spot) => {
        try {
            const spot = await spotsAPI.findOne(id)
            setSpot(spot)
            console.log(spot)

        } catch (error) {
            console.log(error + "failed")
        }
    }



    return (
        <>
        <div className='spotDetails'>
            <h1> Spot Details</h1>
            <h2>{spot.name}</h2>
                <p>{spot.address}</p>
                <div><p>{spot.city}</p><p>{spot.postalCode}</p></div>
                <p>{spot.details}</p>
                <p>{spot.category && spot.category.name}</p>
                <p>{spot.type && spot.type.name}</p>
                <p>{spot.flat && spot.flat.name}</p>
                <img src={spot.media} alt="" />
                <div className="moreInfosButton">
                    <Link to='/spots/'>
                        Previous page
                    </Link>
                </div>
        </div>
        </>
    )
}

export default SpotDetails;