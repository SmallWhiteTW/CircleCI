<template>
  <div class="position-fixed bottom-1 end-1 z-index-2">
    <MaterialSnackbar
      v-if="snackState.stype === 'success'"
      :title="snackState.smsg"
      :icon="{ component: 'done', color: 'white' }"
      color="success"
      :close-handler="closeSnackbar"
    />
    <MaterialSnackbar
      v-if="snackState.stype === 'error'"
      :title="snackState.smsg"
      :icon="{ component: 'campaign', color: 'white' }"
      color="danger"
      :close-handler="closeSnackbar"
    />
  </div>
</template>

<script setup>
import { MaterialSnackbar } from "@/components/material";
import { defineProps, reactive, watch } from "vue";
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  msg: {
    type: String,
    default: "",
  },
});
let snackState = reactive({
  stype: props.type,
  smsg: props.msg,
});
watch(
  () => props.type,
  () => {
    snackState.stype = props.type;
    snackState.smsg = props.msg;
  }
);
const closeSnackbar = () => {
  snackState.stype = "";
  snackState.smsg = "";
};
</script>

<style scoped></style>
