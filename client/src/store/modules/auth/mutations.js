export default {
    // setUser(state, user) {
    //     state.user = user;
    // },
    // setAuth(state, payload) {
    //     state.isLoggedIn = payload.isAuth;
    // },
    getUsers(state, payload) {
        state.users = payload.users
    },
    showError(state, payload) {
        state.error = payload.error;
    },
    isLoading(state, payload) {
        state.isLoading = payload.isLoading;
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken;
    },
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken;
    },
    setLoggedInUser(state, payload) {
        state.user = payload.user;
        state.isLoggedIn = payload.isLoggedIn;
    },
    clearUserData(state) {
        state.refreshToken = null;
        state.accessToken = null;
        state.user = null;
        state.isLoggedIn = false;
    }

};