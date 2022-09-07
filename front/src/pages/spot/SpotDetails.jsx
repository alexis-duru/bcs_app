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

   const [showComments, setShowComments] = useState([false]);


    /* COMMENTS */
    const [comments, setComments] = useState([]);

    const [createComment, setCreateComment] = useState({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: id,
        author: currentUser.id,
        content: "",
    })

    console.log(currentUser.id)


    const [errors, setErrors] = useState({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        spot: "",
        author: "",
        content: "",
    });

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



    // useEffect(() => {
    //     setCurrentUser(currentUser);
    //     // eslint-disable-next-line
    // }, [currentUser]);


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
        const originalComments = [...comments];
        setComments(comments.filter(comment => comment.id !== id));
        try {
            await commentsAPI.deleteComments(id);
            setComments(comments);
            toast.success("The comment was successfully deleted")
            console.log("The comment was successfully deleted")
        } catch (error) {
            setComments(originalComments);
            toast.error("Sorry, the comment could not be deleted, please retry")
        }
    }



    const handleSubmit = async event => {
        event.preventDefault();
        try {
            createComment.spot = parseInt(createComment.spot)
            createComment.author = parseInt(currentUser.id)
            console.log(createComment.author)
        
            const response = await commentsAPI.createComments(JSON.stringify(createComment));
            console.log(response)
            console.log('The comment has been successfully created')
            toast.success("The comment has been successfully created")
        } catch (error) {
            console.log(error + '. Sorry, an error has occured')
            toast.error("Sorry, an error has occured")
        }
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCreateComment({...createComment, [name]: value})
    }


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

                                <div id="preReadCommentsContainer">
                                    {spot.comments && spot.comments.length ? <p>Comments : {spot.comments.length}</p> : <p>No comments available</p> }
                                    {spot.comments && spot.comments.length  ?
                                    <button id="showComments-btn" onClick={() => setShowComments(!showComments)}> {showComments ? 'View comments' : 'Hide comments'} </button>
                                    : <p></p>}
                                </div>

                                {!showComments &&
                                <div id="readCommentsContainer">
                                    <div id="commentsContainerWrapper">
                                        <h2>Comments :</h2>
                                        {spot.comments?.map(
                                            (comment) => {
                                                return (
                                                    <div id="singleComment" key={comment.id}>
                                                        <p id="authorComment">{comment.author.email}</p>
                                                        <p id="contentComment">{comment.content}</p>
                                                        {comment.author.email === user.email && <button id="deleteComment-btn" onClick={() => handleDelete(comment.id)}>DELETE</button>}
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                                }
                                  
                                 <div id="writeCommentsContainer">
                                    <form id="commentForm" onSubmit={handleSubmit}>
                                        <Field
                                            name="content"
                                            label="content"
                                            placeholder="Write new comment..."
                                            value={createComment.content}
                                            error={errors.content}
                                            onChange={handleChange}
                                        />
                                        <button type="submit" className="btn btn-primary">SEND</button>
                                    </form>
                                </div>
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
        </>
    )
}

export default SpotDetails;