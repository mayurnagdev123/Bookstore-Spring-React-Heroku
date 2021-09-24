import axios from "axios"

//the default link to search for genres
const axios_instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1'
});
//http://localhost:8181/
export const axios_book_instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes'
})
export const axios_register_login_user = axios.create({
    baseURL: '/public',
    withCredentials: true,
    headers: { "content-type": "application/json" },
    method: 'POST'
})
export const axios_secured_post_requests = axios.create({
    baseURL: '/protected',
    headers: { "content-type": "application/json" },
    method: 'POST',
    withCredentials: true
})
export const axios_secured_delete_requests = axios.create({
    baseURL: '/protected',
    headers: { "content-type": "application/json" },
    method: 'DELETE',
    withCredentials: true
})
export const axios_secured_get_requests = axios.create({
    baseURL: '/protected',
    method: 'GET',
    withCredentials: true
})
export default axios_instance;