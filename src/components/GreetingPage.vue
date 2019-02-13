<template>
  <v-layout class="main" fill-height>
  <v-flex class="leftCosa" fill-height align-start>
    <v-layout row class=".colored" fill-height align-start>
      <v-flex xs5 class=".colored" fill-height align-start>
        <v-card flat tile color="#ffa801" class=".colored" height="100%">
          <v-layout row fill-height align-start pa-5>
            <v-img :src="require('../assets/logo2.svg')"></v-img>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex class="rightCosa" fill-height xs7 align-center justify-center>
        <v-layout align-center  fill-height justify-center>
          dcs;ld,dlsk kd dkf kdjf 
        </v-layout>          
      </v-flex>
    </v-layout>
  </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'GeetingPage',
  components: {
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style>
.main{
    background-color: #ffc048;
}



.leftCosa{
background-color: #ffa801;
    height: 100%;
    width: 100%;
    padding: 0%;
    margin: 0%;
    max-width: 100%
}
.rightCosa{
background-color: #FFF;
    height: 100%;
    width: 100%;
    padding: 0%;
    margin: 0%;
    max-width: 100%
}
.colored{
background-color: #ffa801;
    height: 100%
}
</style>
