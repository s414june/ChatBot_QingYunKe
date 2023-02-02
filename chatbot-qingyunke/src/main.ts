import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
// import {minix} from './minix'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const app = createApp(App)
.use(VueAxios,axios)
.mount('#app');
// app.mixin(minix);