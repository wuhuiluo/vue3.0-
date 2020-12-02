import { createStore } from 'vuex';
import { ColumnProps, PostPros, testData, testPosts } from './hooks/testData'
interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
}
export interface GlobalDataProps {
    columns: ColumnProps[],
    posts: PostPros[],
    user: UserProps
}
const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {
            isLogin: false
        }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: "米斯特吴" }
            // state.user.isLogin = true
            // state.user.name = "wuhuiluo"
        }
    },
    getters: {
        // getLength(state) {
        //     return state.columns.filter(column => column.id > 2).length
        // }
        getColumnById: (state) => (id: number) => {
            return state.columns.find(column => column.id === id)
        },
        getPostByCid: (state) => (cid: number) => {
            return state.posts.filter(post => post.columnId === cid)
        }
    }
})

export default store
