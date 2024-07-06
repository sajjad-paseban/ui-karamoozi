import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/scss/global.scss'
import 'primeicons/primeicons.css'


const app = createApp(App)

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;


app.use(router).use(createPinia().use(piniaPluginPersistedstate))
.mount('#app')
