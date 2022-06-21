<template>
  <div class="sxx-goods">
    <n-card hoverable>
      <n-image
        width="200"
        :src="goods.pics[0]"
        preview-disabled
        @click="goGoodsPage"
      />
      <div class="goods-name">{{ goods.name }}</div>
      <div class="goods-description">{{ goods.description }}</div>
      <div class="goods-collect" @click="emit(`deleteCollection`, goods.id)">
        <StarFilled />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { StarFilled } from "@vicons/antd";
import type { IGoodsRes } from "@/views/home/types";
import type { PropType } from "vue";

const props = defineProps({
  goods: {
    type: Object as PropType<IGoodsRes>,
    required: true,
  },
});
const emit = defineEmits(["deleteCollection"]);
const goGoodsPage = () => {
  router.push("/goods/" + props.goods.id);
};
</script>

<style scoped lang="less">
.sxx-goods {
  cursor: pointer;
  width: 216px;
  margin-bottom: 5px;
  margin-right: 10px;
  margin-left: 10px;
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
  .goods-collect {
    svg {
      color: @sxColor;
    }
  }
}
</style>
