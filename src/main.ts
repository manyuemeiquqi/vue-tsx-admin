import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App'
import router from './router'
import '@/mock/mock'

import i18n from './locale'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

const app = createApp(App)

app.use(ArcoVueIcon)
app.use(ArcoVue)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
