<template>
  <div class="sxx-goods">
    <n-card hoverable>
      <n-image width="200" :src="goods.pics[0]" />
      <div class="goods-name">{{ goods.name }}</div>
      <div class="goods-description">{{ goods.description }}</div>
      <div class="goods-price">￥{{ goods.price }}</div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { IGoodsRes } from "@/views/home/types";
import type { PropType } from "vue";
defineProps({
  goods: {
    type: Object as PropType<IGoodsRes>,
    required: true,
  },
});
</script>

<style scoped lang="less">
.sxx-goods {
  cursor: pointer;
  width: 276px;
  .n-card div {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-name {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
  }
  .goods-description {
    padding-left: 20px;
    padding-right: 20px;
    color: #aca7a7;
  }
  .goods-price {
    font-size: 18px;
    font-weight: bold;
    color: @priceColor;
  }
}
</style>
