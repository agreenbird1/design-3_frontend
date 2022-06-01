import { update_avatar, update_user, userLogin } from "@/api";
import type { IUserUpdate } from "@/api/user/types";
import message from "@/components/Message";
import type { FormInst } from "naive-ui";
import { defineStore } from "pinia";
import router from "../router";
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
                console.log(res);
                this.$patch({
                  id: res.data.id,
                  gender: res.data.gender,
                  mobile: res.data.mobile,
                  username: res.data.username,
                  avatar: res.data.avatar,
                  token: res.data.token,
                });
                message("success", "登陆成功");
                router.push("/");
              }
            });
          }
        });
      }
    },
    updateAvatar(formData: FormData) {
      update_avatar(formData).then((res) => {
        if (res.status !== 200) {
          message("error", "上传头像失败!");
        } else {
          this.avatar = "";
          this.$patch({
            avatar: res.data,
          });
          message("success", "上传头像成功！");
        }
      });
    },
    updateUser(user: IUserUpdate) {
      console.log(user);
      update_user(user).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          message("error", res.data);
        } else {
          this.username = user.username;
          this.gender = user.gender;
          message("success", "保存成功！");
        }
      });
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
