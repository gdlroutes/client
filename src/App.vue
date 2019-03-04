<template>
  <v-app>

      <router-view>
      </router-view>

  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data() {
    return {
      //
    };
  },
};
</script>
