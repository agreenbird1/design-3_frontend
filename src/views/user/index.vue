<template>
  <div class="user">
    <userHeader />
    <div class="user-container">
      <aside>
        <n-anchor affix style="z-index: 1" ignore-gap>
          <n-anchor-link title="个人中心" class="first-link" />
          <router-link
            v-for="(title, index) in userPCTitles"
            :key="index"
            :to="title.to"
          >
            <n-anchor-link class="link" :title="title.title" />
          </router-link>
        </n-anchor>
      </aside>
      <n-dialog-provider>
        <section>
          <router-view></router-view>
        </section>
      </n-dialog-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import userHeader from "./components/userHeader.vue";
import { userPCTitles } from "./userPC";
</script>

<style scoped lang="less">
.user {
  .user-container {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    aside {
      background-color: #fff;
      width: 180px;
      height: 340px;
      padding: 20px;
      margin-right: 20px;
      .first-link {
        font-size: 20px !important;
      }
      .link {
        padding-left: 30px;
        padding-top: 30px;
      }
    }
    section {
      background-color: #fff;
      width: 980px;
    }
  }
}
</style>
