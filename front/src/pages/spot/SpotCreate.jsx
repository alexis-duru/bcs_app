import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import spotsAPI from '../../services/spotsAPI';
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';
import usersAPI from '../../services/usersAPI';
import jwtDecode from 'jwt-decode';
// import UploadField from '../../components/forms/UploadField';

mapboxgl.accessToken = "pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";


const SpotCreate = () => {

    const navigate = useNavigate();

    /* USER */

    const [user, setUser] = useState([]);

    /* -------- UPLOAD FIELD -------- */
      // const [medias, setMedias] = useState([]);

    /* --------MAPBOX------- */
    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);
    const mapContainer = useRef(null);
    const map = useRef(null);
    // eslint-disable-next-line
    const [zoom, setZoom] = useState(13);
    // eslint-disable-next-line
    const [marker, setMarker] = useState([]);


     /* -------- SPOT ------- */
    const spotId = useParams('id').id // Object ID

    const [spot, setSpot] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        details: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "",
        type: "",
        flat: "",
        latitude: lat,
        longitude: lng,

    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        details: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "",
        type: "",
        flat: "",
        latitude: lat,
        longitude: lng,
    });

    /* -------- SPOTS INFOS ------- */
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [flats, setFlats] = useState([]);
    // eslint-disable-next-line

    const fetchCategories = async () => {
        try {
            const data = await spotsAPI.findAllCategories(JSON.stringify(categories));
            setCategories(data);
            //    console.log(data)
        } catch (error) {
            console.log(error.response)

        }
    }

    const fetchTypes = async () => {
        try {
            const data = await spotsAPI.findAllTypes(JSON.stringify(types));
            setTypes(data);
            //    console.log(data)
        } catch (error) {
            console.log(error.response)

        }
    }

    const fetchFlats = async () => {
        try {
            const data = await spotsAPI.findAllFlats(JSON.stringify(flats));
            setFlats(data);
            //    console.log(data)
        } catch (error) {
            console.log(error.response)

        }
    }

    // const fetchMedias = async () => {
    //     try {
    //         const data = await spotsAPI.createMedia(JSON.stringify(medias));
    //            console.log(data)
    //     } catch (error) {
    //         console.log(error.response)

    //     }
    // }

    const fetchSpot = async () => {
        if (spotId) {
            try {
                const data = await spotsAPI.findOne(parseInt(spotId));

                setSpot(
                    {
                        name: data.name,
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        details: data.details,
                        type: data.type.id,
                        category: data.category.id,
                        flat: data.flat.id,
                        latitude: data.latitude,
                        longitude: data.longitude,
                    }
                );
                console.log(data)
            } catch (error) {
                console.log(error.response)
            }
        } else {
            return
        }
    }

    useEffect( () => {
        const decoded = jwtDecode(localStorage.getItem('token'));
        setUser(decoded);   
    }, []); 

    useEffect(() => {
        /* ADD MAP ON DOM ELEMENT AND MARKER */
        if (map.current) return; //
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        setMarker(new mapboxgl.Marker({
            color: "##000000",
            draggable: true
        })
            .setLngLat([lng, lat])
            .addTo(map.current));
    }, [lng, lat, zoom]);


    useEffect(() => {
        /* FLY FEATURES ON MAP */
        map.current.flyTo({
            center: [lng, lat],
            essential: true
        });
        // console.log(map)
    },)

    useEffect(() => {
        fetchSpot();
        /* GEOLOCATION FEATURES ON MAP */
        navigator.geolocation.getCurrentPosition((value) => {
            setLat(value.coords.latitude);
            setLng(value.coords.longitude);
            setSpot({ ...spot, latitude: value.coords.latitude, longitude: value.coords.longitude });
            if (marker.setLngLat) {
                marker.setLngLat([lng, lat]);
            }
        })
        // eslint-disable-next-line
    }, [lat])



    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchTypes();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchFlats();
        // eslint-disable-next-line
    }, [])


    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setSpot({ ...spot, [name]: value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            spot.latitude = parseFloat(spot.latitude)
            spot.longitude = parseFloat(spot.longitude)
            spot.postalCode = parseInt(spot.postalCode)
            if(spotId) {
                await spotsAPI.updateSpot(parseInt(spotId), spot)
                (
                    console.log("The spot has been successfully edited , 1"),
                    toast.success("The spot has been successfully edited"), 
                    navigate("/profile/spots"), 
                    { replace: true }, 
                )
            }else{
                const response = await spotsAPI.createSpot(JSON.stringify(spot))
                console.log(response)
                console.log('The spot has been successfully created, 2')
                toast.success("The spot has been successfully created")
                navigate("/spots")
            }

        }
         catch (error) {
            // if(spotId) {
            //     toast.error("The spot has not been edited, 3")
            // }else{
            //     toast.error("Sorry, the spot could not be created, 4")
            // }
        }

    }


    return (
        <>
            <div className="globalPage">
                <div className="leftSideBar" id="leftSideBarContribution">
                </div>
                <div className="globalPageWrapper" id="createSpotFormContainer">
                    <div className="globalPageHeader">
                        <div className="searchBar">
                        </div>
                    </div>
                    <div className="globalPageWrapperCards" id="createSpotForm">
                    <div className="wrapper_createSpotForm">
                        <div className="text_infos">
                            <h1>CONTRIBUTION</h1>
                            <h2 className="fade-in">Share a spot to our team and expands the community</h2>
                        </div>
                        <div id="wrapperCreateSpotForm">
                        <form className="createSpotForm" onSubmit={handleSubmit}>
                            <div className="wrapper_form_group">
                                <Field
                                    name="name"
                                    label="name"
                                    placeholder="spot name"
                                    value={spot.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />

                                <Field
                                    name="address"
                                    label="address"
                                    placeholder="address"
                                    value={spot.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                />
                            </div>
                            <div className="wrapper_form_group">
                                <Field
                                    name="city"
                                    label="city"
                                    placeholder="city"
                                    value={spot.city}
                                    onChange={handleChange}
                                    error={errors.city}
                                />

                                <Field
                                    name="postalCode"
                                    label="postalCode"
                                    placeholder="postalCode"
                                    value={spot.postalCode}
                                    type="number"
                                    onChange={handleChange}
                                    error={errors.postalCode}
                                />
                            </div>
                            <div className="wrapper_form_group">
                                <Field
                                    name="details"
                                    label="details"
                                    placeholder="details"
                                    value={spot.details}
                                    onChange={handleChange}
                                    error={errors.details}
                                />

                                {/* <input type="file" id="image" accept="image/png"/> */}

                                {/* <Field
                                    name="media"
                                    label="media"
                                    placeholder="media"
                                    value={spot.media ||""}
                                    onChange={handleChange}
                                    error={errors.media}
                                /> */}

                            </div>
                            
                            <div className="wrapper_form_group">
                            <Select
                                category="category"
                                name={"category"}
                                label="category"
                                placeholder="category"
                                value={spot.category.id}
                                error={errors.category}
                                onChange={handleChange}
                            >
                                {categories.map(category =>
                                    <option
                                        key={category.id}
                                        value={"api/categories/" + category.id}>
                                        {category.name}
                                    </option>
                                )}
                            </Select>

                            <Select
                                type="type"
                                name="type"
                                label="type"
                                placeholder="type"
                                value={spot.type.id}
                                error={errors.type}
                                onChange={handleChange}
                            >
                                {types.map(type =>
                                    <option
                                        key={type.id}
                                        value={"api/types/" + type.id}>
                                        {/* // value={type.id} */}
                                        {type.name}
                                    </option>
                                )}
                            </Select>

                            <Select
                                flat="flat"
                                name="flat"
                                label="flat"
                                placeholder="flat"
                                value={spot.flat.id}
                                error={errors.flat}
                                onChange={handleChange}
                            >
                                {flats.map(flat =>
                                    <option
                                        key={flat.id}
                                        value={"api/flats/" + flat.id}>
                                        {flat.name}
                                    </option>
                                )}
                            </Select>
                            </div>
                            
                            <div className="wrapper_form_group">

                            
                                {/* <UploadField 
                                    name="medias"
                                    label="medias"
                                    placeholder="medias"
                                    onChange={handleChange}
                                    error={errors.medias}
                                /> */}

                            </div>

                            <div className="wrapper_form_group" id="latlong">
                                <Field
                                    name="latitude"
                                    label="latitude"
                                    placeholder="latitude"
                                    value={spot.latitude}
                                    onChange={handleChange}
                                    error={errors.latitude}
                                />

                                <Field
                                    name="longitude"
                                    label="longitude"
                                    placeholder="longitude"
                                    value={spot.longitude}
                                    onChange={handleChange}
                                    error={errors.longitude}
                                />
                            </div>




                            <div className="submit_group">
                                <button type="submit" className="submitBtn">
                                    SAVE
                                </button>
                            </div>


                            <div>
                                <Link to="/spots">Back to spots</Link>
                            </div>
                        </form>
                        <div className="mapbox-container">
                            <div className="sidebar">
                                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                            </div>
                            <div ref={mapContainer} className="map-container" />
                        </div>

                        </div>

                    </div>


                    </div>
                    <div className="globalPageWrapperCards_overlay"></div>
                    <div className="globalFullPaginationContainer"></div>
                </div>

            </div>
        </>
    );
}

export default SpotCreate;