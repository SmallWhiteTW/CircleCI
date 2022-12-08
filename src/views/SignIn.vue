<template>
  <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  {{ $t("Log-In") }}
                </h4>
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3" @submit.prevent="login">
                <div class="mb-3">
                  <material-input
                    id="username"
                    type="username"
                    :label="$t('UserList.UserName')"
                    name="username"
                    :value="formState.username"
                    v-model="formState.username"
                  ></material-input>
                </div>
                <div class="mb-3">
                  <material-input
                    id="password"
                    type="password"
                    :label="$t('UserList.Password')"
                    name="password"
                    v-model="formState.password"
                  />
                </div>
                <!-- <material-switch id="rememberMe" name="rememberMe"
                  >Remember me</material-switch
                > -->
                <div class="text-center">
                  <material-button
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    fullWidth
                  >
                    {{ $t("Log-In") }}</material-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-1 end-1 z-index-2">
    <MaterialSnackbar
      v-if="state.snackbar === 'error'"
      title="Log in Error"
      :description="state.message"
      :icon="{ component: 'campaign', color: 'white' }"
      color="danger"
      :close-handler="closeSnackbar"
    />
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Navbar from "@/components/PageLayout/Navbar.vue";
import {
  MaterialInput,
  MaterialButton,
  MaterialSnackbar,
} from "@/components/material";
import setMaterialInput from "@/assets/js/material-input.js";
import backofficeReq from "@/api/backoffice";

const store = useStore();
const router = useRouter();
const formState = reactive({
  password: "",
  username: "",
});
const state = reactive({
  snackbar: "",
  message: "",
});

const closeSnackbar = () => {
  state.snackbar = "";
};

const login = () => {
  const payload = {
    AdminName: formState.username,
    Password: formState.password,
  };

  backofficeReq.login(payload).then((res) => {
    if (res.IsSuccess) {
      store.commit("auth/setToken", res.Data);
      router.push("/");
    } else {
      state.message = res.Msg;
      state.snackbar = "error";
      setTimeout(closeSnackbar, 2000);
    }
  });
};

onBeforeMount(() => {
  store.commit("layout/toggleEveryDisplay");
  store.commit("layout/toggleHideConfig");
});

onMounted(() => {
  store.commit("layout/notShowNav");
  setMaterialInput();
});

onBeforeUnmount(() => {
  store.commit("layout/toggleEveryDisplay");
  store.commit("layout/toggleHideConfig");
});
</script>
