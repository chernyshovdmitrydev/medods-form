import { createApp } from 'vue';
import './style.scss'
import App from './App.vue';

const app = createApp(App);

app.config.devtools = true;

app.mount('#app');