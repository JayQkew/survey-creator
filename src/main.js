import { createApp } from 'vue'
import './style.css'
import router from './router.js'
import App from './App.vue'
import './assets/Erode_Complete/Fonts/css/erode.css'

createApp(App)
    .use(router)
    .mount('#app')
