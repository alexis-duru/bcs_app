// import axios from "axios";
import API from "./api";

// FIND ALL USERS OF THE APP

 function findAllUsers() {
    return API 
        .get("/users")
        .then(response => response.data['hydra:member'])
};

// FIND ONE USER BY ID

const findOneUser = async (id) => {
    return API
        .get(`/users/${id}`)
        .then(response => response.data)
};

// FIND SPOT BY THE ID OF THE USER - PERFORMANCE SOLUTION

const findSpotOfUser = (id) => {
    return API
        .get(`/users/${id}/spots`)
        .then(response => response.data['hydra:member'])
};

// CREATE A NEW USER

const createUser = (credentials) => {
    return API 
        .post('/users', credentials)
        .then(response => response.data)
}

// DELETE A USER OF THE APP

function deleteUser(id) {
    return API
    .delete(`/users/${id}`);
}

const exportAPI =  {
    findAllUsers,
    findOneUser,
    deleteUser,
    createUser,
    findSpotOfUser
};

export default exportAPI;