import { userLogin } from "@/api";
import message from "@/components/Message";
import type { FormInst } from "naive-ui";
import { defineStore } from "pinia";
import type { ILoginType } from "../views/login/types";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: 0,
    username: "",
    token: "",
    avatar: "",
    gender: "",
    mobile: "",
  }),
  actions: {
    getUser(
      isMobile: boolean,
      mobileFormRef: FormInst | null,
      userFormRef: FormInst | null,
      modelRef: ILoginType
    ) {
      // 两种方式
      if (isMobile) {
        mobileFormRef?.validate((errors) => {
          console.log(errors);
        });
      } else {
        userFormRef?.validate((errors) => {
          if (!errors) {
            userLogin({
              username: modelRef.username as string,
              password: modelRef.password as string,
            }).then((res) => {
              if (res.status !== 200) {
                message("error", res.data);
              } else {
                this.avatar = res.data.avatar;
                this.username = res.data.username;
                this.id = res.data.id;
                this.gender = res.data.gender;
                this.mobile = res.data.mobile;
                message("success", "登陆成功");
              }
            });
          }
        });
      }
    },
  },
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage
      { key: "user", storage: localStorage },
    ],
  },
});
