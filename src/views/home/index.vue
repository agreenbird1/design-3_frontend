<template>
  <StickyNav />
  <div class="home">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/imgs/logo.png" />
      </router-link>
    </div>
    <div class="home-search"><Search /></div>
    <div class="ios-android">
      <AndroidFilled />安卓 &nbsp; <MobileFilled />ios
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "./components/Search.vue";
import StickyNav from "./components/StickyNav.vue";
import { AndroidFilled, MobileFilled } from "@vicons/antd";
</script>

<style scoped lang="less">
.home {
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-left: 150px;
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
