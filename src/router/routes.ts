import message from "@/components/Message";
import cache from "@/utils/cache";
import type { RouteRecordRaw } from "vue-router";
import type { IUserType } from "./types";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
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
        beforeEnter() {
          const user = cache.getCache("user") as IUserType;
          if (user.token) return true;
          else {
            message("warn", "请先登陆！");
            return false;
          }
        },
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
