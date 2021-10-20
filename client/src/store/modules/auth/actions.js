import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

export default {
    async login(context, payload) {
        const data = {
            email: payload.email,
            password: payload.password,
        };
        await axios
            .post(API_URL + "login", data)
            .then(res => {
                console.log(res.data);
                console.log("res.data from login(token?): " + res.data.token);
                if (res.data.token) {
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                }
                context.commit("setAuth", {
                    // userId: res.data.userId,
                    isAuth: true,
                    token: res.data.token
                });
                context.commit("setUser", {
                    // userId: res.data.userId,
                    user: res.data.user
                });
            })
            .catch(err => {
                localStorage.removeItem("token");
                console.log(err);
                const error = new Error(
                    err.message || "Failed to authenticate. Check your login data."
                );
                throw error;
            });
    },
    async signup(context, payload) {
        const data = {
            username: payload.username,
            email: payload.email,
            password: payload.password
        };
        await axios
            .post(API_URL + "signup", data)
            .then(res => {
                console.log(res.data);
                context.commit("setUser", {
                    userId: res.data.userId
                });
            })
            .catch(err => {
                console.log(err);
                const error = new Error(
                    err.message || "Failed to authenticate. Check your login data."
                );
                throw error;
            });
    },
    async getUsers({ commit, state }) {
        await axios
            .get(API_URL + "users", {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            .then(res => {
                commit("getUsers", {
                    users: res.data.users
                });
                console.log(res.data.users);
            })
            .catch(err => {
                console.log(err);
            });
    },
    logout(context) {
        localStorage.removeItem("token");
        context.commit("setAuth", {
            isAuth: false
        });
    }
};