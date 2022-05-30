<template>
  <div class="register-panel">
    <div class="register-header">请输入信息以注册</div>
    <div class="register-input">
      <n-form
        ref="mobileFormRef"
        label-placement="left"
        label-width="auto"
        :model="modelRef"
        :rules="rules"
      >
        <n-form-item path="username" label="用户名">
          <n-input
            v-model:value="modelRef.username"
            placeholder="请输入用户名"
            :input-props="{ autocomplete: 'off' }"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="gender" label="性别">
          <n-radio-group
            v-model:value="modelRef.gender"
            name="radiogroup1"
            default-checked
          >
            <n-space>
              <n-radio :value="0"> 男 </n-radio>
              <n-radio :value="1"> 女 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="modelRef.password"
            placeholder="请输入密码"
            type="password"
            :input-props="{ autocomplete: 'off' }"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="repassword" label="重复密码">
          <n-input
            v-model:value="modelRef.repassword"
            placeholder="请确认密码"
            type="password"
            :input-props="{ autocomplete: 'off' }"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="mobile" label="手机号">
          <n-input
            v-model:value="modelRef.mobile"
            placeholder="请输入手机号"
            :input-props="{ autocomplete: 'off' }"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="code">
          <n-input-group>
            <n-button strong secondary type="tertiary"> 获取验证码 </n-button>
            <n-input
              v-model:value="modelRef.code"
              placeholder="请输入短信验证码"
              type="text"
              :input-props="{ autocomplete: 'off' }"
              @keydown.enter.prevent
              :style="{ width: '100%' }"
            />
          </n-input-group>
        </n-form-item>
      </n-form>
      <div class="register-button" @click="register">注册</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register as registerApi } from "@/api/user";
import message from "@/components/Message";
import router from "@/router";
import type { FormInst } from "naive-ui";
import { ref } from "vue";
import { modelRef, rules } from "../tools/register";

const mobileFormRef = ref<FormInst | null>(null);
const register = () => {
  mobileFormRef.value?.validate(async (e) => {
    if (!e) {
      const res = await registerApi({
        username: modelRef.value.username,
        password: modelRef.value.password,
        gender: modelRef.value.gender,
        mobile: modelRef.value.mobile,
      });
      if (res.status !== 200) {
        message("error", res.data);
      } else {
        router.push("/login");
        message("success", "注册成功");
      }
    }
  });
};
</script>

<style scoped lang="less">
.register-panel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  border: 3px solid rgb(240, 236, 236);
  box-shadow: 3px 3px 3px rgb(240, 236, 236);
  .register-header {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    color: rgb(119, 117, 117);
  }
  .register-button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: @sxColor;
    cursor: pointer;
  }
}
</style>
