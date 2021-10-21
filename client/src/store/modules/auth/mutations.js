export default {
    setUser(state, user) {
        state.user = user;
    },
    setAuth(state, payload) {
        state.isLoggedIn = payload.isAuth;
        state.token = payload.token;
    },
    getUsers(state, payload) {
        state.users = payload.users
    },
    error(state, data) {
        return state.error = data;
    }

};