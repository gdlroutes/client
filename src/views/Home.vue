<template>
  <v-layout>
      <Drawer>

      </Drawer>
  <router-view></router-view>
  </v-layout>
</template>

<script>
import Drawer from '../components/Drawer.vue';

export default {
  components: {
    Drawer,
  },
};
</script>
