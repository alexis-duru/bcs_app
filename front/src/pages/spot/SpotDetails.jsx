import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
import commentsAPI from '../../services/commentsAPI';
import usersAPI from '../../services/usersAPI';
import jwtDecode from 'jwt-decode';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";

const SpotDetails  = (props) => {

    /* -------- SPOT ------- */
   const [spot, setSpot] = useState([]);
   const { id } = useParams();
   const [user, setUser] = useState([]);
   const [currentUser, setCurrentUser] = useState([]);


    /* COMMENTS */

    const [comments, setComments] = useState([]);
    console.log(comments);

    /* --------MAPBOX------- */
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);

    const [zoom, setZoom] = useState(12);
    const [marker, setMarker] = useState([]);
    // const [lngspot, setLngspot] = useState([]);
    // const [latspot, setLatspot] = useState([]);

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

    useEffect( () => {
        fetchSpot(id);
        // eslint-disable-next-line
    }, []);

   useEffect( () => {
    fetchComments();
   }, []);

   useEffect( () => {

    const decoded = jwtDecode(localStorage.getItem('token'));
    setUser(decoded);   

}, []); 

useEffect(() => { 
    findCurrentUser();
    // eslint-disable-next-line
}, [user]);

//    useEffect( () => {
//     fetchUser();
//     }, []);

    

    useEffect( () => {
         /* ADD MAP ON DOM ELEMENT AND MARKER */
         if (map.current) return;
         map.current = new mapboxgl.Map({
             container: mapContainer.current,
             style: 'mapbox://styles/mapbox/streets-v11',
             center: [lng, lat],
             zoom: zoom
         });        
     }, [lng, lat, zoom]);

     useEffect( () => {
        if(spot.longitude, spot.latitude) {
            setMarker(
                new mapboxgl.Marker({
                color: "#000000",
                draggable: false,
                })
                .setLngLat([spot.longitude, spot.latitude])
                .addTo(map.current)
            );
        }
     },[spot.longitude, spot.latitude]);

    // const fetchUser = async () => {
    //     try {
    //         const data = await usersAPI.findAllUsers();
    //         setUser(data);
    //         console.log(data)
    //     } catch (error) {
    //         toast.error("Sorry, the user could not be found")
    //         console.log(error.response)
    //     }
    // }


     const fetchSpot = async (spot) => {
        try {
            const spot = await spotsAPI.findOne(id)
            setSpot(spot)
            setLng(spot.longitude)
            setLat(spot.latitude)
            console.log(spot)
        } catch (error) {
            toast.error("Sorry, the spot could not be found")
            console.log(error + " failed")
        }
    }

    const fetchComments = async () => {
        try {
            const comments = await commentsAPI.findAllComments();
            setComments(comments);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async id => {
        const originalComments = [...comments];
        setComments(comments.filter(comment => comment.id !== id));
        try {
            await commentsAPI.deleteComments(id)
            toast.success("The comment was successfully deleted")
            console.log("The comment was successfully deleted")
        } catch (error) {
            setComments(originalComments);
            toast.error("Sorry, the comment could not be deleted, please retry")
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
                                <br></br>
                                <p>{comment.author.email}</p>
                                <p>{comment.content}</p>
                                {comment.author.email === user.email && <button onClick={() => handleDelete(comment.id)}>Delete</button>}
                                <br></br>
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