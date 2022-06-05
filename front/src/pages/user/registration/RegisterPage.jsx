import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../../components/forms/field';
import usersAPI from "../../../services/usersAPI";

const RegisterPage = (props) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordConfirm: "",

    });

    const [error, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirm: "",

    });

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await usersAPI.createUser()
        } catch (error) {
            console.log(error.response)
            const {violations} = error.response.data
        }
        console.log(user)
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