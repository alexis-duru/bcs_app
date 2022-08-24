import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../../../components/forms/Field';
import usersAPI from "../../../services/usersAPI";
import { toast } from 'react-toastify';

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
        const apiErrors = {};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "passwords do not match";
            setErrors(apiErrors);
            toast.error('Passwords do not match !');
            return
        }
        try {
            // eslint-disable-next-line
            const response = await usersAPI.createUser(JSON.stringify(user))
            toast.success('The account has been successfully created, you can now log in !');
            console.log('The account has been successfully created, you can now log in !');
            navigate("/login", {replace: true})
        } catch (error) {
            console.log('The request failed')
            console.log(error.response.data.violations)
            console.log(error)
            if(error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                toast.error('We detected an error, please retry !');
                setErrors(apiErrors)
            }
        }
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }

    return (  
        <>
        <div className="globalPage">
            <div className="leftSideBar">
            </div>
            <div className="globalPageWrapper">
                <div className="globalPageHeader">
                    <div className="searchBar">
                    </div>
                </div>
                <div className="globalPageWrapperCards">
                    <div className="text_infos">
                        <h1>REGISTER</h1>
                        <h2 className="fade-in">Fill the form to become a member of SPOTED APP</h2>
                    </div>
                    <form className="formContainer" onSubmit={handleSubmit}>
                        <div className="form_overlay"></div>
                        
                            <Field
                                name= "email"
                                label= "Email"
                                type="email"
                                placeholder="Email"
                                error={error.email}
                                value={user.email}
                                onChange={handleChange}
                            />
                            <Field
                                name= "password"
                                label= "Password"
                                type="password"
                                placeholder="Password"
                                error={error.password}
                                value={user.password}
                                onChange={handleChange}
                            />
                            <Field
                                name= "passwordConfirm"
                                label= "Password confirm"
                                type="password"
                                placeholder="Password confirm"
                                error={error.passwordConfirm}
                                value={user.passwordConfirm}
                                onChange={handleChange}
                            />
                            <div className='form-group'>
                                <button type="submit">
                                        Sign In
                                </button>
                            </div>
                            <div className='form-group already_account'>
                                <Link to='/login' id='already_account_btn'>
                                    I have an already <span> account</span>
                                </Link>
                            </div>
                    </form>
                <div className="globalPageWrapperCards_overlay"></div>
                </div>
                <div className="globalFullPaginationContainer">
                </div>
            </div>
        </div>
        </>
    );
}
 
export default RegisterPage;