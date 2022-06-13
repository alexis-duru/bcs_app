// import axios from "axios";
import API from "./api";

function findAllCategories() {
    return API 
        .get("/categories")
        .then(response => response.data['hydra:member'])
};

function findAllTypes() {
    return API 
        .get("/types")
        .then(response => response.data['hydra:member'])
};

function findAllFlats() {
    return API
        .get("/flats")
        .then(response => response.data['hydra:member'])
}

    
function findAll() {
    return API 
        .get("/spots")
        .then(response => response.data['hydra:member'])
};

const findOne = async (id) => {
    return API
        .get(`/spots/${id}`)
        .then(response => response.data)
};

const createSpot = (credentials) => {
    // API.Authorization = ""
    return API 
        .post('/spots', credentials)
        .then(response => response.data)
}

function updateSpot(id, credentials) {
    return API
        .put(`/spots/${id}`, credentials)
        .then(response => response.data)
};


function deleteSpots(id) {
    return API
    .delete(`/spots/${id}`);
}

const exportAPI =  {
    findAll,
    findAllCategories,
    findAllTypes,
    findAllFlats,
    delete: deleteSpots,
    findOne,
    createSpot,
    updateSpot
};

export default exportAPI;