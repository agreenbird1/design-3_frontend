<template>
  <table class="goods">
    <thead>
      <tr>
        <th width="520">商品信息</th>
        <th width="170">单价</th>
        <th width="170">数量</th>
        <th width="170">小计</th>
        <th width="170">实付</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, i) in products" :key="product.id">
        <td>
          <a href="javascript:;" class="info">
            <img :src="product.pics[0]" alt="" />
            <div class="right">
              <p>{{ product.name }}</p>
            </div>
          </a>
        </td>
        <td>&yen;{{ product.price }}</td>
        <td>{{ number[i] }}</td>
        <td>&yen;{{ +number[i] * +product.price }}</td>
        <td>&yen;{{ +number[i] * +product.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { IGoodsRes } from "../../home/types";
import type { PropType } from "vue";

defineProps({
  products: {
    type: Array as PropType<IGoodsRes[]>,
    required: true,
  },
  number: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<style scoped lang="less">
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
</style>
