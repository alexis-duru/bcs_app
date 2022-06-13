// import axios from "axios";
import API from "./api";

function findAllUsers() {
    return API 
        .get("/users")
        .then(response => response.data['hydra:member'])
};

const findOneUser = async (id) => {
    return API
        .get(`/users/${id}`)
        .then(response => response.data)
};

const createUser = (credentials) => {
    return API 
        .post('/users', credentials)
        .then(response => response.data)
}


function deleteUser(id) {
    return API
    .delete(`/users/${id}`);
}

const exportAPI =  {
    findAllUsers,
    findOneUser,
    delete: deleteUser,
    createUser,
};

export default exportAPI;