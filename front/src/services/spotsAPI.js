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

// Find All Spots of the application
    
function findAll() {
    return API 
        .get("/spots")
        .then(response => response.data['hydra:member'])
};

// Find One spot of the application

const findOne = async (id) => {
    return API
        .get(`/spots/${id}`)
        .then(response => response.data)
};

// Create a new Spot

const createSpot = (credentials) => {
    // API.Authorization = ""
    return API 
        .post('/spots', credentials)
        .then(response => response.data)
}

// Update a Spot

// function updateSpot(id, credentials) {
//     credentials = {
//         data: credentials,
//         user: 'exemple'
//     }
//     return API
//         .put(`/spots/${id}`, credentials)
//         .then(response => response.data)
// };

function updateSpot(id, credentials) {
    return API
        .put(`/spots/${id}`, credentials)
        .then(response => response.data)
};

// Delete a Spot by the ID of the application

function deleteSpots(id) {
    return API
    .delete(`/spots/${id}`);
}

// All media objects of the application

function findAllMedia() {
    return API 
        .get("/media_objects")
        .then(response => response.data
    )
};


function createMedia(credentials) {
    return API
        .post("/media_objects", credentials, {
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //   'Content-Type': 'multipart/form-data'
            // }}
        })
        .then(response => response.data)
}


const exportAPI =  {
    findAll,
    findAllCategories,
    findAllTypes,
    findAllFlats,
    delete: deleteSpots,
    findOne,
    createSpot,
    updateSpot,
    createMedia,
    findAllMedia
};

export default exportAPI;