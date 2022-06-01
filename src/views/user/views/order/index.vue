<template>
  <div class="user-order">
    <div class="user-empty">
      <img src="@/assets/imgs/empty-order.png" />
      <router-link to="/">去逛逛 >></router-link>
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
  a {
    color: skyblue;
    text-decoration: underline;
  }
}
</style>
