import { createApp } from 'vue';
import App from './App.vue';
import VueKakaoSdk from 'vue-kakao-sdk';

const apiKey = '56ac8b66f64f36b51ff122e636e1de54';

createApp(App).use(VueKakaoSdk, { apiKey }).mount('#app');
