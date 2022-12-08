<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useLayoutState } from "@/hooks";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import LocaleSelecter from "@/components/LocaleSelecter.vue";

const route = useRoute();
const store = useStore();
const layout = useLayoutState();

const props = defineProps({
  color: {
    type: String,
  },
});

// const toggleSidebar = () => {
//   store.commit("navbarMinimize");
// };

const logout = () => {
  store.commit("auth/removeToken");
};
</script>

<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
    :class="layout.isAbsolute ? 'mt-4' : 'mt-0'"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="route.name" :color="props.color" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="layout.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="layout.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        ></div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a @click="logout" class="btn btn-sm mb-0 me-1 bg-gradient-success">
              {{ $t("Log Out") }}
            </a>
          </li>
          <li
            class="nav-item ps-3 d-flex align-items-center"
            style="align-self: center; min-width: 150px; line-height: 1.667"
          >
            <LocaleSelecter />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
