// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/Signup",
        name: "Signup",

        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "/Home",
        name: "Home",

        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/Factory-Detail/",
        name: "FactorDetail",

        component: () => import("@/views/FactoryDetail/FactoryDetail.vue"),
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "",
        name: "Login",

        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/factory",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Factory",

        component: () => import("@/views/Factory/Factory.vue"),
      },
      {
        path: "/factory/Update/:id",
        name: "FactoryUpdate",

        component: () => import("@/views/Factory/FactoryUpdate.vue"),
      },
      {
        path: "/factory/Details/:id",
        name: "Details",

        component: () => import("@/views/Factory/Details.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "User",

        component: () => import("@/views/User/User.vue"),
      },
      {
        path: "/User/Update/:id",
        name: "UserUpdate",

        component: () => import("@/views/User/UserUpdate.vue"),
      },
    ],
  },
  {
    path: "/factory-detail",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "FactoryDetail",

        component: () => import("@/views/FactoryDetail/FactoryDetail.vue"),
      },
      {
        path: "/factory-detail/Update/:id",
        name: "FactoryDetailUpdate",

        component: () =>
          import("@/views/FactoryDetail/FactoryDetailUpdate.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
