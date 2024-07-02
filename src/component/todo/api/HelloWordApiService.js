import { apiClient } from "./apiClient";


export const getHelloWordApi = () => apiClient.get('/hello-world');

export const getNameHelloWordApi = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`)
export const executeBasicAuthenticationService = (token) => apiClient.get('/basicauth')