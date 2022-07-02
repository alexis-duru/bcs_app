import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import spotsAPI from '../../services/spotsAPI';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken="pk.eyJ1IjoiYWxleGlzZHVydSIsImEiOiJja3dydXk5NHIxMDl2MnRxbzc5enlobmM0In0.Ed0S5ioc8PQZXqPIfK2CEg";
// import UploadField from '../../components/forms/UploadField';
// import createSpot from "../../services/spotsAPI";


const SpotCreate = () => {

    const navigate = useNavigate();


    const spotId = useParams('id').id // Objet ID

    // console.log(props)

    const [lng, setLng] = useState(-0.594);
    const [lat, setLat] = useState(44.8378);
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
        media: "",
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
        media: "",
        latitude: lat,
        longitude: lng,
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [flats, setFlats] = useState([]);

    // const [latitude, setLatitude] = useState(0);
    // const [longitude, setLongitude] = useState(0);

    const mapContainer = useRef(null);
    const map = useRef(null);
    // eslint-disable-next-line
    const [zoom, setZoom] = useState(13);
    const [marker, setMarker] = useState([]);


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
                        media: data.media,
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
            if (map.current) return; // initialize map only once
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
    },[lng, lat, zoom]);

    useEffect (() => {
        // if (!map.current) return; // wait for map to initialize
         map.current.flyTo({
            center: [lng, lat],
            essential : true
        });
        // console.log(map)

    },)

    useEffect( () => {
        fetchSpot();
        navigator.geolocation.getCurrentPosition((value) => {
            setLat(value.coords.latitude);
            setLng(value.coords.longitude);
            setSpot({...spot, latitude: value.coords.latitude, longitude: value.coords.longitude});
            if(marker !== undefined){
            marker.setLngLat([lng, lat]);
            }      
        })
        // eslint-disable-next-line
    }, [lat])



    useEffect( () => {
        fetchCategories();
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        fetchTypes();
        // eslint-disable-next-line
    }, [])

    useEffect( () => {
        fetchFlats();
        // eslint-disable-next-line
    }, [])


    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setSpot({ ...spot, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(spot)


        try {
            // spot.media = spot.media.replace(/^.*\\/, "");
            // console.log(spot.media);
            spot.postalCode = parseInt(spot.postalCode)
            spot.latitude = parseFloat(spot.latitude)
            spot.longitude = parseFloat(spot.longitude)
            spotId ? await spotsAPI.updateSpot(parseInt(spotId), spot) : await spotsAPI.createSpot(JSON.stringify(spot))
            // console.log(response)
            console.log('Le spot a bien été crée')
            // console.log(spot.media)
            navigate("/spots", { replace: true })

        } catch (error) {
            console.log('La requête à échoué')
            console.log(error.response.data.violations)
            console.log(error)
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });

                setErrors(apiErrors)
            }
        }

    }


    return (
        <>
            <div className="createSpots">
                <h1>CONTRIBUTION</h1>

                <form onSubmit={handleSubmit}>
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


                    <Field
                        name="details"
                        label="details"
                        placeholder="details"
                        value={spot.details}
                        onChange={handleChange}
                        error={errors.details}
                    />

                    {/* <UploadField
                    name="media" 
                    label="media" 
                    placeholder="media" 
                    value={spot.media} 
                    onChange={handleChange}  
                    error={errors.media}
                /> */}

                    <Field
                        name="media"
                        label="media"
                        placeholder="media"
                        value={spot.media}
                        onChange={handleChange}
                        error={errors.media}
                    />


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
                                {/* // value={flat.id}> */}
                                {flat.name}
                            </option>
                        )}
                    </Select>

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

                    

                    <div>
                        <button type="submit">
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

        </>
    );
}

export default SpotCreate;