import axios from "axios";

export const getHelloWordApi = () => axios.get('http://localhost:8080/hello-world');

export const getNameHelloWordApi = (name) => axios.get(`http://localhost:8080/hello-world/path-variable/${name}`)