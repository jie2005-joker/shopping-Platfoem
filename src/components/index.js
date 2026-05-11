// 将组件注册为全局组件
import XtxSku from './XtxSku/index.vue'
import imageView from './imageView/index.vue'

export const componentsPlugin = {
  install(app){
    app.component('XtxSku', XtxSku)
    app.component('XtxImageView', imageView)
  }
}
