import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Pagination from "../../components/Pagination";
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import ImageGrid from '../../components/loaders/CardLoaders';
import authAPI from '../../services/authAPI';
// import ContentLoader from 'react-content-loader';
// import mapboxgl from 'mapbox-gl';


const Spots = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        authAPI.isAuthenticated()
    ); 

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    /* --------MAPBOX------- */
    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // const [lng, setLng] = useState(-0.594);
    // const [lat, setLat] = useState(44.8378);
    // const [zoom, setZoom] = useState(13);
    // const [marker, setMarker] = useState([]);

    /* SHOW MAP */

    // const [visible, setVisible] = useState([false]);



    // eslint-disable-next-line 
    // const [medias, setMedias] = useState([]);

    // Récupération de l'ensemble de mes spots

    const fetchSpots = async () => {
        try {
            const data = await spotsAPI.findAll()
            setSpots(data)
            setLoading(false)
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
                                            <p>{spot.type.name}</p>
                                            <p>{spot.category.name}</p>
                                            <p>{spot.flat.name}</p>
                                            {spot.image ? <img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /> : <div><p>No image available</p></div>}
                                            
                                            {isAuthenticated &&
                                            <div className="moreInfosButton">
                                                <Link to={`/spots/${spot.id}`}>
                                                    More informations
                                                </Link>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
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