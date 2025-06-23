import { createApp } from 'vue'
import './style.css'
import './styles/button.css'
import './styles/text-input.css'
import router from './router.js'
import App from './App.vue'
import './assets/font/fonts.css'

createApp(App)
    .use(router)
    .mount('#app')
