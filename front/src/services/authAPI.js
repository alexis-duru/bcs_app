import axios from 'axios';
import API from "./api";
import jwtDecode from "jwt-decode"; 

// import spotAPI from '../services/spotsAPI';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return API
        .post("/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            
            window.localStorage.setItem('authToken', token);

            axios.defaults.headers["Authorization"] = "Bearer " + token;

    });
}

function setup() {
    
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

const exportAPI = {
    authenticate,
    logout,
    setup,
    isAuthenticated
}

export default exportAPI