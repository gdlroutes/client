<template>
    <v-layout>
        <v-layout row fill-height>
            <v-flex xs12 fill-height>
                <div id="map" class="map"></div>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script>
import axios from 'axios';

export default {
  name: 'Map',
  components: {
  },
  data: () => ({
    map: null,
    tileLayer: null,
    layers: [],
    controlLayers: [],
  }),
  mounted() {
    this.initMap();
    this.getLandmarks();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([20.7, -103.4], 11);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        },
      );
      this.tileLayer.addTo(this.map);
      
    },
    getLandmarks() {
      axios(`http://localhost:8080/geodata/categories`, {method:"get"})
      .then(response => {
        response.data[0]["active"]=false;
        response.data[1]["active"]=false;
        this.layers=response.data;
        this.initLayers();
      })
      .catch(e => {
      this.errors.push(e)
      });
    },
    initLayers() {
      var overlayMaps = {};
      this.layers.forEach((layer) => {
        
        var markers= [];
        layer.features.forEach((feature) => {
          markers.push(L.marker(feature.coords).bindPopup("<h3>"+feature.name+"</h3><br>"+feature.description));
        }); 
        overlayMaps[layer.name] =L.layerGroup(markers);
      });
      L.control.layers(null, overlayMaps).addTo(this.map);
    },
  },
};
</script>

<style>
.map { height: 100%; }

</style>