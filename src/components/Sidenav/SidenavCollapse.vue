<template>
  <router-link
    :data-bs-toggle="props.collapse ? 'collapse' : ''"
    :to="props.collapse ? `#${props.collapseRef}` : props.collapseRef"
    :aria-controls="props.collapseRef"
    :aria-expanded="state.isExpanded"
    class="nav-link"
    :class="
      pathname === props.collapseRef ? `active bg-gradient-${layout.color}` : ''
    "
    v-bind="$attrs"
    @click="state.isExpanded = !state.isExpanded"
  >
    <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="layout.isRTL ? ' ms-2' : 'me-2'"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text" :class="layout.isRTL ? ' me-1' : 'ms-1'">{{
      props.navText
    }}</span>
  </router-link>
  <div :class="state.isExpanded ? 'collapse show' : 'collapse'">
    <slot name="list"></slot>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useLayoutState } from "@/hooks/useState";

const route = useRoute();
const layout = useLayoutState();

const pathname = computed(() => {
  const routeArr = route.path.split("/");
  console.log("route:" + routeArr[1]);
  return routeArr[1];
});

const props = defineProps({
  collapseRef: {
    type: String,
    required: true,
  },
  navText: {
    type: String,
    required: true,
  },
  collapse: {
    type: Boolean,
    default: true,
  },
});

const state = reactive({
  isExpanded: false,
});
</script>
