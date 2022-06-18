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
        <template v-if="properties && properties.length">
          <div>
            {{ properties[0].p }} <span>{{ properties[0].c }}</span>
          </div>
          <div>
            {{ properties[1].p }} <span>{{ properties[1].c }}</span>
          </div>
        </template>
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
        <span class="cart"> 加入购物车</span>
        <span class="coll" :class="{ 'coll-active': goods?.put }">
          <HeartOutlined />&nbsp;收藏</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import NumBox from "@/components/NumBox.vue";
import { HeartOutlined } from "@vicons/antd";
import type { IGoodsRes } from "../home/types";
import { ref } from "vue";
import { getGoodsById } from "@/api";

const route = useRoute();
const goods = ref<IGoodsRes>();
const selectNum = ref(1);
const curImg = ref(0);
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
console.log();
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
        margin-left: 40px;
        margin-top: 15px;
        display: inline-block;
        border: 1px solid #bbb;
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
