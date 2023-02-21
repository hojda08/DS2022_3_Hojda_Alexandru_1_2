import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    users: '/users'
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.users, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.users + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.users , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteUser(username, callback){
    let request = new Request(HOST.backend_api + endpoint.users + "/" + username , {
        method: 'DELETE'
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function putUser(username,user,callback){

    let request = new Request(HOST.backend_api + endpoint.users + "/" + username , {
            method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(user)
        });

        console.log("URL: " + request.url);

        RestApiClient.performRequest(request, callback);

}

function loginUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.users + '/login' , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function postDevice(device, callback){
    let request = new Request(HOST.backend_api + '/devices' , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getDevices(callback) {
    let request = new Request(HOST.backend_api + '/devices' , {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    loginUser,
    postDevice,
    getDevices
};
