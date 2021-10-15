export default {
    setUser(state, payload) {
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    setAuth(state, payload) {
        state.isLoggedIn = payload.isAuth;
        state.token = payload.token;
    },

};