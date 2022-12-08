<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" @click="showSportMng()">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="true"
          collapseRef="#"
          navText="Sport Management"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">sports_soccer</i>
          </template>
        </sidenav-collapse>
      </li>
      <div v-if="state.openSportMng" style="padding-left: 20px">
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="sportlisting"
            navText="Sport Listing"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">receipt</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item" style="display: none">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="leaguelisting"
            navText="League Listing"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">sports</i>
            </template>
          </sidenav-collapse>
        </li>
      </div>
      <li class="nav-item" @click="showArtMng()">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="true"
          collapseRef="#"
          navText="Articles Management"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">dashboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <div v-if="state.openArtMng" style="padding-left: 20px">
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="allpost"
            navText="All Posts"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">comment</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="editor"
            navText="Add Articles"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">edit</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="categories"
            navText="Categories"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">list</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="tags"
            navText="Tags"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">numbers</i>
            </template>
          </sidenav-collapse>
        </li>
      </div>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="memberlist"
          navText="Member"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">person</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="datasources"
          navText="Data Sources"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">table_view</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import SidenavCollapse from "./SidenavCollapse.vue";

// const props = defineProps({
//   cardBg: String,
// });

const state = reactive({
  title: "Soft UI Dashboard PRO",
  controls: "dashboardsExamples",
  isActive: "active",
  openArtMng: false,
  openSportMng: false,
});

const showArtMng = () => {
  state.openArtMng = !state.openArtMng;
};

const showSportMng = () => {
  state.openSportMng = !state.openSportMng;
};
</script>
