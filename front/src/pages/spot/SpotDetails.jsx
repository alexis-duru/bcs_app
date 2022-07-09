import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";

const SpotDetails  = (props) => {

    /* --------MAPBOX------- */
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);
    const [zoom, setZoom] = useState(13);
    const [marker, setMarker] = useState([]);
    
     /* -------- SPOT ------- */
    const [spot, setSpot] = useState([]);
    const { id } = useParams();

    const spotLongitude = spot.longitude;
    const spotLatitude = spot.latitude;
    console.log('spot longitude & latitude = ' + [spotLongitude, spotLatitude]);

    // const [spotLng, setSpotLng] = useState([spotLongitude]);
    // const [spotLat, setSpotLat] = useState([]);


    // console.log(spotLongitude)





    useEffect( () => {
        fetchSpot(id);
        // eslint-disable-next-line
    }, []);

    useEffect( () => {
        // fetchSpot(id);

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


     


    const fetchSpot = async (spot) => {
        try {
            const spot = await spotsAPI.findOne(id)
            setSpot(spot)
            console.log(spot)
            // console.log(spot)

        } catch (error) {
            toast.error("Sorry, the spot could not be found")
            console.log(error + " failed")
        }
    }



    return (
        <>
        <div className='spotDetails'>
            <h1> Spot Details</h1>
            <h2>{spot.name}</h2>
                <p>{spot.address}</p>
                {/* <img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /> */}
                <div><p>{spot.city}</p><p>{spot.postalCode}</p></div>
                <p>{spot.details}</p>
                <p>{spot.category && spot.category.name}</p>
                <p>{spot.type && spot.type.name}</p>
                <p>{spot.flat && spot.flat.name}</p>
                <p>{spot.latitude}</p>
                <p>{spot.longitude}</p>

                <div className="mapbox-container">
                    <div className="sidebar">
                        Longitude: {spot.longitude} | Latitude: {spot.latitude} | Zoom: {zoom}
                    </div>
                    <div ref={mapContainer} className="map-container" 
                    />
                </div>
                <div className="moreInfosButton">
                    <Link to='/spots/'>
                        Previous page
                    </Link>
                </div>
        </div>
        </>
    )
}

export default SpotDetails;