export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    setAuth(state, payload) {
        state.isLoggedIn = payload.isAuth;
    }
};