<template>
    <div v-if="currentPost" class="post-detail-page w-690">
        <article class="mb-5 pb-3">

        </article>
    </div>
</template>


<script lang="ts">
import { ColumnProps, GlobalDataProps,PostProps } from '../store'
import store from '../store'
import { useRoute,useRouter } from "vue-router"
import { useStore } from 'vuex'
import { defineComponent,onMounted,computed } from "vue";

export default defineComponent ({
    name: 'PostDetail',
    setup() {
        const store = useStore<GlobalDataProps>()
        const router = useRouter()
        const route = useRoute()
        const currentId = route.params.id
        console.log(currentId);
        onMounted(() => {
            store.dispatch('fetchPost', currentId)
        })
        const currentPost = computed(() => store.state.posts)
        console.log(currentPost);
        // const currentImageUrl = computed(() => {
        //     if(currentPost.value && currentPost.value.image) {
        //         const { image } = currentPost.value
        //         console.log(image);
        //     }
        // })
        return {
            currentPost
        }
    }
})
</script>


<style>
    
</style>
