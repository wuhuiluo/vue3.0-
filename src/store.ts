import axios, { AxiosRequestConfig } from 'axios';
import { createStore, Commit } from 'vuex';
import { arrToObj, objToArr } from './hooks/help'
export interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P
}

interface ListProps<P> {
    [id: string]: P
}


export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    description?: string;
    avatar?: ImageProps;
}
export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
    fitUrl?: string;
}

export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}

export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string | UserProps;
    isHTML?: boolean;
}
interface GlobalErrorProps {
    status: boolean;
    message?: string;
}

export interface GlobalDataProps {
    token: string;
    error: GlobalErrorProps;
    loading: boolean;
    columns: {
        data: ListProps<ColumnProps>
    };
    posts: {
        data: ListProps<PostProps>
    };
    user: UserProps;
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

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig) => {
    const { data } = await axios(url, config)
    commit(mutationName, data)
    return data
}
const store = createStore<GlobalDataProps>({
    state: {
        error: {
            status: false
        },
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: { data: {} },
        posts: { data: {} },
        user: {
            isLogin: false,
        }
    },
    mutations: {
        deletePost(state, { data }) {
            delete state.posts.data[data._id]
        },
        updatePost(state, { data }) {
            console.log(data._id);
            state.posts.data[data._id] = data
        },
        fetchColumns(state, rawData) {
            // console.log(state.columns);
            const { data } = state.columns
            const { list, count, currentPage } = rawData.data
            // console.log(list, count, currentPage);
            state.columns = {
                data: { ...data, ...arrToObj(list) }
            }
            // console.log(state.columns.data);
            // state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            state.columns.data[rawData.data._id] = rawData.data
            // console.log(state.columns.data[rawData.data._id]);
            //    console.log(rawData);
        },
        fetchPosts(state, rawData) {
            const { data } = state.posts
            const { list, count, currentPage } = rawData.data
            state.posts = {
                data: { ...data, ...arrToObj(list) }
            }
            // console.log(state.posts.data);
        },

        fetchPost(state, rawData) {
            state.posts.data[rawData.data._id] = rawData.data
            // console.log(state.posts.data);
            // console.log(rawData);
            // state.posts = rawData.data
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
        },
        createPost(state, rawData) {
            // console.log(rawData);
            state.posts.data[rawData._id] = rawData
            // console.log(state.posts.data[rawData._id]);
        }
    },
    actions: {
        deletePost({ commit }, id) {
            return asyncAndCommit(`/api/api/posts/${id}`, 'deletePost', commit, {
                method: 'delete'
            })
        },

        updatePost({ commit }, { id, payload }) {
            return asyncAndCommit(`/api/api/posts/${id}`, 'updatePost', commit, {
                method: 'patch',
                data: payload
            })
        },
        fetchColumns({ commit }) {
            return getAndCommit('/api/api/columns', 'fetchColumns', commit)
            // const { data } = await axios.get('/api/api/columns')
            // commit('fetchColumns', data)
        },
        fetchColumn({ state, commit }, cid) {
            if (!state.columns.data[cid]) {
                return getAndCommit(`/api/api/columns/${cid}`, 'fetchColumn', commit)
            }
            // return getAndCommit(`/api/api/columns/${cid}`, 'fetchColumn', commit)
            // console.log(cid);
            // const { data } = await axios.get('/api/api/columns/' + cid)
            // commit('fetchColumn', data)
        },
        fetchPosts({ commit }, cid) {
            return getAndCommit(`/api/api/columns/${cid}/posts`, 'fetchPosts', commit)
            // const { data } = await axios.get(`/api/api/columns/${cid}/posts`)
            // commit('fetchPosts', data)
        },
        fetchPost({ commit }, cid) {
            return getAndCommit(`/api/api/posts/${cid}`, 'fetchPost', commit)
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
        getColumns: (state) => {
            return objToArr(state.columns.data)
        },
        getColumnById: (state) => (id: string) => {
            return state.columns.data[id]
        },
        getPostByCid: (state) => (cid: string) => {
            return objToArr(state.posts.data).filter(post => post.column === cid)
            // return state.posts.filter(post => post.column === cid)
        },
        getCurrentPost: (state) => (cid: string) => {
            return state.posts.data[cid]
        }
    }
})

export default store
