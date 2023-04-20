import Axios from "axios";

Axios.defaults.withCredentials = true
export const apiConnection = Axios.create({
    baseURL:"http://localhost:8080"
})