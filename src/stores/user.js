// 对用户信息进行管理
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/apis/login'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await login({
      account,
      password
    })
    userInfo.value = res.result
  }
  return {
    userInfo,
    getUserInfo
  }
}, {
  persist: true
})
