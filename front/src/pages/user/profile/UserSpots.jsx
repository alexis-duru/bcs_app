import React from 'react';
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
import spotsAPI from '../../../services/spotsAPI';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { toast } from 'react-toastify';
import CardLoaders from '../../../components/loaders/CardLoaders';

const UserSpots  = () => {

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
     // eslint-disable-next-line
    const [spots, setSpots] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);


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
            setLoading(false)
            setSpots(data)
            // console.log(data)
        } catch (error) {
            toast.error("Sorry, the spots could not be found")
            console.log(error.response)
        }
    }

    // fetchSpots();

    useEffect( () => {

        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded);   
        // console.log(decoded) 
        
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
            toast.success("The spot was successfully deleted")
            console.log("The spot was successfully deleted")
        } catch (error) {
            setSpots(originalSpots);
            toast.error("Sorry, the spot could not be deleted, please retry")
            console.log(error.response + "Sorry, the spot could not be deleted");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Création d'un filtre des spots en fonction de la recherche

    const filteredSpots = spots.filter(
        s => 
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.type.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.category.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.flat.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.address?.toLowerCase().includes(search.toLowerCase()) ||
        s.city?.toLowerCase().includes(search.toLowerCase()) ||
        s.postalCode?.toString().toLowerCase().includes(search.toLowerCase())
    );

    // Gestion de la pagination

    const paginatedSpots = Pagination.getData(
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
                        <div className="spotsCreate">
                            <Link to='/spots/create'>Share a spot with community</Link>
                        </div>
                        <div className="searchBar">
                            <input type="text" onChange={handleSearch} value={search} placeholder="Search spot ..." className="searchBarControl" />
                        </div>
                    </div>
                    {!loading &&
                    <div className="spotsPageWrapperCards">
                    <div className="spotsPageWrapperCards_overlay"></div>
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
                                        <p>{spot.user.email}</p>
                                        <p>{spot.type.name}</p>
                                        <p>{spot.category.name}</p>
                                        <p>{spot.flat.name}</p>
                                        <p>{spot.latitude}</p>
                                        <p>{spot.longitude}</p>
                                        
                                        <button 
                                            onClick={() => handleDelete(spot.id)} 
                                            className="deleteButton">Delete
                                        </button> 
                                                                                
                                         <Link to={'/spots/update/' + spot.id}>
                                            <button className="btn-green">UPDATE</button>
                                        </Link>

                                        <div className="moreInfosButton">
                                            <Link to={`/spots/${spot.id}`}>
                                                More informations
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>}

                    <div className="loaders">
                        {loading && <CardLoaders />}
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

    );
}
 
export default UserSpots;