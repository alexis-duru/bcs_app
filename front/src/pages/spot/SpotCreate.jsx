import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import spotsAPI from '../../services/spotsAPI';

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import createSpot from "../../services/spotsAPI";


const SpotCreate = (props) => {

    const navigate = useNavigate();

    // console.log(props)

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
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [flats, setFlats] = useState([]);


    const fetchCategories = async () => {
        try {
           const data = await spotsAPI.findAllCategories();
           setCategories(data);
        //    console.log(data)
        } catch (error) {
            console.log(error.response)
            
        } 
    }

    const fetchTypes = async () => {
        try {
           const data = await spotsAPI.findAllTypes();
           setTypes(data);
        //    console.log(data)
        } catch (error) {
            console.log(error.response)
            
        } 
    }

    const fetchFlats = async () => {
        try {
           const data = await spotsAPI.findAllFlats();
           setFlats(data);
           console.log(data)
        } catch (error) {
            console.log(error.response)
            
        } 
    }

    useEffect(() => {
        fetchCategories();
        fetchTypes();
        fetchFlats();
    }, []) 

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setSpot({...spot, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        try {
            spot.postalCode = parseInt(spot.postalCode)
            const response = await spotsAPI.createSpot(JSON.stringify(spot))
            console.log(response)
            console.log('Le spot a bien été crée')
            navigate("/spots", {replace: true})
            
        } catch (error) {
          console.log('La requête à échoué')
          console.log(error.response.data.violations)
          console.log(error)
            if(error.response.data.violations) {
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

                <Select 
                    name={"category"} 
                    label="category" 
                    placeholder="category" 
                    value={spot.category} 
                    error={errors.category}
                    onChange={handleChange}  
                >
                  {categories.map(category =>
                    <option 
                        key={category.id} 
                        value={category.id}>
                        {category.name}
                    </option>
                  )}
                </Select>

                <Select 
                    name="type" 
                    label="type" 
                    placeholder="type" 
                    value={spot.type} 
                    error={errors.type}
                    onChange={handleChange}  
                >
                    {types.map(type =>
                        <option 
                            key={type.id} 
                            value={type.id}>
                            {type.name}
                        </option>
                      )}
                </Select>

                <Select 
                    name="flat" 
                    label="flat" 
                    placeholder="flat" 
                    value={spot.flat} 
                    error={errors.flat}
                    onChange={handleChange}  
                >
                  {flats.map(flat => 
                  <option
                    key={flat.id}
                    value={flat.id}>
                    {flat.name}
                  </option>
                )}
                </Select>

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