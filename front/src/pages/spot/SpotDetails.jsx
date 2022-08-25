import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import spotsAPI from '../../services/spotsAPI';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
import usersAPI from '../../services/usersAPI';
import jwtDecode from 'jwt-decode';
import commentsAPI from '../../services/commentsAPI';
import Field from '../../components/forms/Field';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";

const SpotDetails  = (props) => {

    /* -------- SPOT ------- */
   const [spot, setSpot] = useState([]);
   const { id } = useParams();
   const [user, setUser] = useState([]);
   const [currentUser, setCurrentUser] = useState([]);


    /* COMMENTS */
    const [comments, setComments] = useState([]);


    // const [comments, setComments] = useState({
    //     content: "",
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     spot: "",
    //     author: "",
    // })
    

    // console.log(comments)

    // const [errors, setErrors] = useState({
    //     content: "",
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     spot: "",
    //     author: "",
    // });

    // console.log(comments);


    /* --------MAPBOX------- */
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);

    const [zoom, setZoom] = useState(12);
    const [marker, setMarker] = useState([]);

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

     const fetchSpot = async (spot) => {
        try {
            const spot = await spotsAPI.findOne(id)
            setSpot(spot)
            setLng(spot.longitude)
            setLat(spot.latitude)
            // console.log(spot)
        } catch (error) {
            toast.error("Sorry, the spot could not be found")
            console.log(error + " failed")
        }
    }

    const fetchComments = async () => {
        try {
            const comments = await commentsAPI.findAllComments();
            setComments(comments);
            console.log(comments);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        // const originalComments = [...comments];
        // setComments(comments.filter(comment => comment.id !== id));
        try {
            await commentsAPI.deleteComments(id);
            toast.success("The comment was successfully deleted")
            setComments(comments);
            console.log("The comment was successfully deleted")
        } catch (error) {
            toast.error("Sorry, the comment could not be deleted, please retry")
        }
    }

    // const handleChange = ({ currentTarget }) => {
    //     const { name, value } = currentTarget;
    //     setComments({ ...comments, [name]: value })
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
        
    //     // console.log(spot)
    //     try {
    //         comments.author = parseInt(comments.author)
    //         comments.spot = parseInt(comments.spot)
    //         comments.createdAt = new Date().toISOString()
    //         comments.updatedAt = new Date().toISOString()
    //         const response = await commentsAPI.createComments(comments);
    //         console.log(response)
    //         console.log('The spot has been successfully created')
    //         toast.success("The spot has been successfully created")
    //     } catch (error) {
    //         toast.error("Sorry, the spot could not be created")
    //     }
    // }

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
                </div>
                    <div className="spotsPageWrapperCards" id="spotDetails">
                    <div id="mediasContainer">
                        <div id="mediasContainerWrapper">
                            <div id="imageContainer">
                                {spot.image ? <img src={`http://localhost:8000${spot.image.contentUrl}`} alt="spot" /> : <p>No image available</p>}
                            </div>
                            <div id="mapContainer">
                                <div className="mapbox-container">
                                        <div className="sidebar">
                                            Longitude: {spot.longitude} | Latitude: {spot.latitude} | Zoom: {zoom}
                                        </div>
                                        <div ref={mapContainer} className="map-container" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="infosContainer">
                        <div id="infosContainerWrapper">
                            <h2>{spot.name}</h2>
                            <div id="infosAdress">
                                <p>{spot.address}</p>
                                <div>
                                    <p>{spot.city}</p><p>{spot.postalCode}</p>
                                </div>
                            </div>
                            <div id="infosDetails">
                                <div id="infosType">
                                    <p>Type :</p><p>{spot.type && spot.type.name}</p>
                                </div>
                                <div id="infosCategory">
                                    <p>Category :</p><p>{spot.category && spot.category.name}</p>
                                </div>
                                <div id="infosFlat">
                                    <p>Flat :</p><p>{spot.flat && spot.flat.name}</p>
                                </div>
                            </div>

                                {/* <p>{spot.details}</p> */}

                                {/* COMMENTS */}

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
                            </div>
                        </div>
                    
                    


                        <div className="moreInfosButton">
                            <Link to='/spots/'>
                                Previous page
                            </Link>
                        </div>
                    </div>
                <div className="fullPaginationContainer"></div>
            </div>
        </div>


                {/* <form className="createSpotForm" onSubmit={handleSubmit}>
                            <div className="wrapper_form_group">
                                <Field
                                    name="content"
                                    label="content"
                                    placeholder="content comment"
                                    value={comments.content}
                                    onChange={handleChange}
                                    error={errors.content}
                                />
                            </div>
                    
                            <div className="submit_group">
                                <button type="submit">
                                    SAVE
                                </button>
                            </div>
                        </form> */}

                {/* <form onSubmit={handleSubmit}>
                    <Field
                        name="comments"
                        label="comments"
                        placeholder="comments"
                        value={comments.content}
                        // onChange={handleChange}
                        error={errors.content}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}
        </>
    )
}

export default SpotDetails;