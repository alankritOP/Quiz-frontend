import Vue from 'vue';
import App from './App.vue';
import router from './Router';
import store from '@/store';


import './init';

new Vue({
  store,
  router,
  render: h => h( App ),
}).$mount( '#app' )
