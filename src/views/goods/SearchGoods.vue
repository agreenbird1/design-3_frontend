<template>
  <div class="search-goods">
    <template v-if="goodsList.length">
      <div class="title">为您找到以下商品</div>
      <div class="main">
        <SxxGoods v-for="goods in goodsList" :key="goods.id" :goods="goods" />
      </div>
    </template>
    <template v-else>
      <div class="empty">
        <img src="../../assets/imgs/empty-search.png" />
        <span>对不起！没有您想要的商品！</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAssociateList } from "@/api";
import SxxGoods from "@/components/SxxGoods.vue";
import { ref } from "vue";
import type { IGoodsRes } from "../home/types";

const route = useRoute();
const goodsList = ref<IGoodsRes[]>([]);
console.log(route);
getAssociateList(route.query.searchWords as string).then((res) => {
  goodsList.value = res.data;
  console.log(res.data);
});
</script>

<style scoped lang="less">
.search-goods {
  padding: 70px;
  .title {
    background-color: #fff;
    font-size: 20px;
    color: @sxColor;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
  }
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 50px;
    background-color: #fff;
    img {
      width: 500px;
      margin-bottom: 30px;
    }
    span {
      font-size: 20px;
      color: #bbbbbb;
    }
  }
}
</style>
