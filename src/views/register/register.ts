import type { FormItemRule, FormRules } from "naive-ui";
import { ref } from "vue";
import type { IRegisterType } from "./types";

export const modelRef = ref<IRegisterType>({
  username: "tx",
  gender: "1",
  password: "123123",
  repassword: "123123",
  mobile: "18888888888",
  code: "1234",
});
const code = ref("1234");

export const rules: FormRules = {
  username: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("用户名不能为空");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("密码不能为空");
      } else if (value.length < 6) {
        return new Error("密码长度不能小于6位！");
      } else if (value.length > 16) {
        return new Error("密码长度不能大于16位");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  repassword: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (modelRef.value.password === value) return true;
      else return new Error("两次密码不一致");
    },
    trigger: ["input", "blur"],
  },
  mobile: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("手机号不能为空！");
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(value)) {
        return new Error("手机号格式不正确！");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  code: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!code.value) {
        return new Error("请获得验证码！");
      } else if (code.value !== value) {
        modelRef.value.code = "";
        return new Error("验证码错误！");
      }
    },
    trigger: ["blur"],
  },
};
