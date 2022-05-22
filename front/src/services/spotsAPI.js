import axios from "axios";

function findAll() {
    return axios 
        .get("http://localhost:8000/api/spots")
        .then(response => response.data['hydra:member'])
};

function deleteSpots(id) {
    return axios 
    .delete("http://localhost:8000/api/spots/" + id);
}

const exportAPI =  {
    findAll,
    delete: deleteSpots,
};

export default exportAPI;