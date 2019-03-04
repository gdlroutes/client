<template>
    <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
      hide-overlay
      dark
      dense
      floating
    class="backg"
    >
      <v-layout column fill-height>
        
      
        <v-list class="pt-0" dense>
            <br>
            <v-list-tile pa>

              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>menu</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-layout>
                  <v-spacer></v-spacer>
                  <div class="display-1 gdl font-weight-black">GDL</div>
                  <div class="display-1 wlk font-weight-thin">Walks</div>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-list-tile-content>

          </v-list-tile>
          <br>
           
  
          <v-divider></v-divider>

          <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.type"
            @click="changeElement(item.type)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-spacer></v-spacer>
          <v-list class="">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/82.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
      </v-layout>
    </v-navigation-drawer>
</template>

<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script>
import Map from './Map.vue'
import axios from 'axios';

export default {
  components: {
    Map
  },
  data: () => ({
    drawer: true,
    items: [
      { title: 'Buscar Rutas', icon: 'search', type: './Search' },
      { title: 'Crear Rutas', icon: 'add', type: './home' },
      { title: 'Mis Rutas', icon: 'favorite', type: './Fav' }
    ],
    showMap : true,
    mini: true,
    right: null,
  }),
  methods: {
    changeElement(type) {
      if (type=='map'){
        this.showMap=true;
      }else{
        this.showMap=false;
      }
    }
  }
};
</script>

<style>
.map { height: 100%; }

</style>
