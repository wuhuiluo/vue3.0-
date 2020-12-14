import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import PostDetail from './views/PostDetail.vue';
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import columndetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue';
import axios from 'axios'
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
            path: '/posts/:id',
            name: 'post',
            component: PostDetail
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/SignUp.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePost,
            meta: {
                requiredLogin: true
            }
        }
    ]
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 第一版本 没有验证 token
    // 是否需要 Login 且 没有登录
    // if (to.meta.requiredLogin && !store.state.user.isLogin) {
    //   next({ name: 'login' })
    // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    //   next({ name: 'home' })
    // } else {
    //   next()
    // }
    const { user, token } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta
    if (!user.isLogin) {
      // 没有登录
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        store.dispatch('fetchCurrentUser').then(() => {
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        }).catch(err => {
          console.log(err)
          store.commit('logout')
          next('login')
        })
      } else {
        if (requiredLogin) {
          next('login')
        } else {
          next()
        }
      }
    } else {
      // 已经登录
      if (redirectAlreadyLogin) {
        next('/')
      } else {
        next()
      }
    }
  })
// router.beforeEach((to, from, next) => {
//     const { user, token } = store.state;
//     const { requiredLogin, redirectAlreadyLogin } = to.meta;
//     if (!user.isLogin) {
//         if (token) {
//             axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//             store
//                 .dispatch("fetchCurrentUser")
//                 .then(() => {
//                     if (redirectAlreadyLogin) {
//                         next("/");
//                     } else {
//                         next();
//                     }
//                 })
//                 .catch(e => {
//                     console.error(e);
//                     store.commit("logout");
//                     next("login");
//                 });
//         } else {
//             if (requiredLogin) {
//                 next("login");
//             } else {
//                 next();
//             }
//         }
//     } else {
//         if (redirectAlreadyLogin) {
//             next("/");
//         } else {
//             next();
//         }
//     }
// });
// router.beforeEach((to, from, next) => {
//     const { user, token } = store.state
//     const { requireLogin, redirectAlreadyLogin } = to.meta
//     // console.log(requireLogin);
//     // console.log(redirectAlreadyLogin);
//     // console.log(user.isLogin);
//     // console.log(token);
//     if (!user.isLogin) {
//         if (token) {
//             Axios.defaults.headers.common.Authorization = `Bearer ${token}`
//             store.dispatch('fetchCurrentUser').then(() => {
//                 if (redirectAlreadyLogin) {
//                     next('/')
//                 } else {
//                     next()
//                 }
//             }).catch(e => {
//                 console.error(e)
//                 store.commit('logout')
//                 next('login')
//             })
//         } else {
//             if (requireLogin) {
//                 next('login')
//             } else {
//                 next()
//             }
//         }
//     } else {
//         if (redirectAlreadyLogin) {
//             next('/')
//         } else {
//             next()
//         }
//     }
// })
export default router