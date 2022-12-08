<template>
  <!-- Navbar -->
  <nav
    class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"
  >
    <div class="container px-0">
      <router-link
        class="navbar-brand font-weight-bolder ms-lg-0 ms-3"
        to="/"
        v-bind="$attrs"
        :class="isBlur ? 'text-dark' : 'text-white'"
        style="font-size: 18px"
      >
        CVP Admin
      </router-link>
      <!--      <button-->
      <!--          class="navbar-toggler shadow-none ms-2"-->
      <!--          type="button"-->
      <!--          data-bs-toggle="collapse"-->
      <!--          data-bs-target="#navigation"-->
      <!--          aria-controls="navigation"-->
      <!--          aria-expanded="false"-->
      <!--          aria-label="Toggle navigation"-->
      <!--      >-->
      <!--        <span class="navbar-toggler-icon mt-2">-->
      <!--          <span class="navbar-toggler-bar bar1"></span>-->
      <!--          <span class="navbar-toggler-bar bar2"></span>-->
      <!--          <span class="navbar-toggler-bar bar3"></span>-->
      <!--        </span>-->
      <!--      </button>-->
      <div class="collapse navbar-collapse" id="navigation"></div>
      <div class="navbar-nav d-lg-block d-none">
        <ul class="navbar-nav mx-auto">
          <!--          <li class="nav-item">-->
          <!--            <a-->
          <!--                href="https://www.creative-tim.com/product/vue-material-dashboard-2"-->
          <!--                class="btn btn-sm mb-0 me-1 bg-gradient-success"-->
          <!--            >{{ $t("Log Out") }}</a-->
          <!--            >-->
          <!--          </li>-->
          <li
            class="nav-item"
            style="align-self: center; min-width: 150px; line-height: 1.667"
          >
            <LocaleSelecter />
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script setup>
// import downArrWhite from "@/assets/img/down-arrow-white.svg";
// import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import LocaleSelecter from "@/components/LocaleSelecter.vue";

// const props = defineProps({
//   btnBackground: {
//     type: String,
//   },
//   isBlur: {
//     type: String,
//   },
//   darkMode: {
//     type: Boolean,
//     default: false,
//   },
// });
</script>
