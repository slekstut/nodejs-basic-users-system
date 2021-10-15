import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: null,
            token: null || localStorage.getItem('token'),
            isLoggedIn: false,
            users: []
        };
    },
    mutations,
    actions,
    getters
};