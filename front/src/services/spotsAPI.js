// import axios from "axios";
import API from "./api";

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
    return API  
        .post('/spots', credentials)
        .then(response => response.data)
}

function deleteSpots(id) {
    return API
    .delete(`/spots/${id}`);
}

const exportAPI =  {
    findAll,
    delete: deleteSpots,
    findOne,
    createSpot
};

export default exportAPI;