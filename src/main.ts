import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App'
import router from './router'

const app = createApp(App)

app.use(ArcoVue)

app.use(createPinia())
app.use(router)

app.mount('#app')
