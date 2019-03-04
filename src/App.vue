<template>
  <v-app>

      <router-view>
      </router-view>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Toolbar
  },
  data() {
    return {
      //
    };
  },
};
</script>
