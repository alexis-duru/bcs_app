import axios from 'axios';
import API from "./api";
import jwtDecode from "jwt-decode"; 

// DECONNEXION (SUPPRESION DU TOKEN DU LOCALSTORAGE ET SUR AXIOS

function logout() {
    window.localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
    console.log('You have been successfully disconnected')
}

// REQUÊTE HTTP D'AUTHENTIFICATION ET STOCKAGE DU TOKEN SUR AXIOS

const authenticate = async (credentials) => {
    await API
        .post("/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('token', token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;
    });
}

// MISE EN PLACE LORS DU CHARGEMENT DE L'APPLICATION

function setup() {
    
    const token = window.localStorage.getItem("token");

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }
    }
}

// PERMET DE SAVOIR SI ON EST AUTHENTIFIÉ OU PAS

function isAuthenticated() {
    const token = window.localStorage.getItem("token");

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
    setup,
    authenticate,
    isAuthenticated,
    logout
}

export default exportAPI;