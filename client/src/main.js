import Vue from 'vue';
import Vuex from "vuex";
import App from './App.vue';
import router from './router/index.js';
import Vuelidate from 'vuelidate'
import store from "./store/index.js";

Vue.use(Vuex);
Vue.use(Vuelidate)
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