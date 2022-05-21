import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

const Spots = props => {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/spots")
        .then(response => response.data['hydra:member'])
        .then(data => setSpots(data))
        .catch(error => console.log(error.response));
    }, []);

    const handleDelete = id => {
        console.log(id)
        axios
            .delete("http://localhost:8000/api/spots" + '/' + id)
            .then(response => console.log(response));
    };

    return (
        <>
        <div className="spotsPage">
            <div className="leftSideBar">

            </div>
            <div className="spotsPageWrapper">
                <div className="spotsPageHeader">
                    <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p>
                </div>
                <div className="spotsPageWrapperCards">
                    {spots.map(spot => 
                        <div key={spot.id} className="spotsPageCards">
                            <div className='spotsPageCardsInfos'>
                                <h2>{spot.name}</h2>
                                <p>{spot.id}</p>
                                <p>{spot.address}</p>
                                <p>{spot.city}</p>
                                <p>{spot.postalCode}</p>
                                <p>{spot.details}</p>
                                <button 
                                    onClick={() => handleDelete(spot.id)} 
                                    className="deleteButton">Delete
                                </button>
                            </div>
                            <div className='spotsPageCardsMedia'></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Spots;