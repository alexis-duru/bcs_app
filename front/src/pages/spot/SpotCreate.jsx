import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import spotsAPI from '../../services/spotsAPI';
import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import createSpot from "../../services/spotsAPI";


const SpotCreate = (props) => {

    const [spot, setSpot] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        details: "",
        media: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "",
        type: "",
        flat: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        details: "",
        media: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "",
        type: "",
        flat: "",
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSpot({...spot, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            spot.postalCode = parseInt(spot.postalCode)
            var config = {
                method: 'post',
                url: 'http://localhost:8000/api/spots',
                headers: { 
                    'Accept': 'application/json', 
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify(spot)
            };
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            // const response = await spotsAPI.createSpot()
            
            // console.log(response);
            // headers: window.localStorage.getItem('authToken')}
        } catch (error) {
            console.log(error.response);
        }
    }


    return (  
        <>
            <div className="createSpots">
            <h1>Création d'un spot</h1>

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

                <Field 
                    name="media" 
                    label="media" 
                    placeholder="media" 
                    value={spot.media} 
                    onChange={handleChange}  
                    error={errors.media}
                />


                <Field 
                    name="category" 
                    label="category" 
                    placeholder="category" 
                    value={spot.category} 
                    onChange={handleChange}  
                    error={errors.category}
                />


                <Field 
                    name="type" 
                    label="type" 
                    placeholder="type" 
                    value={spot.type} 
                    onChange={handleChange}  
                    error={errors.type}
                />


                <Field 
                    name="flat" 
                    label="flat" 
                    placeholder="flat" 
                    value={spot.flat} 
                    onChange={handleChange}  
                    error={errors.flat}
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
            </div>
           
        </>
    );
}
 
export default SpotCreate;