<template>
  <div class="login">
    <LoginHeader name="欢迎注册" />
    <section class="login-section">
      <div class="login-container">
        <registerPanel />
      </div>
    </section>
    <LoginFooter />
  </div>
</template>

<script setup lang="ts">
import LoginFooter from "../login/components/LoginFooter.vue";
import LoginHeader from "../login/components/LoginHeader.vue";
import registerPanel from "./components/registerPanel.vue";
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/imgs/loginbg.jpg) no-repeat center / cover;
  height: 528px;
  position: relative;
  .login-container {
    position: absolute;
    right: 200px;
    top: 14px;
    width: 300px;
    height: 480px;
  }
}
</style>
