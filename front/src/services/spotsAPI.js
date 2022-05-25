import axios from "axios";
import API from "./api";

function findAll() {
    return API 
        .get("/spots")
        .then(response => response.data['hydra:member'])
};

function findOne(id) {
    return API
        .get(`/spots/${id}`)
        .then(response => response.data)
};



function deleteSpots(id) {
    return axios 
    .delete("http://localhost:8000/api/spots/" + id);
}

const exportAPI =  {
    findAll,
    delete: deleteSpots,
    findOne,
};

export default exportAPI;