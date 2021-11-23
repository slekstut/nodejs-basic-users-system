import axios from "axios";
import store from "./store/index";
import router from "./router/index";

export default function axiosSetUp() {
    // point to your API endpoint
    axios.defaults.baseURL = "http://localhost:3000/auth/";
    // Add a request interceptor

    axios.interceptors.request.use(

        function(config) {
            // Do something before request is sent
            // use getters to retrieve the access token from vuex 
            // store
            console.log('axios.js accessToken: ')
            console.log(accessToken)
                // const accessToken = store.getters.accessToken;
            console.log('config from axios.js: ');
            console.log(config);
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        function(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        async function(error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const originalRequest = error.config;
            if (
                error.response.status === 401 &&
                originalRequest.url.includes("refreshtoken")
            ) {
                store.commit("clearUserData");
                router.push("/login");
                return Promise.reject(error);
            } else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await store.dispatch("refreshToken");
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );
}