import Vue from 'vue'
import Router from 'vue-router';
import Main from '@/components/Main.vue';

Vue.use(Router);

const router = new Router ({
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
   path: '/auth/all-users',
   name: 'Secret Page',
   component: () => import('@/views/SecretPage.vue')
  },
  { path: '*', redirect: '/' }
 ]
})

router.beforeEach((to, from, next) => {
 const publicPages = ['/', '/login', '/signup'];
 const authRequired = !publicPages.includes(to.path);

 if (authRequired) {
  return next('/login')
 }

 next();
});

export default router;