import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

export default {
    async login(context, payload) {
        await axios
            .post(API_URL + "login", {
                email: payload.email,
                password: payload.password,
            })
            .then(res => {
                console.log(res.data);
                console.log("res.data from login(token?): " + res.data.token);
                if (res.data.token) {
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                }
                context.commit("setAuth", {
                    isAuth: true,
                    token: res.data.token
                });
                context.commit("setUser", {
                    user: res.data.user
                });

            })
            .catch(err => {
                localStorage.removeItem("token");
                console.log('response from actions js: ');
                console.log(err.response.data.message);
                context.commit('showError', {
                    error: err.response.data.message
                });
                const error = new Error(
                    err.response.data.message || "Failed to authenticate. Check your login data."
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
                localStorage.removeItem("token");
                console.log(err.response.data.data[0].msg);
                context.commit('showError', {
                    error: err.response.data.data[0].msg
                });
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
                console.log('cn log from action js: ');
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