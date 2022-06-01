<template>
  <div class="user-collect">
    <div class="user-empty">
      <img src="@/assets/imgs/empty-collect.png" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.user-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  img {
    width: 200px;
  }
}
</style>
