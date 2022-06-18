<template>
  <div class="sticky-nav" :class="{ show: y >= 80 }">
    <img src="@/assets/imgs/logo.png" />
    <search />
  </div>
</template>

<script setup lang="ts">
import search from "./Search.vue";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
</script>

<style scoped lang="less">
.sticky-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  left: 0;
  top: 0px;
  padding: 10px;
  transform: translateY(-100%);
  width: 100%;
  z-index: 999;
  background-color: #fff;
  &.show {
    transition: all 0.3s linear;
    transform: translateY(0px);
  }
  img {
    width: 80px;
  }
}
</style>
