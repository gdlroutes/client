<template>
  <v-layout class="main" fill-height>
  <v-flex class="leftCosa" fill-height align-start>
    <v-layout row class=".colored" fill-height align-start>
      <v-flex class="rightCosa" fill-height xs6 align-center justify-center>
        <v-layout align-center  fill-height justify-center>

            <router-view></router-view>

        </v-layout>          
      </v-flex>
      <v-flex xs6 class="colored" fill-height align-start>
        <v-card flat tile color="#ecf0f1" class="colored" height="100%">
          <v-layout align-end justify-end row fill-height pl-5>
            <v-img :src="require('../assets/set.svg')"></v-img>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'GreetingView',
  components: {
  },
  data() {
    return {
      //                            <h1 class="header-text">GDL Walks</h1>

    };
  },
};
</script>

<style>

</style>
