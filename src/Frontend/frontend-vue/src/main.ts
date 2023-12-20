import './assets/main.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from 'axios'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from './formkit.config';
import { MotionPlugin } from '@vueuse/motion'
axios.interceptors.request.use(function (config) {
  config.headers.set('X-CSRF', '1')
  return config
})

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(plugin, defaultConfig(formKitConfig));
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(MotionPlugin)

app.mount('#app')
