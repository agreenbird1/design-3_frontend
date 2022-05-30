import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout.vue"),
    children: [
      {
        path: "/user",
        name: "user",
        redirect: "/user/info",
        component: () => import("@/views/user/index.vue"),
        children: [
          {
            path: "info",
            name: "info",
            component: () => import("@/views/user/views/info/index.vue"),
          },
          {
            path: "address",
            name: "address",
            component: () => import("@/views/user/views/address/index.vue"),
          },
          {
            path: "collect",
            name: "collect",
            component: () => import("@/views/user/views/collect/index.vue"),
          },
          {
            path: "order",
            name: "order",
            component: () => import("@/views/user/views/order/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/index.vue"),
  },
];

export default routes;
