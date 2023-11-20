import './assets/style/style.scss'
import { createApp } from 'vue'

import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App'
import router from './router'
import '@/mock/mock'

import i18n from './locale'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import store from '@/store/index'
const app = createApp(App)

app.use(ArcoVueIcon)
app.use(ArcoVue)

app.use(i18n)
app.use(store)
app.use(router)

app.mount('#app')
