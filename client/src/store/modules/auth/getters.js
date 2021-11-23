export default {
    userId: state => state.userId,
    user: state => state.user,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
    allUsers: state => state.users,
    userIsAuthenticated: state => state.isLoggedIn,
    error: state => state.error,
    isLoading: state => state.isLoading
};