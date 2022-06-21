<template>
  <div class="user-collect">
    <div class="user-empty" v-if="!collections?.length">
      <img src="@/assets/imgs/empty-collect.png" />
    </div>
    <div class="collect">
      <div class="title">全部收藏</div>
      <div class="collect-main">
        <CollectedGoods
          v-for="goods in collections"
          :key="goods.id"
          :goods="goods"
          @delete-collection="deleteCollection"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCollection, deleteCollection as deleteCollectionSer } from "@/api";
import CollectedGoods from "./CollectedGoods.vue";
import type { IGoodsRes } from "@/views/home/types";

const collections = ref<IGoodsRes[]>();
getCollection().then((res) => {
  collections.value = res.data;
});
const deleteCollection = (id: number) => {
  deleteCollectionSer(id);
  const idx = collections.value?.findIndex((goods) => goods.id === id);
  collections.value?.splice(idx as number, 1);
};
</script>

<style scoped lang="less">
.user-collect {
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
  .collect {
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 600;
      border-bottom: 4px solid @sxColor;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .collect-main {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
