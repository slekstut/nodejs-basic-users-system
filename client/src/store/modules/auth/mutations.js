export default {
 setUser(state, payload) {
   state.token = payload.token;
   state.userId = payload.userId;
   state.tokenExpiration = payload.tokenExpiration;
 },
 setUsers(state, payload) {
   state.users = payload.users;
   state.token = payload.token;
 },
 setAuth(state, payload) {
   state.isLoggedIn = payload.isAuth;
 }
};