import axios from 'axios';
import { createStore, Commit } from 'vuex';
interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
}

interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}

export interface PostProps {
    _id: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps;
    createdAt: string;
    column: string;
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
    // commit('fetchLoading',false)
}
export interface GlobalDataProps {
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        loading: true,
        columns: [],
        posts: [],
        user: {
            isLogin: true,
            name: 'whl',
            columnId: 1
        }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: "米斯特吴" }
            // state.user.isLogin = true
            // state.user.name = "wuhuiluo"
        },
        createPost(state, newPost) {
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
        }
    },
    actions: {
        async fetchColumns({ commit }) {
            getAndCommit('/api/api/columns', 'fetchColumns', commit)
            // const { data } = await axios.get('/api/api/columns')
            // commit('fetchColumns', data)
        },
        async fetchColumn({ commit }, cid) {
            getAndCommit(`/api/api/columns/${cid}`, 'fetchColumn', commit)
            // console.log(cid);
            // const { data } = await axios.get('/api/api/columns/' + cid)
            // commit('fetchColumn', data)
        },
        async fetchPosts({ commit }, cid) {
            getAndCommit(`/api/api/columns/${cid}/posts`, 'fetchPosts', commit)
            // const { data } = await axios.get(`/api/api/columns/${cid}/posts`)
            // commit('fetchPosts', data)
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
