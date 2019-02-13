<template>
  <v-layout>
    <v-layout row justify-space-between>
      <v-flex xs9>
        <div id="map" class="map"></div>
      </v-flex>
      <v-flex xs3 pa-4>
        
        <div
          class="form-check"
          v-for="layer in layers"
          :key="layer.id"
        >
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="layer.active"
              @change="layerChanged(layer.id, layer.active)"
            />
            {{ layer.name }}
          </label>
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script>
import Toolbar from './Toolbar.vue';
import axios from 'axios';

export default {
  components: {
    Toolbar,
  },
  data: () => ({
    map: null,
    tileLayer: null,
    layers: [],
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
      this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords)
            .bindPopup("<h3>"+feature.name+"</h3><br>"+feature.description);
        });
      });
    },
    layerChanged(layerId, active) {
      const layer = this.layers.find(layer => layer.id === layerId);
      layer.features.forEach((feature) => {
        if (active) {
          feature.leafletObject.addTo(this.map);
        } else {
          feature.leafletObject.removeFrom(this.map);
        }
      });
    },
  },
};
</script>

<style>
.map { height: 600px; }
</style>
