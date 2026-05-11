import axios from 'axios'

const server = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
server.interceptors.request.use(
  config => {
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
    ElMessage.error(error.response.data.message || '请求失败')
    return Promise.reject(error)
  }
)

export default server