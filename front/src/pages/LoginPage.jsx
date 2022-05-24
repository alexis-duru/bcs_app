import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import spotsAPI from '../services/spotsAPI';

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const email = event.currentTarget.name;

        setCredentials({...credentials, [email]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const token = await axios
                .post("http://localhost:8000/api/login_check", credentials)
                .then(response => response.data.token)
                // .then(response => console.log(response));
            setError('');

            window.localStorage.setItem('authToken', token);

            axios.defaults.headers["Authorization"] = "Bearer " + token;

            const data = await spotsAPI.findAll();
            console.log(data)
        } catch (error) { 
            console.log(error.response + "sorry, you can't access")
            setError("Aucun compte ne possède cette adresse");
        }

        console.log(credentials);
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