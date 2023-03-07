import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {setupStore} from "@/stores";

async  function bootstrap(){
    const app = createApp(App)

    setupStore(App);
    app.use(router)
    app.mount('#app')
}
bootstrap();