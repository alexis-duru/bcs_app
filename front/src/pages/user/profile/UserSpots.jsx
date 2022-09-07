import React from 'react';
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import usersAPI from '../../../services/usersAPI';
import spotsAPI from '../../../services/spotsAPI';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { toast } from 'react-toastify';
import ImageGrid from '../../../components/loaders/CardLoaders';
import deleteIcon from '../../../assets/img/icons/delete-icon.png';
import editIcon from '../../../assets/img/icons/edit-icon.png';
import logo from '../../../assets/img/logo-header.png';
import authAPI from '../../../services/authAPI';

const UserSpots  = () => {

    const [isAuthenticated] = useState(
        authAPI.isAuthenticated()
    ); 

    const [user, setUser] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
     // eslint-disable-next-line
    const [spots, setSpots] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);

    const [visible, setVisible] = useState([false]);
    




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
            console.log(data)
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

    /* GESTION DE LA SUPPRESSION D'UN SPOT */

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

    /* GESTION DE LA PAGINATION */

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    /* GESTION DE LA RECHERCHE */

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
                            <div className="container">
                                <div className="button-container">
                                    <span className="mask">CONTRIBUTION</span>
                                    <Link to='/spots/create'>
                                        <button type="button" name="Hover">CONTRIBUTION</button>
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <div className="searchBar">
                            <input type="text" onChange={handleSearch} value={search} placeholder="Search spot ..." className="searchBarControl" />
                        </div>
                    </div>
                    {!loading &&
                    <div className="spotsPageWrapperCards">
                    <div className="spotsPageWrapperCards_overlay"></div>
                    { spots.length === 0 
                        ? 
                            <div className="spotsPageWrapperCards_noSpot">
                                <div className="spotsPageWrapperCards_noSpot_wrapper">
                                    <p>You have not contributed to any spot yet</p>
                                    <Link to='/spots/create'>Share your first spot</Link>
                                </div>
                            </div>
                            
                            
                        
                        :
                            <div className="spotPageWrapperCardsIn">
                            {paginatedSpots.map(spot => 
                                <div key={spot.id} className="spotsPageCards">
                                    <div className='spotsPageCardsInfos'>
                                    <p className="spotNumber">{spot.id}</p>
                                        <div className="name_adress_spot">
                                            <h2>{spot.name}</h2>                                   
                                                <Link to={'/spots/update/' + spot.id} className="icon-btn edit-icon-btn">
                                                    <img src={editIcon} alt="update button"></img>
                                                </Link>
                                            <button 
                                                onClick={() => handleDelete(spot.id)} className="icon-btn delete-icon-btn">
                                                    <img src={deleteIcon} alt="delete button"></img>
                                            </button> 
                                            <div className="adress">
                                                <p>{spot.address}</p>
                                                <div>
                                                    <p>{spot.postalCode}</p>
                                                    <p>{spot.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="line_wrapper">
                                            <span id="line"></span>
                                        </div>
                                        
                                        <div className="infos_spot">
                                            <div className="infos">
                                                <p>Type :</p>
                                                <p>{spot.type && spot.type.name}</p>
                                            </div>
                                            <div className="infos">
                                                <p>Category :</p>
                                                <p>{spot.category && spot.category.name}</p>
                                            </div>
                                            <div className="infos">
                                                <p>Flat :</p>
                                                <p>{spot.flat && spot.flat.name}</p>
                                            </div>
                                        </div>

                                        <div className="media_spot">
                                            <div id="media">
                                                <Link to={`/spots/${spot.id}`}>
                                                    {/* {spot.image ? <div><img crossorigin="anonymous" src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /></div> : <div><p>No image available</p></div>} */}
                                                    <div><p>No image available</p></div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="comment_spot">
                                            <div className="comment">
                                                {spot.comments && spot.comments.length ? <p>View comments : {spot.comments.length}</p> : <p>View comments :<span>No comments available</span></p> }
                                            </div>
                                        </div>

                                        {!visible &&
                                            <div className="more_info_container">
                                                <div className="more_info_btn">
                                                    <Link to={`/spots/${spot.id}`}>
                                                        DISCOVER
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                          
                                        {isAuthenticated &&
                                            <button className="spoted-btn" onClick={() => setVisible(!visible)}>
                                                <img src={logo} alt="logo" />
                                            </button>
                                            
                                        }

                                        {/* <div className="moreInfosButton">
                                            <Link to={`/spots/${spot.id}`}>
                                                More informations
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    </div>}

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

                    <div className="loaders">
                        {loading && <ImageGrid />}
                    </div>
                </div>
            </div>
        </>

    );
}
 
export default UserSpots;