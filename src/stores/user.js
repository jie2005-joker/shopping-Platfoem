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
    localStorage.setItem('user', JSON.stringify(res.result))
  }

  // 清空用户信息
  const clearUserInfo = () => {
    userInfo.value = null
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
})
