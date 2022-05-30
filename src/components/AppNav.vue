<template>
  <nav class="app-nav">
    <div class="container">
      <ul>
        <template v-if="userStore.token">
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li>
            <RouterLink to="/register">免费注册</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;">欢迎，{{ userStore.username }}</a>
          </li>
        </template>

        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { RouterLink } from "vue-router";
const userStore = useUserStore();
</script>

<style scoped lang="less">
.app-nav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @sxColor;
        }
      }
      // 浏览器对 css 的解析也是顺序的，先找到第一个 li ，然后 ~ 符号就是对后面的兄弟  li 节点进行左边竖线的设置
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
