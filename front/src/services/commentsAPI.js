import API from "./api";

function findAllComments () {
    return API
        .get("/comments")
        .then(response => response.data['hydra:member'])
}

function deleteComments(id) {
    return API
        .delete(`/comments/${id}`);
}

const exportAPI = {
    findAllComments,
    deleteComments
}

export default exportAPI;