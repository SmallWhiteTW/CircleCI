import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/locales";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/scss/breadcrumbs.scss";
import "@/assets/css/location.css"
import MaterialDashboard from "./material-dashboard";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(router).use(store).use(ElementPlus).use(i18n).use(MaterialDashboard);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

console.warn(import.meta.env);
