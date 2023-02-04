import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
//導入font awesome
//指引：https://blog.csdn.net/ymzhaobth/article/details/116975103
import { library } from '@fortawesome/fontawesome-svg-core'
// import {} from '@fortawesome/free-brands-svg-icons'
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import {faArrowsRotate,faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faPaperPlane,faArrowsRotate,faChevronRight)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const app = createApp(App)
.use(VueAxios,axios)
.component('font-awesome-icon',FontAwesomeIcon)
.mount('#app');
// app.mixin(minix);