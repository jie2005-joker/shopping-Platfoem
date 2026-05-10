import '@/styles/common.scss'
import 'element-plus/theme-chalk/src/index.scss'
import { useIntersectionObserver } from '@vueuse/core'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')

app.directive('img-lazy',{
  mounted(el,binding){
    el.src = 'https://pics1.baidu.com/feed/2e2eb9389b504fc2dd410357beb07b1790ef6d3d.png?token=a0f2ff03711c05247a1abd890e6b6d62'
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 元素进入视口，加载真实图片
          el.src = binding.value
          stop() // 停止观察
        }
      }
    )
  }
})