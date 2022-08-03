import API from "./api";

function findAllComments () {
    return API
        .get("/comments")
        .then(response => response.data['hydra:member'])
}

const exportAPI = {
    findAllComments
}

export default exportAPI;