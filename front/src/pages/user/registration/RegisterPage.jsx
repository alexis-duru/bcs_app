import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../../../components/forms/Field';
import usersAPI from "../../../services/usersAPI";

// useNavigate


const RegisterPage = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    });

    const [error, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    });

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await usersAPI.createUser(JSON.stringify(user))
            console.log('Le compte à bien été créé')
            navigate("/login", {replace: true})
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

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }

    return (  

        <div>
            <h1>Register page</h1>
            <h1>Register page</h1>
            <h1>Register page</h1>
            <h1>Register page</h1>
            <h1>Register page</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name= "email"
                    label= "email"
                    type="email"
                    placeholder="email"
                    error={error.email}
                    value={user.email}
                    onChange={handleChange}
                />
                 <Field
                    name= "password"
                    label= "password"
                    type="password"
                    placeholder="password"
                    error={error.password}
                    value={user.password}
                    onChange={handleChange}
                />
                 <Field
                    name= "passwordConfirm"
                    label= "passwordConfirm"
                    type="password"
                    placeholder="passwordConfirm"
                    error={error.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div>
                    <button type="submit">
                            Sign In
                    </button>
                </div>
                <Link to='/login'>
                    I have an already account
                </Link>
            </form>
        </div>
    );
}
 
export default RegisterPage;