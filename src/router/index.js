import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/memberlist",
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/memberlist",
    name: "memberlist",
    component: () => import("@/views/MemberList.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/datasources",
    name: "datasources",
    component: () => import("@/views/DataSource.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/sportlisting",
    name: "SportListing",
    component: () => import("@/views/Sport/SportListing.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/leaguelisting",
    name: "LeagueListing",
    component: () => import("@/views/Sport/LeagueListing.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/allpost",
    name: "AllPost",
    component: () => import("@/views/Articles/AllPost.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("@/views/Articles/Editor.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Articles/Categories.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/tags",
    name: "Tags",
    component: () => import("@/views/Articles/Tags.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
