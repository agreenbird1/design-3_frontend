<template>
  <div class="sxx-goods" @click="goGoodsPage">
    <n-card hoverable>
      <n-image width="200" :src="goods.pics[0]" preview-disabled />
      <div class="goods-name">{{ goods.name }}</div>
      <div class="goods-description">{{ goods.description }}</div>
      <div class="goods-price">￥{{ goods.price }}</div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { IGoodsRes } from "@/views/home/types";
import type { PropType } from "vue";
import router from "@/router";

const props = defineProps({
  goods: {
    type: Object as PropType<IGoodsRes>,
    required: true,
  },
});
const goGoodsPage = () => {
  router.push("/goods/" + props.goods.id);
};
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
