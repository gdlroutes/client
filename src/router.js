import Vue from 'vue';
import Router from 'vue-router';
import GreetingView from './views/GreetingView.vue';
import Home from './views/Home.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: GreetingView,
      children: [
        {
          path: '/',
          component: SignIn
        },
        {
          path: '/SignUp',
          component: SignUp
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  ],
});
