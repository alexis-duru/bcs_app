// import axios from "axios";
import API from "./api";

// Find All Users of the application

 function findAllUsers() {
    return API 
        .get("/users")
        .then(response => response.data['hydra:member'])
};

// Find One User by the ID of the application
const findOneUser = async (id) => {
    return API
        .get(`/users/${id}`)
        .then(response => response.data)
};

// const getUserId 


// find Spots by the ID of the user - Perf solution

const findSpotOfUser = (id) => {
    return API
        .get(`/users/${id}/spots`)
        .then(response => response.data['hydra:member'])
};

// Create a new User

const createUser = (credentials) => {
    return API 
        .post('/users', credentials)
        .then(response => response.data)
}

// Delete a User by the ID of the application

function deleteUser(id) {
    return API
    .delete(`/users/${id}`);
}

const exportAPI =  {
    findAllUsers,
    findOneUser,
    delete: deleteUser,
    createUser,
    findSpotOfUser
};

export default exportAPI;