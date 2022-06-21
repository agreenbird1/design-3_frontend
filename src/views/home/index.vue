<template>
  <div class="home">
    <div class="home-main">
      <div class="home-carousel">
        <aside>
          <ul>
            <!-- 统一通过一个category路由组件 -->
            <!-- 通过不同的category类别搜索不同的商品 -->
            <li v-for="(category, idx) in categories" :key="idx">
              <router-link :to="'/category/' + category.value">
                {{ category.category }}
                <span v-for="(c, i) in category.children" :key="i"
                  >{{ c + (i === category.children.length - 1 ? "" : " / ") }}
                </span>
              </router-link>
            </li>
          </ul>
        </aside>
        <n-carousel draggable>
          <img class="carousel-img" src="@/assets/imgs/居家生活.webp" />
          <img class="carousel-img" src="@/assets/imgs/数码.webp" />
          <img class="carousel-img" src="@/assets/imgs/服饰.webp" />
          <img class="carousel-img" src="@/assets/imgs/美食.webp" />
        </n-carousel>
      </div>
      <Recommend
        :goodsList="recommendList"
        title="人气推荐"
        subTitle="超多好货，等你来选"
      />
      <Recommend
        :goodsList="hotList"
        title="热卖商品"
        subTitle="爱你所爱，想你所想"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Recommend from "./components/Recommend.vue";
import { getCategory, getRecommendGoods, getGoods } from "@/api";
import type { ICategory, IGoodsRes } from "./types";
import { ref } from "vue";

const categories = ref<ICategory[]>([]);
const recommendList = ref<IGoodsRes[]>([]);
const hotList = ref<IGoodsRes[]>([]);

getCategory().then((res) => {
  res.data.forEach((category: { name: string; value: string }) => {
    const c = category.name.split(" ") as string[];
    const cc = categories.value.find((ca) => ca.category === c[0]);
    if (cc) {
      cc.children.push(c[1]);
    } else {
      categories.value.push({
        category: c[0],
        children: [c[1]],
        value: category.value,
      });
    }
  });
});

getRecommendGoods().then((res) => {
  const allGoods = res.data.filter((c: IGoodsRes) => c.put === "1");
  recommendList.value = allGoods.slice(0, 4);
});
getGoods().then((res) => {
  const allGoods = res.data.filter((c: IGoodsRes) => c.put === "1");
  hotList.value = allGoods.slice(0, 4);
});
</script>

<style scoped lang="less">
.home {
  background-color: #f5f5f5;
  .home-main {
    width: 100%;
    padding: 80px;
    .home-carousel {
      background-color: #fff;
      position: relative;
      display: flex;
      aside {
        position: absolute;
        z-index: 2;
        ul li {
          background-color: rgba(78, 77, 77, 0.6);
          padding-left: 10px;
          height: 52px;
          width: 200px;
          color: #fff;
          line-height: 52px;
        }
        ul li:hover {
          cursor: pointer;
          background-color: @sxColor;
          text-decoration: underline;
        }
      }
      .carousel-img {
        cursor: pointer;
        width: 100%;
      }
    }
  }
}
</style>
