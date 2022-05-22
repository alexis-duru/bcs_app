import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const Spots = props => {

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8000/api/spots")
        .then(response => response.data['hydra:member'])
        .then(data => setSpots(data))
        .catch(error => console.log(error.response));
    }, []);

    const handleDelete = id => {
        const originalSpots = [...spots];

        setSpots(spots.filter(spot => spot.id !== id));

        axios
            .delete("http://localhost:8000/api/spots/" + id)
            .then(response => 
                console.log("spot is delete, ok !")
            )
            .catch(error => {
                setSpots(originalSpots);
                console.log(error.response + "sorry, spot can't be deleted");
            })
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const itemsPerPage = 10;
    
    // console.log(pages)

    // GESTION DE MA PAGINATION
    
    const paginatedSpots = Pagination.getData(spots, currentPage, itemsPerPage);

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
                    {paginatedSpots.map(spot => 
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

                {/* PAGINATION */}

                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={spots.length}
                    onPageChanged={handlePageChange}
                 />

                {/* PAGINATION */}
            </div>
        </div>
        </>
    )
}

export default Spots;