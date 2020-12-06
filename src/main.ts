import axios from 'axios'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

axios.interceptors.request.use(config => {
    store.commit('fetchLoading', true)
    return config
})
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit('fetchLoading', false)
    }, 1000)
    return config
})
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
