import { createApp } from 'vue';
import App from './App.vue';
import VueKakaoSdk from 'vue-kakao-sdk';
import VueGtag from "vue-gtag"

const apiKey = 'a6e6b1da205e7e44358765185414aa27';

createApp(App).use(VueKakaoSdk, { apiKey }).use(VueGtag, {
    config: { id: "G-N0D8DF07CK" }
  }).mount('#app');
