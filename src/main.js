import { createApp } from 'vue'
import './styles/style.css'
import './styles/button.css'
import './styles/text-input.css'
import router from './router.js'
import App from './App.vue'
import './assets/font/fonts.css'

createApp(App)
    .use(router)
    .mount('#app')
