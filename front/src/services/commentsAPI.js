import API from "./api";

// READ ALL COMMENTS

function findAllComments () {
    return API
        .get("/comments")
        .then(response => response.data['hydra:member'])
}

// DELETE A COMMENT BY ID

function deleteComments(id) {
    return API
        .delete(`/comments/${id}`);
}

// CREATE A COMMENT

function createComments(credentials) {
    try {
        return API
        .post("/comments", credentials)
        .then(response => response.data);
    } catch (error) {
        console.log('sorry you can not create a comment, access denied');
    }
}

const exportAPI = {
    findAllComments,
    deleteComments,
    createComments
}

export default exportAPI;