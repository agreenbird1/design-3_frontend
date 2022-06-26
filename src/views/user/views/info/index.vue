<template>
  <div class="user-info">
    <nav>基本信息</nav>
    <div class="info-panel">
      <ul class="info-details">
        <li>
          <span> 用户头像 </span>
          <n-tooltip placement="top-start" trigger="hover">
            <template #trigger>
              <label for="upload_avatar">
                <n-avatar round :size="50" :src="avatar || userStore.avatar" />
              </label>
            </template>
            点击上传头像
          </n-tooltip>
          <input
            type="file"
            id="upload_avatar"
            style="display: none"
            @change="upload"
          />
        </li>
        <li>
          <span> 用户ID </span>
          <span> 1 </span>
        </li>
        <li>
          <span> 帐 号 </span>
          <span>{{ userInfo.mobile }}</span>
        </li>
        <li>
          <span> 昵 称 </span>
          <n-input
            status="warning"
            autosize
            style="min-width: 20%"
            v-model:value="userInfo.username"
          />
        </li>
        <li>
          <span> 性 别 </span>
          <n-radio-group
            v-model:value="userInfo.gender"
            name="radiogroup1"
            default-checked
          >
            <n-space>
              <n-radio value="0"> 男 </n-radio>
              <n-radio value="1"> 女 </n-radio>
            </n-space>
          </n-radio-group>
        </li>
        <li>
          <span> 手机号码 </span>
          <span>{{ userInfo.mobile }}</span>
        </li>
      </ul>
      <div class="submit-btn">
        <button @click="storeUser">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { modifyMobile } from "@/utils/modifyMobile";
import { ref } from "vue";

const userStore = useUserStore();
const userInfo = ref({
  id: userStore.id,
  mobile: modifyMobile(userStore.mobile),
  username: userStore.username,
  gender: userStore.gender,
});
const avatarInput = ref<HTMLInputElement>();
const avatar = ref<string>();

// 头像上传
const upload = (e: Event) => {
  // 包装文件
  avatarInput.value = e.target as HTMLInputElement;
  if (avatarInput.value.files) {
    // FileReader 浏览器提供的方法
    const reader = new FileReader();
    // reader里面有个方法readAsDataURL 可以将图片转base64进制
    reader.readAsDataURL(avatarInput.value.files[0]);
    reader.onload = () => {
      // 给声明变量赋值
      avatar.value = reader.result as string;
    };
  }
};

// 保存信息
const storeUser = () => {
  userStore.updateUser({
    username: userInfo.value.username,
    gender: userInfo.value.gender,
  });
  if (avatarInput.value && avatarInput.value.files) {
    const formData = new FormData();
    formData.set("avatar", avatarInput.value.files[0]);
    userStore.updateAvatar(formData);
  }
};
</script>

<style scoped lang="less">
.user-info {
  nav {
    width: 180px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: @sxColor;
    border-top: 3px solid @sxColor;
    border-radius: 2px;
  }
  .info-panel {
    width: 100%;
    height: 500px;
    border-top: 1px solid #e0dddd;

    .info-details {
      border-bottom: 1px solid #e0dddd;
      padding: 60px;
      padding-bottom: 30px;
      padding-top: 30px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 20px;
      }
      li {
        display: flex;
        align-items: center;
        height: 60px;
        & > span {
          width: 60px;
          margin-right: 50px;
        }
      }
    }
    .submit-btn {
      margin-left: 100px;
      margin-top: 20px;
      button {
        background-color: @sxColor;
        color: white;
      }
      button:hover {
        background-color: rgb(228, 189, 189);
      }
    }
  }
}
</style>
