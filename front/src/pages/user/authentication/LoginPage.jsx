import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../../../components/forms/Field';
import authAPI from '../../../services/authAPI';

const LoginPage = ( { onLogin } ) => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({ ...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
           await authAPI.authenticate(credentials);
        //    setError("");
           onLogin(true);
           navigate("/spots", {replace: true})
        } catch (error) { 
            setError("Aucun compte ne possède cette adresse");
        }
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
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="form_overlay"></div>

                    <Field label="Email adress" name="email" value={credentials.email} onChange={handleChange} placeholder="Email adress" error={error}  />

                    <Field label="Password" name="password" value={credentials.password} onChange={handleChange} type="password" placeholder="Password" error={error}/>

                    <div className="form-group">
                       <button type="submit" className="submitBtn">Login</button>
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
 
export default LoginPage;