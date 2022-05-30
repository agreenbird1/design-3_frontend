import router from "@/router";
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
        path: "/user",
        name: "user",
        component: () => import("@/views/user/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    beforeEnter: (to, from) => {
      const user = cache.getCache("user");
      if ((user as IUserType).username.length) {
        router.replace(from.path);
        return false;
      } else return true;
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/index.vue"),
  },
];

export default routes;
