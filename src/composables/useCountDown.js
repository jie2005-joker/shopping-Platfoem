import dayjs from 'dayjs'
import {ref, onMounted, computed} from 'vue'
export const useCountDown = () => {
    // 倒计时器
    let timer = null
    // 响应式数据
    const time = ref(0)
    // 格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

    const start = (currentTime) => {
      time.value = currentTime
      // 开始倒计时
      timer = setInterval(() => {
        time.value--
        if (time.value <= 0) {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
      timer = setInterval(() => {
        time.value--
      }, 1000)
    }
    return {
      formatTime,
      start
    }
}