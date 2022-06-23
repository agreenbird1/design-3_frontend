<template>
  <div class="goods">
    <div class="main-img">
      <n-image :src="goods?.pics[curImg]" width="500"></n-image>
    </div>
    <div class="img-list">
      <n-image
        v-for="(img, idx) in goods?.pics"
        :key="idx"
        :src="img"
        preview-disabled
        @click="curImg = idx"
        width="100"
      ></n-image>
    </div>
    <div class="goods-main">
      <div class="goods-name">
        {{ goods?.name }}
      </div>
      <div class="goods-description">
        {{ goods?.description }}
      </div>
      <div class="goods-price">
        ￥<span>{{ goods?.price }}</span>
      </div>
      <div class="g-service">
        <dl>
          <dt>促销</dt>
          <dd>12月好物放送，App领券购买直降120元</dd>
        </dl>
        <dl>
          <dt>配送</dt>
          <dd>全国直达</dd>
        </dl>
        <dl>
          <dt>服务</dt>
          <dd>
            <span>无忧退货</span>
            <span>快速退款</span>
            <span>免费包邮</span>
            <a href="javascript:;">了解详情</a>
          </dd>
        </dl>
      </div>
      <div class="goods-property">
        <div v-if="properties && properties[0] && properties[0].p">
          {{ properties[0].p }} <span>{{ properties[0].c }}</span>
        </div>
        <div v-if="properties && properties[1] && properties[1].p">
          {{ properties[1].p }} <span>{{ properties[1].c }}</span>
        </div>
      </div>
      <div class="goods-num">
        <NumBox
          :maxValue="goods?.inventory"
          label="请选择数量"
          v-model="selectNum"
          numCon
        />
      </div>
      <div class="goods-cart">
        <span class="cart" @click="addCart"> 加入购物车</span>
        <span
          class="coll"
          @click="changeCollection"
          :class="{ 'coll-active': collect }"
        >
          <StarFilled />&nbsp;{{ collect ? "取消收藏" : "收藏" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import NumBox from "@/components/NumBox.vue";
import { StarFilled } from "@vicons/antd";
import type { IGoodsRes } from "../home/types";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import message from "@/components/Message";
import {
  getGoodsById,
  getCollection,
  collectGoods,
  deleteCollection,
  addCart as addCartSer,
} from "@/api";

const route = useRoute();
const goods = ref<IGoodsRes>();
const selectNum = ref(1);
const curImg = ref(0);
const collect = ref(false);
const userStore = useUserStore();
let properties: { p: string; c: string }[] = [];

getGoodsById(route.params.goods_id as string).then((res) => {
  goods.value = res.data;
  goods.value?.property.split("&").forEach((p) => {
    const pp = p.split("=");
    properties.push({
      p: pp[0],
      c: pp[1],
    });
  });
});

if (userStore.id) {
  getCollection().then((res) => {
    if (
      res.data.length > 0 &&
      res.data.find((c: IGoodsRes) => c.id === goods.value?.id)
    ) {
      collect.value = true;
    }
  });
}

const changeCollection = () => {
  if (collect.value) {
    deleteCollection(goods.value?.id as number).then((res) => {
      if (res.status === 200) {
        message("success", "取消收藏成功！");
        collect.value = false;
      } else {
        message("error", "取消收藏失败！");
      }
    });
  } else {
    if (userStore.id) {
      collectGoods(goods.value?.id as number).then((res) => {
        if (res.status === 200) {
          message("success", "收藏成功！");
          collect.value = true;
        } else {
          message("error", "收藏失败！");
        }
      });
    } else {
      message("warn", "请先登录");
    }
  }
};

const addCart = () => {
  if (userStore.id) {
    addCartSer(goods.value?.id as number, selectNum.value).then((res) => {
      if (res.status === 200) {
        message("success", "添加成功！");
      } else {
        message("error", "添加失败！");
      }
    });
  } else {
    message("warn", "请先登陆！");
  }
};
</script>

<style scoped lang="less">
.goods {
  display: flex;
  margin: 50px;
  background-color: #fff;
  padding: 10px;
  .img-list {
    padding-left: 10px;
    width: 80px;
    cursor: pointer;
    .n-image {
      border: 1px solid #ccc;
    }
  }
  .goods-main {
    padding-left: 20px;
    .goods-name {
      font-size: 20px;
      font-weight: 500;
    }
    .goods-description {
      padding: 15px;
      font-size: 16px;
      color: #aaa;
    }
    .goods-price {
      color: @priceColor;
      padding-left: 15px;
      span {
        color: @priceColor;
        font-size: 18px;
      }
    }
    .goods-property {
      padding-left: 15px;
      color: rgb(124, 121, 121);
      span {
        cursor: pointer;
        margin-left: 30px;
        margin-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: inline-block;
        border: 1px solid @sucColor;
      }
    }
    .goods-num {
      margin-top: 15px;
    }
    .goods-cart {
      display: flex;
      margin-top: 30px;
      color: #fff;
      span {
        cursor: pointer;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-left: 20px;
      }
      .cart {
        background-color: @sucColor;
      }
      .coll {
        display: flex;
        justify-content: center;
        background-color: #444;
      }
      .coll-active {
        background-color: @sxColor;
        svg {
          color: @priceColor;
        }
      }
    }
    .g-service {
      background: #f5f5f5;
      width: 500px;
      padding: 20px 10px 0 10px;
      margin-top: 10px;
      dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        dt {
          width: 50px;
          color: #999;
        }
        dd {
          color: #666;
          &:last-child {
            span {
              margin-right: 10px;
              &::before {
                content: "•";
                color: @sxColor;
                margin-right: 2px;
              }
            }
            a {
              color: @sxColor;
            }
          }
        }
      }
    }
  }
}
</style>
