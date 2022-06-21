<template>
  <div class="pay-order">
    <div class="address">
      <div class="title">收货地址</div>
      <div class="address-detail">
        <div class="info">
          <span>收 货 人 : &nbsp; &nbsp;{{ address?.receiver }}</span>
          <span>联系方式: &nbsp; &nbsp;{{ address?.mobile }}</span>
          <span>联系地址: &nbsp; &nbsp;{{ address?.value }}</span>
        </div>
        <div class="address-opt">如需切换，请提前更改默认地址</div>
      </div>
    </div>
    <div class="goods">
      <div class="title">
        订单信息 <span>创建时间：{{ order?.createAt }}</span>
      </div>
      <template v-if="order">
        <OrderGoods
          :products="(order?.products as IGoodsRes[])"
          :number="(order?.number as string[])"
        />
      </template>
    </div>
    <div class="pay">
      <div class="title">订单支付</div>
      <div class="pay-footer">
        <span>总计 ￥{{ total }}</span>
        <div>
          <button style="background-color: #ccc" @click="router.replace(`/`)">
            取消支付
          </button>
          &nbsp;
          <button @click="pay">确认支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getAddresses, getOrder, updateOrder } from "@/api";
import router from "@/router";
import { useRoute } from "vue-router";
import OrderGoods from "./components/OrderGoods.vue";
import message from "@/components/Message";
import type { IGoodsRes } from "../home/types";
import type { IAddressRes } from "../user/views/address/types";
import type { IOrderRes } from "./types";

const address = ref<IAddressRes>();
const order = ref<IOrderRes>();
const route = useRoute();
const total = computed(() => {
  return order.value?.products.reduce((p, c, idx) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return +p + +c.price * +order.value!.number[idx];
  }, 0);
});
getOrder(route.query.order_id as string).then((res) => {
  order.value = res.data;
  console.log(order.value?.products);
});
getAddresses().then((res) => {
  const defaultAddress = res.data.find(
    (address: IAddressRes) => address.isDefault === "1"
  );
  if (defaultAddress) address.value = defaultAddress;
});

const pay = () => {
  updateOrder(address.value?.id as string, order.value?.id as number);
  message("success", "支付成功！");
  router.replace(`/`);
};
</script>

<style scoped lang="less">
.pay-order {
  padding: 80px;
  .title {
    font-size: 20px;
    font-weight: 500;
    span {
      padding-left: 10px;
      display: inline-block;
      font-size: 14px;
      color: #bbb;
    }
  }
  & > div {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 10px;
  }
  .pay-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding-right: 20px;
    span {
      font-size: 18px;
      color: @priceColor;
    }
    button {
      background-color: @sxColor;
    }
  }
  .address-detail {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    border: 1px solid #ccc;
    padding-left: 20px;
    padding-right: 20px;
    .info {
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
