<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import AppNav from "@/components/AppNav.vue";
</script>

<template>
  <div class="layout">
    <AppNav />
    <router-view></router-view>
    <AppFooter />
  </div>
  <n-back-top :right="100" />
</template>

<style scoped lang="less"></style>
