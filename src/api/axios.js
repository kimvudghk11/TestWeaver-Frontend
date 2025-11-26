import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

instance.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log("[API ERROR]", err.response);
        throw err.response?.data || err;
    }
);

export default instance;