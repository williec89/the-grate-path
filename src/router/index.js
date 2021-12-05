import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Paths',
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "path" */ '../views/Paths.vue')
    },
    {
        path: '/add',
        name: 'Add',
        component: () =>
            import(/* webpackChunkName: "add" */ '../views/Add.vue')
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
