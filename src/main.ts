import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// vuetify config
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import { fa } from 'vuetify/locale'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// const vuetify = createVuetify({
//     locale:{
//         locale: 'fa',
//         fallback: 'fa',
//         messages: { fa },
//         rtl: {fa: true}
//     },
//     // theme: true,
//     components,
//     directives,
// })
// vuetify config

import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/scss/global.scss'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;

app.use(router).use(createPinia().use(piniaPluginPersistedstate))
.mount('#app')
