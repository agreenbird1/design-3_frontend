<template>
  <StickyNav />
  <div class="category">
    <n-carousel draggable>
      <img class="carousel-img" src="@/assets/imgs/居家生活.webp" />
      <img class="carousel-img" src="@/assets/imgs/数码.webp" />
      <img class="carousel-img" src="@/assets/imgs/服饰.webp" />
      <img class="carousel-img" src="@/assets/imgs/美食.webp" />
    </n-carousel>
    <SubCategory :mt="20" :subCategories="curCategory" />
  </div>
</template>

<script setup lang="ts">
import StickyNav from "@/components/StickyNav.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getCategory } from "@/api";
import SubCategory from "./components/SubCategory.vue";
import type { ICategory } from "../home/types";

const routes = useRoute();
const curCategoryId = routes.params.category_id;

const curCategory = ref<ICategory>();
getCategory().then((res) => {
  const curCategories = res.data.filter(
    (c: ICategory) => c.value === curCategoryId
  );
  const children = curCategories.map(
    (c: { name: string }) => c.name.split(" ")[1]
  );
  curCategory.value = {
    category: curCategories[0].name.split(" ")[0],
    children,
    value: curCategories[0].value,
  };
});
</script>

<style scoped>
.category {
  padding: 80px;
}
</style>
