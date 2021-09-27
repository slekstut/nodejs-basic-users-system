import Vue from 'vue'
import Router from 'vue-router';
import Main from '@/components/Main.vue';

Vue.use(Router);

export default new Router ({
 mode: 'history',
 routes: [
  {
   path: '/',
   name: 'Main',
   component: Main
  },
  {
   path: '/login',
   name: 'Login',
   component: () => import('@/views/Login.vue')
  },
  {
   path: '/signup',
   name: 'Signup',
   component: () => import('@/views/Signup.vue')
  },
  {
   path: '/secret-page',
   name: 'Secret Page',
   component: () => import('@/views/SecretPage.vue')
  }
 ]
})