<template>
  <li class="nav-item">
    <a
      class="nav-link text-white"
      data-bs-toggle="collapse"
      aria-expanded="false"
      :href="`#${props.refer}`"
      @click="state.isExpanded = !state.isExpanded"
    >
      <span class="sidenav-mini-icon"> {{ props.miniIcon }} </span>
      <span class="sidenav-normal me-3 ms-2 ps-1">
        {{ props.text }} <b class="caret"></b
      ></span>
    </a>
    <div :class="state.isExpanded ? 'collapse show' : 'collapse'">
      <ul class="nav nav-sm flex-column">
        <slot name="nav-child-item" />
      </ul>
    </div>
  </li>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  refer: {
    type: String,
    required: true,
  },
  miniIcon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const state = reactive({
  isExpanded: false,
});
</script>
