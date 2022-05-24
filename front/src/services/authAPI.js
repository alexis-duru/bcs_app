import axios from 'axios';
import spotAPI from '../services/spotsAPI';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
    // spotAPI.findAll().then(console.log)
}

function authenticate(credentials) {
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            
            window.localStorage.setItem('authToken', token);

            axios.defaults.headers["Authorization"] = "Bearer " + token;

            // spotAPI.findAll().then(console.log)
    });
}

const exportAPI = {
    authenticate,
    logout,
}

export default exportAPI