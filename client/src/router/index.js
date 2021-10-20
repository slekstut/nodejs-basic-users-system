import Vue from 'vue'
import Router from 'vue-router';
import Main from '@/components/Main.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('@/views/Login.vue')
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () =>
                import ('@/views/Signup.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: () =>
                import ('@/views/Home.vue'),
            meta: {
                requiresAuth: false
            }
        },
        { path: '*', redirect: '/' }
    ]
})

router.beforeEach((to, _from, next) => {
    const isLoggedIn = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router;