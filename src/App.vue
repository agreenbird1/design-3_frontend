<script setup lang="ts">
import Content from "@/components/content.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <!-- App.vue -->
  <n-message-provider>
    <Content />
  </n-message-provider>
  <RouterView></RouterView>
</template>

<style scoped lang="less">
* {
  user-select: none;
}
</style>
