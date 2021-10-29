import Vue from 'vue';
import Vuex from "vuex";
import App from './App.vue';
import router from './router/index.js';
import Vuelidate from 'vuelidate'
import store from "./store/index.js";
import FlashMessage from '@smartweb/vue-flash-message';

Vue.use(Vuex);
Vue.use(Vuelidate)
Vue.use(FlashMessage);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
}).$mount('#app')