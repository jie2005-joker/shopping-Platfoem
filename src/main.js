import '@/styles/common.scss'
import 'element-plus/theme-chalk/src/index.scss'
 import { lazyPlugin } from './directives'
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
app.use(lazyPlugin)

app.mount('#app')

