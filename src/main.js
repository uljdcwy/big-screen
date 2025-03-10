import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { store } from '@/store';
console.log(router, "router");

if (process.env.NODE_ENV === 'development') {
    require('@/mock')
}

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
