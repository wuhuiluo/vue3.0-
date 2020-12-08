import axios from 'axios'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

axios.interceptors.request.use(config => {
    store.commit('fetchLoading', true)
    store.commit('setError',{ status: false ,message: '' })
    return config
})
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit('fetchLoading', false)
    }, 1000)
    return config
}, e => {
    // console.log(e.response);
    const { error } = e.response.data
    store.commit('setError',{ status: true,message: error })
    store.commit('fetchLoading',false)
    return Promise.reject(error)
})
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
