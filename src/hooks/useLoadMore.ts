import { useStore } from 'vuex'
import { ref, computed, ComputedRef, reactive } from 'vue'

interface LoadParams {
    currentPage: number;
    pageSize: number;
}

const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = {
    currentPage: 2,
    pageSize: 5
}) => {
    const store = useStore()
    const currentPage = ref(params.currentPage)
    const requestParams = computed(() => ({
        currentPage: currentPage.value,
        pageSize: params.pageSize
    }))
    // const requestParams = computed(() => ({
    //     currentPage: currentPage.value,
    //     pageSize: params.pageSize
    // }))
    const loadMorePage = () => {
        store.dispatch(actionName, requestParams.value).then(res => {
            currentPage.value = currentPage.value + 1
            console.log(currentPage.value);
        })
    }
    const isLastPage = computed(() => Math.ceil(total.value / params.pageSize) < currentPage.value)
    return {
        currentPage,
        loadMorePage,
        isLastPage
    }
}

export default useLoadMore