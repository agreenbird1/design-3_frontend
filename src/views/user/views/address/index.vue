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
        <span></span>
        <span @click="openPanel">+收货地址</span>
      </div>
      <n-data-table
        :pagination="{
          pageSize: 6,
        }"
        :columns="columns"
        :data="addresses"
        :bordered="false"
      />
    </template>
  </div>

  <n-drawer
    v-model:show="isOpenPanel"
    :height="502"
    placement="bottom"
    bordered
  >
    <n-drawer-content>
      <template #header> {{ isUpdated ? "更新" : "创建" }}收货地址 </template>
      <template #footer>
        <div class="drawer-footer">
          <n-checkbox
            size="medium"
            label="设置为默认地址"
            :checked="formValue.isDefault === '1'"
            @update:checked="handleCheckedChange"
          />
          <div class="drawer-button">
            <n-button
              strong
              secondary
              type="tertiary"
              @click="isOpenPanel = false"
            >
              取消
            </n-button>
            &nbsp; &nbsp; &nbsp;
            <n-button
              strong
              secondary
              type="warning"
              @click="handlePanelChange"
            >
              确认{{ isUpdated ? "更新" : "创建" }}
            </n-button>
          </div>
        </div>
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
import { NButton } from "naive-ui";
import {
  addresses,
  columns,
  formRef,
  formValue,
  isOpenPanel,
  isUpdated,
  resetForm,
  rules,
  upAddress,
} from "./address";
import { options } from "./assets/addressInfo";

const handleCheckedChange = (checked: boolean) => {
  if (checked) formValue.value.isDefault = "1";
  else formValue.value.isDefault = "0";
};

const openPanel = () => {
  isOpenPanel.value = true;
  isUpdated.value = false;
  resetForm();
};

const handlePanelChange = () => {
  upAddress();
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
    padding-top: 20px;
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
.drawer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
