import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
import exportAPI from '../../services/commentsAPI';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";

const SpotDetails  = (props) => {

    /* COMMENTS */

    const [comments, setComments] = useState([]);

    console.log(comments);

    /* --------MAPBOX------- */
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);

    const [zoom, setZoom] = useState(13);
    const [marker, setMarker] = useState([]);
    // const [lngspot, setLngspot] = useState([]);
    // const [latspot, setLatspot] = useState([]);


     /* -------- SPOT ------- */
    const [spot, setSpot] = useState([]);
    const { id } = useParams();

    useEffect( () => {
        fetchSpot(id);
        // eslint-disable-next-line
    }, []);

   useEffect( () => {
    fetchComments();
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
         setMarker(
            new mapboxgl.Marker({
            color: "##000000",
            draggable: false,
            })
            .setLngLat([lng, lat])
            .addTo(map.current)
        );
        
     }, [lng, lat, zoom]);

    //  useEffect( () => {
    //     setMarker(
    //         new mapboxgl.Marker({
    //         color: "#000000",
    //         draggable: false,
    //         })
    //         .setLngLat([spot.longitude, spot.latitude])
    //         .addTo(map.current)
    //     );
    //  },[spot.longitude, spot.latitude]);



     const fetchSpot = async (spot) => {
        try {
            const spot = await spotsAPI.findOne(id)
            setSpot(spot)
            // setComments(spot.comments)
            setLng(spot.longitude)
            setLat(spot.latitude)
            console.log(spot)
            // console.log(spot.latitude)
            // console.log(spot.longitude)
        } catch (error) {
            toast.error("Sorry, the spot could not be found")
            console.log(error + " failed")
        }
    }

    const fetchComments = async () => {
        try {
            const comments = await exportAPI.findAllComments();
            setComments(comments);
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <>
        <div className='spotDetails'>
            <h1> Spot Details</h1>
            <h2>{spot.name}</h2>
                <p>{spot.address}</p>
                {spot.image ? <img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /> : <div><p>No image available</p></div>}
                <div><p>{spot.city}</p><p>{spot.postalCode}</p></div>
                <p>{spot.details}</p>
                <p>{spot.category && spot.category.name}</p>
                <p>{spot.type && spot.type.name}</p>
                <p>{spot.flat && spot.flat.name}</p>
                <p>{spot.latitude}</p>
                <p>{spot.longitude}</p>


                {spot.comments?.map(
                    (comment) => {
                        return (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                                <p>{comment.createdAt}</p>
                            </div>
                        )
                    }
                )}
               
                

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