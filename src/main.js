import { createApp } from 'vue'
import './style.css'
import './styles/button.css'
import router from './router.js'
import App from './App.vue'
import './assets/font/fonts.css'

createApp(App)
    .use(router)
    .mount('#app')
