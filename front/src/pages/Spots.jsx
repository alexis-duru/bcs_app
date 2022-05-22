import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const Spots = props => {

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

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

    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    const filteredSpots = spots.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedSpots = Pagination.getData(
        // spots, 
        filteredSpots, 
        currentPage, 
        itemsPerPage
    );

    return (
        <>
        <div className="spotsPage">
            <div className="leftSideBar">

            </div>
            <div className="spotsPageWrapper">
                <div className="spotsPageHeader">
                    <div className="searchBar">
                        <input type="text" onChange={handleSearch} value={search} placeholder="Rechercher ..." className="searchBarControl" />
                    </div>
                    {/* <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p>
                    <p>Filter</p> */}
                </div>
                <div className="spotsPageWrapperCards">
                    {paginatedSpots.map(spot => 
                        <div key={spot.id} className="spotsPageCards">
                            <div className='spotsPageCardsInfos'>
                                <p className="spotNumber">{spot.id}</p>
                                <div className="overlay">
                                    <h2>{spot.name}</h2>
                                    <p>{spot.address}</p>
                                    <p>{spot.city}</p>
                                    <p>{spot.postalCode}</p>
                                    <p>{spot.details}</p>
                                    <hr></hr>
                                    <button 
                                        onClick={() => handleDelete(spot.id)} 
                                        className="deleteButton">Delete
                                    </button>
                                </div>
                            </div>
                            {/* <div className='spotsPageCardsMedia'></div> */}
                        </div>
                    )}
                </div>
                <div className="fullPaginationContainer">
                    {itemsPerPage < filteredSpots.length && (
                        <Pagination 
                            currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                            length={filteredSpots.length}
                            // length={spots.length}
                            onPageChanged={handlePageChange}
                        />
                    )}

                </div>
            </div>
        </div>
        </>
    )
}

export default Spots;