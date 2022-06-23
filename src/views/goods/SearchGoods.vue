<template>
  <div class="search-goods">
    <template v-if="goodsList.length">购物</template>
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
import { ref } from "vue";
import type { IGoodsRes } from "../home/types";

const route = useRoute();
const goodsList = ref<IGoodsRes[]>([]);
console.log(route);
getAssociateList(route.query.searchWords as string).then((res) => {
  goodsList.value = res.data;
});
</script>

<style scoped lang="less">
.search-goods {
  padding: 80px;
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
