import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from '@/App.vue';
import {createI18n} from 'vue-i18n';
import en from '@/locales/en';
import router from '@/router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import dayjs from 'dayjs';

const app = createApp(App);

const i18n = createI18n({
    locale: 'en',
    messages: {
        en
    }
});

app.use(createPinia()).use(i18n);
app.use(router);
app.use(VueAxios, axios);

app.config.globalProperties.$dayjs = dayjs;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

app.mount('#app');
