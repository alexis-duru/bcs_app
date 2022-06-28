import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import spotsAPI from '../../services/spotsAPI';
// import UploadField from '../../components/forms/UploadField';
// import createSpot from "../../services/spotsAPI";


const SpotCreate = () => {

    const navigate = useNavigate();

    const spotId = useParams('id').id // Objet ID

    // console.log(props)

    const [spot, setSpot] = useState({
        // name: "Nouveau spot sudffsfsdf dimanche5",
        // address: "107, rue de saint genes",
        // city: "Bordeaux",
        // postalCode: 33000,
        // createdAt: "2022-02-13T11:27:15.738Z",
        // updatedAt: "2022-03-13T11:27:15.738Z",
        // details: "Un petit détail"

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
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [flats, setFlats] = useState([]);


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
                        media: data.media
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
        fetchCategories();
        fetchTypes();
        fetchFlats();
        fetchSpot();
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
                <h1>Upload spot</h1>

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

                    {/* <Field 
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
                /> */}


                    <Select
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