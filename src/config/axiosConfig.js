import Axios from "axios";

Axios.defaults.withCredentials = true
export const apiConnection = Axios.create({
    baseURL:"backend-server-production-c1b9.up.railway.app"
})