import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
           onLogin(true);
           toast.success("You are now logged in");
           navigate("/spots", {replace: true})
           console.log("You are now connected")
        } catch (error) { 
            setError("No account has this address or informations does not match, please retry.");
            toast.error("No account has this address or informations does not match, please retry.");
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
                <div className="text_infos">
                        <h1>LOGIN</h1>
                        <h2 className="fade-in">Fill out the form to log in</h2>
                    </div>
                <form className="formContainer" onSubmit={handleSubmit}>
                    <div className="form_overlay"></div>
            
                    <Field 
                        label="Email" 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="Email adress"
                        value={credentials.email} 
                        error={error}
                    />

                    <Field 
                        label="Password" 
                        name="password" 
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Password" 
                        value={credentials.password} 
                        error={error}
                    />

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