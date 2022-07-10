import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "../../components/Pagination";
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import CardLoaders from '../../components/loaders/CardLoaders';
import mapboxgl from 'mapbox-gl';


const Spots = (props) => {

    const [spots, setSpots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);



    /* --------MAPBOX------- */
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);
    const [zoom, setZoom] = useState(13);
    const [marker, setMarker] = useState([]);

    /* SHOW MAP */

    const [show, setShow] = useState([]);

    console.log(show)



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
        // fetchMedia();
    }, []);


    useEffect( () => {

         /* ADD MAP ON DOM ELEMENT AND MARKER */
         if (map.current) return;
         map.current = new mapboxgl.Map({
             container: mapContainer.current,
             style: 'mapbox://styles/mapbox/streets-v11',
             center: [lng, lat],
             zoom: zoom
         });
         setMarker(new mapboxgl.Marker({
            color: "##000000",
            draggable: false,
        })
        .setLngLat([lng, lat])
        .addTo(map.current)
        );
     }, [lng, lat, zoom]);




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


                        <div className="toggle_wrapper">
                            <button className="toggle" onClick={() => setShow(prev => !prev)}>
                                <label className="switch">
                                    <input type="checkbox"/>
                                        <span className="slider round"></span>
                                </label>
                            </button>
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
                                        {/* <p className="spotType">{spot.type.name}</p> */}
                                        <div className="overlay">
                                            <h2>{spot.name}</h2>
                                            <p>{spot.address}</p>
                                            <p>{spot.city}</p>
                                            <p>{spot.postalCode}</p>
                                            <p>{spot.details}</p>
                                            <p>{spot.type.name}</p>
                                            <p>{spot.category.name}</p>
                                            <p>{spot.flat.name}</p>
                                            <img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" />
                                            {/* <img src="IMG_8818.jpg"  alt="spot" /> */}



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

                {show &&
                    <div className="mapbox-container-full-wrapper">
                            <div className="sidebar">
                                Longitude: {spots.longitude} | Latitude: {spots.latitude} | Zoom: {zoom}
                            </div>
                            <div ref={mapContainer} className="map-container mapbox-container-full" 
                            />
                    </div>
                }

            </div>
        </div>
        </>
    )
}

export default Spots;