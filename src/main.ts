import { createApp } from 'vue'

import ArcoVue from '@arco-design/web-vue'

// 这里需要注意引入顺序
import '@arco-design/web-vue/dist/arco.css'
import './assets/style/style.scss'

import App from './App'
import router from './router'
import '@/mock/mock'

import i18n from './locale'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import store from '@/store/index'

// 这里最好注入到实例内部
import '@/api/interceptors'

const app = createApp(App)

app.use(ArcoVueIcon)
app.use(ArcoVue)

app.use(i18n)
app.use(store)
app.use(router)

app.mount('#app')
