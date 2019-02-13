<template>
  <v-container>
    <v-layout row justify-space-between>
      <v-flex xs9>
        <div id="map" class="map"></div>
      </v-flex>
      <v-flex xs3>
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
  </v-container>
</template>

<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
<script>
import axios from 'axios';

export default {
  data: () => ({
    map: null,
    tileLayer: null,
    layers: [
      {
          "id":0,
          "name":"Libraries",
          "active":false,
          "features":[
              {
                  "id": 13,
                  "name": "Biblioteca Central Estatal Profesor Ram\u00f3n Garc\u00eda Ruiz",
                  "coords":[20.6868385,-103.35037],
                  "type":"marker"
              },
              {
                  "id": 14,
                  "name": "Biblioteca Iberoamericana Octavio Paz",
                  "coords":[20.6756959,-103.3483031],
                  "type":"marker"
              },
              {
                  "id": 15,
                  "name": "Biblioteca del Ej\u00e9rcito y Fuerza A\u00e9rea Mexicana",
                  "coords":[20.6862386,-103.3511596],
                  "type":"marker"
              },
              {
                  "id": 16,
                  "name": "Biblioteca P\u00fablica del Estado de Jalisco",
                  "coords":[20.738445,-103.3813623],
                  "type":"marker"
              },
          ]
      },
      {
          "id":1,
          "name":"Bosques",
          "active":false,
          "features":[
              {
                  "id":17,
                  "name":"\u00c1rea de Protecci\u00f3n de Flora y Fauna La Primavera",
                  "type":"marker",
                  "coords":[20.7011129,-103.5781066],
              },
              {
                  "id":18,
                  "name":"Bosque El Centinela",
                  "type":"marker",
                  "coords":[20.760076,-103.3823272],
              },
              {
                  "id":19,
                  "name":"Bosque Los Colomos (Ingreso El Chaco)",
                  "type":"marker",
                  "coords":[20.7040375,-103.3899401],
              },
              {
                  "id":20,
                  "name":"Bosque Los Colomos (Ingreso Paseo Torre\u00f3n)",
                  "type":"marker",
                  "coords":[20.7060597,-103.3939649],
              },
          ],
      },
  ],
  }),
  mounted() {
    this.initMap();
    this.initLayers();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([20.7, -103.3], 12);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        },
      );
      this.tileLayer.addTo(this.map);
      axios(`http://localhost:8080/geodata/categories`, {method:"get"})
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
      this.errors.push(e)
      })
      /*
      const testURL = 'http://localhost:8080/geodata/categories';
      const myInit = {
        method: 'GET',
        mode: 'no-cors',
      };

      const myRequest = new Request(testURL, myInit);

      fetch(myRequest).then(function(response) {
        console.log(response);
      }).catch(function(e){
        console.log(e);
      });*/
    },
    initLayers() {
      this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords)
            .bindPopup("<h3>"+feature.name+"</h3><br>"+feature.name);
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
