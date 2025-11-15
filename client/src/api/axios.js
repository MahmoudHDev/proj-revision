// Interceptor
// Interceptor: An interceptor is like a security guard standing in the middle of the door:
// Request Interceptor → runs before sending the request
// Response Interceptor → runs after receiving the response
// They let you automatically modify requests or handle responses without rewriting code everywhere.


import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5001/api" });

// Automatically attach token --> For Requests.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("site");
    config.headers["Content-Type"] = "application/json";

    if (token && token !== "") config.headers.Authorization = `Bearer ${token}`;
    return config;
});


// Handle expired token  --> For REsponses.
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('site');
        window.location.href('/login')
    };
    return Promise.reject(error);
});


export default api;