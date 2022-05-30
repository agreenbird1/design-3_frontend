import type { FormItemRule, FormRules } from "naive-ui";

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
};
