import axios from 'axios';
import { createStore, Commit } from 'vuex';
export interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P
}
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
}
interface GlobalErrorProps {
    status: boolean;
    message?: string;
}
export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}

export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    // commit('fetchLoading',true)
    const { data } = await axios.get(url)
    commit(mutationName, data)
    return data
    // commit('fetchLoading',false)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}

export interface GlobalDataProps {
    error: GlobalErrorProps;
    token: string;
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        error: {
            status: false
        },
        token: localStorage.getItem('token') || '',
        loading: true,
        columns: [],
        posts: [],
        user: {
            isLogin: false,
        }
    },
    mutations: {
        // login(state) {
        //     state.user = { ...state.user, isLogin: true, name: "米斯特吴" }
        //     // state.user.isLogin = true
        //     // state.user.name = "wuhuiluo"
        // },
        createPost(state, newPost) {
            console.log(newPost);
            state.posts.push(newPost)
        },
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            state.columns = [rawData.data]
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list
        },
        fetchLoading(state, status) {
            state.loading = status
        },
        setError(state, e: GlobalErrorProps) {
            state.error = e
        },
        login(state, rowData) {
            const { token } = rowData.data
            state.token = token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        logout(state) {
            state.token = ''
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
        },
        fetchCurrentUser(state, rawData) {
            // console.log(rawData);
            state.user = {
                isLogin: true,
                ...rawData.data
            }
            // console.log(state.user.isLogin);
            // console.log(state.user);
        }
    },
    actions: {
        fetchColumns({ commit }) {
            return getAndCommit('/api/api/columns', 'fetchColumns', commit)
            // const { data } = await axios.get('/api/api/columns')
            // commit('fetchColumns', data)
        },
        fetchColumn({ commit }, cid) {
            return getAndCommit(`/api/api/columns/${cid}`, 'fetchColumn', commit)
            // console.log(cid);
            // const { data } = await axios.get('/api/api/columns/' + cid)
            // commit('fetchColumn', data)
        },
        fetchPosts({ commit }, cid) {
            return getAndCommit(`/api/api/columns/${cid}/posts`, 'fetchPosts', commit)
            // const { data } = await axios.get(`/api/api/columns/${cid}/posts`)
            // commit('fetchPosts', data)
        },
        fetchCurrentUser({ commit }) {
            return getAndCommit('/api/api/user/current', 'fetchCurrentUser', commit)
        },
        login({ commit }, payload) {
            return postAndCommit('/api/api/user/login', 'login', commit, payload)
        },
        createPost({ commit }, payload) {
            return postAndCommit('/api/api/posts', 'createPost', commit, payload)
        },
        loginAndFetch({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(column => column._id === id)
        },
        getPostByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        }
    }
})

export default store
