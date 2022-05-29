<template>
  <div class="login-panel">
    <div class="login-method">
      <span @click="changeMethod(false)" :class="isMobile ? '' : 'login-bg'"
        >密码登陆</span
      >
      <span>|</span>
      <span @click="changeMethod(true)" :class="isMobile ? 'login-bg' : ''"
        >手机登陆</span
      >
    </div>
    <div class="login-input">
      <template v-if="isMobile">
        <n-form
          ref="mobileFormRef"
          label-placement="left"
          label-width="auto"
          :model="modelRef"
          :rules="rules"
        >
          <n-form-item path="mobile" label="手机号">
            <n-input
              v-model:value="modelRef.username"
              placeholder="请输入手机号"
              :input-props="{ autocomplete: 'off' }"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="验证码">
            <n-input-group>
              <n-button strong secondary type="tertiary"> 获取验证码 </n-button>
              <n-input
                v-model:value="modelRef.password"
                placeholder="请输入短信验证码"
                :input-props="{ autocomplete: 'off' }"
                type="password"
                @keydown.enter.prevent
                :style="{ width: '100%' }"
              />
            </n-input-group>
          </n-form-item>
        </n-form>
      </template>
      <template v-else>
        <n-form
          ref="userFormRef"
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
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="modelRef.password"
              placeholder="请输入密码"
              :input-props="{ autocomplete: 'off' }"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
      </template>
      <div class="login-button" @click="login">登陆</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { FormInst } from "naive-ui";
import { ref } from "vue";
import { rules } from "../tools/login";
import type { ILoginType } from "../types";

const isMobile = ref(false);
const mobileFormRef = ref<FormInst | null>(null);
const userFormRef = ref<FormInst | null>(null);
const modelRef = ref<ILoginType>({
  username: "tqt",
  password: "roletang",
  mobile: "",
});
const userStore = useUserStore();

const changeMethod = (flag: boolean) => {
  modelRef.value.username = "";
  modelRef.value.password = "";
  modelRef.value.mobile = "";
  isMobile.value = flag;
};
// 点击登陆
const login = () => {
  userStore.getUser(
    isMobile.value,
    mobileFormRef.value,
    userFormRef.value,
    modelRef.value
  );
};
</script>

<style scoped lang="less">
.login-panel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  border: 3px solid rgb(240, 236, 236);
  box-shadow: 3px 3px 3px rgb(240, 236, 236);

  .login-method {
    display: flex;

    span {
      margin-left: 31px;
      margin-bottom: 10px;
      font-size: 20px;
      color: rgb(108, 105, 105);
    }

    span:hover {
      color: @sxColor;
      cursor: pointer;
    }
  }

  .login-input {
    padding: 20px;

    .login-button {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      line-height: 40px;
      text-align: center;
      background-color: @sxColor;
      cursor: pointer;
    }
  }
}

.login-bg {
  color: black !important;
}
</style>
