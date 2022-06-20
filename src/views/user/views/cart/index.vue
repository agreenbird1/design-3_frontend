<template>
  <div class="cart">
    <n-data-table
      :columns="columns"
      :data="cartGoods"
      :row-key="(row:ICartRes) => row.id"
      :pagination="{
        pageSize: 4,
      }"
      :bordered="false"
      @update:checked-row-keys="handleCheck"
    >
      <template #empty>
        <div style="display: flex; flex-direction: column; align-items: center">
          <img src="@/assets/imgs/empty-cart.png" />
          <router-link to="/" style="color: #f2bfa9; text-decoration: underline"
            >去逛逛</router-link
          >
        </div>
      </template>
    </n-data-table>
    <div class="cart-footer">
      <div style="color: red; cursor: pointer" @click="deleteAll">
        删除选中商品
      </div>
      <div class="order">
        共 {{ cartGoods?.length }} 件商品，已选中
        {{ selectedGoods?.length ? selectedGoods?.length : 0 }}
        件商品，合计<span>￥{{ total ? total : "0" }}</span>
        <span class="add-order" @click="addOrder">结算订单</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCart, deleteCart, addOrder as addOrderSer } from "@/api";
import { ref, h, computed } from "vue";
import { NButton, NImage } from "naive-ui";
import message from "@/components/Message";
import router from "@/router";
import type { ICartRes } from "./types";

const cartGoods = ref<ICartRes[]>();
const selectedGoods = ref<ICartRes[]>();

const columns = [
  {
    type: "selection",
  },
  {
    title: "商品信息",
    key: "name",
    render(row: ICartRes) {
      return h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
          },
        },
        [
          h(NImage, {
            src: row.pics[0],
            width: "100",
            "preview-disabled": true,
          }),
          h(
            "span",
            {
              style: {
                "-webkit-line-clamp": 2,
                "-webkit-box-orient": "vertical",
                display: "-webkit-box",
                width: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            },
            row.name
          ),
        ]
      );
    },
  },
  {
    title: "单价",
    key: "price",
    render(row: ICartRes) {
      return h("span", {}, `￥${+row.price}`);
    },
  },
  {
    title: "数量",
    key: "number",
  },
  {
    title: "小计",
    render(row: ICartRes) {
      return h(
        "span",
        {
          style: {
            color: "#CF4444",
            fontSize: "16px",
          },
        },
        `￥${+row.number * +row.price}`
      );
    },
  },
  {
    title: "操作",
    key: "actions",
    render(row: ICartRes) {
      return h(
        NButton,
        {
          strong: true,
          secondary: true,
          type: "error",
          size: "small",
          onClick: () => deleteAGoods(row),
        },
        {
          default: () => "删除",
        }
      );
    },
  },
];
const handleCheck = (val: number[]) => {
  selectedGoods.value = cartGoods.value?.filter((c) => val.includes(c.id));
};

const total = computed(() => {
  return selectedGoods.value?.reduce((p, c) => +p + +c.price, 0);
});
const addOrder = () => {
  if (!selectedGoods.value?.length) message("warn", "请至少选中一件商品");
  else {
    const product_ids = selectedGoods.value?.map((goods) => goods.id);
    const number = selectedGoods.value?.map((goods) => goods.number);
    addOrderSer(product_ids, number).then((res) => {
      router.push({
        path: "/payOrder",
        query: {
          order_id: res.data as number,
        },
      });
    });
  }
};
const deleteAll = () => {
  selectedGoods.value?.forEach((s) => deleteAGoods(s));
};
const deleteAGoods = (row: ICartRes) => {
  deleteCart(row.id);
  cartGoods.value?.splice(
    cartGoods.value?.findIndex((goods: ICartRes) => goods.id === row.id),
    1
  );
};
getCart().then((res) => {
  cartGoods.value = res.data;
});
</script>

<style scoped lang="less">
.cart {
  position: relative;
  padding: 15px;
  height: 697px;
  .cart-footer {
    position: absolute;
    bottom: 15px;
    left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    .order {
      display: flex;
      align-items: center;
      padding-left: 450px;
      .add-order {
        margin-left: 10px;
        cursor: pointer;
        display: inline-block;
        border-radius: 10px;
        width: 100px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        height: 40px;
        background-color: @sucColor;
      }
      span {
        color: @priceColor;
      }
    }
  }
}
</style>
