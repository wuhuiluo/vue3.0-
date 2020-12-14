<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2"
            >登陆</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link to="/register" class="btn btn-outline-light my-2"
            >注册</router-link
          >
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <drop-down :title="`你好 ${user.nickName}`">
            <drop-down-item
              ><router-link to="/create" class="dropdown-item"
                >新建文章</router-link
              ></drop-down-item
            >
            <drop-down-item disabled
              ><a href="#" class="dropdown-item">编辑资料</a></drop-down-item
            >
            <drop-down-item>
              <router-link class="dropdown-item" :to="`/columns/${user.column}`"
                >我的专栏</router-link
              >
            </drop-down-item>
            <drop-down-item
              ><a href="#" class="dropdown-item" @click="logout"
                >退出登陆</a
              ></drop-down-item
            >
          </drop-down>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import createMessage from "../hooks/createMessage";
import { useStore } from "vuex";
import { defineComponent, PropType } from "vue";
import DropDownItem from "./DropDownItem.vue";
import DropDown from "./DropDown.vue";
import { UserProps, GlobalDataProps } from "../store";
export default defineComponent({
  name: "GlobalHeader",
  components: {
    DropDown,
    DropDownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const logout = () => {
      store.commit("logout");
      createMessage("您已经退出登陆", "success");
    };
    return {
      logout,
    };
  },
});
</script>
<style>
.navbar {
  align-items: center;
}
</style>