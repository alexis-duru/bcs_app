import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Pagination from "../../components/Pagination";
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import ImageGrid from '../../components/loaders/CardLoaders';
import authAPI from '../../services/authAPI';
import logo from '../../assets/img/logo-header.png';
// import ContentLoader from 'react-content-loader';
// import mapboxgl from 'mapbox-gl';


const Spots = () => {

    const [isAuthenticated] = useState(
        authAPI.isAuthenticated()
        
    ); 

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState([false]);


    /* --------MAPBOX------- */
    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // const [lng, setLng] = useState(-0.594);
    // const [lat, setLat] = useState(44.8378);
    // const [zoom, setZoom] = useState(13);
    // const [marker, setMarker] = useState([]);

    /* SHOW MAP */




    // eslint-disable-next-line 
    // const [medias, setMedias] = useState([]);

    // Récupération de l'ensemble de mes spots

    const fetchSpots = async () => {
        try {
            const data = await spotsAPI.findAll()
            setSpots(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            toast.error("Sorry, the spots could not be found")
            console.log(error.response)
        }
    }

    // const fetchMedia = async () => {
    //     try {
    //         const data = await spotsAPI.findAllMedia()
    //         setMedias(data)
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error.response)
    //     }
    // }


    useEffect(() => {
        fetchSpots();
    }, []);

// LOAD MAP

    // useEffect( () => {
    //      /* ADD MAP ON DOM ELEMENT AND MARKER */
    //      if (map.current) return;
    //      map.current = new mapboxgl.Map({
    //          container: mapContainer.current,
    //          style: 'mapbox://styles/mapbox/streets-v11',
    //          center: [lng, lat],
    //          zoom: zoom 
    //      });  
    //      setMarker(new mapboxgl.Marker({
    //         color: "##000000",
    //         draggable: false,
    //     })
    //     .setLngLat([lng, lat])
    //     .addTo(map.current)
    //     );        
    //  }, [lng, lat, zoom]);

    //  Gestion du changement de page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Gestion de la recherche

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;

    // Création d'un filtre des spots en fonction de la recherche

    const filteredSpots = spots.filter(
        s =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.type.name.toLowerCase().includes(search.toLowerCase()) ||
            s.category.name.toLowerCase().includes(search.toLowerCase()) ||
            s.flat.name.toLowerCase().includes(search.toLowerCase()) ||
            s.address.toLowerCase().includes(search.toLowerCase()) ||
            s.city.toLowerCase().includes(search.toLowerCase()) ||
            s.postalCode.toString().toLowerCase().includes(search.toLowerCase())
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


                        {/* <div className="toggle_wrapper">
                                <button className="switch toggle" onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}
                                    <input type="checkbox"/>
                                        <span className="slider round"></span>
                                </button>
                        </div> */}
                       

                        <div className="searchBar">
                            <input type="text" onChange={handleSearch} value={search} placeholder="Search spot ..." className="searchBarControl" />
                        </div>
                    </div>
                    
                     {/* {visible &&  */}
                    {!loading &&
                        <div className="spotsPageWrapperCards">

                            <div className="spotsPageWrapperCards_overlay"></div>
                            { spots.length === 0 
                                ?
                            <div className="spotsPageWrapperCards_noSpot">
                                <div className="spotsPageWrapperCards_noSpot_wrapper">
                                    <p>Sorry, but no spots have been added to this app </p>
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
                                                    <Link to={''}>
                                                        {spot.image ? <div><img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /></div> : <div><p>No image available</p></div>}
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
                                         
                                        </div>
                                    </div>
                                )}
                            </div>
                            }
                        </div>
                    }
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
                            
                {/* <div className="sidebar">
                    Longitude: {spots.longitude} | Latitude: {spots.latitude} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="mapbox-container-full" 
                /> */}
            </div>
        </div>
        </>
    )
}

export default Spots;