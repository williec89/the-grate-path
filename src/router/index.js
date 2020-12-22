import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () =>
            import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
    },
    {
        path: '/signin',
        name: 'Signin',
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
