<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="w-96 max-h-72">
      <h1 class="text-center">vue3-2023-系统登录</h1>
      <!-- text-align 设置块元素内的行内内容的水平对齐方式，类似于 vertical-align -->
      <a-form ref="loginFormRef" :model="formData">
        <a-form-item hide-label prop="username">
          <a-input v-model:model-value="formData.username"></a-input>
        </a-form-item>
        <a-form-item hide-label prop="password">
          <a-input type="password" show-password v-model:model-value="formData.password"></a-input>
        </a-form-item>
      </a-form>
      <a-button class="w-full" @click="handleLogin" type="primary"> 登录 </a-button>
      <div class="flex mt-4 justify-between items-center">
        <div>
          <p>账号：admin 密码：随便填</p>
          <p>账号：editor 密码：随便填</p>
        </div>
        <a-button type="primary" @click="handleThirdLogin">第三方登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
interface LoginFormData {
  username: string
  password: string
}
const formData = ref<LoginFormData>({
  username: '',
  password: ''
})

const loginFormRef = ref()
const handleLogin = () => {}
const handleThirdLogin = () => {}
</script>

<style lang="scss" scoped>
:deep() {
  .login-button {
    width: 100%;
  }
}
</style>
