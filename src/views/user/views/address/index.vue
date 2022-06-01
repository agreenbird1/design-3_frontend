<template>
  <div class="user-address">
    <template v-if="!addresses?.length">
      <div class="user-empty">
        <img src="@/assets/imgs/empty-address.png" />
        <span @click="openPanel">新建收货地址</span>
      </div>
    </template>
    <template v-else>
      <div class="user-title">
        <span>收货地址</span>
        <span>+收货地址</span>
      </div>
      <n-data-table :columns="columns" :data="addresses" :bordered="false" />
    </template>
  </div>

  <n-drawer v-model:show="isOpenPanel" :height="502" placement="bottom">
    <n-drawer-content>
      <template #header> 新建收货地址 </template>
      <template #footer>
        <n-button strong secondary type="tertiary" @click="isOpenPanel = false">
          取消
        </n-button>
        &nbsp; &nbsp; &nbsp;
        <n-button strong secondary type="warning" @click="upAddress">
          确认创建
        </n-button>
      </template>
      <n-form
        ref="formRef"
        :label-width="80"
        label-placement="left"
        :model="formValue"
        :rules="rules"
        size="medium"
      >
        <n-form-item label="姓名" path="receiver">
          <n-input v-model:value="formValue.receiver" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="电话号码" path="mobile">
          <n-input v-model:value="formValue.mobile" placeholder="电话号码" />
        </n-form-item>
        <n-form-item label="地址" path="value">
          <n-cascader
            v-model:value="formValue.value"
            placeholder="请选择地址"
            expand-trigger="click"
            :options="options"
            check-strategy="child"
            show-path
          />
        </n-form-item>
        <n-form-item label="详细地址" path="detailAddress">
          <n-input
            v-model:value="formValue.detailAddress"
            placeholder="请输入详细地址"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { NButton } from "naive-ui";
import { ref } from "vue";
import { addresses, columns, rules } from "./address";
import { options } from "./assets/addressInfo";
import type { IAddress } from "./types";

const isOpenPanel = ref(false);
const openPanel = () => {
  isOpenPanel.value = true;
};
const formRef = ref<FormInst | null>(null);
const formValue = ref<IAddress>({
  detailAddress: "",
  value: null,
  receiver: "",
  mobile: "",
});

const upAddress = () => {
  console.log(formValue.value);
};
</script>

<style scoped lang="less">
.user-address {
  min-height: 500px;
  .user-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 10px;
    padding-right: 60px;
    padding-bottom: 20px;
    & span:last-child {
      color: skyblue;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .user-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    img {
      width: 200px;
    }
    span {
      color: @sxColor;
      cursor: pointer;
    }
  }
}
</style>
