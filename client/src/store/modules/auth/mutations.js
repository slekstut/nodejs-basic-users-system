export default {
    setUser(state, user) {
        state.user = user;
    },
    setAuth(state, payload) {
        state.isLoggedIn = payload.isAuth;
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
    },
    getUsers(state, payload) {
        state.users = payload.users
    },
    showError(state, payload) {
        state.error = payload.error;
    },
    isLoading(state, payload) {
        state.isLoading = payload.isLoading;
    }

};