import { createRouter, createWebHistory } from 'vue-router'
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
            component: Login
        },
        {
            path: '/column/:id',
            name: 'column',
            component: columndetail
        },
        {
            path: '/CP',
            name: 'cp',
            component: CreatePost
        }
    ]
})

export default router