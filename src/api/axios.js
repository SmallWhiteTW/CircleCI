import axios from "axios";
import store from "@/store";

const $axios = axios.create({
  timeout: 60 * 1000,
});

$axios.interceptors.request.use((config) => {
  return config;
});

$axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return {
      ...response.data,
      IsSuccess: response.data?.ResultState === 0,
    };
  },
  (error) => {
    if (error.response?.status === 401) {
      // after remove token, app.vue can detect it
      // then it will switch to /sign-in page
      store.commit("auth/removeToken");
    } else {
      return Promise.reject(error);
    }
    // console.log(error);
    // switch (error.response.status) {
    //   case 401:
    //     this.$router.push({ name: "login" });
    // }
  }
);
export default $axios;
