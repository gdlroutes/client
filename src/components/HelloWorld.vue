<template>
  <v-layout >
    <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    
    dark
    class="light-blue darken-4"
    >
      <v-layout column fill-height>
        <v-toolbar flat class="transparent" >
                <v-btn
                  icon
                  @click.stop="mini = !mini"
                >
                  <v-icon>menu</v-icon>
                </v-btn>
                <v-list-tile-content>
                <v-list-tile-title>GDL Walks</v-list-tile-title>
              </v-list-tile-content>
        </v-toolbar>
      
        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile
            v-for="item in items"
            :key="item.title"
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
    <v-layout row fill-height>
      <Map v-if="showMap"/>
    </v-layout>
  </v-layout>
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
      { title: 'Buscar Rutas', icon: 'search', type: 'info' },
      { title: 'Crear Rutas', icon: 'add', type: 'map' },
      { title: 'Mis Rutas', icon: 'favorite', type: 'info' }
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
