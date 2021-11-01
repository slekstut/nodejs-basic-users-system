import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import authModule from './modules/auth/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: authModule
    },
    plugins: [createPersistedState()]
});

export default store;