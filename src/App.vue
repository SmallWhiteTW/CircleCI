<!--
=========================================================
* Vue Material Dashboard 2 - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-material-dashboard-2
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<template>
  <Sidenav
    :custom_class="layout.color"
    :class="[layout.isRTL ? 'fixed-end' : 'fixed-start']"
    v-if="layout.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
    <!-- nav -->
    <Navbar
      :class="[
        layout.isNavFixed ? layout.navbarFixed : '',
        layout.isAbsolute ? layout.absolute : '',
      ]"
      :color="layout.isAbsolute ? 'text-white opacity-8' : ''"
      v-if="layout.showNavbar"
    />
    <router-view />
  </main>
</template>

<script setup>
import { onBeforeMount, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Sidenav from "@/components/Sidenav/index.vue";
import Navbar from "@/components/Navbars/Navbar.vue";
import { useLayoutState, useAuthorized } from "@/hooks";
import { languages, defaultLocale } from "@/locales";
import dayjs from "@/utils/datetime";
// import "@/tinymce/tinymce.js";
// import "@/tinymce/plugins.min.js";
// import "@/tinymce/themes/silver/theme.min.js";
// import "@/tinymce/models/dom/model.min.js"
// import "@/tinymce/icons/default/icons.min.js"
// import "@/tinymce/models/dom/model.min.js"
// import "@/tinymce/plugins/link/plugin.min.js"
// import "@/tinymce/plugins/image/plugin.min.js"
// import "@/tinymce/plugins/media/plugin.min.js"
// import "@/tinymce/skins/ui/oxide/skin.min.css"
// import "@/tinymce/skins/ui/oxide/content.min.css"
// import "@/tinymce/skins/content/default/content.min.css"

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const layout = useLayoutState();
const authorized = useAuthorized();

const loadLocale = () => {
  sessionStorage.lang = locale.value;
  document.documentElement.lang = locale.value;

  const dayjsLocale =
    languages?.find((l) => l.value === locale.value)?.dayjsLocale ??
    defaultLocale;
  dayjs.locale(dayjsLocale);
};

onBeforeMount(() => {
  loadLocale();

  const sidenav = document.getElementsByClassName("g-sidenav-show")[0];
  if (window.innerWidth > 1200) {
    sidenav.classList.add("g-sidenav-pinned");
  }
});

const detectUser = () => {
  if (authorized.value) {
    // get user info
  } else {
    if (route.meta?.requireAuth) {
      router.push("/sign-in");
    }
  }
};

onMounted(() => {
  detectUser();
});

watch(
  () => route.path,
  () => {
    detectUser();
  }
);

watch(
  () => authorized.value,
  () => {
    detectUser();
  }
);

watch(
  () => locale.value,
  () => {
    loadLocale();
    location.reload();
  }
);
</script>

<style>
.sidenav{
  z-index:999 !important
}
</style>
