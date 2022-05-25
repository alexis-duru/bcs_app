import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "../components/Pagination";
import spotsAPI from '../services/spotsAPI';

const Spots = props => {

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");


    // Récupération de l'ensemble de mes spots

    const fetchSpots = async () => {
        try {
            const data = await spotsAPI.findAll()
            setSpots(data)
        } catch (error) {
            console.log(error.response)
        }
    }


    useEffect( () => {
        fetchSpots();
    }, []);

    //  Gestion de la suppression d'un spot 

    const handleDelete = async id =>  {
        const originalSpots = [...spots];

        setSpots(spots.filter(spot => spot.id !== id));

        try {
            await spotsAPI.delete(id)
            console.log("spot is delete, ok !")
        } catch (error) {
            setSpots(originalSpots);
            console.log(error.response + "sorry, spot can't be deleted");
        }
    };

        // FIRST VERSION
        // .then(response => console.log("spot is delete, ok !"))
        // .catch(error => {
        //     setSpots(originalSpots);
        //     console.log(error.response + "sorry, spot can't be deleted");
        // });

    //  Gestion du changement de page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Gestion de la recherche

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Filtre des spots en fonction de la recherche

    const filteredSpots = spots.filter(
        s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.name.toLowerCase().includes(search.toLowerCase()) ||
        s.flat.name.toLowerCase().includes(search.toLowerCase())
        // s.type.name.toLowerCase().includes(search.toLowerCase())
    );

    // Gestion de la pagination

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
                </div>
                <div className="spotsPageWrapperCards">
                <div className="spotsPageWrapperCards_overlay"></div>
                    {paginatedSpots.map(spot => 
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
                                    <button 
                                        onClick={() => handleDelete(spot.id)} 
                                        className="deleteButton">Delete
                                    </button>
                                    <Link to={`/spots/${spot.id}`}>
                                        Voir plus
                                    </Link>
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