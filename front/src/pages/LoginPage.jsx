import React from 'react';
import { useState } from 'react';

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();

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
                        <label htmlFor="_username">Email adress</label>
                        <input 
                            value={credentials.username} 
                            onChange={handleChange}
                            type="email"  
                            placeholder="email adress" 
                            name="username" 
                            className="form-control" />
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