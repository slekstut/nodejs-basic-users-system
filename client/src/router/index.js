import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "Main",
            component: () =>
                import ( /*webpackChunkName: "ExperienceDetails"*/ "@/views/Main.vue")
        },
        {
            path: "/login",
            name: "Login",
            component: () =>
                import ( /*webpackChunkName: "ExperienceDetails"*/ "@/views/Login.vue")
        },
        {
            path: "/signup",
            name: "Signup",
            component: () =>
                import ( /*webpackChunkName: "ExperienceDetails"*/ "@/views/Signup.vue")
        },
        {
            path: "/users",
            name: "Users",
            component: () =>
                import ( /*webpackChunkName: "ExperienceDetails"*/ "@/views/Users.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/404",
            name: "NotFound",
            component: () =>
                import ( /*webpackChunkName: "ExperienceDetails"*/ "@/views/NotFound.vue")
        },
        { path: "*", redirect: "/404" }
    ]
});

router.beforeEach((to, _from, next) => {
    const isLoggedIn = localStorage.getItem("token");
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;