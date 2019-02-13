<template>
  <v-app>
      <Toolbar/>
      <br>
      <br>
      <br>
      <HelloWorld/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import GreetingPage from './components/GreetingPage.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    GreetingPage,
    Toolbar
  },
  data() {
    return {
      //
    };
  },
};
</script>
