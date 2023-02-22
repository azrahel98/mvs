import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routers'
import VueTablerIcons from "vue-tabler-icons";

import Boostrap from 'bootstrap-vue-next'
import VCalendar from 'v-calendar';
import {createPinia} from 'pinia'

import '../tabler/tabler.css'
// import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'v-calendar/dist/style.css';

const pinia = createPinia()

createApp(App).use(Boostrap).use(VCalendar,{}).use(router).use(pinia).use(VueTablerIcons).mount('#app')
