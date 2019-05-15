<template>
  <v-layout class="cont">
    <v-layout row wrap>
      <v-flex xs8 pt-3 pl-3 pb-4>
        <v-card light flat>
          <v-toolbar class="bg" flat>
            <v-text-field solo prepend-inner-icon="search" single-line></v-text-field>
          </v-toolbar>
        </v-card>
      </v-flex>
      <v-flex xs12 pl-3 mb-3 v-for="(walk,i) in walks" :key="i">
        <RoutePreview :walk="walk"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import RoutePreview from "./RoutePreview.vue";
import router from "../router";
import axios from 'axios';

export default {
  name: "Search",
  components: {
    RoutePreview
  },
  data: () => ({
    walks: [
      {
        name: "Ruta Histórica",
        author: "Ximena Torres",
        description: "description",
        waypoints: []
      },
      {
        name: "Arte Contemporáneo en Guadalajara",
        author: "Lalo Ortiz",
        description: "description",
        waypoints: []
      },
      {
        name: "Ruta del Aguacate",
        author: "Antonio Felipe",
        description: "description",
        waypoints: []
      }
    ]
  }),
  mounted() {
    let self = this;
    axios.get(process.env.VUE_APP_APIURL+'/geodata/routes')
    .then( response => {
        if(response.status === 200){
            console.log(response.data);
            
        }
    })
    .catch(error => {
      const cosa = JSON.parse(self.$localStorage.get("mWalks"));
      if (cosa) {
        self.walks = cosa;
      }
    })

    
  }
};
</script>

<style lang="css">
.cont {
  background-color: #ecf0f1;
}
</style>