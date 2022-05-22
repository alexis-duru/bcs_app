import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

const Spots = props => {

    const [spots, setSpots] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);

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
        setcurrentPage(page);
    }

    const itemsPerPage = 10;
    const pagesCount = Math.ceil(spots.length / itemsPerPage);
    const pages = [];

    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    console.log(pages)

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
                <div className="paginationContainer">
                    <div className="pageItem arrow">
                        <svg width="18" height="18">
                        <use href="#left" />
                        </svg>
                        <span className="arrowText">Previous</span> 
                    </div>

                    {pages.map(page => (
                        <li key={page} className={"pageItem"}>
                            {/* + (currentPage === page && "active") */}
                            <button 
                                className="pageLink" 
                                onClick={() => handlePageChange(page)}
                            >
                            {page}
                            </button>
                        </li>
                    ))}
                    
                    <div className="pageItem arrow">
                        <svg width="18" height="18">
                        <use href="#right" />
                        </svg>
                    </div>
                    <div className="hide_arrow_container">
                        <svg className="hide">
                            <symbol id="left" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></symbol>
                            <symbol id="right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></symbol>
                        </svg>
                    </div>
                    </div>
                </div>
        </div>
        </>
    )
}

export default Spots;