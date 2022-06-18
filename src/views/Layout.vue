<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import StickyNav from "@/components/StickyNav.vue";
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <div class="layout">
    <StickyNav />
    <AppNav />
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
  <n-back-top :right="100" />
</template>

<style scoped lang="less"></style>
