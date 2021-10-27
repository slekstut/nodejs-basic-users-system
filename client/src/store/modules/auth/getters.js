export default {
    userId: state => state.userId,
    user: state => state.user,
    token: state => state.token,
    allUsers: state => state.users,
    userIsAuthenticated: state => state.isLoggedIn,
    error: state => state.error
};