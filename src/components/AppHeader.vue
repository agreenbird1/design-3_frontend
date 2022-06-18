<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/imgs/logo.png" />
      </router-link>
    </div>
    <div class="home-search"><Search /></div>
    <div class="ios-android">
      <AndroidFilled />安卓 &nbsp; <MobileFilled />ios
    </div>
  </header>
</template>

<script setup lang="ts">
import Search from "./Search.vue";
import { AndroidFilled, MobileFilled } from "@vicons/antd";
</script>

<style scoped lang="less">
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-left: 150px;
  background-color: #fff;
  padding-right: 150px;
  img {
    width: 140px;
  }
  .ios-android {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: grey;
  }
}
</style>
