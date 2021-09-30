import axios from 'axios';

export default {
 async login(context, payload) {
  const data = {
   email: payload.email,
   password: payload.password,
  }
  await axios.post('http://localhost:3000/auth/login', data)
   .then(res => {
    console.log(res.data);
    context.commit('setUser', {
     userId: res.data.userId,
    });
   })
   .catch(err => {
    console.log(err);
    const error = new Error(err.message || 'Failed to authenticate. Check your login data.');
    throw error;
   });
 },
 async signup(context, payload) {
  const data = {
   username: payload.username,
   email: payload.email,
   password: payload.password,
  }
  await axios.post('http://localhost:3000/auth/signup', data)
   .then(res => {
    console.log(res.data);
    context.commit('setUser', {
     userId: res.data.userId,
    });
   })
   .catch(err => {
    console.log(err);
    const error = new Error(err.message || 'Failed to authenticate. Check your login data.');
    throw error;
   });
 }
};