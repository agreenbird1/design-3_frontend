<template>
  <header>
    <router-link to="/">
      <img src="@/assets/imgs/logo.png" />
    </router-link>
    <span class="person">个人中心</span>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
header {
  height: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  box-shadow: 0 5px 0 rgb(50, 50, 50);
  padding-left: 30px;
  img {
    width: 100px;
    height: 50px;
  }
  span {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid @sxColor;
    font-size: 25px;
    color: @sxColor;
  }
}
</style>
