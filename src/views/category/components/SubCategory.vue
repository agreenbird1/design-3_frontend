<template>
  <div class="sub-category" :style="{ marginTop: mt + 'px' }">
    <div class="sub-category-title">全部分类</div>
    <div class="sub-category-detail">
      <span v-for="subCategory in subCategories?.children" :key="subCategory">
        {{ subCategory }}
      </span>
    </div>
  </div>
  <SubCategoryDetails
    v-for="subCategory in subCategories?.children"
    :key="subCategory"
    :subCategory="subCategories?.category + ' ' + subCategory"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import SubCategoryDetails from "./SubCategoryDetails.vue";
import type { ICategory } from "../../home/types";

defineProps({
  subCategories: {
    type: Object as PropType<ICategory>,
  },
  mt: {
    type: Number,
    required: false,
    default: 0,
  },
});
</script>

<style scoped lang="less">
.sub-category {
  background-color: #fff;
  .sub-category-title {
    padding: 10px;
    text-align: center;
    font-size: 22px;
  }
  .sub-category-detail {
    padding: 20px;
    span {
      display: inline-block;
      margin-right: 30px;
    }
  }
}
</style>
