import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

export default {
    async login(context, payload) {
        context.commit("isLoading", { isLoading: true });
        await axios
            .post(API_URL + "login", {
                email: payload.email,
                password: payload.password
            })
            .then(res => {
                if (res.status === 200) {
                    console.log('console.log from login res.data: ')
                    console.log(res.data);
                    console.log("res.data from login(token?): " + res.data.accessToken);
                    console.log("res.data from login(refreshToken?): " + res.data.refreshToken);
                    if (res.data.accessToken || res.data.refreshToken) {
                        localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
                        localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
                    }
                    context.commit("setLoggedInUser", {
                        user: res.data.user,
                        isLoggedIn: true,

                    });
                    context.commit('setRefreshToken', { refreshToken: res.data.refreshToken, })
                    context.commit("setAccessToken", { accessToken: res.data.accessToken, });
                    context.commit("isLoading", { isLoading: false });
                }
            })
            .catch(err => {
                localStorage.removeItem("accessToken");
                console.log(err.response.data.message);
                context.commit("isLoading", { isLoading: false });
                context.commit("showError", {
                    error: err.response.data.message
                });
                const error = new Error(
                    err.response.data.message ||
                    "Failed to authenticate. Check your login data."
                );
                throw error;
            });
    },
    async signup(context, payload) {
        context.commit("isLoading", { isLoading: true });
        const data = {
            username: payload.username,
            email: payload.email,
            password: payload.password
        };
        await axios
            .post(API_URL + "signup", data)
            .then(res => {
                console.log(res.data);
                context.commit("setLoggedInUser", {
                    userId: res.data.userId
                });
                context.commit("isLoading", { isLoading: false });
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                console.log(err.response.data.data[0].msg);
                context.commit("isLoading", { isLoading: false });
                context.commit("showError", {
                    error: err.response.data.data[0].msg
                });
                const error = new Error(
                    err.message || "Failed to authenticate. Check your login data."
                );
                throw error;
            });
    },
    async getUsers({ commit }) {
        const accessToken = localStorage.getItem('accessToken');
        console.log('access token from get users: ')
        console.log(accessToken)
        await axios
            .get(API_URL + "users", {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
            .then(res => {
                if (res.status === 200) {
                    commit("getUsers", {
                        users: res.data.users
                    });
                }
            })
            .catch(err => {
                console.log('err from actions js users');
                console.log(err);
            });
    },
    async logout(context) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("users");
        context.commit("setLoggedInUser", {
            isAuth: false
        });
    },
    refreshToken: async({ state, commit }) => {
        const refreshUrl = API_URL + "refresh/";
        try {
            await axios
                .post(refreshUrl, { refresh: state.refreshToken })
                .then(response => {
                    if (response.status === 200) {
                        commit("setAccessToken", response.data.accessToken);
                    }
                });
        } catch (e) {
            console.log(e.response);
        }
    },
};