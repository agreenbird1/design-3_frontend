<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">随心选</RouterLink>
      </h1>
      <h3 class="sub">欢迎登陆</h3>
      <RouterLink class="entry" to="/">
        进入网站首页 <DoubleRightOutlined />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { DoubleRightOutlined } from "@vicons/antd";
import { RouterLink } from "vue-router";
</script>

<style scoped lang="less">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../../../assets/imgs/logo.png) no-repeat center 18px /
        contain;
    }
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }
  .entry {
    display: flex;
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
    svg {
      color: @sxColor;
    }
  }
}
</style>
