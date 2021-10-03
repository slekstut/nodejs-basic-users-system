export default {
 userId(state) {
   return state.userId;
 },
 token(state) {
   return state.token;
 },
 users(state) {
   return state.users;
 },
 userIsAuthenticated(state) {
   return state.isLoggedIn;
 }
};