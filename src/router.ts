import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import columndetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue';
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                redirectAlreadyLogin: true
            }
        },
        {
            path: '/columns/:id',
            name: 'column',
            component: columndetail
        },
        {
            path: '/CP',
            name: 'cp',
            component: CreatePost,
            meta: {
                requireLogin: true
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireLogin && !store.state.user.isLogin) {
        next({ name: 'login' })
    } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
        next('/')
    } else {
        next()
    }
})
export default router