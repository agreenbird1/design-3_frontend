<template>
  <div class="search">
    <SearchOutlined />

    <n-dropdown
      trigger="click"
      placement="bottom-start"
      :options="associateList"
      @select="handleSelect"
    >
      <!-- 设置autocomplete=off失效解决 -->
      <input
        v-model="searchWords"
        placeholder="iphone 13mini"
        type="text"
        autocomplete="new-pwd"
      />
    </n-dropdown>

    <button>搜索</button>
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@vicons/antd";
import type { IAssociation } from "./types";
import { ref, watch } from "vue";
import { getAssociateList } from "@/api";
import { debounce } from "lodash-es";

const searchWords = ref<string>("");
const associateList = ref<IAssociation[]>([]);
// 防抖
const getAssociateListApi = debounce(getAssociateList, 400);

const handleSelect = (val: string) => {
  searchWords.value = val;
};
watch(
  () => searchWords.value,
  () => {
    getAssociateListApi(searchWords.value)?.then((res) => {
      associateList.value = res.data.slice(0, 5).map((p: { name: string }) => ({
        label: p.name,
        key: p.name,
      }));
    });
  }
);
</script>

<style lang="less">
.search {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 500px;
  padding-left: 10px;
  padding-right: 1px;
  border: 2px solid @sxColor;
  border-radius: 50px;
  background-color: white;
  svg {
    color: grey;
    margin-right: 5px;
  }
  input {
    width: 80%;
    padding-left: 5px;
    height: 26px;
    border-left: 1px solid #d4d0d0;
  }
  button {
    width: 80px;
    height: 34px;
    border-radius: 60px;
    margin-left: 3px;
    background: linear-gradient(135deg, @sxColor, orange);
    color: white;
  }
}
.n-dropdown-menu {
  width: 380px;
}
</style>
