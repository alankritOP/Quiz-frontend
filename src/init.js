import Vue from "vue";
import Router from "vue-router";
import Vuelidate from "vuelidate";
import Vuex from 'vuex'
import '@/services/configureAxios';
import VueToast from "vue-toast-notification";

Vue.config.productionTip = false;
import "vue-toast-notification/dist/theme-default.css";

Vue.use(Router);
Vue.use( Vuex );
Vue.use(Vuelidate);
Vue.use(VueToast);