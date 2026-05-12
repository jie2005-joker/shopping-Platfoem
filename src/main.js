import '@/styles/common.scss'
import 'element-plus/theme-chalk/src/index.scss'
 import { lazyPlugin } from './directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { componentsPlugin } from './components'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.mount('#app')

