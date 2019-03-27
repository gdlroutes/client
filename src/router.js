import Vue from 'vue';
import Router from 'vue-router';
import GreetingView from './views/GreetingView.vue';
import Home from './views/Home.vue';
import SignUp from './components/SignUp.vue';
import Map from './components/Map.vue';
import CreateWalk from './components/CreateWalk.vue';
import Fav from './components/Fav.vue';
import Search from './components/Search.vue';
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
      component: Home,
      children: [
        {
          path: '/',
          component: Map
        },
        {
          path: '/Add',
          component: CreateWalk
        },
        {
          path: '/Search',
          component: Search
        },
        {
          path: '/Fav',
          component: Fav
        },
      ]
    },
  ],
});
