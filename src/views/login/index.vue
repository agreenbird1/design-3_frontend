<template>
  <div class="login">
    <LoginHeader />
    <section class="login-section">
      <div class="login-container">
        <LoginPanel />
      </div>
    </section>
    <LoginFooter />
  </div>
</template>

<script setup lang="ts">
import LoginFooter from "./components/LoginFooter.vue";
import LoginHeader from "./components/LoginHeader.vue";
import LoginPanel from "./components/LoginPanel.vue";
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/imgs/loginbg.jpg) no-repeat center / cover;
  height: 488px;
  position: relative;
  .login-container {
    position: absolute;
    right: 200px;
    top: 69px;
    width: 300px;
    height: 350px;
  }
}
</style>
