import axios from 'axios'

import { ElMessage } from 'element-plus'
import router from '@/router'
const server = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
server.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
server.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if(error.response.status === 401){
      localStorage.removeItem('user')
      ElMessage.error('登录过期，请重新登录')
      router.push('/login')
    }
    ElMessage.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default server