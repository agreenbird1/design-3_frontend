<template>
  <div class="sub-category-details">
    <div class="title">- {{ subCategory }} -</div>
    <router-link
      v-if="goodsList"
      :to="'/subcategory/' + goodsList[0].category_id"
      >查看全部</router-link
    >
    <div class="goodsList">
      <SxxGoods v-for="goods in goodsList" :key="goods.id" :goods="goods" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGoodsRes } from "../../home/types";
import { getGoodsBySubcategory } from "@/api";
import SxxGoods from "@/components/SxxGoods.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  subCategory: {
    type: String,
    required: true,
  },
});
const goodsList = ref<IGoodsRes[]>();
onMounted(() => {
  getGoodsBySubcategory(props.subCategory).then((res) => {
    goodsList.value = res.data.slice(0, 4);
  });
});
</script>

<style scoped lang="less">
.sub-category-details {
  position: relative;
  background-color: #fff;
  margin-top: 20px;
  a {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 22px;
    text-align: center;
  }
  .goodsList {
    display: flex;
  }
}
</style>
