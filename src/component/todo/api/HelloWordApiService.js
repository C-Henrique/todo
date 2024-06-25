import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})
export const getHelloWordApi = () => apiClient.get('/hello-world');

export const getNameHelloWordApi = (username) => apiClient.get(`/hello-world/path-variable/${username}`)