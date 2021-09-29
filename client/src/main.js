import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from "./store/index";

Vue.use(Vuelidate)
Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')