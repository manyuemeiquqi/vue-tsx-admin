import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
// attention import css sort
// arco component css has normalize css so doesn't need in this project
import '@arco-design/web-vue/dist/arco.css'
import './assets/style/index.scss'
import App from './App'
import router from './router'
import '@/mock'
import i18n from './locale'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import store from '@/store/index'

import '@/api/interceptors'

const app = createApp(App)

app.use(ArcoVueIcon)
app.use(ArcoVue)

app.use(i18n)
app.use(store)
app.use(router)

app.mount('#app')
