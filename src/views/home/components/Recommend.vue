<template>
  <div class="recommend">
    <h3>
      {{ title }} <span>{{ subTitle }}</span>
    </h3>
    <div class="recommend-list">
      <div class="list">
        <SxxGoods v-for="goods in goodsList" :key="goods.id" :goods="goods" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SxxGoods from "@/components/SxxGoods.vue";
import type { PropType } from "vue";
import type { IGoodsRes } from "../types";
defineProps({
  goodsList: {
    type: Array as PropType<IGoodsRes[]>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="less">
.recommend {
  padding-top: 80px;
  background-color: #fff;
  h3 {
    font-size: 24px;
    padding-bottom: 5px;
    span {
      font-size: 14px;
      color: #aca7a7;
    }
  }
}
.recommend-list {
  display: flex;
  justify-content: center;
  .list {
    display: flex;
  }
}
</style>
