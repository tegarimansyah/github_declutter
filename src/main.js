import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueGtag from "vue-gtag-next";

const app = createApp(App)

if (import.meta.env.PROD) {
    app.use(VueGtag, {
        property: {
            id: "G-B15X6D02ZP"
        }
    });
}

app.mount('#app')
