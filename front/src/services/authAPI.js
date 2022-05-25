import axios from 'axios';
import API from "./api";

// import spotAPI from '../services/spotsAPI';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    // spotAPI.findAll().then(console.log)
}

function authenticate(credentials) {
    return API
        .post("/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            
            window.localStorage.setItem('authToken', token);

            axios.defaults.headers["Authorization"] = "Bearer " + token;

            // spotAPI.findAll().then(console.log)
    });
}

// function setup() {
//     const token = window.localStorage.getItem("authToken")

//     if(token && ... )
// }

const exportAPI = {
    authenticate,
    logout,
    // setup,
}

export default exportAPI