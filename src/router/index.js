// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/layouts/default/Default.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/factory",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Factory",
        meta: { requiresAuth: true },
        component: () => import("@/views/Factory/Factory.vue"),
      },
      {
        path: "/factory/insert",
        name: "FactoryInsert",
        meta: { requiresAuth: true },
        component: () => import("@/views/Factory/AddColumnToFactory.vue"),
      },
      {
        path: "/factory/Update/:id",
        name: "FactoryUpdate",
        meta: { requiresAuth: true },
        component: () => import("@/views/Factory/FactoryUpdate.vue"),
      },
      {
        path: "/factory/Details/:id",
        name: "Details",
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
        component: () => import("@/views/User/User.vue"),
      },
      {
        path: "/User/Update/:id",
        name: "UserUpdate",
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
        component: () => import("@/views/FactoryDetail/FactoryDetail.vue"),
      },
      {
        path: "/factory-detail/insert",
        name: "FactoryDetailInsert",
        meta: { requiresAuth: true },
        component: () => import("@/views/Factory/AddColumnToFactoryDetail.vue"),
      },
      {
        path: "/factory-detail/Update/:id",
        name: "FactoryDetailUpdate",
        meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  isAuthenticated = isAuthenticated === "true";
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    console.log(
      "🚀 ~ file: ife girdi",
      to.matched.some((record) => record.meta.requiresAuth),
      isAuthenticated
    );
    next("/");
  } else {
    console.log(
      "🚀 ~ file: else girdi",
      to.matched.some((record) => record.meta.requiresAuth),
      isAuthenticated
    );
    next();
  }
});

export default router;
