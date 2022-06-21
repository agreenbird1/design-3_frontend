<template>
  <div class="user-order">
    <div
      class="user-empty"
      v-if="!(finishedOrders?.length || canceledOrders?.length)"
    >
      <img src="@/assets/imgs/empty-order.png" />
      <router-link to="/">去逛逛 >></router-link>
    </div>
    <n-tabs type="segment" animated v-else>
      <n-tab-pane name="已取消" tab="已取消">
        <div class="tab-content">
          <template v-if="!canceledOrders.length">
            <div class="can-order">
              <img src="@/assets/imgs/empty-order.png" />
            </div>
          </template>
          <template v-else v-for="order in canceledOrders" :key="order.id">
            <OrderGoods :products="order.products" :number="order.number" />
            <div class="order-des">该订单已经取消！</div>
          </template>
        </div>
      </n-tab-pane>
      <n-tab-pane name="已完成" tab="已完成">
        <div class="tab-content">
          <template v-if="!finishedOrders.length">
            <div class="can-order">
              <img src="@/assets/imgs/empty-order.png" />
            </div>
          </template>
          <template v-else v-for="order in finishedOrders" :key="order.id">
            <OrderGoods :products="order.products" :number="order.number" />
            <div class="order-des">该订单已经完成！</div>
          </template>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getOrder } from "@/api";
import OrderGoods from "@/views/payOrder/components/OrderGoods.vue";
import type { IOrderRes } from "@/views/payOrder/types";

const finishedOrders = ref<IOrderRes[]>([]);
const canceledOrders = ref<IOrderRes[]>([]);
getOrder().then((res) => {
  res.data.forEach((order: IOrderRes) => {
    if (order.state === "0") {
      canceledOrders.value.push(order);
    } else finishedOrders.value.push(order);
  });
});
</script>

<style scoped lang="less">
.user-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  img {
    width: 200px;
  }
  a {
    color: skyblue;
    text-decoration: underline;
  }
}
.can-order {
  height: 500px;
  line-height: 500px;
  text-align: center;
}
.order-des {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: @sxColor;
  text-align: right;
}
.tab-content {
  height: 500px;
  overflow: auto;
}
</style>
