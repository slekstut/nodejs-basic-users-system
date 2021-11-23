import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: null,
            user: null || JSON.parse(localStorage.getItem('user')),
            accessToken: null || localStorage.getItem('accessToken'),
            refreshToken: null || localStorage.getItem('refreshToken'),
            isLoggedIn: false,
            users: [],
            error: '',
            isLoading: false
        };
    },
    mutations,
    actions,
    getters
};