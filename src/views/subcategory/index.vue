<template>
  <StickyNav />
  <div class="sub-category">
    <div class="main">
      <div class="menu">
        <div class="menu-sort">
          <span
            :class="{ active: selectSort === 'default' }"
            @click="changeSort('default')"
            >默认排序</span
          >
          <span
            :class="{ active: selectSort === 'price' }"
            @click="changeSort('price')"
            >价钱排序</span
          >
        </div>
        <div class="menu-filter">
          <n-checkbox
            v-model:checked="isInventory"
            size="medium"
            label="只显示有货商品"
          />
        </div>
      </div>
      <div class="goods-list">
        <SxxGoods v-for="goods in goodsList" :key="goods.id" :goods="goods" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StickyNav from "@/components/StickyNav.vue";
import SxxGoods from "@/components/SxxGoods.vue";
import { useRoute } from "vue-router";
import { getGoodsBySubcategoryId } from "@/api";
import { ref, watch } from "vue";
import type { IGoodsRes } from "@/views/home/types";
import { cloneDeep } from "lodash-es";

const selectSort = ref<string>("default");
const isInventory = ref(false);
const goodsList = ref<IGoodsRes[]>();
let temp: IGoodsRes[] = [];

getGoodsBySubcategoryId(useRoute().params.subcategory_id as string).then(
  (res) => {
    goodsList.value = res.data;
    temp = cloneDeep(res.data);
  }
);

const changeSort = (val: string) => {
  selectSort.value = val;
  if (val === "default") {
    goodsList.value = cloneDeep(temp);
  } else {
    goodsList.value = goodsList.value?.sort((a, b) => +a.price - +b.price);
  }
};

watch(
  () => isInventory.value,
  () => {
    if (isInventory.value)
      goodsList.value = temp.filter((goods) => goods.inventory > 0);
    else {
      goodsList.value = cloneDeep(temp);
    }
  }
);
</script>

<style scoped lang="less">
.sub-category {
  background-color: #f5f5f5;
  padding: 79px;
  padding-top: 40px;
  .main {
    background-color: #fff;
    .menu {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      .menu-sort {
        span {
          display: inline-block;
          width: 100px;
          height: 30px;
          margin-right: 10px;
          text-align: center;
          line-height: 30px;
          color: #bbb;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        .active {
          background-color: @sucColor;
          color: #fff;
        }
      }
    }
    .goods-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
