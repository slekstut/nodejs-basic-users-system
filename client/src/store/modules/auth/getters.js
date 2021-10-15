export default {
    userId: state => state.userId,
    token: state => state.token,
    allUsers: state => state.users,
    userIsAuthenticated: state => state.isLoggedIn
};