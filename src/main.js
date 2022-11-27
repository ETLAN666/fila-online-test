import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueCountdown from '@chenfengyuan/vue-countdown';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//Axios
import axios from 'axios'
//Vuex
import store from '@/store'


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.config.globalProperties.$axios=axios

app.use(router)
app.use(store)
app.use(vuetify)


app.use(ElementPlus)
app.component(VueCountdown.name, VueCountdown)


app.mount('#app')
