import React from 'react';
import { useState } from 'react';
import authAPI from '../services/authAPI';

const LoginPage = ({onLogin}) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        
        // const value = event.currentTarget.value;
        // const email = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
           await authAPI.authenticate(credentials);
           setError("");
           onLogin(true);
        } catch (error) { 
            // console.log(error.response + "sorry, you can't access")
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
                <form onSubmit={handleSubmit}>
                    <div className="form_overlay"></div>
                    <div className="form-group">
                        <label htmlFor="email">Email adress</label>
                        <input 
                            value={credentials.email} 
                            onChange={handleChange}
                            type="email"  
                            placeholder="email adress" 
                            name="email" 
                            className={"form-control" + (error && " is-invalid")} />
                        {error &&<p className="invalid-message">{error}</p>}
                    </div> 
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={credentials.password} 
                            onChange={handleChange}
                            type="password" 
                            placeholder="password" 
                            name="password" 
                            id="password" 
                            className="form-control" />
                    </div>
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