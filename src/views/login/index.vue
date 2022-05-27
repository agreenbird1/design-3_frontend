<template>
  <div class="login">
    <LoginHeader />
    <section class="login-section"></section>
    <LoginFooter />
  </div>
</template>

<script setup lang="ts">
import LoginFooter from "./components/LoginFooter.vue";
import LoginHeader from "./components/LoginHeader.vue";
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/imgs/loginbg.jpg) no-repeat center / cover;
  height: 488px;
  position: relative;
}
</style>
