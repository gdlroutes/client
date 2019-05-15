<template>
    <v-layout row class="cont" pa-4>
      <v-flex xs12 >
        <v-card light flat align-start justify-start row fill-height>
          <v-toolbar class="bg" flat>
            <v-overflow-btn
              solo
              prepend-inner-icon="search"
              :items="categories"
              label="Buscar por categoría"
              target="#dropdown-example"
            ></v-overflow-btn>
          </v-toolbar>
  
          <v-list three-line subheader class="cont pa-0 ">
  
          <template v-for="(walk, i) in walks">
            <v-list-tile
              class="cont"
              :key="i"
              avatar
            >
              <v-list-tile-avatar>
                <v-icon :class="[getIconClass(walk.category_id)]">{{getIcon(walk.category_id)}}</v-icon>
              </v-list-tile-avatar>
  
              <v-list-tile-content>
                <v-list-tile-title>{{ walk.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ walk.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">more_horiz</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
            class="cont pa-0"
              v-if="i + 1 < walks.length"
              :key="i"
            ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
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
        description: "jhbjhbjh",
        points: [],
        category_id: 1
      },
      {
        name: "Arte Contemporáneo en Guadalajara",
        author: "Lalo Ortiz",
        description: "description",
        points: [],
        category_id: 2
      },
      {
        name: "Ruta del Aguacate",
        author: "Antonio Felipe",
        description: "description",
        points: [],
        category_id: 3
      }
    ],
    categories: ['Naturaleza', 'Arte y Cultura', 'Gastronómica', 'Recreativa', 'Todas'],

  }),
  mounted() {
    let self = this;
    axios.get(process.env.VUE_APP_APIURL+'geodata/routes')
    .then( response => {
        if(response.status === 200){
            console.log(response.data);
            
        }
    })
    .catch(error => {
      const cosa = JSON.parse(self.$localStorage.get("mWalks"));
      if (cosa) {
        //self.walks = cosa;
      }
    })

    
  },
      methods: {
        getIconClass(category_id) {
            console.log(category_id)            
            switch (category_id) {
                case 1:          
                return 'blue white--text';
                case 2:
                return 'purple white--text';
                case 3:
                return 'light-green white--text';
                case 4:
                return 'amber white--text';
                default:
                return 'lime white--text';
            }
        },
        getIcon(category_id) {            
            switch (category_id) {
                case 1:          
                return 'tag_faces';
                break;
                case 2:
                return 'palette';
                break;
                case 3:
                return 'local_florist';
                break;
                case 4:
                return 'restaurant';
                default:
                return 'local_play';
            }
        },
    }
};
</script>

<style lang="css">
.cont {
  background-color: #ecf0f1;
}
</style>