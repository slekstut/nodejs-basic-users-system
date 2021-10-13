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
                context.commit('setAuth', {
                    // userId: res.data.userId,
                    isAuth: true
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
    },
    async loadUsers(context) {
        const token = context.getters.token;
        await axios.get('http://localhost:3000/auth/all-users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            context.commit('setUsers', {
                users: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
    },
    logout(context) {
        context.commit('setAuth', {
            isAuth: false
        })
    }
};