import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify'


Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#778ca3',
    secondary: '#4b6584',
    accent: '#2d98da',
    bg: '#ecf0f1',
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

