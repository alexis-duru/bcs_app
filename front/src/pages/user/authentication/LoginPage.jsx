import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
           console.log("You are now connected")
        } catch (error) { 
            setError("No account has this address");
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
                <form className="formContainer" onSubmit={handleSubmit}>
                    <div className="form_overlay"></div>
            
                    <Field label="Email adress" name="email" value={credentials.email} onChange={handleChange} placeholder="Email adress" error={error}  />

                    <Field label="Password" name="password" value={credentials.password} onChange={handleChange} type="password" placeholder="Password" error={error}/>

                    <div className="form-group">
                       <button type="submit" className="submitBtn">Login</button>
                    </div>

                    <div className='form-group already_account'>
                        <Link to='/register' id='already_account_btn'>
                            Create an <span> account</span>
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
 
export default LoginPage;