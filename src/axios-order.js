import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://asit-react-app.firebaseio.com/",
});

export default axiosInstance;
