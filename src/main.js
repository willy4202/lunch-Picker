import { createApp } from 'vue';
import App from './App.vue';
import VueKakaoSdk from 'vue-kakao-sdk';
const apiKey = 'a6e6b1da205e7e44358765185414aa27';

createApp(App).use(VueKakaoSdk, { apiKey }).mount('#app');
